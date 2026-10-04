import { initRgbCube } from './space-rgb.js';
import { initOklchSolid } from './space-oklch.js';
import { initHueWheel } from './view-wheel.js';
import { initViewSwitch } from './view-switch.js';

[initRgbCube, initOklchSolid, initHueWheel, initViewSwitch].forEach(function (init) {
  try { init(); } catch (e) { setTimeout(function () { throw e; }); }
});
