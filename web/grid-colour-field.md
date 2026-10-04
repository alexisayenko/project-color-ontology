---
layout: base.njk
title: Grid colour field
styles: [lab.css]
permalink: /grid-colour-field/
---

# Grid colour field

The mood × energy grid of [moene](https://moene.cc), my mood tracker, has nine regions: mood Bad, Neutral or Good across, energy Low, Normal or High up, each split into 3×3 subcells. Instead of colouring 81 subcells by hand, give it nine colours, one per region, and let a formula fill the rest: every subcell blends the four nearest region colours. Change any of the nine and the whole field follows. Hover or drag across the grid to read a subcell and see what it is made of.

<div class="gf-lab">
<div class="gf-main">
    <section class="panel" aria-labelledby="gf-field-h">
      <p class="eyebrow" id="gf-field-h">The field</p>
      <div class="stage">
        <div class="ylab" aria-hidden="true"><span>High</span><span>Normal</span><span>Low</span></div>
        <div class="field" id="gf-field" role="img" aria-label="The 9 by 9 grid coloured from the nine anchors">
          <canvas id="gf-cv" width="900" height="900"></canvas>
        </div>
        <div class="xlab" aria-hidden="true"><span>Bad</span><span>Neutral</span><span>Good</span></div>
      </div>
      <p class="hint" id="gf-legend"></p>
      <div class="readout" aria-live="polite">
        <div class="sw" id="gf-ro-sw"></div>
        <div>
          <div><b id="gf-ro-pos">Mood 6 · Energy 4</b> <span class="mono" id="gf-ro-hex"></span> <span id="gf-ro-clip"></span></div>
          <div class="w" id="gf-ro-w"></div>
        </div>
      </div>
    </section>
    <section class="panel" aria-labelledby="gf-anch-h">
      <p class="eyebrow" id="gf-anch-h">Nine anchors</p>
      <div class="anchors" id="gf-anchors"></div>
      <div class="opts">
        <div class="opt">
          <span id="gf-edge-l">Edges</span>
          <div class="seg" role="group" aria-labelledby="gf-edge-l" id="gf-edge">
            <button type="button" data-v="B" aria-pressed="true">B · Extrapolate</button>
            <button type="button" data-v="C" aria-pressed="false">C · Anchors at 1·5·9</button>
            <button type="button" data-v="A" aria-pressed="false">A · Clamp</button>
          </div>
          <p class="hint" id="gf-edge-hint"></p>
        </div>
        <div class="opt">
          <span id="gf-space-l">Mixing space</span>
          <div class="seg" role="group" aria-labelledby="gf-space-l" id="gf-space">
            <button type="button" data-v="srgb" aria-pressed="true">sRGB</button>
            <button type="button" data-v="oklab" aria-pressed="false">OKLab</button>
          </div>
        </div>
        <div class="checks">
          <label><input type="checkbox" id="gf-lines" checked> Region lines</label>
          <label><input type="checkbox" id="gf-sub" checked> Subcell lines</label>
          <label><input type="checkbox" id="gf-dots" checked> Mark anchors</label>
          <label><input type="checkbox" id="gf-smooth"> Smooth (no subcells)</label>
        </div>
        <div class="row">
          <button type="button" class="btn primary" id="gf-copy">Copy anchors</button>
          <button type="button" class="btn" id="gf-reset">Reset to moene’s colours</button>
        </div>
        <div class="status" id="gf-status" role="status"></div>
        <pre id="gf-json" hidden></pre>
        <details class="load">
          <summary>Load a palette</summary>
          <label for="gf-load-text" class="hint">Paste anchors copied from here, or nine hex colours in reading order (High row first, Bad → Good).</label>
          <textarea id="gf-load-text" rows="5" spellcheck="false" placeholder='{"anchors":{"high":["#1446ef","#ffffff","#8e2a8c"],"normal":["#6f7f96","#d5d8dc","#fa8072"],"low":["#2e4272","#5b6069","#ffaabd"]}}'></textarea>
          <button type="button" class="btn" id="gf-load">Load</button>
        </details>
        <p class="formula">Each subcell blends the four nearest anchors: <code>(1−x)(1−y)·A₀₀ + x(1−y)·A₀₁ + (1−x)y·A₁₀ + xy·A₁₁</code>. </p>
      </div>
    </section>
  </div>
</div>

## How the field is built

Each region's colour is pinned at its centre subcell (levels 2, 5 and 8 on each axis). For a subcell at mood *m* and energy *e*, from 1 to 9:

1. Turn the position into anchor coordinates: `u = (m − 2) / 3`, `v = (e − 2) / 3`, so 0 is the Bad or Low centre and 2 the Good or High one.
2. Take the four surrounding anchors and the position between them: `x = u − j0`, `y = v − i0`, where `j0` and `i0` are 0 or 1.
3. Mix them, weighting each by closeness, channel by channel:
   `(1−x)(1−y)·A₀₀ + x(1−y)·A₀₁ + (1−x)y·A₁₀ + xy·A₁₁`.

A step along an axis is ⅔ of the near colour and ⅓ of the far one; a step diagonally is 4/9, 2/9, 2/9 and 1/9. Neighbouring subcells always share colours, so no border jumps.

**Edges.** The outer ring lies beyond the outer anchors, so it needs a rule:

- **B · Extrapolate** keeps the gradient going one more step. Each colour stays exact at its region's centre, and the corners get the most intense colours, but some fall outside what a screen can show and are clipped (marked in red).
- **C · Anchors at 1 · 5 · 9** pins the colours to the grid's corners, edge middles and centre instead, so everything in between is a blend and nothing clips; a corner region's centre keeps only 9/16 of its colour.
- **A · Clamp** repeats the last colour outward, leaving flat corners.

**Mixing space.** sRGB mixes the screen's red, green and blue numbers directly. OKLab mixes in a space built to match how we see, so in-between colours stay clean instead of going muddy.

See moene's palette as a sheet folded through colour space: [the grid colour field inside the RGB cube](/?view=rgb#grid-field).

## Any palette

The formula does not care which nine colours it gets, so trying a new palette is just choosing nine colours.

1. **Pick or paste them.** Use the nine pickers, or open *Load a palette* and paste nine hex colours in reading order (the High row first, each row Bad → Good), or the JSON that *Copy anchors* gives:
   ```json
   {
     "edges": "B",
     "space": "srgb",
     "anchors": {
       "high": ["#1446ef", "#ffffff",
                "#8e2a8c"],
       "normal": ["#6f7f96", "#d5d8dc",
                  "#fa8072"],
       "low": ["#2e4272", "#5b6069",
               "#ffaabd"]
     }
   }
   ```
2. **Look at the edges.** Colours near black, white or a pure primary leave the outward subcells no room, and option B clips them; switch to C or OKLab to compare.
3. **Check it reads.** Neighbouring regions should differ in lightness, not only hue, so the grid still works in greyscale and for colour-blind eyes.
4. **Keep it.** *Copy anchors* returns the nine colours and options as JSON. The page also remembers your last palette in this browser.

The full specification, with a reference implementation and test values, lives in moene's design documentation.

<script type="module" src="/assets/grid-colour-field.js?v={{ buildId }}"></script>
