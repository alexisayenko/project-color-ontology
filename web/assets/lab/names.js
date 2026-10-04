// Colour names: a hex, its name in one of the standard namings, its CSS hwb(), or none at all. names is
// web/_data/colourNames.json, hex (six digits, no #) -> {css, cssExact, munsell, iscc}; a missing key leaves the hex standing.
import { hexRgb, hwb } from './colour.js';

var LABEL_MODES = ['none', 'hex', 'css', 'hwb', 'munsell', 'iscc'];
function labelMode(on) { return LABEL_MODES.filter(on)[0] || 'hex'; }
function labelFor(names, hex, mode) {
  if (mode === 'none') return '';
  if (mode === 'hwb') return hwb(hexRgb(hex));
  var e = names[hex.slice(1).toLowerCase()];
  if (!e) return hex;
  // the CSS keyword is the nearest one, so an inexact match says so
  if (mode === 'css') return e.css ? (e.cssExact ? e.css : '≈ ' + e.css) : hex;
  if (mode === 'munsell') return e.munsell || hex;
  if (mode === 'iscc') return e.iscc || hex;
  return hex;
}

export { labelMode, labelFor };
