// Named colours the lab pages draw. No DOM and no THREE.
import { rgbHex, classify } from './colour.js';

// the cube's twelve hues
var WHEEL = {
  primaries: [['red', '#ff0000'], ['lime', '#00ff00'], ['blue', '#0000ff']],
  secondaries: [['cyan', '#00ffff'], ['magenta', '#ff00ff'], ['yellow', '#ffff00']],
  tertiaries: [['orange', '#ff8000'], ['chartreuse', '#80ff00'], ['spring green', '#00ff80'], ['azure', '#0080ff'],
    ['violet', '#8000ff'], ['rose', '#ff0080']],
};
var HUE_NAME = {}, GREY_NAME = { '#ffffff': 'white', '#000000': 'black' };
Object.keys(WHEEL).forEach(function (g) { WHEEL[g].forEach(function (c) { HUE_NAME[c[1]] = c[0]; }); });
var TIER = { primaries: 'Primary', secondaries: 'Secondary', tertiaries: 'Tertiary' };
// what a point is, as a hint says it: 'Primary · pure hue', 'Primary · shade (red + black)',
// 'Primary · tone of shade (navy + #808080)', 'Neutral'; '' for any other colour
function kind(rgb) {
  var k = classify(rgb);
  if (!k) return '';
  if (!k.hue) return 'Neutral';
  var tier = TIER[k.row] + ' · ';
  if (!k.grey) return tier + 'pure hue';
  var grey = rgbHex(k.grey), from = k.from && rgbHex(k.from);
  return tier + k.mix.replace(/-/g, ' ') + ' (' + (from ? MIX_NAME[from] || from : HUE_NAME[rgbHex(k.hue)]) + ' + ' + (GREY_NAME[grey] || grey) + ')';
}

// lattice points that are labelled by default; the names themselves are never shown
var LATTICE_NAMES = [['black', '#000000'], ['dark grey', '#404040'], ['mid grey', '#808080'], ['silver', '#c0c0c0'], ['white', '#ffffff'],
  ['light red', '#ff8080'], ['light yellow', '#ffff80'], ['light green', '#80ff80'], ['light cyan', '#80ffff'],
  ['light blue', '#8080ff'], ['light magenta', '#ff80ff'],
  ['maroon', '#800000'], ['olive', '#808000'], ['green', '#008000'], ['teal', '#008080'], ['navy', '#000080'], ['purple', '#800080'],
  ['brick red', '#c04040'], ['mustard', '#c0c040'], ['leaf green', '#40c040'], ['turquoise', '#40c0c0'],
  ['royal blue', '#4040c0'], ['orchid', '#c040c0']];
var MIX_NAME = {};
LATTICE_NAMES.forEach(function (c) { MIX_NAME[c[1]] = c[0]; });

// moene's grid colour field: rows top → bottom (High, Normal, Low energy), columns Bad, Neutral, Good mood.
// Region numbers and names from grid-cell-names.md
var MOENE = [['#1446ef', '#ffffff', '#8e2a8c'], ['#6f7f96', '#d5d8dc', '#fa8072'], ['#2e4272', '#5b6069', '#ffaabd']];
var MOENE_NAMES = [[[7, 'dysphoria'], [8, 'unnamed'], [9, 'hypomanic state']], [[4, 'anhedonia'], [5, 'euthymia'], [6, 'eudaimonia']],
  [[1, 'depressive state'], [2, 'apathy'], [3, 'ataraxia']]];

// the capsule palette's chains: the neutral axis, and each family from light to dark, its tail tied to the
// nearest neutral; an attached colour joins its nearest family member
var CAPSULE = {
  neutrals: ['white', 'off-white', 'light grey', 'dark grey', 'graphite', 'black'],
  families: [
    { chain: ['light blue', 'navy blue'] },
    { chain: ['light brown', 'brown', 'dark brown'], attach: ['rusty', 'taupe'] },
    { chain: ['light olive', 'olive green', 'dark olive'] },
  ],
};

// illustrative shade clouds around some capsule colours, with the extra colour and the bridge they need
var SHADES = {
  extras: [{ name: 'ochre', hex: '#cc7722' }],
  bridges: [['rusty', 'ochre', 'light olive']],
  clouds: {
    taupe: [
      ['dark taupe', '#483c32'], ['medium taupe', '#674c47'], ['grey-brown', '#7e7468'],
      ['cool taupe', '#847c7b'], ['taupe grey', '#8b8589'], ['pinkish taupe', '#9a8484'],
      ['mushroom', '#9e8f82'], ['warm taupe', '#af9483'], ['pale taupe', '#bc987e'],
    ],
    ochre: [
      ['light ochre', '#dfb26c'], ['yellow ochre', '#d4a237'], ['harvest gold', '#da9100'],
      ['golden ochre', '#c8902e'], ['dark goldenrod', '#b8860b'], ['French ochre', '#c48a3f'],
      ['raw sienna', '#d68a59'], ['brown ochre', '#a0632a'],
    ],
    rusty: [
      ['orange rust', '#c8622c'], ['burnt orange', '#cc5500'], ['mahogany', '#c04000'],
      ['rust', '#b7410e'], ['sienna', '#a0522d'], ['rufous', '#a81c07'],
      ['auburn', '#a52a2a'], ['russet', '#80461b'], ['deep red-brown', '#6e2c1e'],
    ],
    'off-white': [
      ['ivory', '#fffff0'], ['ecru', '#f3dfca'], ['cream', '#fffdd0'], ['eggshell', '#f0ead6'],
      ['bone', '#e3dac9'], ['oatmeal', '#e0d6c5'], ['beige (web)', '#f5f5dc'],
    ],
    'light brown': [
      ['beige', '#d8c3a5'], ['sand', '#c2b280'], ['desert sand', '#edc9af'], ['tan', '#d2b48c'],
      ['camel', '#c19a6b'],
    ],
    brown: [['cognac', '#9a463d'], ['chestnut', '#954535'], ['walnut', '#773f1a'], ['mocha', '#967969']],
    'dark brown': [['coffee', '#6f4e37'], ['chocolate', '#7b3f00'], ['espresso', '#3c2218']],
    'navy blue': [
      ['raw denim', '#1f2a44'], ['dark rinse denim', '#2b3a5c'], ['indigo dye', '#00416a'],
      ['indigo (web)', '#4b0082'],
    ],
    'light blue': [
      ['mid wash denim', '#5b7aa1'], ['stone wash denim', '#7d94b5'], ['light wash denim', '#a3b8d1'],
      ['bleached denim', '#b8c9dc'],
    ],
  },
};

export { WHEEL, LATTICE_NAMES, MOENE, MOENE_NAMES, CAPSULE, SHADES, kind };
