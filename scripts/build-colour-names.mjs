// Regenerates web/_data/colourNames.json: hex -> {css, cssExact, munsell, iscc} for every colour the lab pages label
// (the 5x5x5 RGB lattice, every / point, plus the capsule palette). sRGB -> Munsell renotation via
// the `munsell` devDependency, then the ISCC-NBS block containing that Munsell coordinate, read from
// the vendored scripts/data/iscc-nbs.xml. Run: node scripts/build-colour-names.mjs [--check]

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { hexToMhvc } from "munsell";
import { PALETTE_HEX } from "../lib/palette.mjs";
import { hexRgb, rgbHex, oklab, LEVELS, GRID } from "../web/assets/lab/colour.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");

// ---- the colours that get labelled -------------------------------------------------------------
// The 5x5x5 lattice over the lab's LEVELS holds the twelve wheel hues and most / points;
// GRID adds the light and dark tones off it. The capsule palette is the swatch set shared by
// the wardrobe capsule and the capsule overlay in the cube.
function latticeHexes() {
  const out = GRID.map((c) => rgbHex(c).slice(1));
  for (const r of LEVELS) for (const g of LEVELS) for (const b of LEVELS) out.push(rgbHex([r, g, b]).slice(1));
  return out;
}

// ---- CSS named colours -------------------------------------------------------------------------
// Every colour gets the NEAREST keyword, measured in OKLab; `cssExact` says whether it is the
// keyword's own value. Where the spec gives two keywords for one value, PREFERRED_CSS picks one and
// otherwise the first listed wins; the "gray" spellings are already first.
const CSS_COLOURS = {
  black: "000000", silver: "c0c0c0", gray: "808080", white: "ffffff", maroon: "800000",
  red: "ff0000", purple: "800080", fuchsia: "ff00ff", green: "008000", lime: "00ff00",
  olive: "808000", yellow: "ffff00", navy: "000080", blue: "0000ff", teal: "008080",
  aqua: "00ffff", aliceblue: "f0f8ff", antiquewhite: "faebd7", aquamarine: "7fffd4",
  azure: "f0ffff", beige: "f5f5dc", bisque: "ffe4c4", blanchedalmond: "ffebcd",
  blueviolet: "8a2be2", brown: "a52a2a", burlywood: "deb887", cadetblue: "5f9ea0",
  chartreuse: "7fff00", chocolate: "d2691e", coral: "ff7f50", cornflowerblue: "6495ed",
  cornsilk: "fff8dc", crimson: "dc143c", cyan: "00ffff", darkblue: "00008b",
  darkcyan: "008b8b", darkgoldenrod: "b8860b", darkgray: "a9a9a9", darkgreen: "006400",
  darkkhaki: "bdb76b", darkmagenta: "8b008b", darkolivegreen: "556b2f", darkorange: "ff8c00",
  darkorchid: "9932cc", darkred: "8b0000", darksalmon: "e9967a", darkseagreen: "8fbc8f",
  darkslateblue: "483d8b", darkslategray: "2f4f4f", darkturquoise: "00ced1",
  darkviolet: "9400d3", deeppink: "ff1493", deepskyblue: "00bfff", dimgray: "696969",
  dodgerblue: "1e90ff", firebrick: "b22222", floralwhite: "fffaf0", forestgreen: "228b22",
  gainsboro: "dcdcdc", ghostwhite: "f8f8ff", gold: "ffd700", goldenrod: "daa520",
  greenyellow: "adff2f", honeydew: "f0fff0", hotpink: "ff69b4", indianred: "cd5c5c",
  indigo: "4b0082", ivory: "fffff0", khaki: "f0e68c", lavender: "e6e6fa",
  lavenderblush: "fff0f5", lawngreen: "7cfc00", lemonchiffon: "fffacd", lightblue: "add8e6",
  lightcoral: "f08080", lightcyan: "e0ffff", lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3", lightgreen: "90ee90", lightpink: "ffb6c1", lightsalmon: "ffa07a",
  lightseagreen: "20b2aa", lightskyblue: "87cefa", lightslategray: "778899",
  lightsteelblue: "b0c4de", lightyellow: "ffffe0", limegreen: "32cd32", linen: "faf0e6",
  magenta: "ff00ff", mediumaquamarine: "66cdaa", mediumblue: "0000cd",
  mediumorchid: "ba55d3", mediumpurple: "9370db", mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee", mediumspringgreen: "00fa9a", mediumturquoise: "48d1cc",
  mediumvioletred: "c71585", midnightblue: "191970", mintcream: "f5fffa",
  mistyrose: "ffe4e1", moccasin: "ffe4b5", navajowhite: "ffdead", oldlace: "fdf5e6",
  olivedrab: "6b8e23", orange: "ffa500", orangered: "ff4500", orchid: "da70d6",
  palegoldenrod: "eee8aa", palegreen: "98fb98", paleturquoise: "afeeee",
  palevioletred: "db7093", papayawhip: "ffefd5", peachpuff: "ffdab9", peru: "cd853f",
  pink: "ffc0cb", plum: "dda0dd", powderblue: "b0e0e6", rebeccapurple: "663399",
  rosybrown: "bc8f8f", royalblue: "4169e1", saddlebrown: "8b4513", salmon: "fa8072",
  sandybrown: "f4a460", seagreen: "2e8b57", seashell: "fff5ee", sienna: "a0522d",
  skyblue: "87ceeb", slateblue: "6a5acd", slategray: "708090", snow: "fffafa",
  springgreen: "00ff7f", steelblue: "4682b4", tan: "d2b48c", thistle: "d8bfd8",
  tomato: "ff6347", turquoise: "40e0d0", violet: "ee82ee", wheat: "f5deb3",
  whitesmoke: "f5f5f5", yellowgreen: "9acd32",
};

// the lab pages name these two hues cyan and magenta, so prefer those over aqua and fuchsia
const PREFERRED_CSS = { "00ffff": "cyan", ff00ff: "magenta" };

const CSS_BY_HEX = { ...PREFERRED_CSS };
for (const [name, hex] of Object.entries(CSS_COLOURS)) if (!CSS_BY_HEX[hex]) CSS_BY_HEX[hex] = name;

// Plain euclidean distance in OKLab is the deltaE: close enough to perceptual for "which keyword is
// this nearest to".
const labOf = (hex) => oklab(hexRgb(`#${hex}`));

const CSS_LAB = Object.entries(CSS_BY_HEX).map(([hex, name]) => ({ name, lab: labOf(hex) }));

function nearestCss(hex) {
  const exact = CSS_BY_HEX[hex];
  if (exact) return { css: exact, cssExact: true };
  const lab = labOf(hex);
  let best = null, bestD = Infinity;
  for (const c of CSS_LAB) {
    const d = (lab[0] - c.lab[0]) ** 2 + (lab[1] - c.lab[1]) ** 2 + (lab[2] - c.lab[2]) ** 2;
    if (d < bestD) { bestD = d; best = c.name; }
  }
  return { css: best, cssExact: false };
}

// ---- Munsell renotation string -----------------------------------------------------------------
// One decimal everywhere: finer than the renotation tables themselves resolve, coarse enough that a
// label stays short. A colour whose chroma rounds to 0.0 is a neutral, written the conventional way
// as "N 5.2/" — no hue, and the chroma left off after the slash.
function munsellString(hue100, value, chroma) {
  const v = value.toFixed(1), c = chroma.toFixed(1);
  if (+c === 0) return `N ${v}/`;
  let h = +(((hue100 % 100) + 100) % 100).toFixed(1);
  if (h === 0) h = 100;
  const family = HUE_FAMILIES[Math.ceil(h / 10) - 1];
  return `${(h - (Math.ceil(h / 10) - 1) * 10).toFixed(1)}${family} ${v}/${c}`;
}

// ---- ISCC-NBS blocks ---------------------------------------------------------------------------
// scripts/data/iscc-nbs.xml is bstreiff/iscc-nbs-colors (CC0-1.0), a transcription of NBS Special
// Publication 440 (Kelly & Judd), itself a US government work. 932 elementary blocks partition the
// Munsell solid into the 267 level-3 names; a block is a half-open hue x value x chroma box.
const HUE_FAMILIES = ["R", "YR", "Y", "GY", "G", "BG", "B", "PB", "P", "RP"];

function hueToNumber(s) {
  const m = /^([\d.]+)(R|YR|Y|GY|G|BG|B|PB|P|RP)$/.exec(s.trim());
  if (!m) throw new Error(`unparsable Munsell hue: ${s}`);
  return HUE_FAMILIES.indexOf(m[2]) * 10 + parseFloat(m[1]);
}

const bound = (s) => (s === "INF" ? Infinity : parseFloat(s));

function loadIsccNbs() {
  const xml = readFileSync(join(HERE, "data", "iscc-nbs.xml"), "utf8");
  // the level-3 names are exactly the leaves of <names>, i.e. the self-closing <name> elements
  const names = {};
  for (const m of xml.matchAll(/<name color="(\d+)" name="([^"]+)" abbr="[^"]*"\s*\/>/g)) {
    names[+m[1]] = m[2].toLowerCase();
  }
  const hueRanges = [];
  for (const h of xml.matchAll(/<hue-range begin="([^"]+)" end="([^"]+)"[^>]*>([\s\S]*?)<\/hue-range>/g)) {
    const blocks = [];
    for (const r of h[3].matchAll(
      /<range color="(\d+)" chroma-begin="([^"]+)" chroma-end="([^"]+)" value-begin="([^"]+)" value-end="([^"]+)"\s*\/>/g
    )) {
      blocks.push({ color: +r[1], c0: bound(r[2]), c1: bound(r[3]), v0: bound(r[4]), v1: bound(r[5]) });
    }
    hueRanges.push({ begin: hueToNumber(h[1]), end: hueToNumber(h[2]), blocks });
  }
  const total = hueRanges.reduce((n, h) => n + h.blocks.length, 0);
  if (Object.keys(names).length !== 267 || hueRanges.length !== 31 || total !== 932) {
    throw new Error(`iscc-nbs.xml parsed as ${Object.keys(names).length} names / ${hueRanges.length} hue ranges / ${total} blocks`);
  }
  return { names, hueRanges };
}

// hue is on the circle (0, 100]; a hue range may wrap past 10RP back to 1R
function hueInRange(hue, begin, end) {
  return begin < end ? hue > begin && hue <= end : hue > begin || hue <= end;
}

function isccName({ names, hueRanges }, hue100, value, chroma) {
  // a neutral has no meaningful hue; blocks 263-267 repeat in every hue range, so any range serves
  let hue = ((hue100 % 100) + 100) % 100;
  if (hue === 0) hue = 100;
  const range = hueRanges.find((h) => hueInRange(hue, h.begin, h.end));
  if (!range) throw new Error(`no ISCC-NBS hue range for hue ${hue}`);
  const block = range.blocks.find(
    (b) => value >= b.v0 && value < b.v1 && chroma >= b.c0 && chroma < b.c1
  );
  if (!block) throw new Error(`no ISCC-NBS block for ${hue}/${value}/${chroma}`);
  return names[block.color];
}

// ---- build ---------------------------------------------------------------------------------------
function build() {
  const iscc = loadIsccNbs();
  const hexes = [...new Set([...latticeHexes(), ...Object.values(PALETTE_HEX).map((h) => h.slice(1).toLowerCase())])];
  hexes.sort();
  const out = {};
  for (const hex of hexes) {
    const [hue100, value, chroma] = hexToMhvc(`#${hex}`);
    out[hex] = {
      ...nearestCss(hex),
      munsell: munsellString(hue100, value, chroma),
      iscc: isccName(iscc, hue100, value, chroma),
    };
  }
  return out;
}

const TARGET = join(ROOT, "web", "_data", "colourNames.json");
const table = build();

if (process.argv.includes("--check")) {
  const expected = [
    ["ffffff", "white"], ["000000", "black"], ["ff0000", "vivid red"],
    ["00ff00", "vivid green"], ["808080", "medium gray"], ["b6b69a", "?"],
  ];
  for (const [hex, want] of expected) {
    const got = table[hex];
    console.log(`#${hex}  ${got.munsell.padEnd(18)}  css=${got.cssExact ? got.css : `~${got.css}`}  iscc=${got.iscc}${want !== "?" && want !== got.iscc ? `  (expected ${want})` : ""}`);
  }
} else {
  writeFileSync(TARGET, `${JSON.stringify(table, null, 1)}\n`);
  console.log(`wrote ${Object.keys(table).length} entries to web/_data/colourNames.json`);
}
