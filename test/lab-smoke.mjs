// Smoke test for / against a built site: page state only, never pixels.
//   npx @11ty/eleventy --output=/tmp/site && SITE_DIR=/tmp/site npm test
// SITE_DIR defaults to _site. CHROMIUM_PATH overrides the browser; otherwise Playwright's
// own build is tried, then the newest Chromium in the Playwright cache, else the suite skips.
import { describe, test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.resolve(ROOT, process.env.SITE_DIR || '_site');
const PAGE = '/';
const ARGS = ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'];

// Each view's id prefix, the persisted controls the tests flip away from their defaults, and a control
// that two clicks leave as it was.
const VIEWS = {
  rgb: { p: 'cube', flip: ['spin', 'lat-shade', 'lbl-css', 'click-family'], slide: ['n', '5'], cells: true, toggle: 'label:has(> #cube-spin)' },
  oklch: { p: 'ok', flip: ['axes', 'lat-hide', 'lbl-munsell'], slide: ['n', '7'], cells: true, toggle: 'label:has(> #ok-axes)' },
  wheel: { p: 'wheel', flip: ['lbl-iscc'], cells: true, toggle: '#wheel-g-neutrals' },
};

// Each view's localStorage key and a value as the hand-listed settings code saved it, every control off its default.
const SAVED = {
  rgb: ['rgb-cube-view', { n: '5', gap: '0.5', op: '0.6', 'cr-lo': '64', 'cr-hi': '200', 'cg-lo': '0', 'cg-hi': '255', 'cb-lo': '30', 'cb-hi': '128',
    spin: false, axes: false, cubes: false, field: true, capsule: true, 'lat-show': false, 'lat-shade': true, 'lat-hide': false,
    'lbl-none': false, 'lbl-hex': false, 'lbl-css': false, 'lbl-munsell': true, 'lbl-iscc': false, cutNone: true, openClouds: [], cells: ['neutrals', 'primaries-pure'] }],
  oklch: ['oklch-view', { n: '7', size: '1.5', op: '0.4', 'l-lo': '20', 'l-hi': '90', 'c-lo': '0.05', 'c-hi': '0.25', 'h-lo': '40', 'h-hi': '300',
    spin: false, axes: false, samples: false, field: true, capsule: true, 'lat-show': false, 'lat-shade': false, 'lat-hide': true,
    'lbl-none': false, 'lbl-hex': false, 'lbl-css': true, 'lbl-munsell': false, 'lbl-iscc': false, cutNone: false, openClouds: [], cells: ['secondaries-tint'] }],
  wheel: ['colour-wheel-view', { 'lbl-none': false, 'lbl-hex': false, 'lbl-css': false, 'lbl-munsell': false, 'lbl-iscc': true, cutNone: false, openClouds: [], cells: ['neutrals', 'tertiaries-shade'] }],
};
// Controls added since, which saving back writes at their defaults.
const ADDED = { rgb: { 'click-lines': true, 'click-family': false, 'lbl-hwb': false }, oklch: { 'click-lines': true, 'click-family': false, 'lbl-hwb': false }, wheel: { 'lbl-hwb': false } };

function cachedChromiums() {
  const home = os.homedir();
  const roots = [process.env.PLAYWRIGHT_BROWSERS_PATH,
    path.join(home, 'Library/Caches/ms-playwright'), path.join(home, '.cache/ms-playwright'),
    process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'ms-playwright')].filter(Boolean);
  const exes = ['chrome-headless-shell', 'chrome-headless-shell.exe', 'chrome', 'chrome.exe',
    'Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', 'Chromium.app/Contents/MacOS/Chromium'];
  const found = [];
  for (const root of roots) {
    if (!fs.existsSync(root)) continue;
    for (const d of fs.readdirSync(root)) {
      const m = /^chromium(_headless_shell)?-(\d+)$/.exec(d);
      if (!m) continue;
      for (const sub of fs.readdirSync(path.join(root, d))) {
        const exe = exes.map((e) => path.join(root, d, sub, e)).find((f) => fs.existsSync(f) && fs.statSync(f).isFile());
        if (exe) found.push({ exe, rank: +m[2] * 2 + (m[1] ? 1 : 0) });
      }
    }
  }
  return found.sort((a, b) => b.rank - a.rank).map((f) => f.exe);
}

async function launch() {
  if (process.env.CHROMIUM_PATH) return chromium.launch({ executablePath: process.env.CHROMIUM_PATH, args: ARGS });
  try { return await chromium.launch({ args: ARGS }); } catch (e) {
    const exe = cachedChromiums()[0];
    if (!exe) throw new Error('no Chromium found: run "npx playwright install chromium-headless-shell" or set CHROMIUM_PATH');
    return chromium.launch({ executablePath: exe, args: ARGS });
  }
}

function serve(dir) {
  const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
    '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };
  const server = http.createServer((req, res) => {
    let f = path.join(dir, path.normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)));
    if (f.startsWith(dir) && fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
    if (!f.startsWith(dir) || !fs.existsSync(f)) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  });
  return new Promise((r) => server.listen(0, '127.0.0.1', () => r(server)));
}

let skip = false, browser, server, base;
if (!fs.existsSync(path.join(SITE, PAGE, 'index.html'))) skip = `no built ${PAGE} in ${SITE}: build first or set SITE_DIR`;
else {
  try { browser = await launch(); } catch (e) { skip = e.message.split('\n')[0]; }
}

// A fresh context (empty localStorage) at ?view=, running init before the page's own scripts; every
// console error and page error is collected.
async function open(t, view, init) {
  const ctx = await browser.newContext({ viewport: { width: 480, height: 800 } });
  t.after(() => ctx.close());
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  if (init) await page.addInitScript(init);
  await goto(page, base + PAGE + '?view=' + view);
  return { page, errors };
}

async function goto(page, url) {
  if (url) await page.goto(url, { waitUntil: 'load' }); else await page.reload({ waitUntil: 'load' });
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
}

// Every checkbox, radio and slider of a view's pane, plus its pressed Highlight cells.
const state = (page, view) => page.evaluate((v) => {
  const pane = document.querySelector('.cube-lab[data-view="' + v + '"]'), s = {};
  pane.querySelectorAll('input[id]').forEach((i) => { s[i.id] = i.type === 'range' ? i.value : i.checked; });
  s.cells = [...pane.querySelectorAll('.cube-groups [data-cell][aria-pressed="true"]')].map((b) => b.dataset.cell).sort();
  return s;
}, view);

const shown = (page) => page.evaluate(() => ({
  panes: [...document.querySelectorAll('.cube-lab')].filter((p) => !p.hidden).map((p) => p.dataset.view),
  url: new URL(location.href).searchParams.get('view'),
}));

async function change(page, view) {
  const { p, flip, slide, cells } = VIEWS[view];
  for (const k of flip) await page.locator(`label:has(> #${p}-${k})`).click();
  if (slide) await page.locator(`#${p}-${slide[0]}`).fill(slide[1]);
  if (cells) await page.locator(`#${p}-groups [data-cell]:not([disabled])`).first().click();
}

// In-page links whose target is missing or not rendered once the scripts have run, with the view whose pane holds it.
const brokenAnchors = (page) => page.evaluate(() => [...document.querySelectorAll('a[href^="#"]')].flatMap((a) => {
  const id = decodeURIComponent(a.getAttribute('href').slice(1));
  if (!id) return [];
  const el = document.getElementById(id);
  const why = !el ? 'missing' : !el.checkVisibility() ? 'hidden' : '';
  return why ? [{ href: '#' + id, why, pane: el?.closest('.cube-lab')?.dataset.view ?? null }] : [];
}));

// Clicks every in-page link into a view's pane, each time from `view`, and lists those that leave
// their target unrendered, the wrong pane up or the hash elsewhere.
const unfollowed = (page, view) => page.evaluate((view) => [...document.querySelectorAll('a[href^="#"]')].flatMap((a) => {
  const href = a.getAttribute('href'), el = document.getElementById(href.slice(1)), pane = el?.closest('.cube-lab');
  if (!pane) return [];
  document.querySelector(`.cube-lab:not([hidden]) .solid-switch button[data-view="${view}"]`).click();
  a.click();
  const up = [...document.querySelectorAll('.cube-lab')].filter((p) => !p.hidden).map((p) => p.dataset.view).join();
  return el.checkVisibility() && up === pane.dataset.view && location.hash === href ? [] : [href];
}), view);

describe('lab colour-solid smoke', { skip, concurrency: 3 }, () => {
  before(async () => {
    server = await serve(SITE);
    base = 'http://127.0.0.1:' + server.address().port;
  });
  after(async () => { await browser?.close(); server?.close(); });

  for (const view of Object.keys(VIEWS)) {
    test(`${view}: loads clean`, async (t) => {
      const { page, errors } = await open(t, view);
      assert.deepEqual(await shown(page), { panes: [view], url: view });
      assert.deepEqual(errors, []);
    });

    test(`${view}: settings survive reload`, async (t) => {
      const { page, errors } = await open(t, view);
      const before = await state(page, view);
      await change(page, view);
      const changed = await state(page, view);
      assert.notDeepEqual(changed, before);
      await goto(page);
      assert.deepEqual(await state(page, view), changed);
      assert.deepEqual(errors, []);
    });

    test(`${view}: restores settings saved before data-persist, and saves them back alike`, async (t) => {
      const { page, errors } = await open(t, view);
      const [key, saved] = SAVED[view], { p, toggle } = VIEWS[view];
      await page.evaluate(([k, v]) => localStorage.setItem(k, JSON.stringify(v)), [key, saved]);
      await goto(page);
      const s = await state(page, view);
      for (const [k, v] of Object.entries(saved)) if (!['cutNone', 'openClouds', 'cells'].includes(k)) assert.equal(s[`${p}-${k}`], v, k);
      assert.deepEqual(s.cells, [...(saved.cells || [])].sort());
      for (let i = 0; i < 2; i++) await page.locator(toggle).click();
      assert.deepEqual(await page.evaluate((k) => JSON.parse(localStorage.getItem(k)), key), { ...saved, ...ADDED[view] });
      assert.deepEqual(errors, []);
    });

    for (const to of Object.keys(VIEWS).filter((v) => v !== view)) {
      test(`${view} → ${to}: switching carries shared settings`, async (t) => {
        const { page, errors } = await open(t, view);
        await change(page, view);
        await page.locator(`.cube-lab[data-view="${view}"] .solid-switch button[data-view="${to}"]`).click();
        assert.deepEqual(await shown(page), { panes: [to], url: to });
        const a = await state(page, view), b = await state(page, to), pa = VIEWS[view].p + '-', pb = VIEWS[to].p + '-';
        const shared = Object.keys(a).filter((k) => k.startsWith(pa) && typeof a[k] === 'boolean' && (pb + k.slice(pa.length)) in b);
        assert.ok(shared.some((k) => a[k] && VIEWS[view].flip.includes(k.slice(pa.length))), 'a flipped control is shared');
        for (const k of shared) assert.equal(b[pb + k.slice(pa.length)], a[k], `${k} carried`);
        if (VIEWS[view].cells && VIEWS[to].cells) assert.deepEqual(b.cells, a.cells);
        const carried = await state(page, to);
        await goto(page);
        assert.deepEqual(await shown(page), { panes: [to], url: to });
        assert.deepEqual(await state(page, to), carried, 'carried settings are saved');
        assert.deepEqual(errors, []);
      });
    }

    test(`${view}: in-page anchors resolve`, async (t) => {
      const { page, errors } = await open(t, view);
      const broken = await brokenAnchors(page);
      assert.deepEqual(broken.filter((b) => !(b.why === 'hidden' && b.pane && b.pane !== view)), []);
      await t.test('glossary "see" links into the cube pane', async () => assert.deepEqual(await unfollowed(page, view), []));
      assert.deepEqual(errors, []);
    });
  }

  test('oklch: a cut saved as one slider restores as its high end', async (t) => {
    const { page, errors } = await open(t, 'oklch');
    await page.evaluate(() => localStorage.setItem('oklch-view', JSON.stringify({ l: '60' })));
    await goto(page);
    const s = await state(page, 'oklch');
    assert.deepEqual([s['ok-l-lo'], s['ok-l-hi']], ['0', '60']);
    assert.deepEqual(errors, []);
  });

  // The Highlight table's group and column headings, in order, and how pressed each heading is.
  const headings = (page, p) => page.evaluate((p) => {
    const rows = document.querySelectorAll('#' + p + '-groups thead tr'), id = (b) => b.id.slice((p + '-g-').length);
    const ids = (tr) => [...tr.querySelectorAll('th button')].map(id);
    const pressed = (tr) => Object.fromEntries([...tr.querySelectorAll('th button')].map((b) => [id(b), b.getAttribute('aria-pressed')]));
    const spans = [...rows[0].querySelectorAll('th')].map((th) => th.colSpan);
    return { groups: ids(rows[0]), spans, cols: ids(rows[1]), pressed: { ...pressed(rows[0]), ...pressed(rows[1]) } };
  }, p);

  test('rgb: cells saved before the grouped columns restore in the same cells', async (t) => {
    const { page, errors } = await open(t, 'rgb');
    const cells = ['neutrals', 'primaries-tone', 'secondaries-tint', 'tertiaries-shade'];
    await page.evaluate((c) => localStorage.setItem('rgb-cube-view', JSON.stringify({ cells: c })), cells);
    await goto(page);
    assert.deepEqual((await state(page, 'rgb')).cells, cells);
    const h = await headings(page, 'cube');
    const at = await page.evaluate((head) => ['primaries-tone', 'secondaries-tint', 'tertiaries-shade']
      .map((k) => head[document.getElementById('cube-g-' + k).closest('td').cellIndex - 1]), h.cols);
    assert.deepEqual([h.groups, h.spans], [['group-pure', 'group-tint', 'group-shade'], [4, 2, 2]]);
    assert.deepEqual(h.cols, ['pure', 'light-tone', 'tone', 'dark-tone', 'tint', 'tone-of-tint', 'shade', 'tone-of-shade']);
    assert.deepEqual(at, ['tone', 'tint', 'shade']);
    assert.deepEqual(h.pressed, { 'group-pure': 'mixed', 'group-tint': 'mixed', 'group-shade': 'mixed', pure: 'false', 'light-tone': 'false', tone: 'mixed',
      'dark-tone': 'false', tint: 'mixed', 'tone-of-tint': 'false', shade: 'mixed', 'tone-of-shade': 'false' });
    assert.deepEqual(errors, []);
  });

  for (const [view, p] of [['rgb', 'cube'], ['oklch', 'ok'], ['wheel', 'wheel']]) {
    test(`${view}: a group heading toggles all its columns, and the tones of tints and shades persist and carry`, async (t) => {
      const { page, errors } = await open(t, view);
      await page.locator(`#${p}-g-group-tint`).click();
      const TINT = ['primaries-tint', 'primaries-tone-of-tint', 'secondaries-tint', 'secondaries-tone-of-tint', 'tertiaries-tint', 'tertiaries-tone-of-tint'];
      assert.deepEqual((await state(page, view)).cells, TINT);
      let h = await headings(page, p);
      assert.deepEqual([h.pressed['group-tint'], h.pressed.tint, h.pressed['tone-of-tint'], h.pressed['group-shade']], ['true', 'true', 'true', 'false']);
      await page.locator(`#${p}-g-tint`).click();
      await page.locator(`#${p}-g-tertiaries-tone-of-shade`).click();
      const kept = ['primaries-tone-of-tint', 'secondaries-tone-of-tint', 'tertiaries-tone-of-shade', 'tertiaries-tone-of-tint'];
      assert.deepEqual((await state(page, view)).cells, kept);
      h = await headings(page, p);
      assert.deepEqual([h.pressed['group-tint'], h.pressed['group-shade'], h.pressed['tone-of-shade']], ['mixed', 'mixed', 'mixed']);
      await goto(page);
      assert.deepEqual((await state(page, view)).cells, kept);
      const to = view === 'wheel' ? 'rgb' : 'wheel';
      await page.locator(`.cube-lab[data-view="${view}"] .solid-switch button[data-view="${to}"]`).click();
      assert.deepEqual((await state(page, to)).cells, kept);
      await page.locator(`.cube-lab[data-view="${to}"] .solid-switch button[data-view="${view}"]`).click();
      await page.locator(`#${p}-g-group-tint`).click();
      await page.locator(`#${p}-g-group-tint`).click();
      assert.deepEqual((await state(page, view)).cells, ['tertiaries-tone-of-shade']);
      assert.deepEqual(errors, []);
    });
  }

  // The wheel's dots by cell, each with whether it is drawn faded.
  const wheelDots = (page) => page.evaluate(() => [...document.querySelectorAll('#wheel-stage [data-cell]')]
    .map((d) => ({ cell: d.dataset.cell, dim: !!d.closest('.is-dim') })));

  test('wheel: eight rings of twelve and five neutrals, the Highlight table picking those at full strength', async (t) => {
    const { page, errors } = await open(t, 'wheel');
    const dots = await wheelDots(page);
    const count = (f) => dots.filter(f).length;
    assert.equal(dots.length, 101);
    const RINGS = ['pure', 'tint', 'light-tone', 'tone-of-tint', 'tone', 'tone-of-shade', 'dark-tone', 'shade'];
    for (const col of RINGS) assert.equal(count((d) => d.cell.split('-').slice(1).join('-') === col), 12, col);
    const radii = await page.evaluate((rings) => {
      const s = document.querySelector('#wheel-stage svg').viewBox.baseVal, cx = s.width / 2, cy = s.height / 2;
      return rings.map((col) => {
        const d = document.querySelector(`#wheel-stage [data-cell="primaries-${col}"][fill]`);
        return Math.round(Math.hypot(d.cx.baseVal.value - cx, d.cy.baseVal.value - cy));
      });
    }, RINGS);
    assert.deepEqual(radii.slice().sort((a, b) => b - a), radii, 'rings run rim to centre: ' + radii);
    assert.equal(new Set(radii).size, 8);
    assert.equal(count((d) => d.cell === 'neutrals'), 5);
    assert.equal(count((d) => d.dim), 0, 'nothing chosen shows every ring');
    await page.locator('#wheel-g-tint').click();
    let now = await wheelDots(page);
    assert.deepEqual(now.filter((d) => !d.dim).map((d) => d.cell.split('-').slice(1).join('-')), Array(12).fill('tint'));
    assert.ok(await page.evaluate(() => !!document.querySelector('#wheel-stage .wheel-ring.is-dim')), 'the hue ring fades');
    await page.locator('#wheel-g-neutrals').click();
    now = await wheelDots(page);
    assert.equal(now.filter((d) => !d.dim).length, 17);
    await page.locator('#wheel-g-tint').click();
    await page.locator('#wheel-g-neutrals').click();
    assert.equal((await wheelDots(page)).filter((d) => d.dim).length, 0);
    assert.deepEqual(errors, []);
  });

  test('wheel: settings saved with Tints and shades and no None restore, and save back without the one and with the other', async (t) => {
    const { page, errors } = await open(t, 'wheel');
    const old = { mix: true, 'lbl-hex': false, 'lbl-css': true, 'lbl-munsell': false, 'lbl-iscc': false, cutNone: false, openClouds: [] };
    await page.evaluate((v) => localStorage.setItem('colour-wheel-view', JSON.stringify(v)), old);
    await goto(page);
    const s = await state(page, 'wheel');
    assert.equal(s['wheel-lbl-css'], true);
    assert.equal(s['wheel-lbl-none'], false);
    await page.locator('#wheel-g-neutrals').click();
    const { mix, ...rest } = old;
    assert.deepEqual(await page.evaluate(() => JSON.parse(localStorage.getItem('colour-wheel-view'))), { ...rest, 'lbl-none': false, 'lbl-hwb': false, cells: ['neutrals'] });
    assert.deepEqual(errors, []);
  });

  test('wheel: Colour names None drops every colour name, and hovering still gives the tooltip', async (t) => {
    const { page, errors } = await open(t, 'wheel');
    const look = async () => {
      await page.locator('#wheel-stage').scrollIntoViewIfNeeded();
      const box = await page.locator('#wheel-stage [data-cell="primaries-tone"][fill="#c04040"]').boundingBox();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      return page.evaluate(() => ({
        names: document.querySelectorAll('#wheel-stage .wheel-name').length,
        codes: document.querySelectorAll('#wheel-stage .wheel-code').length,
        tags: [...document.querySelectorAll('#wheel-stage .wheel-tag')].map((e) => e.textContent),
        tip: !document.getElementById('wheel-tip').hidden && document.getElementById('wheel-tip-hex').textContent,
      }));
    };
    assert.deepEqual(await look(), { names: 12, codes: 12, tags: ['#c04040'], tip: '#c04040' });
    await page.locator('label:has(> #wheel-lbl-none)').click();
    assert.deepEqual(await look(), { names: 0, codes: 0, tags: [], tip: '#c04040' });
    assert.deepEqual(errors, []);
  });

  test('rgb, oklch: Colour names None draws no colour name', async (t) => {
    const ctx = await browser.newContext({ viewport: { width: 480, height: 800 } });
    t.after(() => ctx.close());
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
    await page.addInitScript(() => {
      window.drawn = [];
      const fill = CanvasRenderingContext2D.prototype.fillText;
      CanvasRenderingContext2D.prototype.fillText = function (text, ...rest) { window.drawn.push(String(text)); return fill.call(this, text, ...rest); };
    });
    const hexes = () => page.evaluate(() => window.drawn.filter((s) => /^#[0-9a-f]{6}$/.test(s)).length);
    await goto(page, base + PAGE + '?view=rgb');
    assert.ok(await hexes() > 0, 'Hex draws hex names');
    await page.locator('label:has(> #cube-lbl-none)').click();
    await page.locator('.cube-lab[data-view="rgb"] .solid-switch button[data-view="oklch"]').click();
    await goto(page);
    assert.deepEqual(await page.evaluate(() => ['cube', 'ok'].map((p) => document.getElementById(p + '-lbl-none').checked)), [true, true]);
    assert.equal(await hexes(), 0);
    assert.deepEqual(errors, []);
  });

  test('wheel: at 375px no two labels round the rim overlap under ISCC–NBS, a code with no room showing on hover', async (t) => {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
    t.after(() => ctx.close());
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
    await goto(page, base + PAGE + '?view=wheel');
    await page.locator('label:has(> #wheel-lbl-iscc)').click();
    const rim = await page.evaluate(() => {
      const boxes = [...document.querySelectorAll('#wheel-stage .wheel-name, #wheel-stage .wheel-code')].map((e) => ({ s: e.textContent, b: e.getBBox() }));
      const over = boxes.flatMap((a, i) => boxes.slice(i + 1).filter(({ b }) => a.b.x < b.x + b.width && b.x < a.b.x + a.b.width && a.b.y < b.y + b.height && b.y < a.b.y + a.b.height)
        .map((b) => a.s + ' × ' + b.s));
      const bare = [...document.querySelectorAll('#wheel-stage .wheel-name')].filter((n) => !n.nextElementSibling?.classList.contains('wheel-code'))
        .map((n) => n.previousElementSibling.querySelector('[data-cell]').getAttribute('fill'));
      return { names: boxes.filter((b) => !/\d/.test(b.s)).length, over, bare };
    });
    assert.deepEqual(rim.over, []);
    for (const hex of rim.bare) {
      await page.locator('#wheel-stage').scrollIntoViewIfNeeded();
      const box = await page.locator(`#wheel-stage [data-cell$="-pure"][fill="${hex}"]`).boundingBox();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      const tags = await page.evaluate(() => [...document.querySelectorAll('#wheel-stage .wheel-tag')].map((e) => e.textContent));
      assert.equal(tags.length, 1, hex);
      assert.ok(tags[0] && tags[0] !== hex, hex);
    }
    assert.deepEqual(errors, []);
  });

  test('wheel: clicking a dot keeps its family, its spoke or the neutrals, and pins its hint until cleared', async (t) => {
    const { page, errors } = await open(t, 'wheel');
    await page.locator('#wheel-stage').scrollIntoViewIfNeeded();
    const corner = async () => { const b = await page.locator('#wheel-stage').boundingBox(); return [b.x + 4, b.y + 4]; };
    const click = async (hex) => {
      const box = await page.locator(`#wheel-stage [data-cell][fill="${hex}"]`).boundingBox();
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.move(...(await corner()));
    };
    const now = () => page.evaluate(() => ({
      lit: [...document.querySelectorAll('#wheel-stage [data-cell]')].filter((d) => !d.closest('.is-dim')).map((d) => d.getAttribute('fill')).sort(),
      spokes: document.querySelectorAll('#wheel-stage .wheel-spokes .is-on').length,
      tip: !document.getElementById('wheel-tip').hidden && document.getElementById('wheel-tip-hex').textContent + ' · ' + document.getElementById('wheel-tip-rgb').textContent.split(' · ').slice(3).join(' · '),
    }));
    await click('#c04040');
    assert.deepEqual(await now(), { lit: ['#800000', '#804040', '#a02020', '#c04040', '#c08080', '#e06060', '#ff0000', '#ff8080'], spokes: 1, tip: '#c04040 · brick red · Primary · tone (red + #808080)' });
    await click('#404080');
    assert.deepEqual(await now(), { lit: ['#000080', '#0000ff', '#2020a0', '#404080', '#4040c0', '#6060e0', '#8080c0', '#8080ff'], spokes: 1, tip: '#404080 · Primary · tone of shade (navy + #808080)' });
    await click('#8080c0');
    assert.deepEqual((await now()).tip, '#8080c0 · Primary · tone of tint (light blue + #808080)');
    await click('#ff0000');
    assert.deepEqual((await now()).tip, '#ff0000 · red · Primary · pure hue');
    await click('#808080');
    assert.deepEqual(await now(), { lit: ['#000000', '#404040', '#808080', '#c0c0c0', '#ffffff'], spokes: 0, tip: '#808080 · mid grey · Neutral' });
    await click('#808080');
    const cleared = await now();
    assert.deepEqual([cleared.lit.length, cleared.spokes, cleared.tip], [101, 0, false]);
    assert.deepEqual(errors, []);
  });

  // The 3D views' renderers, so a test can read back the scene each last drew.
  const watchRenderers = () => {
    let three;
    window.renderers = [];
    Object.defineProperty(window, 'THREE', {
      configurable: true,
      set(v) { three = v; },
      get() {
        if (three && three.WebGLRenderer && !three.watched) {
          const Base = three.WebGLRenderer;
          three.watched = true;
          three.WebGLRenderer = function (o) {
            const r = new Base(o), draw = r.render;
            r.render = function (scene, camera) { r.scene = scene; return draw.call(this, scene, camera); };
            window.renderers.push(r);
            return r;
          };
        }
        return three;
      },
    });
  };
  // Where each of the given lattice points is picked on a view's stage, found by sweeping the pointer across it.
  const locate = (page, p, hexes) => page.evaluate(([p, hexes]) => {
    const stage = document.getElementById(p + '-stage'), r = stage.getBoundingClientRect(), seen = {};
    const tip = document.getElementById(p + '-tip'), hex = document.getElementById(p + '-tip-hex');
    for (let y = r.top + 2; y < r.bottom - 2; y += 3) for (let x = r.left + 2; x < r.right - 2; x += 3) {
      stage.dispatchEvent(new PointerEvent('pointermove', { clientX: x, clientY: y, pointerId: 9 }));
      if (!tip.hidden && hexes.includes(hex.textContent)) (seen[hex.textContent] ||= []).push([x, y]);
    }
    stage.dispatchEvent(new PointerEvent('pointerleave'));
    return Object.fromEntries(Object.entries(seen).map(([h, at]) => {
      const c = [0, 1].map((k) => at.reduce((s, q) => s + q[k], 0) / at.length);
      return [h, at.reduce((a, q) => Math.hypot(q[0] - c[0], q[1] - c[1]) < Math.hypot(a[0] - c[0], a[1] - c[1]) ? q : a)];
    }));
  }, [p, hexes]);
  // The lattice points a view keeps at full strength, the kept lines it draws, and its hint.
  const focused = (page, view, p) => page.evaluate(([view, p]) => {
    const scene = window.renderers.find((r) => r.domElement.closest('.cube-lab').dataset.view === view).scene;
    const kept = (o) => { for (; o; o = o.parent) if (o.userData.keep) return true; return false; };
    const points = [];
    let lines = 0;
    scene.traverseVisible((o) => {
      if (o.isMesh && o.userData.ring && o.userData.keep) points.push('#' + o.userData.rgb.map((v) => v.toString(16).padStart(2, '0')).join(''));
      if (o.isLineSegments && kept(o)) lines++;
    });
    const tip = !document.getElementById(p + '-tip').hidden && document.getElementById(p + '-tip-rgb').textContent;
    return { points: points.sort(), lines, tip: tip && tip.split(' · ').slice(3).join(' · ') };
  }, [view, p]);

  for (const [view, p, samples] of [['rgb', 'cube', 'cubes'], ['oklch', 'ok', 'samples']]) {
    test(`${view}: clicking a point keeps its grid lines or its hue family, and pins its hint until cleared`, async (t) => {
      const { page, errors } = await open(t, view, watchRenderers);
      await page.locator(`label:has(> #${p}-spin)`).click();
      await page.locator(`label:has(> #${p}-${samples})`).click();
      await page.locator(`#${p}-stage`).scrollIntoViewIfNeeded();
      await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
      const at = await locate(page, p, ['#ff0000', '#800000', '#808080']);
      assert.deepEqual(Object.keys(at).sort(), ['#800000', '#808080', '#ff0000']);
      const b = await page.locator(`#${p}-stage`).boundingBox();
      const click = async (hex) => {
        await page.mouse.click(...(hex ? at[hex] : [b.x + 4, b.y + 4]));
        await page.mouse.move(b.x + 4, b.y + 4);
        await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
        return focused(page, view, p);
      };
      const RED = ['#000000', '#404040', '#800000', '#804040', '#808080', '#a02020', '#c04040', '#c08080', '#c0c0c0', '#e06060', '#ff0000', '#ff8080', '#ffffff'];
      const GREYS = ['#000000', '#404040', '#808080', '#c0c0c0', '#ffffff'];
      const lines = await click('#ff0000');
      assert.deepEqual([lines.points, lines.tip], [['#000000', '#800000', '#ff0000', '#ff0080', '#ff00ff', '#ff8000', '#ffff00'], 'red · Primary · pure hue']);
      assert.deepEqual(await click(), { points: [], lines: 0, tip: false });
      await page.locator(`label:has(> #${p}-click-family)`).click();
      assert.deepEqual(await click('#ff0000'), { points: RED, lines: 7, tip: 'red · Primary · pure hue' });
      assert.deepEqual(await click('#800000'), { points: RED, lines: 7, tip: 'maroon · Primary · shade (red + black)' });
      assert.deepEqual(await click('#808080'), { points: GREYS, lines: 2, tip: 'mid grey · Neutral' });
      assert.deepEqual(await click('#808080'), { points: [], lines: 0, tip: false });
      assert.deepEqual(errors, []);
    });
  }

  // The lines the lattice keeps drawn: each kept line group's ends as hex pairs, and its colour as an sRGB hex.
  const keptLines = (page, view) => page.evaluate((view) => {
    const scene = window.renderers.find((r) => r.domElement.closest('.cube-lab').dataset.view === view).scene;
    const hex = (c) => '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('');
    const out = [];
    scene.traverseVisible((o) => {
      if (!o.userData.keep || !o.userData.ends) return;
      const ink = o.children.find((l) => l.isLineSegments).material.color.clone().convertLinearToSRGB();
      o.userData.ends.forEach((ab) => out.push(ab.map(hex).join('-') + ' ' + ink.getHexString()));
    });
    return out.sort();
  }, view);

  for (const [view, p, samples] of [['rgb', 'cube', 'cubes'], ['oklch', 'ok', 'samples']]) {
    test(`${view}: the tones of tints and of shades draw mid-grey lines from mid grey to their tints and shades`, async (t) => {
      const { page, errors } = await open(t, view, watchRenderers);
      await page.locator(`label:has(> #${p}-${samples})`).click();
      const lines = async () => {
        await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
        return keptLines(page, view);
      };
      assert.deepEqual(await lines(), []);
      await page.locator(`#${p}-g-primaries-tone-of-shade`).click();
      assert.deepEqual(await lines(), ['#808080-#000080 808080', '#808080-#008000 808080', '#808080-#800000 808080']);
      await page.locator(`#${p}-g-primaries-tone-of-shade`).click();
      await page.locator(`#${p}-g-tertiaries-tone-of-tint`).click();
      assert.deepEqual(await lines(), ['#80c0ff', '#80ffc0', '#c080ff', '#c0ff80', '#ff80c0', '#ffc080'].map((h) => '#808080-' + h + ' 808080'));
      await page.locator(`#${p}-g-tone-of-tint`).click();
      assert.equal((await lines()).length, 12);
      assert.deepEqual(errors, []);
    });
  }

  test('a hash into another view brings that view up on load', async (t) => {
    const { page, errors } = await open(t, 'oklch');
    await goto(page, base + PAGE + '?view=wheel#ok-g-tint');
    assert.deepEqual(await shown(page), { panes: ['oklch'], url: 'oklch' });
    assert.ok(await page.evaluate(() => document.getElementById('ok-g-tint').checkVisibility()));
    assert.deepEqual(errors, []);
  });
});
