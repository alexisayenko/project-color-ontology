// Flat RGB hue wheel (/?view=wheel): the cube's twelve named hues on a continuous
// hue ring, as SVG, ringed inward by the Highlight table's other columns, each of the 101 points at its
// hue's angle, and the five neutrals, which have none, stacked at the centre, white over black. It is laid
// out in the stage's own pixels on every resize, so the labels keep a readable size and the wheel shrinks
// to make room for them. Oriented as the cube seen from white down the grey axis: lime at the top, red at
// four o'clock, hue running anticlockwise.
import { rgbHex, hue, hueRgb, GRID, cell } from './colour.js';
import { WHEEL, LATTICE_NAMES, kind } from './palettes.js';
import { labelMode } from './names.js';
import { settings, cellTable } from './controls.js';
import { colourLabel } from './overlay-lattice.js';

export function initHueWheel() {
  var $ = function (id) { return document.getElementById(id); };
  var stage = $('wheel-stage');
  if (!stage) return;
  var TIER = { primaries: 'primary', secondaries: 'secondary', tertiaries: 'tertiary' };
  // rim to centre, light to dark: the tone of a tint has its light tone's HSL lightness and the tone of a
  // shade its dark tone's, at half their chroma, so each rings just inside its twin, toward the greyer tone
  var RINGS = ['pure', 'tint', 'light-tone', 'tone-of-tint', 'tone', 'tone-of-shade', 'dark-tone', 'shade'];
  var st = settings(stage.closest('.cube-lab'), 'colour-wheel-view');
  var table = cellTable('wheel', st, render);
  var shownMode = function () { return labelMode(function (m) { return $('wheel-lbl-' + m).checked; }); };
  var names = {};
  Object.keys(TIER).forEach(function (g) { WHEEL[g].forEach(function (c) { names[c[1]] = c[0]; }); });
  LATTICE_NAMES.forEach(function (c) { if (!names[c[1]]) names[c[1]] = c[0]; });

  var dots = [], greys = [], hues = {}, family = {};
  var note = function (c, hex) { return (names[hex] ? names[hex] + ' · ' : '') + kind(c); };
  GRID.forEach(function (c) {
    var k = cell(c), hex = rgbHex(c);
    if (k === 'neutrals') return greys.push({ rgb: c, hex: hex, cell: k, note: note(c, hex) });
    var r = k.split('-')[0], col = k.slice(r.length + 1);
    dots.push({ rgb: c, hex: hex, cell: k, ring: RINGS.indexOf(col), col: col, deg: Math.round(hue(c) / 30) * 30 % 360, tier: TIER[r] });
  });
  dots.forEach(function (d) { if (!d.ring) hues[d.deg] = d; });
  dots.forEach(function (d) {
    d.name = names[hues[d.deg].hex];
    d.note = note(d.rgb, d.hex);
    family[d.hex] = d.deg;
  });
  greys.forEach(function (g) { family[g.hex] = 'neutrals'; });
  var pures = Object.keys(hues).map(function (deg) { return hues[deg]; });
  greys.sort(function (a, b) { return b.rgb[0] - a.rgb[0]; });

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'wheel-svg');
  svg.setAttribute('aria-hidden', 'true');
  stage.insertBefore(svg, stage.firstChild);
  var measure = document.createElement('canvas').getContext('2d');
  var items = [], byHex = {}, geo = null, hover = null, focus = null;
  var n2 = function (v) { return Math.round(v * 100) / 100; };
  var circle = function (cls, x, y, r, extra) {
    return '<circle class="' + cls + '" cx="' + n2(x) + '" cy="' + n2(y) + '" r="' + n2(r) + '"' + (extra || '') + '/>';
  };

  function render() {
    var w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    var font = getComputedStyle(stage).fontFamily, mode = shownMode(), named = mode !== 'none';
    var fs = Math.max(10.5, Math.min(14, Math.min(w, h) / 44)), fc = fs * 0.88, lh = fs * 1.3, m = 10;
    measure.font = '500 ' + fs + 'px ' + font;
    var nameW = pures.map(function (u) { return measure.measureText(u.name).width; });
    measure.font = fc + 'px ' + font;
    var codeW = pures.map(function (u) { return named ? measure.measureText(colourLabel(u.hex, mode)).width : 0; });
    // each hue's label is its name over its code, nothing at all under None, and only its name once its
    // code would run into a neighbour's label: that code then shows on hover
    var lines = pures.map(function () { return named ? 2 : 0; });
    var cx = w / 2, cy = h / 2;
    var size = function (R) {
      var p = Math.max(7, R * 0.075);
      return { bw: Math.max(5, R * 0.055), p: p, s: Math.max(5.5, R * 0.058), t: Math.max(4, R * 0.042), halo: p + Math.max(4, R * 0.045) };
    };
    var at = function (deg, r) { var a = (deg - 30) * Math.PI / 180; return [cx + r * Math.cos(a), cy - r * Math.sin(a), Math.cos(a), Math.sin(a)]; };
    function box(u, i, R) {
      var q = at(u.deg, R + size(R).halo + 8), W = lines[i] > 1 ? Math.max(nameW[i], codeW[i]) : lines[i] ? nameW[i] : 0, H = lines[i] * lh;
      var x = q[2] > 0.35 ? [q[0], q[0] + W, 'start'] : q[2] < -0.35 ? [q[0] - W, q[0], 'end'] : [q[0] - W / 2, q[0] + W / 2, 'middle'];
      var y = q[3] > 0.35 ? q[1] - H : q[3] < -0.35 ? q[1] : q[1] - H / 2;
      return { l: x[0], r: x[1], anchor: x[2], x: q[0], t: y, b: y + H, up: q[3] > 0.35 };
    }
    function fit() {
      var lo = 12, hi = Math.min(w, h) / 2;
      for (var it = 0; it < 30; it++) {
        var mid = (lo + hi) / 2;
        var ok = pures.every(function (u, i) { var b = box(u, i, mid); return b.l >= m && b.r <= w - m && b.t >= m && b.b <= h - m; });
        if (ok) lo = mid; else hi = mid;
      }
      return lo;
    }
    var R = fit();
    for (;;) {
      var bs = pures.map(function (u, i) { return box(u, i, R); }), hits = bs.map(function () { return 0; }), worst = -1;
      bs.forEach(function (a, i) {
        bs.forEach(function (b, j) {
          if (j > i && lines[i] && lines[j] && a.l < b.r && b.l < a.r && a.t < b.b && b.t < a.b) { hits[i]++; hits[j]++; }
        });
      });
      hits.forEach(function (n, i) { if (n && lines[i] > 1 && (worst < 0 || n > hits[worst])) worst = i; });
      if (worst < 0) break;
      lines[worst] = 1;
      R = fit();
    }
    var z = size(R), out = [];
    // the mix rings run from just inside the primaries' halos in to just outside the neutrals' stack
    var rm = Math.max(2.2, R * 0.034), pitch = rm * 2.5, stack = 2 * pitch + rm;
    var rTint = R - z.halo - rm - Math.max(2, R * 0.03), rShade = Math.max(R * 0.3, stack + rm * 2.5);
    var radius = function (ring) { return ring ? rTint - (ring - 1) * (rTint - rShade) / (RINGS.length - 2) : R; };
    // a clicked dot keeps its family at full strength, its hue's spoke or the neutrals, and fades the rest
    var sel = table.selected(), full = function (u) { return focus ? family[u.hex] === family[focus] : !sel.length || sel.indexOf(u.cell) >= 0; };
    var dim = function (on) { return on ? '' : ' is-dim'; };
    geo = { cx: cx, cy: cy, R: R, bw: z.bw, fc: fc };
    items = [];
    byHex = {};
    var add = function (it) { items.push(it); byHex[it.hex] = it; };

    out.push('<g class="wheel-spokes">');
    pures.forEach(function (u) {
      var a = at(u.deg, stack + rm * 1.5), b = at(u.deg, R - z.bw);
      out.push('<line' + (focus && family[focus] === u.deg ? ' class="is-on"' : '') + ' x1="' + n2(a[0]) + '" y1="' + n2(a[1]) + '" x2="' + n2(b[0]) + '" y2="' + n2(b[1]) + '"/>');
    });
    out.push('</g>');

    // the hue ring as 360 one-degree wedges, each overlapping the next so no seams show
    out.push('<g class="wheel-ring' + dim(!focus && (!sel.length || pures.some(full))) + '">');
    for (var d = 0; d < 360; d++) {
      var a = at(d, R + z.bw), b = at(d + 1.6, R + z.bw), c = at(d + 1.6, R - z.bw), e = at(d, R - z.bw);
      out.push('<path fill="' + rgbHex(hueRgb(d + 0.5)) + '" d="M' + n2(a[0]) + ' ' + n2(a[1]) + 'A' + n2(R + z.bw) + ' ' + n2(R + z.bw) + ' 0 0 0 ' + n2(b[0]) + ' ' + n2(b[1]) +
        'L' + n2(c[0]) + ' ' + n2(c[1]) + 'A' + n2(R - z.bw) + ' ' + n2(R - z.bw) + ' 0 0 1 ' + n2(e[0]) + ' ' + n2(e[1]) + 'Z"/>');
    }
    out.push('</g>');

    out.push('<g class="wheel-mix">');
    dots.forEach(function (u) {
      if (!u.ring) return;
      var q = at(u.deg, radius(u.ring));
      out.push(circle('wheel-dot wheel-mixdot' + dim(full(u)), q[0], q[1], rm, ' data-cell="' + u.cell + '" fill="' + u.hex + '"'));
      add({ x: q[0], y: q[1], r: rm + 3, dot: rm, rgb: u.rgb, hex: u.hex, note: u.note, tag: { x: q[0], y: q[1] - rm - 5, anchor: 'middle' } });
    });
    greys.forEach(function (u, i) {
      var y = cy + (i - 2) * pitch;
      out.push(circle('wheel-dot wheel-mixdot' + dim(full(u)), cx, y, rm, ' data-cell="' + u.cell + '" fill="' + u.hex + '"'));
      add({ x: cx, y: y, r: Math.min(rm + 3, pitch / 2), dot: rm, rgb: u.rgb, hex: u.hex, note: u.note, tag: { x: cx + rm + 6, y: y + fc * 0.35, anchor: 'start' } });
    });
    out.push('</g>');

    out.push('<g class="wheel-hues">');
    pures.forEach(function (u, i) {
      var q = at(u.deg, R), r = u.tier === 'primary' ? z.p : u.tier === 'secondary' ? z.s : z.t;
      out.push('<g class="wheel-hue' + dim(full(u)) + '">');
      if (u.tier === 'primary') out.push(circle('wheel-halo', q[0], q[1], z.halo));
      out.push(circle('wheel-dot wheel-' + u.tier, q[0], q[1], r, ' data-cell="' + u.cell + '" fill="' + u.hex + '"') + '</g>');
      var bx = box(u, i, R), tag = null;
      if (lines[i] === 1) tag = { x: bx.x, y: bx.up ? Math.max(fc, bx.t - lh * 0.22) : bx.t + lh * 1.75, anchor: bx.anchor };
      add({ x: q[0], y: q[1], r: (u.tier === 'primary' ? z.halo : r) + 3, dot: r, rgb: u.rgb, hex: u.hex, note: u.note, tag: tag });
      if (!lines[i]) return;
      out.push('<text class="wheel-name" x="' + n2(bx.x) + '" y="' + n2(bx.t + lh * 0.78) + '" text-anchor="' + bx.anchor + '" font-size="' + n2(fs) + '">' + u.name + '</text>');
      if (lines[i] > 1) out.push('<text class="wheel-code" x="' + n2(bx.x) + '" y="' + n2(bx.t + lh * 1.75) + '" text-anchor="' + bx.anchor + '" font-size="' + n2(fc) + '">' + colourLabel(u.hex, mode) + '</text>');
    });
    out.push('</g><g class="wheel-marks"></g>');

    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.innerHTML = out.join('');
    marks();
  }

  // the inner rings, the neutrals and a hue whose code had no room are labelled only while hovered, or once
  // clicked until clicked again
  function marks() {
    var g = svg.querySelector('.wheel-marks');
    if (!g) return;
    var mode = shownMode(), out = [];
    [focus, hover].forEach(function (hex, i) {
      var it = hex && byHex[hex];
      if (!it || (i && hex === focus)) return;
      if (!i) out.push(circle('wheel-focus', it.x, it.y, it.dot + 2.5));
      var text = it.tag && colourLabel(hex, mode);
      if (!text) return;
      out.push('<text class="wheel-tag" x="' + n2(it.tag.x) + '" y="' + n2(it.tag.y) + '" text-anchor="' + it.tag.anchor + '" font-size="' + n2(geo.fc) + '">' + text + '</text>');
    });
    g.innerHTML = out.join('');
  }

  function find(e) {
    var r = stage.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, hit = null, best = Infinity;
    items.forEach(function (it) { var d = Math.hypot(x - it.x, y - it.y); if (d <= it.r && d < best) { best = d; hit = it; } });
    if (!hit && geo && Math.abs(Math.hypot(x - geo.cx, y - geo.cy) - geo.R) <= geo.bw) {
      var deg = (Math.atan2(geo.cy - y, x - geo.cx) * 180 / Math.PI + 30 + 360) % 360;
      hit = { rgb: hueRgb(deg), note: 'hue ' + Math.round(deg) % 360 + '°' };
    }
    return hit;
  }
  // the hint names the colour under the pointer, else the clicked one
  function tip(e) {
    var hit = e && find(e), next = hit && hit.hex ? hit.hex : null;
    stage.style.cursor = next ? 'pointer' : '';
    if (next !== hover) { hover = next; marks(); }
    hit = hit || (focus && byHex[focus]);
    if (!hit) { $('wheel-tip').hidden = true; return; }
    var hex = rgbHex(hit.rgb);
    $('wheel-tip-sw').style.background = hex;
    $('wheel-tip-hex').textContent = hex;
    $('wheel-tip-rgb').textContent = 'R ' + hit.rgb[0] + ' · G ' + hit.rgb[1] + ' · B ' + hit.rgb[2] + ' · ' + hit.note;
    $('wheel-tip').hidden = false;
  }
  stage.addEventListener('pointermove', tip);
  stage.addEventListener('pointerdown', tip);
  stage.addEventListener('click', function (e) {
    var hit = find(e);
    focus = hit && hit.hex && hit.hex !== focus ? hit.hex : null;
    render();
    tip(e);
  });
  stage.addEventListener('pointerleave', function () { tip(null); });

  st.watch(render);
  new ResizeObserver(render).observe(stage);
  render();
}
