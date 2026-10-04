// RGB colour cube: N×N×N subcubes, each coloured by its position (x → red, y → green, z → blue);
// the cube spans -0.5…0.5 with black at (-0.5,-0.5,-0.5).
import { solidView } from './view-solid.js';
import field from './overlay-field.js';
import capsule from './overlay-capsule.js';
import lattice, { colourLabel } from './overlay-lattice.js';

var V = function (x, y, z) { return new window.THREE.Vector3(x, y, z); };
var CORNERS = [['#000000', [-0.62, -0.62, -0.62]], ['#ffffff', [0.62, 0.62, 0.62]]];

function axes(view, group) {
  var lab = view.lab, o = V(-0.5, -0.5, -0.5);
  [[V(1, 0, 0), 0xd23b3b, 'R 255', '#b3261e'], [V(0, 1, 0), 0x2f9a4a, 'G 255', '#2e7d32'], [V(0, 0, 1), 0x3b5bd2, 'B 255', '#283593']].forEach(function (a) {
    var arrow = new lab.THREE.ArrowHelper(a[0], o, 1.22, a[1], 0.07, 0.04);
    arrow.line.material.color.setRGB(0, 0, 0);
    group.add(arrow);
    var s = lab.label(a[2], a[3]);
    s.position.copy(o.clone().add(a[0].clone().multiplyScalar(1.33)));
    group.add(s);
  });
  // the two labels at the black and white corners say whatever the colour names say, and stand in
  // for the lattice's own labels there whenever its black or white point is hidden
  var lat = null, shown = null, tags = [];
  function cornerTags() { tags.forEach(function (l, i) { l.visible = !lat.shown(CORNERS[i][0]); }); }
  return {
    wire: function (o) { lat = o.lattice; group.add(lat.frame()); lat.onRefresh(cornerTags); },
    labels: function (mode) {
      if (mode === shown) return;
      shown = mode;
      tags.forEach(function (l) { group.remove(l); l.material.map.dispose(); l.material.dispose(); });
      tags = mode === 'none' ? [] : CORNERS.map(function (c) {
        var s = lab.label(colourLabel(c[0], mode), '#111111');
        s.position.set(c[1][0], c[1][1], c[1][2]);
        group.add(s);
        return s;
      });
      cornerTags();
    },
  };
}

export function initRgbCube() {
  solidView({
    prefix: 'cube', store: 'rgb-cube-view', camera: [-0.72, 0.5, 3.8],
    pos: function (rgb) { return V(rgb[0] / 255 - 0.5, rgb[1] / 255 - 0.5, rgb[2] / 255 - 0.5); },
    describe: function (rgb) { return 'R ' + rgb[0] + ' · G ' + rgb[1] + ' · B ' + rgb[2]; },
    samples: 'cubes', size: 'gap',
    place: function (rgb, lo, hi, N) {
      if (!rgb.every(function (v, c) { return v >= lo[c] && v <= hi[c]; })) return null;
      return V.apply(null, rgb.map(function (v) { return (v / 255 - 0.5) * (1 - 1 / N); }));
    },
    shape: function (THREE, N, size) { var s = size / N; return new THREE.BoxGeometry(s, s, s); },
    channels: ['cr', 'cg', 'cb'],
    cut: function (a, b) { return a + '–' + b; },
    axes: axes,
    buttons: {
      'view-black': function (v) { v.lab.view(Math.PI + Math.PI / 4, -Math.atan(1 / Math.SQRT2)); },
      // from white straight down to black, near-orthographic so the six coloured corners make a regular
      // hexagon; turning would carry the view off the axis at once, so it stops
      'view-grey': function (v) {
        if (v.$('spin').checked) { v.$('spin').checked = false; v.st.save(); }
        v.lab.view(Math.PI / 4, Math.atan(1 / Math.SQRT2), 4.3, 6);
      },
    },
    overlays: [field, capsule, lattice],
    steps: null,
  });
}
