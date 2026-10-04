import { hexRgb, rgbHex, oklab, oklabRgb, bilinear } from './lab/colour.js';
import { MOENE as DEFAULT, MOENE_NAMES as NAMES } from './lab/palettes.js';

const ROWS = ['High','Normal','Low'], COLS = ['Bad','Neutral','Good'];
const KEY = 'grid-field-playground';
let state = { anchors: DEFAULT.map(r => r.slice()), edge: 'B', space: 'srgb', lines: true, sub: true, dots: true, smooth: false };
try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s && Array.isArray(s.anchors) && s.anchors.length === 3) state = { ...state, ...s }; } catch (e) {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };

// ---- colour maths
const hexOk = h => /^#[0-9a-fA-F]{6}$/.test(h);

// Anchor A[i][j]: i energy band 0 Low … 2 High, j mood band 0 Bad … 2 Good (the page stores rows top → bottom).
const anchorAt = (i, j) => state.anchors[2 - i][j];
// Continuous position → anchor coordinate per the edge option. m and e run 1–9 (fractions allowed).
const coord = t => state.edge === 'C' ? (t - 1) / 4 : state.edge === 'A' ? Math.max(0, Math.min(2, (t - 2) / 3)) : (t - 2) / 3;
function colourAt(m, e) {
  const u = coord(m), v = coord(e);
  const conv = state.space === 'oklab' ? (h => oklab(hexRgb(h))) : hexRgb;
  const { mix, pts } = bilinear((a, b) => conv(anchorAt(a, b)), u, v);
  const rgb = state.space === 'oklab' ? oklabRgb(mix) : mix;
  const clipped = rgb.some(c => c < -0.5 || c > 255.5);
  return { rgb, hex: rgbHex(rgb), clipped, pts };
}

// ---- anchors UI
const anchorsEl = document.getElementById('gf-anchors');
const inputs = [];
ROWS.forEach((rl, r) => {
  const lab = document.createElement('div'); lab.className = 'rl'; lab.textContent = rl; anchorsEl.append(lab);
  COLS.forEach((cl, c) => {
    const [n, name] = NAMES[r][c];
    const id = `gf-a-${r}-${c}`;
    const box = document.createElement('div'); box.className = 'anchor';
    box.innerHTML = `<label for="${id}"><b>${n}</b> · ${name}</label><input type="color" id="${id}"><input type="text" id="${id}-hex" spellcheck="false" maxlength="7" aria-label="Region ${n} hex">`;
    anchorsEl.append(box);
    const pick = box.querySelector('input[type=color]'), txt = box.querySelector('input[type=text]');
    pick.addEventListener('input', () => { state.anchors[r][c] = pick.value; txt.value = pick.value; txt.removeAttribute('aria-invalid'); changed(); });
    txt.addEventListener('input', () => {
      let v = txt.value.trim(); if (v && v[0] !== '#') v = '#' + v;
      if (hexOk(v)) { state.anchors[r][c] = v.toLowerCase(); pick.value = v.toLowerCase(); txt.removeAttribute('aria-invalid'); changed(); }
      else txt.setAttribute('aria-invalid', 'true');
    });
    inputs.push({ r, c, pick, txt });
  });
});
const blank = document.createElement('div'); anchorsEl.append(blank);
COLS.forEach(cl => { const d = document.createElement('div'); d.className = 'cl'; d.textContent = cl; anchorsEl.append(d); });
const syncInputs = () => inputs.forEach(({ r, c, pick, txt }) => { pick.value = state.anchors[r][c]; txt.value = state.anchors[r][c]; txt.removeAttribute('aria-invalid'); });

// ---- options
const HINTS = {
  B: 'Each colour is exact at its region’s centre; past the outer centres the blend keeps going to the edge and is clipped if it leaves the screen’s range.',
  C: 'Colours sit at the grid’s corners, edge middles and centre; a region’s centre is a blend. Never clips.',
  A: 'Each colour is exact at its region’s centre; the outer ring repeats its neighbour, so corners are flat 2×2 blocks.',
};
const seg = (id, key) => {
  const el = document.getElementById(id);
  const paint = () => el.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === state[key])));
  el.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; state[key] = b.dataset.v; paint(); changed(); });
  return paint;
};
const paintEdge = seg('gf-edge', 'edge'), paintSpace = seg('gf-space', 'space');
['lines', 'sub', 'dots', 'smooth'].forEach(k => {
  const el = document.getElementById('gf-' + k); el.checked = state[k];
  el.addEventListener('change', () => { state[k] = el.checked; changed(); });
});

// ---- drawing
const cv = document.getElementById('gf-cv'), ctx = cv.getContext('2d');
const fieldEl = document.getElementById('gf-field');
const css = n => getComputedStyle(fieldEl).getPropertyValue(n).trim();
let clippedCount = 0;
function draw() {
  const W = cv.width, cell = W / 9;
  ctx.clearRect(0, 0, W, W);
  clippedCount = 0;
  for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) if (colourAt(c + 1, 9 - r).clipped) clippedCount++;
  if (state.smooth) {
    const N = 180, img = ctx.createImageData(N, N);
    for (let py = 0; py < N; py++) for (let px = 0; px < N; px++) {
      // Map pixel centres to the continuous 1–9 range (0.5–9.5 covers the subcells edge to edge).
      const m = 0.5 + (px + 0.5) / N * 9, e = 9.5 - (py + 0.5) / N * 9;
      const { rgb } = colourAt(m, e); const o = (py * N + px) * 4;
      img.data[o] = Math.max(0, Math.min(255, rgb[0])); img.data[o + 1] = Math.max(0, Math.min(255, rgb[1])); img.data[o + 2] = Math.max(0, Math.min(255, rgb[2])); img.data[o + 3] = 255;
    }
    const tmp = document.createElement('canvas'); tmp.width = N; tmp.height = N; tmp.getContext('2d').putImageData(img, 0, 0);
    ctx.imageSmoothingEnabled = true; ctx.drawImage(tmp, 0, 0, W, W);
  } else {
    for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
      ctx.fillStyle = colourAt(c + 1, 9 - r).hex; ctx.fillRect(c * cell, r * cell, cell + 1, cell + 1);
    }
  }
  const line = (i, major) => {
    ctx.strokeStyle = major ? css('--grid-major') : css('--grid-minor'); ctx.lineWidth = major ? 3 : 1.4;
    ctx.beginPath(); ctx.moveTo(i * cell, 0); ctx.lineTo(i * cell, W); ctx.moveTo(0, i * cell); ctx.lineTo(W, i * cell); ctx.stroke();
  };
  for (let i = 1; i < 9; i++) { const major = i % 3 === 0; if (major ? state.lines : state.sub) line(i, major); }
  if (state.dots) {
    const at = state.edge === 'C' ? [1, 5, 9] : [2, 5, 8];
    at.forEach(m => at.forEach(e => {
      const x = (m - 0.5) * cell, y = (9.5 - e) * cell;
      ctx.beginPath(); ctx.arc(x, y, cell * 0.12, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = '#13343a'; ctx.stroke();
    }));
  }
  if (state.edge === 'B' && !state.smooth) {
    for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) if (colourAt(c + 1, 9 - r).clipped) {
      ctx.fillStyle = 'rgba(179,38,30,.9)'; const s = cell * 0.14; ctx.fillRect(c * cell + cell - s - 6, r * cell + 6, s, s);
    }
  }
}

// ---- readout
const ro = { sw: document.getElementById('gf-ro-sw'), pos: document.getElementById('gf-ro-pos'), hex: document.getElementById('gf-ro-hex'), clip: document.getElementById('gf-ro-clip'), w: document.getElementById('gf-ro-w') };
let probe = { m: 6, e: 4 };
const frac = w => { const n = Math.round(w * 144); return Math.abs(w) < 1e-9 ? null : (w * 144 % 1 === 0 || Math.abs(n - w * 144) < 1e-6 ? simplify(n, 144) : w.toFixed(3)); };
const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
const simplify = (n, d) => { const g = gcd(n, d); return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`; };
function readout() {
  const { m, e } = probe, res = colourAt(m, e);
  ro.sw.style.background = res.hex; ro.pos.textContent = `Mood ${m} · Energy ${e}`; ro.hex.textContent = res.hex;
  ro.clip.innerHTML = res.clipped ? '<span class="clip">clipped</span>' : '';
  const parts = res.pts.map(([a, b, w]) => { const f = frac(w); if (!f) return null; const [n, name] = NAMES[2 - a][b]; return `${n} ${name} ${f}`; }).filter(Boolean);
  ro.w.textContent = 'Blend: ' + parts.join(' · ');
  document.getElementById('gf-legend').textContent = clippedCount ? `Red corner mark: clipped to the screen\u2019s range (${clippedCount} of 81).` : '';
}
function pointTo(ev) {
  const r = fieldEl.getBoundingClientRect();
  const c = Math.min(8, Math.max(0, Math.floor((ev.clientX - r.left) / r.width * 9)));
  const row = Math.min(8, Math.max(0, Math.floor((ev.clientY - r.top) / r.height * 9)));
  probe = { m: c + 1, e: 9 - row }; readout();
}
fieldEl.addEventListener('pointermove', pointTo);
fieldEl.addEventListener('pointerdown', pointTo);

// ---- actions
const statusEl = document.getElementById('gf-status'), jsonEl = document.getElementById('gf-json');
const anchorsJson = () => JSON.stringify({ edges: state.edge, space: state.space, anchors: { high: state.anchors[0], normal: state.anchors[1], low: state.anchors[2] } }, null, 2);
document.getElementById('gf-copy').addEventListener('click', () => {
  const text = anchorsJson(); jsonEl.textContent = text; jsonEl.hidden = false;
  const done = () => { statusEl.textContent = 'Copied the nine anchors and options.'; };
  const fallback = () => { const range = document.createRange(); range.selectNodeContents(jsonEl); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(range); statusEl.textContent = 'Selected below: press Copy (⌘C / Ctrl+C).'; };
  try { navigator.clipboard.writeText(text).then(done, fallback); } catch (e) { fallback(); }
});
// Load: the JSON this page copies, or any nine #rrggbb colours in reading order.
document.getElementById('gf-load').addEventListener('click', () => {
  const text = document.getElementById('gf-load-text').value;
  let rows = null, opts = {};
  try {
    const j = JSON.parse(text); const a = j.anchors || j;
    if (a && a.high && a.normal && a.low) rows = [a.high, a.normal, a.low];
    else if (Array.isArray(a) && a.length === 3) rows = a;
    if (j.edges && 'ABC'.includes(j.edges)) opts.edge = j.edges;
    if (j.space === 'srgb' || j.space === 'oklab') opts.space = j.space;
  } catch (e) {
    const hexes = text.match(/#?[0-9a-fA-F]{6}\b/g) || [];
    if (hexes.length === 9) rows = [0, 1, 2].map(r => hexes.slice(r * 3, r * 3 + 3));
  }
  const norm = h => (h[0] === '#' ? h : '#' + h).toLowerCase();
  if (!rows || rows.length !== 3 || rows.some(r => !Array.isArray(r) || r.length !== 3 || r.some(h => !hexOk(norm(String(h)))))) {
    statusEl.textContent = 'Could not read nine colours. Paste the copied JSON, or nine hex colours like #1446ef.';
    return;
  }
  state.anchors = rows.map(r => r.map(h => norm(String(h))));
  Object.assign(state, opts); paintEdge(); paintSpace(); syncInputs();
  statusEl.textContent = 'Loaded the nine colours.'; changed();
});
document.getElementById('gf-reset').addEventListener('click', () => {
  state.anchors = DEFAULT.map(r => r.slice()); syncInputs(); jsonEl.hidden = true; statusEl.textContent = 'Back to the app’s nine colours.'; changed();
});

function changed() { document.getElementById('gf-edge-hint').textContent = HINTS[state.edge]; draw(); readout(); save(); }
syncInputs(); paintEdge(); paintSpace(); changed();
matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', draw);
new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
