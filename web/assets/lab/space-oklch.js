// sRGB in OKLCH: lightness up, chroma outward from the grey axis, hue around it.
import { solidView } from './view-solid.js';
import { oklch } from './colour.js';
import field from './overlay-field.js';
import capsule from './overlay-capsule.js';
import lattice from './overlay-lattice.js';

var K = 2.2;
function at(L, C, H) {
  var a = (H || 0) * Math.PI / 180;
  return new window.THREE.Vector3(C * K * Math.cos(a), L - 0.5, -C * K * Math.sin(a));
}

function axes(view, group) {
  var lab = view.lab, THREE = lab.THREE;
  var grey = new THREE.LineBasicMaterial({ color: 0x555555, transparent: true, opacity: 0.45 });
  var faint = new THREE.LineBasicMaterial({ color: 0x555555, transparent: true, opacity: 0.22 });
  var line = function (pts, mat) { group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat)); };
  var lAxis = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, -0.5, 0), 1.18, 0x555555, 0.06, 0.035);
  group.add(lAxis);
  [['L 1', 0.11, [0, 0.76, 0]], ['L 0.5', 0.07, [-0.13, 0, 0]], ['L 0', 0.07, [-0.11, -0.53, 0]]].forEach(function (t) {
    var s = lab.label(t[0], '#111111', t[1]); s.position.set(t[2][0], t[2][1], t[2][2]); group.add(s);
  });
  [[0.1, faint], [0.2, faint], [0.3, grey]].forEach(function (c) {
    var pts = [];
    for (var d = 0; d <= 360; d += 4) pts.push(at(0, c[0], d));
    line(pts, c[1]);
  });
  line([at(0, 0, 0), at(0, 0.3, 225)], faint);
  [0.1, 0.2, 0.3].forEach(function (C) {
    var s = lab.label('C ' + C, '#444444', 0.06); s.position.copy(at(0, C, 225)).add(new THREE.Vector3(0, -0.05, 0)); group.add(s);
  });
  [['red', 29, '#b3261e'], ['yellow', 110, '#7a6a00'], ['green', 142, '#2e7d32'],
   ['cyan', 195, '#00696f'], ['blue', 264, '#283593'], ['magenta', 328, '#8e1f7a']].forEach(function (h) {
    var s = lab.label(h[0] + ' ' + h[1] + '°', h[2], 0.075);
    s.position.copy(at(0, 0.37, h[1]));
    group.add(s);
    line([at(0, 0.29, h[1]), at(0, 0.32, h[1])], grey);
  });
  // the lightness axis is the grey axis, so its shaft gives way while the neutrals draw it
  return { wire: function (o) { o.lattice.onRefresh(function () { lAxis.line.visible = !o.lattice.axis(); }); } };
}

export function initOklchSolid() {
  solidView({
    prefix: 'ok', store: 'oklch-view', camera: [-0.5, 0.42, 3.9],
    pos: function (rgb) { var o = oklch(rgb); return at(o[0], o[1], o[2]); },
    describe: function (rgb) {
      var o = oklch(rgb);
      return 'L ' + o[0].toFixed(2) + ' · C ' + o[1].toFixed(3) + ' · H ' + (o[2] == null ? '—' : Math.round(o[2]) + '°');
    },
    samples: 'samples', size: 'size',
    place: function (rgb, lo, hi) {
      var o = oklch(rgb), v = [o[0] * 100, o[1], o[2]];
      if (v[0] < lo[0] - 1e-9 || v[0] > hi[0] + 1e-9 || v[1] < lo[1] - 1e-9 || v[1] > hi[1] + 1e-9) return null;
      if (v[2] != null && (v[2] < lo[2] || v[2] > hi[2])) return null;
      return at(o[0], o[1], o[2]);
    },
    shape: function (THREE, N, size) { return new THREE.SphereGeometry(0.32 / N * size, 10, 8); },
    channels: ['l', 'c', 'h'],
    cut: function (a, b, c) {
      if (c === 1) return a.toFixed(2) + '–' + b.toFixed(2);
      if (c === 2) return a + '°–' + b + '°';
      return (a / 100).toFixed(2) + '–' + (b / 100).toFixed(2);
    },
    axes: axes,
    buttons: { 'view-top': function (v) { v.lab.view(0, 1.45); } },
    overlays: [field, capsule, lattice],
    steps: 12,
  });
}
