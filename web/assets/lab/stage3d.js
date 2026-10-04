import { rgbHex } from './colour.js';
var $ = function (id) { return document.getElementById(id); };

function createStage(o) {
  var p = o.prefix, stage = $(p + '-stage');
  if (!stage) return null;
  if (!window.THREE) {
    stage.insertAdjacentHTML('beforeend', '<p class="cube-error">The 3D view did not load. Reload the page to try again.</p>');
    return null;
  }
  var THREE = window.THREE;
  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.outputEncoding = THREE.sRGBEncoding;
  stage.insertBefore(renderer.domElement, stage.firstChild);
  var scene = new THREE.Scene();
  var FOV = 32, zoom = 1;
  var camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
  // a narrower lens from farther back keeps the framing but flattens the perspective
  function lens(f) {
    camera.fov = f || FOV;
    camera.updateProjectionMatrix();
    zoom = Math.tan(FOV * Math.PI / 360) / Math.tan(camera.fov * Math.PI / 360);
  }
  var world = new THREE.Group();
  scene.add(world);
  scene.add(new THREE.AmbientLight(0xffffff, 0.78));
  var sun = new THREE.DirectionalLight(0xffffff, 0.32);
  sun.position.set(3, 5, 4);
  scene.add(sun);
  // every overlay line shares this one colour, the page's muted ink, so they all follow the theme at once
  var ink = new THREE.Color();
  function setTheme() {
    var cs = getComputedStyle(stage);
    scene.background = new THREE.Color(cs.backgroundColor || '#e2dac6');
    ink.setStyle(cs.getPropertyValue('--muted').trim() || '#555555').convertSRGBToLinear();
  }
  setTheme();

  function label(text, colour, height) {
    var cv = document.createElement('canvas');
    var g = cv.getContext('2d');
    var font = '500 64px Inter, system-ui, sans-serif';
    g.font = font;
    cv.width = Math.max(256, Math.ceil(g.measureText(text).width) + 24); cv.height = 128;
    g.font = font;
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.lineWidth = 10; g.strokeStyle = 'rgba(255,255,255,.85)'; g.strokeText(text, cv.width / 2, 64);
    g.fillStyle = colour; g.fillText(text, cv.width / 2, 64);
    var tex = new THREE.CanvasTexture(cv);
    tex.encoding = THREE.sRGBEncoding;
    var s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true }));
    var h = height || 0.11;
    s.scale.set(h * cv.width / 128, h, 1);
    s.renderOrder = 10;
    return s;
  }
  var lin = function (rgb) { return new THREE.Color(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255).convertSRGBToLinear(); };
  var dot = new THREE.SphereGeometry(0.014, 12, 8), big = new THREE.SphereGeometry(0.034, 20, 14), ring = new THREE.SphereGeometry(0.042, 20, 14);
  function point(group, points, rgb, text, ringed, scale) {
    var s = new THREE.Mesh(ringed ? big : dot, new THREE.MeshBasicMaterial({ color: lin(rgb) }));
    s.position.copy(o.pos(rgb));
    if (scale) s.scale.setScalar(scale);
    s.userData = { rgb: rgb, label: text };
    group.add(s);
    points.push(s);
    if (ringed) {
      var r = new THREE.Mesh(ring, new THREE.MeshBasicMaterial({ color: 0x3a4a4e, side: THREE.BackSide }));
      r.position.copy(s.position); r.scale.copy(s.scale); group.add(r);
      s.userData.ring = r;
    }
    return s;
  }
  function links(group, pairs, opacity, steps) {
    var pos = [], n = steps || 1;
    pairs.forEach(function (ab) {
      for (var i = 0; i < n; i++) [i, i + 1].forEach(function (j) {
        var q = o.pos(ab[0].map(function (v, k) { return v + (ab[1][k] - v) * j / n; }));
        pos.push(q.x, q.y, q.z);
      });
    });
    var lines = new THREE.BufferGeometry();
    lines.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    var mat = new THREE.LineBasicMaterial();
    mat.color = ink;
    if (opacity != null) { mat.transparent = true; mat.opacity = opacity; mat.depthWrite = false; }
    var seg = new THREE.LineSegments(lines, mat);
    group.add(seg);
    return seg;
  }

  var dimmed = false, blank = [];
  function fade(m, on) {
    var d = m.userData.dim0;
    if (on && !d) {
      m.userData.dim0 = { o: m.opacity, t: m.transparent, w: m.depthWrite };
      m.opacity *= 0.15; m.transparent = true; m.depthWrite = false; m.needsUpdate = true;
    } else if (!on && d) {
      m.opacity = d.o; m.transparent = d.t; m.depthWrite = d.w; m.needsUpdate = true;
      delete m.userData.dim0;
    }
  }
  function reconcile(obj, keep) {
    keep = keep || !dimmed || obj.userData.keep;
    if (obj.material) [].concat(obj.material).forEach(function (m) { fade(m, !keep); });
    obj.children.forEach(function (c) { reconcile(c, keep); });
  }
  function dim(on) { dimmed = !!on; reconcile(world, false); }

  var ISO = o.view;
  var yaw = ISO[0], pitch = ISO[1], dist = ISO[2];
  function place() {
    camera.position.set(dist * Math.cos(pitch) * Math.sin(yaw), dist * Math.sin(pitch), dist * Math.cos(pitch) * Math.cos(yaw));
    camera.lookAt(0, 0, 0);
  }
  var ptrs = new Map(), pinch0 = 0, dist0 = dist, tap = null;
  stage.addEventListener('pointerdown', function (e) {
    stage.setPointerCapture(e.pointerId);
    ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
    tap = ptrs.size === 1 && e.button === 0 ? { id: e.pointerId, x: e.clientX, y: e.clientY } : null;
    if (ptrs.size === 2) {
      var v = Array.from(ptrs.values());
      pinch0 = Math.hypot(v[0].x - v[1].x, v[0].y - v[1].y); dist0 = dist;
    }
  });
  stage.addEventListener('pointermove', function (e) {
    hover(e);
    var q = ptrs.get(e.pointerId);
    if (!q) return;
    if (tap && Math.hypot(e.clientX - tap.x, e.clientY - tap.y) > 5) tap = null;
    if (ptrs.size === 2) {
      q.x = e.clientX; q.y = e.clientY;
      var v = Array.from(ptrs.values()), d = Math.hypot(v[0].x - v[1].x, v[0].y - v[1].y);
      if (pinch0) dist = Math.max(1.6 * zoom, Math.min(8 * zoom, dist0 * pinch0 / d));
      return;
    }
    yaw -= (e.clientX - q.x) * 0.008;
    pitch = Math.max(-1.45, Math.min(1.45, pitch + (e.clientY - q.y) * 0.008));
    q.x = e.clientX; q.y = e.clientY;
  });
  function up(e) {
    ptrs.delete(e.pointerId);
    if (ptrs.size < 2) pinch0 = 0;
    if (e.type === 'pointerup' && tap && tap.id === e.pointerId) click(e);
    tap = null;
  }
  stage.addEventListener('pointerup', up);
  stage.addEventListener('pointercancel', up);
  stage.addEventListener('pointerleave', function () { if (!ptrs.size) { tip(pinned); setHovered(null); } });
  stage.addEventListener('wheel', function (e) {
    e.preventDefault();
    dist = Math.max(1.6 * zoom, Math.min(8 * zoom, dist * Math.exp(e.deltaY * 0.0012)));
  }, { passive: false });

  var ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  function pick(e) {
    var r = renderer.domElement.getBoundingClientRect();
    ndc.set((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    var hits = ray.intersectObjects(o.targets(), false).filter(function (h) { return h.object.visible; }), best = null, bd = Infinity, v = new THREE.Vector3();
    for (var i = 0; i < hits.length && !hits[i].object.userData.colours; i++) {
      hits[i].object.getWorldPosition(v).project(camera);
      var d = Math.pow((v.x - ndc.x) * r.width, 2) + Math.pow((v.y - ndc.y) * r.height, 2);
      if (d < bd) { bd = d; best = hits[i]; }
    }
    return best || hits[0];
  }
  function click(e) {
    var hit = pick(e), fn = hit && hit.object.userData.onClick;
    if (fn) fn(); else blank.forEach(function (f) { f(); });
    hover(e);
  }
  var hovered = null, pinned = null;
  function setHovered(obj) {
    if (obj === hovered) return;
    if (hovered && hovered.userData.onHover) hovered.userData.onHover(false);
    hovered = obj;
    if (obj && obj.userData.onHover) obj.userData.onHover(true);
  }
  // the hint names the point under the pointer, else the pinned one: its coordinates, its name and what it is
  function hover(e) {
    var hit = pick(e);
    var rgb = null;
    if (hit && hit.object.userData.colours) rgb = hit.object.userData.colours[hit.instanceId];
    else if (hit) rgb = hit.object.userData.rgb;
    setHovered(hit && !hit.object.userData.colours ? hit.object : null);
    stage.style.cursor = hit && hit.object.userData.rgb && !ptrs.size ? 'pointer' : '';
    tip(rgb ? hit.object : pinned, rgb);
  }
  function tip(obj, rgb) {
    rgb = rgb || (obj && obj.userData.rgb);
    if (!rgb) { $(p + '-tip').hidden = true; return; }
    var hex = rgbHex(rgb), d = obj.userData;
    var extra = (d.label && d.label !== hex ? ' · ' + d.label : '') + (d.kind ? ' · ' + d.kind : '');
    $(p + '-tip-sw').style.background = hex;
    $(p + '-tip-hex').textContent = hex;
    $(p + '-tip-rgb').textContent = o.describe(rgb) + extra;
    $(p + '-tip').hidden = false;
  }

  function start() {
    function resize() {
      var w = stage.clientWidth, h = stage.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    new ResizeObserver(resize).observe(stage);
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    var dark = window.matchMedia('(prefers-color-scheme: dark)');
    if (dark.addEventListener) dark.addEventListener('change', setTheme);
    var last = performance.now();
    function frame(t) {
      var dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      // On / the hidden view has no box: skip it until it is shown.
      if (!stage.clientWidth || !stage.clientHeight) { requestAnimationFrame(frame); return; }
      if (o.spinning() && !ptrs.size && !reduce.matches) yaw += dt * 0.18;
      place();
      if (dimmed) reconcile(world, false);
      renderer.render(scene, camera);
      requestAnimationFrame(frame);
    }
    resize();
    requestAnimationFrame(frame);
  }

  return {
    THREE: THREE, world: world, label: label, lin: lin, point: point, links: links, start: start, dim: dim,
    onBlank: function (f) { blank.push(f); },
    pin: function (obj) { pinned = obj; if (!hovered) tip(obj); },
    view: function (y, pt, d, fov) { lens(fov); yaw = y; pitch = pt; dist = (d == null ? ISO[2] : d) * zoom; },
    reset: function () { lens(); yaw = ISO[0]; pitch = ISO[1]; dist = ISO[2]; },
  };
}

export { createStage };
