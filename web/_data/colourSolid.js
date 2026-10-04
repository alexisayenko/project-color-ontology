const shared = {
  views: [
    { id: "rgb", text: "RGB cube" },
    { id: "oklch", text: "OKLCH" },
    { id: "wheel", text: "Wheel" },
  ],
  labelModes: [
    { id: "none", text: "None" },
    { id: "hex", text: "Hex", checked: true },
    { id: "css", text: "CSS" },
    { id: "hwb", text: "HWB" },
    { id: "munsell", text: "Munsell" },
    { id: "iscc", text: "ISCC–NBS" },
  ],
};

const solid = {
  ...shared,
  stageClass: "cube-stage",
  help: true,
  lattice: [
    { id: "show", text: "Show all", checked: true },
    { id: "shade", text: "Shade all" },
    { id: "hide", text: "Hide all" },
  ],
  onClick: [
    { id: "lines", text: "Grid lines", checked: true },
    { id: "family", text: "Hue family" },
  ],
  palettes: [
    { id: "field", text: "moene grid" },
    { id: "capsule", text: "Capsule wardrobe" },
  ],
  viewChecks: [
    { id: "spin", text: "Turn slowly", checked: true },
    { id: "axes", text: "Axes and labels", checked: true },
  ],
};

export default {
  rgb: {
    ...solid,
    view: "rgb",
    prefix: "cube",
    stageLabel: "Rotatable 3D cube of RGB colours",
    showSamples: "cubes",
    sliders: [
      { id: "n", text: "Samples per edge", min: 2, max: 16, step: 1, value: 8 },
      { id: "gap", text: "Sample size", min: 0.3, max: 1, step: 0.05, value: 0.78 },
      { id: "op", text: "Opacity", min: 0.05, max: 1, step: 0.05, value: 1 },
    ],
    axes: [
      { id: "cr", cls: "r", text: "Red", min: 0, max: 255, step: 1 },
      { id: "cg", cls: "g", text: "Green", min: 0, max: 255, step: 1 },
      { id: "cb", cls: "b", text: "Blue", min: 0, max: 255, step: 1 },
    ],
    palettesAnchor: true,
    viewButtons: [
      { id: "view-black", text: "Look from black" },
      { id: "view-grey", text: "Look down the grey axis" },
      { id: "view-reset", text: "Reset view" },
    ],
  },
  oklch: {
    ...solid,
    view: "oklch",
    prefix: "ok",
    hidden: true,
    stageLabel: "Rotatable 3D view of sRGB colours placed in OKLCH space",
    showSamples: "samples",
    sliders: [
      { id: "n", text: "Samples per edge", min: 2, max: 20, step: 1, value: 12 },
      { id: "size", text: "Sample size", min: 0.3, max: 2, step: 0.05, value: 1 },
      { id: "op", text: "Opacity", min: 0.05, max: 1, step: 0.05, value: 1 },
    ],
    axes: [
      { id: "l", cls: "l", text: "Lightness", min: 0, max: 100, step: 1 },
      { id: "c", cls: "c", text: "Chroma", min: 0, max: 0.33, step: 0.01 },
      { id: "h", cls: "h", text: "Hue", min: 0, max: 360, step: 1 },
    ],
    viewButtons: [
      { id: "view-top", text: "Look from above" },
      { id: "view-reset", text: "Reset view" },
    ],
  },
  wheel: {
    ...shared,
    view: "wheel",
    prefix: "wheel",
    hidden: true,
    stageClass: "cube-stage wheel-stage",
    stageLabel: "Flat RGB hue wheel: twelve named hues 30° apart, in three tiers, ringed inward by their tints, light tones, tones of tints, tones, tones of shades, dark tones and shades, with the five neutrals stacked at the centre",
    hues: [
      { cls: "wheel-primary", r: 7.5, fill: "#ff0000", halo: true, text: "Primaries", members: "red, lime, blue" },
      { cls: "wheel-secondary", r: 6.5, fill: "#ffff00", text: "Secondaries", members: "yellow, cyan, magenta" },
      { cls: "wheel-tertiary", r: 4.5, fill: "#ff8000", text: "Tertiaries", members: "orange, chartreuse, spring green, azure, violet, rose" },
    ],
  },
};
