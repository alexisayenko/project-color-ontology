// /: one page, three views of the same colours. The widgets stay
// in the DOM with their own id prefixes (cube-, ok-, wheel-) and their own scripts;
// this file only shows one pane at a time, copies the shared checkbox, radio and
// Highlight table state across on a switch, keeps ?view= in the URL, and brings up
// the view an in-page link or the URL's hash points into.
export function initViewSwitch() {
  var VIEWS = ['rgb', 'oklch', 'wheel'];
  var panes = {}, view;
  VIEWS.forEach(function (v) { panes[v] = document.querySelector('.cube-lab[data-view="' + v + '"]'); });
  if (VIEWS.some(function (v) { return !panes[v]; })) return;
  var buttons = [].slice.call(document.querySelectorAll('.solid-switch button'));

  // Every checkbox and radio whose data-persist name exists on the other side. Controls
  // with no counterpart — Show subcubes / Show samples, everything the wheel
  // lacks — are skipped and stay per-view. Sliders are left alone: their ranges
  // and meanings differ between the spaces.
  function carry(from, to) {
    [].forEach.call(panes[from].querySelectorAll('input[type=checkbox][data-persist], input[type=radio][data-persist]'), function (src) {
      if (src.type === 'radio' && !src.checked) return;
      var dst = panes[to].querySelector('input[data-persist="' + src.getAttribute('data-persist') + '"]');
      if (!dst || dst.checked === src.checked) return;
      dst.checked = src.checked;
      dst.dispatchEvent(new Event('change', { bubbles: true }));
    });
    var src = panes[from].querySelector('.cube-groups'), dst = panes[to].querySelector('.cube-groups');
    if (src && dst) dst.dispatchEvent(new CustomEvent('cells', { detail: [].map.call(src.querySelectorAll('[data-cell][aria-pressed="true"]'), function (b) { return b.getAttribute('data-cell'); }) }));
  }

  // the view whose pane holds the element a fragment names, if any
  function viewOf(hash) {
    var el = hash.length > 1 && document.getElementById(hash.slice(1)), pane = el && el.closest('.cube-lab');
    return pane ? pane.getAttribute('data-view') : null;
  }

  function show(next, withCarry) {
    if (next !== view) {
      var keep = panes[view].contains(document.activeElement);
      if (withCarry) carry(view, next);
      panes[view].hidden = true;
      panes[next].hidden = false;
      view = next;
      if (keep) {
        var btn = panes[view].querySelector('.solid-switch button[data-view="' + view + '"]');
        if (btn) btn.focus();
      }
    }
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-view') === view)); });
    var url = new URL(location.href), at = viewOf(url.hash);
    if (at && at !== view) url.hash = '';
    if (url.searchParams.get('view') !== view) url.searchParams.set('view', view);
    if (url.href !== location.href) history.replaceState(null, '', url);
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { show(b.getAttribute('data-view'), true); });
  });
  // a link into a hidden pane shows it first, so the browser's own jump lands on a rendered target
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
    var to = viewOf(a.getAttribute('href'));
    if (to && to !== view) show(to, true);
  });
  window.addEventListener('hashchange', function () {
    var to = viewOf(location.hash);
    if (to && to !== view) { show(to, true); document.getElementById(location.hash.slice(1)).scrollIntoView(); }
  });

  var wanted = new URL(location.href).searchParams.get('view'), hashed = viewOf(location.hash);
  if (VIEWS.indexOf(wanted) < 0) wanted = 'rgb';
  // The rgb pane is the one rendered visible. On load each view restores its own
  // saved settings, so the first switch into ?view=oklch must not carry anything.
  view = 'rgb';
  show(hashed || wanted, false);
  if (hashed && hashed !== 'rgb') document.getElementById(location.hash.slice(1)).scrollIntoView();
}
