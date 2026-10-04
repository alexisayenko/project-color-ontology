import { hexRgb, rgbHex, LATTICE, GRID, onLattice, canonical, cell, classify, MIXES, CELLS } from './colour.js';
import { WHEEL, LATTICE_NAMES, kind } from './palettes.js';
import { labelFor } from './names.js';

// / inlines web/_data/colourNames.json. It is generated, so a missing file simply
// leaves the hex standing. Labels say standard namings only; the lattice names are not shown.
var NAMED = (function () {
  var el = document.getElementById('colour-names-data');
  try { return (el && JSON.parse(el.textContent)) || {}; } catch (e) { return {}; }
})();
function colourLabel(hex, mode) { return labelFor(NAMED, hex, mode); }
function drawLattice(lab, group, labels, points, steps) {
  var names = {}, nodes = {}, all = [], pairs = [];
  var focus = null, lines = null, frame = null, active = [], base = 'show', mode = 'hex', hooks = [], by = 'lines', kept = null;
  LATTICE_NAMES.forEach(function (c) { names[c[1]] = c[0]; });
  Object.keys(WHEEL).forEach(function (g) { WHEEL[g].forEach(function (c) { names[c[1]] = c[0]; }); });
  var key = function (c) { return c.join(','); };
  GRID.filter(onLattice).forEach(function (c) {
    [0, 1, 2].forEach(function (k) {
      if (c[k] === 255) return;
      var d = c.slice();
      d[k] = LATTICE[LATTICE.indexOf(c[k]) + 1];
      pairs.push([c, d]);
    });
  });
  // every line takes the one muted ink but those leaving the black or the white corner, drawn opaque in
  // that corner's colour: out of the corner itself, or along the three cube edges from it, black to a
  // primary and white to a secondary. A segment lies on such an edge when the two channels it keeps fixed
  // are both 0, or both 255. The grey axis is drawn in two halves, so each leaves only one corner
  var CORNERS = [[0, new lab.THREE.Color(0, 0, 0)], [255, new lab.THREE.Color(1, 1, 1)]];
  var leaves = function (ab, x) {
    var at = function (c) { return c.every(function (v) { return v === x; }); };
    return at(ab[0]) || at(ab[1]) || ab[0].filter(function (v, k) { return v === x && ab[1][k] === x; }).length === 2;
  };
  // the cube edge a segment runs along, if any: one channel varies, the other two sit at 0 or 255
  var edgeOf = function (ab) {
    var k = ab[0].map(function (v, i) { return v === ab[1][i] ? v : '*'; });
    return k.filter(function (v) { return v === '*'; }).length === 1 && k.every(function (v) { return v === '*' || v === 0 || v === 255; }) ? k.join() : null;
  };
  function draw(g, ends, opacity, n, colour) {
    g.userData.ends = ends;
    if (colour) { lab.links(g, ends, null, n).material.color = colour; return; }
    var rest = ends.filter(function (ab) { return !CORNERS.some(function (c) { return leaves(ab, c[0]); }); });
    if (rest.length) lab.links(g, rest, opacity, n);
    CORNERS.forEach(function (c) {
      var edge = ends.filter(function (ab) { return leaves(ab, c[0]); });
      if (edge.length) lab.links(g, edge, null, n).material.color = c[1];
    });
  }
  var web = new lab.THREE.Group();
  draw(web, pairs, null, steps);
  group.add(web);
  function guide(ends, colour) {
    var g = new lab.THREE.Group();
    draw(g, ends, null, steps && steps * 4, colour);
    g.userData.keep = true;
    group.add(g);
    return g;
  }
  var mixes = [];
  WHEEL.secondaries.forEach(function (s) {
    var sc = hexRgb(s[1]);
    WHEEL.primaries.forEach(function (p) {
      var pc = hexRgb(p[1]);
      if (pc.every(function (v, k) { return v <= sc[k]; })) mixes.push([pc, sc]);
    });
  });
  var MIDGREY = [128, 128, 128];
  var mix = guide(mixes), grey = guide([[[0, 0, 0], MIDGREY], [MIDGREY, [255, 255, 255]]]);
  // every tint is a hue mixed toward white, so it lies on a ray from the white corner through it to that hue,
  // every shade on one from black, and every light tone, tone and dark tone on one from silver, mid grey and
  // dark grey; the tone of a tint or a shade lies on the line from mid grey to that tint, keeping its
  // whiteness, or to that shade, keeping its blackness. Each ray is drawn in the colour it starts from, and
  // each mix cell draws the rays through its own points; those of the primaries' shades are the cube edges
  // from black. In OKLCH the same mixes curve.
  var ray = function (k) { return [k.grey, k.from || k.hue]; };
  var rays = {};
  CELLS.rows.forEach(function (r) {
    CELLS.cols.forEach(function (col) {
      var k = r + '-' + col, ends = GRID.filter(function (c) { return cell(c) === k && classify(c).grey; }).map(function (c) { return ray(classify(c)); });
      if (ends.length) rays[k] = guide(ends, lab.lin(ends[0][0]));
    });
  });
  function show(n) {
    // a name or a canonical mix decides which points are labelled at all; the name is never displayed
    var text = colourLabel(n.hex, mode);
    var on = !!text && !n.hidden && (n.named || n.hover || n.tagged);
    if (n.label && n.label.userData.text !== text) {
      labels.remove(n.label);
      n.label.material.map.dispose(); n.label.material.dispose();
      n.label = null;
    }
    if (on && !n.label) {
      n.label = lab.label(text, '#111111', n.h);
      n.label.userData.text = text;
      n.label.position.copy(n.s.position).add(new lab.THREE.Vector3(0, n.h + 0.01, 0));
      labels.add(n.label);
    }
    if (n.label) { n.label.visible = on; n.label.userData.keep = n.keep; }
  }
  // a clicked point keeps either the three lattice lines through it, one per channel, right across the cube,
  // with every point on them (a small cube's centre, a tertiary's shade, tint or tone, a light or dark tone, or
  // the tone of a tint or a shade is on none), or its hue's family: the hue, its seven mixes and the five greys
  // they are mixed with, the five rays out of those greys through the half-way mixes to the hue and the two
  // lines from mid grey through the tones of its tint and shade to them, a mix keeping the same as its hue; a
  // grey keeps the five neutrals and the grey axis, and any other point only itself
  function crossing(n) {
    var pts = [n], pairs = [];
    if (onLattice(n.c)) [0, 1, 2].forEach(function (k) {
      LATTICE.forEach(function (v, i) {
        var c = n.c.slice();
        c[k] = v;
        if (v !== n.c[k]) pts.push(nodes[key(c)]);
        if (i) { var b = c.slice(); b[k] = LATTICE[i - 1]; pairs.push([b, c]); }
      });
    });
    return { points: pts, pairs: pairs };
  }
  function family(n) {
    var k = n.k;
    if (!k) return { points: [n] };
    if (!k.hue) return { points: all.filter(function (m) { return m.cell === 'neutrals'; }), axis: true };
    var h = key(k.hue), greys = MIXES.map(function (m) { return [m[1], m[1], m[1]]; });
    var kin = all.filter(function (m) { return m.k && m.k.hue && key(m.k.hue) === h; });
    return {
      points: kin.concat(greys.map(function (g) { return nodes[key(g)]; })),
      rays: kin.filter(function (m) { return m.k.grey; }).map(function (m) { return ray(m.k); }),
    };
  }
  function keep(n, on) { n.keep = n.s.userData.keep = n.s.userData.ring.userData.keep = on; show(n); }
  function refresh() {
    var held = focus ? kept.points : all.filter(function (n) {
      return active.indexOf(n.cell) >= 0;
    });
    var rest = focus && base === 'show' ? 'shade' : base;
    all.forEach(function (n) {
      var on = held.indexOf(n) >= 0;
      n.tagged = on && !!focus;
      n.hidden = !on && rest === 'hide';
      n.s.visible = n.s.userData.ring.visible = !n.hidden;
      keep(n, on);
    });
    web.visible = rest !== 'hide';
    var on = function (k) { return !focus && active.indexOf(k) >= 0; };
    mix.visible = on('primaries-pure') && on('secondaries-pure');
    grey.visible = focus ? !!kept.axis : on('neutrals');
    Object.keys(rays).forEach(function (k) { rays[k].visible = on(k); });
    // the cube frame stands in for each edge no lattice line is drawn along
    if (frame) {
      var hit = {};
      [web, mix, grey, lines].concat(Object.values(rays)).forEach(function (g) {
        if (g && g.visible) g.userData.ends.forEach(function (ab) { hit[edgeOf(ab)] = true; });
      });
      frame.children.forEach(function (e) { e.visible = !hit[e.userData.edge]; });
    }
    lab.dim(rest === 'shade');
    hooks.forEach(function (f) { f(); });
  }
  function setFocus(f) {
    if (lines) {
      group.remove(lines);
      lines.children.forEach(function (l) { l.geometry.dispose(); l.material.dispose(); });
      lines = null;
    }
    focus = f;
    kept = f && (by === 'family' ? family(f) : crossing(f));
    if (f) {
      lines = new lab.THREE.Group();
      lines.userData.keep = true;
      if (kept.pairs) draw(lines, kept.pairs, null, steps);
      (kept.rays || []).forEach(function (r) { draw(lines, [r], null, steps && steps * 4, lab.lin(r[0])); });
      lines.userData.ends = kept.pairs || kept.rays || [];
      group.add(lines);
    }
    refresh();
    lab.pin(f && f.s);
  }
  GRID.forEach(function (c) {
    var hex = rgbHex(c), name = names[hex], canon = canonical(c);
    var main = onLattice(c) || canon;
    var n = { c: c, hex: hex, name: name, named: !!name || canon, cell: cell(c), k: classify(c), keep: false, hover: false, h: main ? 0.06 : 0.05 };
    n.s = lab.point(group, points, c, name || hex, true, main ? 1 : 0.7);
    n.s.userData.kind = kind(c);
    n.s.userData.onClick = function () { setFocus(focus === n ? null : n); };
    n.s.userData.onHover = function (on) { n.hover = on; show(n); };
    nodes[key(c)] = n;
    all.push(n);
  });
  lab.onBlank(function () { if (focus) setFocus(null); });
  return {
    highlight: function (cells, rest, click) {
      active = cells; base = rest;
      if (click === by) return refresh();
      by = click;
      setFocus(focus);
    },
    labels: function (m) { mode = m; all.forEach(show); },
    shown: function (hex) { var n = nodes[key(hexRgb(hex))]; return !!n && !n.hidden; },
    onRefresh: function (f) { hooks.push(f); },
    axis: function () { return grey.visible; },
    frame: function () {
      frame = new lab.THREE.Group();
      GRID.filter(function (c) { return c.every(function (v) { return v === 0 || v === 255; }); }).forEach(function (c) {
        [0, 1, 2].forEach(function (k) {
          if (c[k]) return;
          var d = c.slice(), e = new lab.THREE.Group();
          d[k] = 255;
          draw(e, [[c, d]], 0.45, steps);
          e.userData.edge = edgeOf([c, d]);
          frame.add(e);
        });
      });
      return frame;
    },
  };
}

export { colourLabel };
export default {
  key: 'lattice',
  build: function (lab, group, ctx) {
    var labels = new lab.THREE.Group(), points = [];
    group.add(labels);
    var l = drawLattice(lab, group, labels, points, ctx.steps);
    l.targets = function () { return points; };
    l.apply = function (ui) {
      l.highlight(ui.cells, ['show', 'shade', 'hide'].filter(function (m) { return ui.on('lat-' + m); })[0] || 'show', ui.on('click-family') ? 'family' : 'lines');
      labels.visible = ui.on('axes');
    };
    return l;
  },
};
