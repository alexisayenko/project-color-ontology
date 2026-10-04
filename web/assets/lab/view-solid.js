import { createStage } from './stage3d.js';
import { settings, ranges, cellTable } from './controls.js';
import { labelMode } from './names.js';

// One 3D view of / (needs Three.js r128 at /assets/vendor/three/three.min.js), set up by a
// space config (space-rgb.js, space-oklch.js): where a colour sits (pos), where a gamut sample goes or null
// when the cut drops it (place) and its geometry (shape), the cut sliders in lo()/hi() order (channels) and
// their readout (cut), an axes builder that may return { wire(overlays by key), labels(mode) }, extra view
// buttons, and the overlays it draws, each { key, hash?, build(lab, group, ctx) → { targets(), apply(ui), labels?(mode) } }.
export function solidView(c) {
  var p = c.prefix, $ = function (k) { return document.getElementById(p + '-' + k); };
  var stage = $('stage');
  if (!stage) return;
  var root = stage.closest('.cube-lab');
  var st = settings(root, c.store);
  var overlays = [], samples = null;
  var lab = createStage({
    prefix: p,
    view: c.camera,
    pos: c.pos,
    describe: c.describe,
    spinning: function () { return $('spin').checked; },
    targets: function () {
      var t = [];
      overlays.forEach(function (o) { t = t.concat(o.targets()); });
      if (samples && samples.visible) t.push(samples);
      return t;
    },
  });
  if (!lab) return;
  var THREE = lab.THREE, world = lab.world, view = { lab: lab, $: $, st: st };

  var cut = ranges(root, p, c.channels, st, buildSamples);
  function buildSamples() {
    if (samples) { world.remove(samples); samples.geometry.dispose(); samples.material.dispose(); }
    var N = +$('n').value, size = +$(c.size).value, op = +$('op').value;
    var lo = cut.lo(), hi = cut.hi();
    var list = [], where = [];
    for (var i = 0; i < N; i++) for (var j = 0; j < N; j++) for (var k = 0; k < N; k++) {
      var rgb = [i, j, k].map(function (t) { return Math.round(t / (N - 1) * 255); });
      var at = !st.cutNone && c.place(rgb, lo, hi, N);
      if (at) { list.push(rgb); where.push(at); }
    }
    var material = new THREE.MeshLambertMaterial({ transparent: op < 1, opacity: op, depthWrite: op >= 1 });
    samples = new THREE.InstancedMesh(c.shape(THREE, N, size), material, Math.max(1, list.length));
    samples.count = list.length;
    var m = new THREE.Matrix4(), col = new THREE.Color();
    list.forEach(function (rgb, idx) {
      m.makeTranslation(where[idx].x, where[idx].y, where[idx].z);
      samples.setMatrixAt(idx, m);
      col.setRGB(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255).convertSRGBToLinear();
      samples.setColorAt(idx, col);
    });
    samples.instanceMatrix.needsUpdate = true;
    if (samples.instanceColor) samples.instanceColor.needsUpdate = true;
    samples.userData.colours = list;
    world.add(samples);
    samples.visible = $(c.samples).checked;
    $('n-v').textContent = N + ' × ' + N + ' × ' + N + ' = ' + Math.pow(N, 3);
    $(c.size + '-v').textContent = Math.round(size * 100) + '%';
    $('op-v').textContent = Math.round(op * 100) + '%';
    cut.paint(c.cut);
  }

  var axes = new THREE.Group();
  world.add(axes);
  var hooks = c.axes(view, axes) || {};
  var table = cellTable(p, st, apply);
  var ctx = { st: st, steps: c.steps }, byKey = {};
  overlays = c.overlays.map(function (o) {
    var group = new THREE.Group();
    world.add(group);
    return (byKey[o.key] = o.build(lab, group, ctx));
  });
  if (hooks.wire) hooks.wire(byKey);
  c.overlays.forEach(function (o) {
    if (o.hash && location.hash === '#' + o.hash) { $(o.key).checked = true; $(c.samples).checked = false; }
  });

  function apply() {
    var ui = { on: function (k) { return $(k).checked; }, cells: table.selected() };
    var mode = labelMode(function (m) { return ui.on('lbl-' + m); });
    axes.visible = ui.on('axes');
    overlays.forEach(function (o) { if (o.labels) o.labels(mode); o.apply(ui); });
    if (hooks.labels) hooks.labels(mode);
    if (samples) samples.visible = ui.on(c.samples);
  }

  $('view-reset').addEventListener('click', lab.reset);
  Object.keys(c.buttons || {}).forEach(function (b) { $(b).addEventListener('click', function () { c.buttons[b](view); }); });
  st.watch(apply);

  buildSamples();
  apply();
  lab.start();
}
