import { hexRgb } from './colour.js';
import { CAPSULE, SHADES } from './palettes.js';

var $ = function (id) { return document.getElementById(id); };
var NEUTRALS = CAPSULE.neutrals, FAMILIES = CAPSULE.families;
function drawCapsule(lab, group, labels, points, cloudPoints, st) {
  var list = [], rgbOf = {}, meshOf = {}, shades = SHADES;
  try { list = JSON.parse(($('capsule-data') || {}).textContent || '[]'); } catch (e) {}
  var extra = {};
  if (list.length) (shades.extras || []).forEach(function (c) { extra[c.name] = true; list.push(c); });
  list.forEach(function (c) {
    if (!/^#[0-9a-f]{6}$/i.test(c.hex || '')) return;
    rgbOf[c.name] = hexRgb(c.hex);
    var s = meshOf[c.name] = lab.point(group, points, rgbOf[c.name], extra[c.name] ? c.name + ' (illustrative, not in the inventory)' : c.name, true);
    s.userData.kind = 'Capsule palette';
    var t = lab.label(c.name, '#111111', 0.05);
    t.position.copy(s.position).add(new lab.THREE.Vector3(0, 0.07, 0));
    labels.add(t);
  });
  var has = function (n) { return !!rgbOf[n]; };
  var d2 = function (a, b) { return a.reduce(function (s, v, k) { return s + (v - b[k]) * (v - b[k]); }, 0); };
  var nearest = function (rgb, names) { return names.filter(has).sort(function (a, b) { return d2(rgb, rgbOf[a]) - d2(rgb, rgbOf[b]); })[0]; };
  var pairs = [];
  function chain(names) { names = names.filter(has); for (var i = 1; i < names.length; i++) pairs.push([rgbOf[names[i - 1]], rgbOf[names[i]]]); }
  chain(NEUTRALS);
  FAMILIES.forEach(function (f) {
    chain(f.chain);
    (f.attach || []).filter(has).forEach(function (n) { var to = nearest(rgbOf[n], f.chain); if (to) pairs.push([rgbOf[n], rgbOf[to]]); });
    var tail = f.chain.filter(has).pop(), axis = tail && nearest(rgbOf[tail], NEUTRALS);
    if (axis) pairs.push([rgbOf[tail], rgbOf[axis]]);
  });
  (shades.bridges || []).forEach(chain);
  if (pairs.length) lab.links(group, pairs);
  var clouds = {};
  Object.keys(shades.clouds || {}).filter(function (a) { return has(a) && (shades.clouds[a] || []).length; }).forEach(function (anchor) {
    var g = new lab.THREE.Group(), pts = [], spokes = [];
    shades.clouds[anchor].forEach(function (sh) {
      var rgb = hexRgb(sh[1]);
      lab.point(g, pts, rgb, sh[0] + ' (illustrative)', false).userData.kind = 'shade cloud of ' + anchor;
      spokes.push([rgb, rgbOf[anchor]]);
    });
    lab.links(g, spokes, 0.35);
    g.visible = st.openClouds.indexOf(anchor) >= 0;
    group.add(g);
    clouds[anchor] = { group: g, points: pts };
    meshOf[anchor].userData.onClick = function () { g.visible = !g.visible; sync(); st.save(); };
  });
  function sync() {
    st.openClouds = Object.keys(clouds).filter(function (a) { return clouds[a].group.visible; });
    cloudPoints.length = 0;
    st.openClouds.forEach(function (a) { Array.prototype.push.apply(cloudPoints, clouds[a].points); });
  }
  sync();
}

export default {
  key: 'capsule',
  hash: 'capsule-palette',
  build: function (lab, group, ctx) {
    var labels = new lab.THREE.Group(), points = [], clouds = [];
    group.add(labels);
    drawCapsule(lab, group, labels, points, clouds, ctx.st);
    return {
      targets: function () { return group.visible ? points.concat(clouds) : []; },
      apply: function (ui) { group.visible = ui.on('capsule'); labels.visible = ui.on('axes'); },
    };
  },
};
