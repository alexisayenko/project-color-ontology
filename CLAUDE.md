# CLAUDE.md

Fast-path context for Claude Code. Full human-oriented docs:
[docs/](docs/).

## Key principle

> Order colour so that every claim about it can be checked in numbers.

A colour has a place in each coordinate system (sRGB, OKLCH, hue wheel) and a name in each naming system (CSS, Munsell, ISCC-NBS). Views and names are generated from the maths and tested against reference values, not hand-listed; prose describes what the page shows.

## Product

A personal, public, interactive study of colour ordering. Visitors turn and slice the RGB cube, switch to OKLCH or the hue wheel, and read colour names. No accounts, no monetization; it moved here from the homepage Lab (isayenko.net).

## Tech stack

Eleventy 3 static site (markdown + Nunjucks), plain CSS, native ES modules, vendored Three.js. Deployed to Cloudflare Workers Static Assets at color.isayenko.net (`wrangler.toml`, `custom_domain = true`; `npm run deploy`, needs Node >= 22.9 and a Cloudflare token). No CI yet.

## Repo

[alexisayenko/project-color-ontology](https://github.com/alexisayenko/project-color-ontology) (public). SSH auth.

## Where to look for more

- [README.md](README.md) — repo entry point + structure
- [docs/README.md](docs/README.md) — docs subtree map
- [docs/tech/README.md](docs/tech/README.md) — stack and open questions
- [docs/milestones.md](docs/milestones.md) — dated events
