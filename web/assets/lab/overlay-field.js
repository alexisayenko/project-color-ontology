import { hexRgb, bilinear } from './colour.js';
import { MOENE, MOENE_NAMES } from './palettes.js';

// mood m and energy e run 1–9; each anchor is exact at its region's centre (2, 5 or 8) and the blend
// carries on to the edge. MOENE lists the energy rows top → bottom, so row i counts up from the bottom
function fieldColour(m, e) {
  var c = bilinear(function (i, j) { return hexRgb(MOENE[2 - i][j]); }, (m - 2) / 3, (e - 2) / 3).mix;
  return c.map(function (v) { return Math.round(Math.max(0, Math.min(255, v))); });
}
function drawField(lab, group, points) {
  var cols = [];
  for (var e = 1; e <= 9; e++) { cols[e] = []; for (var m = 1; m <= 9; m++) cols[e][m] = fieldColour(m, e); }
  var pairs = [];
  for (e = 1; e <= 9; e++) for (m = 1; m <= 9; m++) {
    if (m < 9) pairs.push([cols[e][m], cols[e][m + 1]]);
    if (e < 9) pairs.push([cols[e][m], cols[e + 1][m]]);
  }
  lab.links(group, pairs);
  for (e = 1; e <= 9; e++) for (m = 1; m <= 9; m++) {
    var anchor = (m === 2 || m === 5 || m === 8) && (e === 2 || e === 5 || e === 8);
    lab.point(group, points, cols[e][m], 'Mood ' + m + ' · Energy ' + e + (anchor ? ' · ' + MOENE_NAMES[2 - (e - 2) / 3][(m - 2) / 3][1] : ''), anchor).userData.kind = 'moene grid';
  }
}

export default {
  key: 'field',
  hash: 'grid-field',
  build: function (lab, group) {
    var points = [];
    drawField(lab, group, points);
    return {
      targets: function () { return group.visible ? points : []; },
      apply: function (ui) { group.visible = ui.on('field'); },
    };
  },
};
