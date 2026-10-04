# Tech

Stack, infrastructure, and architectural decisions. The "how it
runs" layer — what's used to build and operate the product.
Product / business / UX live in their own sections.

## Current stack

Eleventy 3, plain CSS, native ES modules (no bundler) for the lab pages, Three.js r128 vendored in `web/assets/vendor/three/`. The learning pages are React 19 + Tailwind 4 islands (`apps/learn/`, Vite 8 -> `web/assets/learn/`, gitignored, rebuilt by `npm run build`). Hosted on Cloudflare Workers Static Assets: worker `color-ontology`, route `color.isayenko.net` (`custom_domain = true`). Node >= 22.9.

## Common slots

Don't pre-create — extract on first real entry. See
[Section, file, folder](../README.md#section-file-folder).

- **`stack.md`** — the v1 stack: framework, hosting, storage,
  payments, language, etc., with rationale per pick.
- **`architecture.md`** — system overview, data flow, key
  components.
- **`decisions.md`** (or **`decisions/<slug>.md`** if a single
  decision warrants its own file) — ADRs. Substantive
  architectural decisions with date, alternatives considered,
  rationale. Don't delete superseded decisions — strikethrough
  and add the new one underneath.

## Open questions

- Add CI (push to `main` -> build, test, deploy) like the homepage, or keep manual deploys.
- Run the browser smoke test (`test/lab-smoke.mjs`) in CI; it needs Chromium via Playwright.
