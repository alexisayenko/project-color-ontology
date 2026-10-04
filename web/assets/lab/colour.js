// Colour maths shared by the lab pages and the build: no DOM and no THREE, so node imports it too.
// rgb is [r, g, b] in 0–255; hex is '#rrggbb'.
function hexRgb(h) { return [1, 3, 5].map(function (i) { return parseInt(h.slice(i, i + 2), 16); }); }
function rgbHex(rgb) {
  return '#' + rgb.map(function (v) { return Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0'); }).join('');
}

function toLinear(v) { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }
function fromLinear(c) { return 255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.sign(c) * Math.pow(Math.abs(c), 1 / 2.4) - 0.055); }

// sRGB ↔ OKLab (Björn Ottosson); OKLCH is its polar form, hue in degrees and null for a grey
function oklab(rgb) {
  var r = toLinear(rgb[0]), g = toLinear(rgb[1]), b = toLinear(rgb[2]);
  var l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  var m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  var s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s,
  ];
}
function oklabRgb(lab) {
  var L = lab[0], a = lab[1], b = lab[2];
  var l = Math.pow(L + 0.3963377774 * a + 0.2158037573 * b, 3);
  var m = Math.pow(L - 0.1055613458 * a - 0.0638541728 * b, 3);
  var s = Math.pow(L - 0.0894841775 * a - 1.291485548 * b, 3);
  return [fromLinear(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    fromLinear(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    fromLinear(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)];
}
function oklch(rgb) {
  var o = oklab(rgb), C = Math.hypot(o[1], o[2]), H = Math.atan2(o[2], o[1]) * 180 / Math.PI;
  return [o[0], C, C < 0.002 ? null : (H + 360) % 360];
}

// HSV hue in degrees, and back to the hue at full saturation and value
function hue(c) {
  var hi = Math.max(c[0], c[1], c[2]), d = hi - Math.min(c[0], c[1], c[2]);
  var h = hi === c[0] ? (c[1] - c[2]) / d : hi === c[1] ? (c[2] - c[0]) / d + 2 : (c[0] - c[1]) / d + 4;
  return (h * 60 + 360) % 360;
}
// CSS Color 4's hwb(): the hue, then how much white and how much black, each a whole percent; a grey's hue is 0
function hwb(c) {
  var hi = Math.max(c[0], c[1], c[2]), lo = Math.min(c[0], c[1], c[2]);
  var h = hi === lo ? 0 : Math.round(hue(c)) % 360;
  return 'hwb(' + h + ' ' + Math.round(lo / 2.55) + '% ' + Math.round(100 - hi / 2.55) + '%)';
}
function hueRgb(h) {
  var f = function (n) { var k = (n + h / 60) % 6; return Math.round(255 * (1 - Math.max(0, Math.min(k, 4 - k, 1)))); };
  return [f(5), f(3), f(1)];
}

// the 3×3×3 lattice of 0, 128 and 255, plus the centres of the eight small cubes it cuts out and the six
// tertiaries' shades, tints and tones added below, which together sit on the 5×5×5 lattice over LEVELS, and
// every hue's light and dark tone and the tones of its tint and its shade, of which only the primaries' and
// secondaries' tones of tints and shades do
var LATTICE = [0, 128, 255], CENTRES = [64, 192];
var LEVELS = LATTICE.concat(CENTRES).sort(function (a, b) { return a - b; });
var GRID = [];
[LATTICE, CENTRES].forEach(function (L) { L.forEach(function (r) { L.forEach(function (g) { L.forEach(function (b) { GRID.push([r, g, b]); }); }); }); });
var onLattice = function (c) { return c.every(function (v) { return LATTICE.indexOf(v) >= 0; }); };

// every colour but a grey falls in one place. A pure hue (one channel at 0, one at 255) goes to its row by
// HSV angle to within 2°: a multiple of 120° is a primary, of 60° a secondary, otherwise a tertiary. Its tint,
// light tone, tone, dark tone and shade are its half-way mixes with white, silver, mid grey, dark grey and
// black, each kept in the column of the grey it was mixed with, and only where the mix, rounded, is one of
// the points; the tone of its tint and the tone of its shade are those mixed half-way again with mid grey.
// Every other point is one of them, so nothing is left over. The columns come in three groups, each the
// colour a family starts from and the tones that hang off it.
var ROWS = ['primaries', 'secondaries', 'tertiaries'], ASIDE = ['neutrals'];
var GROUPS = [{ id: 'pure', cols: ['pure', 'light-tone', 'tone', 'dark-tone'] }, { id: 'tint', cols: ['tint', 'tone-of-tint'] },
  { id: 'shade', cols: ['shade', 'tone-of-shade'] }];
var COLS = [].concat.apply([], GROUPS.map(function (g) { return g.cols; }));
var MIXES = [['tint', 255], ['light-tone', 192], ['tone', 128], ['dark-tone', 64], ['shade', 0]];
var TONED = [['tone-of-tint', 255], ['tone-of-shade', 0]], MIDGREY = [128, 128, 128];
function row(c) {
  var h = hue(c), on = function (step) { return Math.abs(h - Math.round(h / step) * step) <= 2; };
  return on(120) ? 'primaries' : on(60) ? 'secondaries' : 'tertiaries';
}
var pure = function (c) { return Math.max(c[0], c[1], c[2]) === 255 && Math.min(c[0], c[1], c[2]) === 0; };
// a tertiary's shade, tint and tone, half-way to black, to white and to mid grey, are points of their own,
// and so is every hue's light and dark tone, half-way to silver and to dark grey, and the tone of every
// hue's tint and of its shade, each half-way from it to mid grey
var half = function (c, to) { return c.map(function (v) { return Math.round((v + to) / 2); }); };
var HUES = GRID.filter(pure), TERTIARIES = HUES.filter(function (c) { return row(c) === 'tertiaries'; });
[0, 255, 128].forEach(function (to) { TERTIARIES.forEach(function (c) { GRID.push(half(c, to)); }); });
[192, 64].forEach(function (to) { HUES.forEach(function (c) { GRID.push(half(c, to)); }); });
TONED.forEach(function (t) { HUES.forEach(function (c) { GRID.push(half(half(c, t[1]), 128)); }); });
var AT = {}, CANON = {}, SOURCE = {};
GRID.forEach(function (c) { AT[c.join(',')] = true; });
HUES.forEach(function (c) {
  SOURCE[c.join(',')] = { hue: c, mix: 'pure', grey: null };
  MIXES.forEach(function (m) {
    var mid = half(c, m[1]).join(',');
    if (AT[mid]) { CANON[mid] = row(c) + '-' + m[0]; SOURCE[mid] = { hue: c, mix: m[0], grey: [m[1], m[1], m[1]] }; }
  });
  TONED.forEach(function (t) {
    var from = half(c, t[1]), mid = half(from, 128).join(',');
    CANON[mid] = row(c) + '-' + t[0];
    SOURCE[mid] = { hue: c, mix: t[0], grey: MIDGREY, from: from };
  });
});
var canonical = function (c) { return !!CANON[c.join(',')]; };
function cell(c) {
  if (Math.max(c[0], c[1], c[2]) === Math.min(c[0], c[1], c[2])) return 'neutrals';
  return pure(c) ? row(c) + '-pure' : CANON[c.join(',')];
}
// where a point comes from: a grey; or the named hue it is, or is mixed from, with the grey it is mixed with,
// the tint or shade it is a tone of (from), its row and its column; null for any other colour
function classify(c) {
  if (Math.max(c[0], c[1], c[2]) === Math.min(c[0], c[1], c[2])) return { cell: 'neutrals' };
  var s = SOURCE[c.join(',')];
  if (!s) return null;
  var k = { cell: cell(c), row: row(s.hue), mix: s.mix, hue: s.hue, grey: s.grey };
  if (s.from) k.from = s.from;
  return k;
}
var COUNT = {};
GRID.forEach(function (c) { var k = cell(c); COUNT[k] = (COUNT[k] || 0) + 1; });
var CELLS = { rows: ROWS, cols: COLS, groups: GROUPS, aside: ASIDE, count: COUNT };

// bilinear blend over a 3×3 grid of anchors: u, v run 0–2 across it and go on past the edges; corner(i, j)
// gives anchor row i, column j as three numbers. The weights come back with the mix
function bilinear(corner, u, v) {
  var j0 = Math.max(0, Math.min(1, Math.floor(u))), i0 = Math.max(0, Math.min(1, Math.floor(v)));
  var x = u - j0, y = v - i0;
  var pts = [[i0, j0, (1 - x) * (1 - y)], [i0, j0 + 1, x * (1 - y)], [i0 + 1, j0, (1 - x) * y], [i0 + 1, j0 + 1, x * y]];
  var mix = [0, 1, 2].map(function (k) { return pts.reduce(function (sum, q) { return sum + q[2] * corner(q[0], q[1])[k]; }, 0); });
  return { mix: mix, pts: pts };
}

export {
  hexRgb, rgbHex, toLinear, fromLinear, oklab, oklabRgb, oklch, hue, hwb, hueRgb,
  LATTICE, LEVELS, GRID, onLattice, row, pure, canonical, cell, classify, MIXES, CELLS, bilinear,
};
