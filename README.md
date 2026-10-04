# Colour Ontology

Ways of ordering screen colour: the RGB cube, OKLCH and the hue wheel as views of the same colours, with names from CSS, Munsell and ISCC-NBS. Live at <https://color.isayenko.net>.

## Pages

- `/` -- Colour solid: one page, three views (RGB cube, OKLCH, wheel), overlays, labels, glossary.
- `/grid-colour-field/` -- nine colours in, a 9x9 mood x energy grid out (the colour field of the moene mood tracker).

## Stack

Eleventy 3 (Nunjucks + markdown), plain CSS, native ES modules with no bundler, Three.js r128 vendored. Hosted on Cloudflare Workers Static Assets (`color-ontology` worker, route `color.isayenko.net`). Needs Node >= 22.9.

```sh
npm install
npm start          # local dev server
npm run build      # -> _site/
npm test           # colour maths + page tests; the browser smoke test skips without Chromium
npm run names      # regenerate web/_data/colourNames.json (--check verifies)
npm run deploy     # build + wrangler deploy (needs CLOUDFLARE_API_TOKEN)
```

## Code map

- `web/index.md`, `web/grid-colour-field.md` -- page prose; `web/_data/colourGlossary.yml` -- glossary; `web/_data/colourSolid.js` -- controls data.
- `web/_includes/lab/` -- controls panes and glossary partials.
- `web/assets/lab/*.js` -- colour maths (`colour.js`, `palettes.js`, `names.js`), views and overlays; `colour-solid.js` is the entry point.
- `scripts/build-colour-names.mjs` + `scripts/data/iscc-nbs.xml` -> `web/_data/colourNames.json`.
- `lib/palette.mjs` -- the capsule-wardrobe swatch set behind the Capsule overlay.

## Structure

### Top-level layout

Folders sort first (alphabetically), then files — VS Code
default.

```text
project-root/
├── archive/                              # obsolete code + docs (single graveyard)
├── docs/                                 # project-level strategy + documentation
├── scripts/                              # cross-cutting build tooling
├── mobile/                               # mobile app (example name)
├── web/                                  # web app or static site (example name)
├── <shared-infra>/                       # e.g. supabase/, prisma/, infra/
├── CLAUDE.md                             # agent-specific guidance (optional)
├── README.md                             # this file — entry point + structure
└── LICENSE                               # license
```

**Don't pre-create empty folders.** Add a folder on the day a
second code folder, archived artifact, or per-folder doc
actually lands — not before. See
[`docs/README.md#section-file-folder`](docs/README.md#section-file-folder)
for the same rule applied inside `docs/`.

### Naming

| Convention | Example | Why |
| --- | --- | --- |
| `kebab-case.md` for documents | `branding.md`, `task-0001.md` | Reads as prose; case-safe across OSes |
| Lowercase folders | `docs/`, `scripts/`, `archive/` | Matches URL paths; case-safe |
| `UPPERCASE.md` only for conventionally recognized files | `README.md`, `CLAUDE.md`, `LICENSE`, `CHANGELOG.md` | Don't invent new uppercase files |

Code folders use their natural name (`mobile/`, `web/`,
`workers/`); see [Overview](#overview).

### Infra at root

Folders sit unprefixed at the root when they apply across the
project:

- **`docs/`** — strategy, product, business, brand
- **`scripts/`** — cross-cutting build tooling (e.g. release-note
  fan-out from `docs/` to multiple code folders)
- **`<shared-infra>/`** — shared backend / infrastructure used
  by multiple code folders (e.g. `supabase/`, `prisma/`,
  `infra/`)

If a script or config touches one code folder only, it lives
with that folder, not at root.

### Ad-hoc root files

Some root files are created on demand, not scaffolded:

- `HANDOVER.md` — open work deferred between sessions. Create
  when you have items to defer; delete when they're all resolved.
  Not a living doc.

### Archive

Single root `archive/` folder for obsolete code and docs. A
`docs/` subfolder inside holds obsolete documentation.

```text
archive/
├── docs/                       # obsolete project-level docs
│   └── <old-doc>.md
└── <old-folder>/               # obsolete code (e.g. v1 prototype)
```

A folder belongs in `archive/` when it **no longer ships**.
Before archiving code, extract any worthwhile lessons or
decisions into `archive/docs/` — code in archive rots; docs
survive.

`archive/` doesn't exist by default. Create on first retirement.

## Documentation

See [`docs/README.md`](docs/README.md) for:

- Why this folder is called `docs/` and not `specs/`
- Product overview
- Guiding principle: strategy at root vs per-folder
- Top-level glossary + the four-level chain (concept → feature →
  screen → journey)
- Concerns (`C1, C2, …`) — cross-cutting work axes that span
  sections; catalogued in [`docs/concerns.md`](docs/concerns.md)
- Entry-doc convention (`<section>/README.md` pattern)
- The `docs/` subtree map and what lives where
- The `Section, file, folder` rule (start small, extract on growth)
- Per-folder `<folder>/docs/` policy
- Multi-product split (rare)
