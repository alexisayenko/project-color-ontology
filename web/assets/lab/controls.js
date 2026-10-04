import { CELLS } from './colour.js';

var $ = function (id) { return document.getElementById(id); };

// Every control in root marked data-persist is saved under key, as its data-persist name → value or
// checked, beside the cut and cloud state; a pair named k-lo/k-hi keeps lo ≤ hi, and a lone saved k,
// from when a cut was one slider, is read as its hi. st.watch(f) runs f and saves on every persisted tick.
function settings(root, key) {
  var st = { cutNone: false, openClouds: [] };
  var ctl = [].slice.call(root.querySelectorAll('[data-persist]'));
  var name = function (el) { return el.getAttribute('data-persist'); };
  var tick = function (el) { return el.type === 'checkbox' || el.type === 'radio'; };
  var pairs = ctl.filter(function (el) { return /-lo$/.test(name(el)); }).map(function (lo) {
    var k = name(lo).slice(0, -3);
    return [k, lo, root.querySelector('[data-persist="' + k + '-hi"]')];
  }).filter(function (r) { return r[2]; });
  try {
    var saved = JSON.parse(localStorage.getItem(key) || '{}') || {};
    pairs.forEach(function (r) { if (saved[r[0]] != null && saved[r[0] + '-hi'] == null) saved[r[0] + '-hi'] = saved[r[0]]; });
    ctl.forEach(function (el) {
      var v = saved[name(el)];
      if (tick(el)) { if (typeof v === 'boolean') el.checked = v; } else if (v != null) el.value = v;
    });
    pairs.forEach(function (r) { if (+r[1].value > +r[2].value) r[1].value = r[2].value; });
    st.cutNone = saved.cutNone === true;
    if (Array.isArray(saved.openClouds)) st.openClouds = saved.openClouds.filter(function (n) { return typeof n === 'string'; });
    if (Array.isArray(saved.cells)) st.cells = saved.cells.filter(function (n) { return typeof n === 'string'; });
  } catch (e) {}
  st.save = function () {
    try {
      var s = {};
      ctl.forEach(function (el) { s[name(el)] = tick(el) ? el.checked : el.value; });
      s.cutNone = st.cutNone;
      s.openClouds = st.openClouds;
      if (st.cells) s.cells = st.cells;
      localStorage.setItem(key, JSON.stringify(s));
    } catch (e) {}
  };
  st.watch = function (f) {
    ctl.filter(tick).forEach(function (el) { el.addEventListener('change', function () { f(); st.save(); }); });
  };
  return st;
}

function ranges(root, p, keys, st, rebuild) {
  var el = function (k, end) { return $(p + '-' + k + '-' + end); };
  [].forEach.call(root.querySelectorAll('input[type=range]'), function (s) { s.addEventListener('input', function () { rebuild(); st.save(); }); });
  keys.forEach(function (k) {
    var a = el(k, 'lo'), b = el(k, 'hi');
    a.addEventListener('input', function () { if (+a.value > +b.value) a.value = b.value; st.cutNone = false; }, true);
    b.addEventListener('input', function () { if (+b.value < +a.value) b.value = a.value; st.cutNone = false; }, true);
  });
  [[p + '-cut-all', false], [p + '-cut-none', true]].forEach(function (b) {
    $(b[0]).addEventListener('click', function () {
      keys.forEach(function (k) { var a = el(k, 'lo'); a.value = a.min; el(k, 'hi').value = b[1] ? a.min : a.max; });
      st.cutNone = b[1];
      rebuild();
      st.save();
    });
  });
  return {
    lo: function () { return keys.map(function (k) { return +el(k, 'lo').value; }); },
    hi: function () { return keys.map(function (k) { return +el(k, 'hi').value; }); },
    paint: function (fmt) {
      keys.forEach(function (k, c) {
        var a = el(k, 'lo'), b = el(k, 'hi'), min = +a.min, span = +a.max - min;
        var range = a.parentNode;
        range.style.setProperty('--lo', (+a.value - min) / span * 100 + '%');
        range.style.setProperty('--hi', (+b.value - min) / span * 100 + '%');
        range.classList.toggle('is-none', st.cutNone);
        a.classList.toggle('is-top', +a.value - min > span / 2);
        $(p + '-' + k + '-v').textContent = st.cutNone ? 'none' : fmt(+a.value, +b.value, c);
      });
    },
  };
}

// The Highlight table: one toggle per cell of CELLS, under column headings grouped by the colour each tone
// family starts from; a row, column or group heading toggles its whole line, and Neutrals stands apart. The
// selection lives in st.cells, keeping only cells that exist and hold points, so a saved cell that has since
// gone is dropped; a 'cells' event on the box sets it.
function cellTable(p, st, apply) {
  var C = CELLS, box = $(p + '-groups');
  var NAME = { primaries: 'Primaries', secondaries: 'Secondaries', tertiaries: 'Tertiaries', pure: 'Pure', tint: 'Tint',
    'light-tone': 'Light tone', tone: 'Tone', 'dark-tone': 'Dark tone', shade: 'Shade', 'tone-of-tint': 'Tone of tint',
    'tone-of-shade': 'Tone of shade', neutrals: 'Neutrals' };
  var GROUP = { pure: 'Pure hue', tint: 'Tint', shade: 'Shade' };
  var MIX = { tint: 'white', 'light-tone': 'silver', tone: 'grey', 'dark-tone': 'dark grey', shade: 'black', 'tone-of-tint': 'grey', 'tone-of-shade': 'grey' };
  var cells = C.aside.slice();
  C.rows.forEach(function (r) { C.cols.forEach(function (c) { cells.push(r + '-' + c); }); });
  var live = function (k) { return !!C.count[k]; };
  var sel = (st.cells || []).filter(function (k) { return cells.indexOf(k) >= 0 && live(k); });
  var btn = function (id, html, label) {
    return '<button type="button" id="' + p + '-g-' + id + '" aria-pressed="false"' + (label ? ' aria-label="' + label + '" title="' + label + '"' : '') + '>' + html + '</button>';
  };
  var html = '<table class="cube-gtable"><colgroup></colgroup>' + C.groups.map(function (g) {
    return '<colgroup span="' + g.cols.length + '"></colgroup>';
  }).join('') + '<thead><tr><td></td>' + C.groups.map(function (g) {
    return '<th scope="colgroup" colspan="' + g.cols.length + '">' + btn('group-' + g.id, GROUP[g.id]) + '</th>';
  }).join('') + '</tr><tr><td></td>' + C.cols.map(function (c) {
    return '<th scope="col">' + btn(c, NAME[c] + (MIX[c] ? ' <small>' + MIX[c] + '</small>' : '')) + '</th>';
  }).join('') + '</tr></thead><tbody>' + C.rows.map(function (r) {
    return '<tr><th scope="row">' + btn(r, NAME[r]) + '</th>' + C.cols.map(function (c) {
      var k = r + '-' + c, n = C.count[k] || 0;
      return '<td>' + btn(k, n, NAME[r] + ' · ' + (c === 'pure' ? 'pure hue' : NAME[c].toLowerCase()) + ': ' + n + (n === 1 ? ' point' : ' points')).replace('<button', '<button data-cell="' + k + '"') + '</td>';
    }).join('') + '</tr>';
  }).join('') + '</tbody></table><div class="cube-gaside">' + C.aside.map(function (k) {
    return btn(k, NAME[k] + ' <small>' + (C.count[k] || 0) + '</small>').replace('<button', '<button data-cell="' + k + '"');
  }).join('') + '</div>';
  box.innerHTML = html;
  var lines = {};
  C.rows.forEach(function (r) { lines[r] = C.cols.map(function (c) { return r + '-' + c; }).filter(live); });
  C.cols.forEach(function (c) { lines[c] = C.rows.map(function (r) { return r + '-' + c; }).filter(live); });
  C.groups.forEach(function (g) { lines['group-' + g.id] = [].concat.apply([], g.cols.map(function (c) { return lines[c]; })); });
  function paint() {
    cells.forEach(function (k) { var b = $(p + '-g-' + k); b.setAttribute('aria-pressed', String(sel.indexOf(k) >= 0)); b.disabled = !live(k); });
    Object.keys(lines).forEach(function (l) {
      var n = lines[l].filter(function (k) { return sel.indexOf(k) >= 0; }).length, b = $(p + '-g-' + l);
      b.setAttribute('aria-pressed', n === 0 ? 'false' : n === lines[l].length ? 'true' : 'mixed');
    });
  }
  function set(next) {
    sel = cells.filter(function (k) { return next.indexOf(k) >= 0 && live(k); });
    st.cells = sel;
    paint();
    apply();
    st.save();
  }
  box.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b || b.disabled || !box.contains(b)) return;
    var id = b.id.slice((p + '-g-').length), k = b.getAttribute('data-cell');
    if (k) return set(sel.indexOf(k) >= 0 ? sel.filter(function (x) { return x !== k; }) : sel.concat(k));
    var all = lines[id].every(function (x) { return sel.indexOf(x) >= 0; });
    set(all ? sel.filter(function (x) { return lines[id].indexOf(x) < 0; }) : sel.concat(lines[id]));
  });
  box.addEventListener('cells', function (e) {
    if (e.detail.slice().sort().join() !== sel.slice().sort().join()) set(e.detail);
  });
  st.cells = sel;
  paint();
  return { selected: function () { return sel.slice(); } };
}

export { settings, ranges, cellTable };
