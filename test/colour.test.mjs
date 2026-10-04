import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { hexRgb, rgbHex, oklab, oklabRgb, oklch, hue, hwb, hueRgb, GRID, CELLS, cell, classify } from '../web/assets/lab/colour.js';
import { WHEEL, kind } from '../web/assets/lab/palettes.js';
import { labelFor, labelMode } from '../web/assets/lab/names.js';
import { PALETTE_HEX } from '../lib/palette.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const near = (got, want, places, what) => assert.ok(Math.abs(got - want) < 10 ** -places / 2, `${what}: ${got} vs ${want}`);

test('OKLCH matches the reference values', () => {
  const REF = [
    ['#ff0000', 0.62796, 0.25768, 29.2339],
    ['#00ff00', 0.86644, 0.29483, 142.4953],
    ['#0000ff', 0.45201, 0.31321, 264.0520],
    ['#ff00ff', 0.70167, 0.32249, 328.3634],
  ];
  for (const [hex, L, C, H] of REF) {
    const [l, c, h] = oklch(hexRgb(hex));
    near(l, L, 4, hex + ' L');
    near(c, C, 4, hex + ' C');
    near(h, H, 3, hex + ' H');
  }
  const white = oklch([255, 255, 255]);
  near(white[0], 1, 4, 'white L');
  near(white[1], 0, 4, 'white C');
  assert.equal(white[2], null);
});

test('hex and OKLab round-trip', () => {
  for (const c of GRID.concat([[18, 52, 86], [254, 220, 186]])) {
    assert.deepEqual(hexRgb(rgbHex(c)), c);
    assert.equal(rgbHex(oklabRgb(oklab(c))), rgbHex(c));
  }
  assert.equal(rgbHex([-3, 255.4, 300]), '#00ffff');
});

test('HSV hue and its inverse agree on the wheel', () => {
  for (const g of Object.keys(WHEEL)) for (const [, hex] of WHEEL[g]) assert.equal(rgbHex(hueRgb(hue(hexRgb(hex)))), hex);
});

test('the 101-point lattice classifies as the prose says', () => {
  assert.equal(GRID.length, 101);
  assert.equal(new Set(GRID.map(rgbHex)).size, 101);
  assert.deepEqual(CELLS.groups.map((g) => [g.id, g.cols]), [['pure', ['pure', 'light-tone', 'tone', 'dark-tone']],
    ['tint', ['tint', 'tone-of-tint']], ['shade', ['shade', 'tone-of-shade']]]);
  assert.deepEqual(CELLS.cols, ['pure', 'light-tone', 'tone', 'dark-tone', 'tint', 'tone-of-tint', 'shade', 'tone-of-shade']);
  const n = (k) => CELLS.count[k] || 0;
  const table = CELLS.rows.map((r) => CELLS.cols.map((c) => n(r + '-' + c)));
  assert.deepEqual(table, [Array(8).fill(3), Array(8).fill(3), Array(8).fill(6)]);
  assert.equal(n('neutrals'), 5);
  assert.ok(GRID.every((c) => cell(c)), 'every point has a cell');
});

test('the tone of a tint keeps its whiteness and the tone of a shade its blackness, half-way to mid grey', () => {
  const hexes = new Set(GRID.map(rgbHex));
  const half = (c, to) => c.map((v) => Math.round((v + to) / 2));
  const wb = (c) => hwb(c).slice(4, -1).split(' ').slice(1).join(' ');
  for (const g of Object.keys(WHEEL)) for (const [name, hex] of WHEEL[g]) {
    for (const [col, to, keeps] of [['tone-of-tint', 255, 0], ['tone-of-shade', 0, 1]]) {
      const from = half(hexRgb(hex), to), mix = half(from, 128);
      assert.ok(hexes.has(rgbHex(mix)), `${name} ${col} ${rgbHex(mix)} is a point`);
      assert.equal(cell(mix), g + '-' + col, rgbHex(mix));
      assert.deepEqual(classify(mix).from, from, `${name} ${col} is a tone of ${rgbHex(from)}`);
      assert.equal(wb(mix).split(' ')[keeps], wb(from).split(' ')[keeps], `${name} ${col} keeps the ${keeps ? 'blackness' : 'whiteness'}`);
    }
  }
  assert.equal(hwb(hexRgb('#8080c0')), 'hwb(240 50% 25%)');
  assert.equal(hwb(hexRgb('#404080')), 'hwb(240 25% 50%)');
  assert.equal(kind(hexRgb('#404080')), 'Primary · tone of shade (navy + #808080)');
  assert.equal(kind(hexRgb('#8080c0')), 'Primary · tone of tint (light blue + #808080)');
  assert.equal(kind(hexRgb('#806040')), 'Tertiary · tone of shade (#804000 + #808080)');
  assert.equal(kind(hexRgb('#e060a0')), 'Tertiary · light tone (rose + #c0c0c0)');
});

test('light and dark tones are the half-way mixes with silver and dark grey', () => {
  const LIGHT = { red: '#e06060', lime: '#60e060', blue: '#6060e0', cyan: '#60e0e0', magenta: '#e060e0', yellow: '#e0e060',
    orange: '#e0a060', chartreuse: '#a0e060', 'spring green': '#60e0a0', azure: '#60a0e0', violet: '#a060e0', rose: '#e060a0' };
  const DARK = { red: '#a02020', lime: '#20a020', blue: '#2020a0', cyan: '#20a0a0', magenta: '#a020a0', yellow: '#a0a020',
    orange: '#a06020', chartreuse: '#60a020', 'spring green': '#20a060', azure: '#2060a0', violet: '#6020a0', rose: '#a02060' };
  const hexes = new Set(GRID.map(rgbHex));
  for (const g of Object.keys(WHEEL)) for (const [name, hex] of WHEEL[g]) {
    for (const [want, to, col] of [[LIGHT, 192, 'light-tone'], [DARK, 64, 'dark-tone']]) {
      const mix = rgbHex(hexRgb(hex).map((v) => Math.round((v + to) / 2)));
      assert.equal(mix, want[name], `${name} ${col}`);
      assert.ok(hexes.has(mix), `${mix} is a point`);
      assert.equal(cell(hexRgb(mix)), g + '-' + col, mix);
    }
  }
});

test('HWB reads a colour as hue, whiteness and blackness, in whole percents', () => {
  assert.equal(hwb(hexRgb('#000080')), 'hwb(240 0% 50%)');
  assert.equal(hwb(hexRgb('#80c0c0')), 'hwb(180 50% 25%)');
  assert.equal(hwb(hexRgb('#ffffff')), 'hwb(0 100% 0%)');
  assert.equal(hwb(hexRgb('#ff0000')), 'hwb(0 0% 0%)');
  assert.equal(hwb(hexRgb('#ff0080')), 'hwb(330 0% 0%)');
  assert.equal(labelFor({}, '#800000', 'hwb'), 'hwb(0 0% 50%)');
});

test('colourNames.json names every lattice point and palette colour', () => {
  const names = JSON.parse(fs.readFileSync(path.join(ROOT, 'web/_data/colourNames.json'), 'utf8'));
  const want = GRID.map(rgbHex).concat(Object.values(PALETTE_HEX));
  for (const hex of want) {
    const e = names[hex.slice(1).toLowerCase()];
    assert.ok(e && e.css && e.munsell && e.iscc, 'named: ' + hex);
  }
  assert.equal(labelFor(names, '#ff0000', 'css'), 'red');
  assert.equal(labelFor(names, '#123456', 'css'), '#123456');
  assert.equal(labelFor(names, '#ff0000', 'none'), '');
  assert.equal(labelMode((m) => m === 'none'), 'none');
  assert.equal(labelMode(() => false), 'hex');
});

test('glossary "see" links point at real targets', (t) => {
  const page = path.resolve(ROOT, process.env.SITE_DIR || '_site', 'index.html');
  if (!fs.existsSync(page)) return t.skip('no built site');
  const ids = new Set([...fs.readFileSync(page, 'utf8').matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  const cells = CELLS.rows.concat(CELLS.cols, CELLS.aside, CELLS.groups.map((g) => 'group-' + g.id), CELLS.rows.flatMap((r) => CELLS.cols.map((c) => r + '-' + c)));
  cells.forEach((k) => ids.add('cube-g-' + k));
  const glossary = yaml.load(fs.readFileSync(path.join(ROOT, 'web/_data/colourGlossary.yml'), 'utf8'));
  const missing = glossary.flatMap((g) => (g.see || []).map((s) => s.href.slice(1)).filter((id) => !ids.has(id)));
  assert.deepEqual(missing, []);
});
