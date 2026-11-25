# CLAUDE.md: working agreement for this project

Instructions for Claude when working on gtmwizards-website. Read this
before making changes or delivering builds.

## How we work (since 2026-11-25)

Claude works on this repo directly from Claude Code, started in the hubsell
workspace folder (`~/Coding/hubsell`). The tarball drops from claude.ai chats
are retired. The plan for this site is
`.claude/skills/plans/gtmwizards-launch.md` (Jira epic HUB-792).

- The repo is https://github.com/gtmwizard/gtmwizards-website. Every push to
  `main` deploys production on Cloudflare Pages; other branches get preview
  deployments.
- Work on a branch named after the Jira ticket, e.g.
  `feature/HUB-793-done-for-you-copy`. Commit locally; ask Karan before
  pushing. Karan alone merges and deploys this site.
- Before every commit: `npm run check:dashes` and `npm run build` must pass.
- Never start the dev server; give Karan the command (`npm run dev`).
- Never `git push --force` or rewrite history.

## Project conventions

- All copy lives in `src/data/*.ts`, components are dumb renderers.
  Never hard-code copy inside components.
- Colours and radii come from the token layer in `src/styles/global.css`
  (green `#17E769` accent, plum `#2B0A33` dark sections, ink `#0C0D0E`,
  Instrument Sans). Never hard-code a colour in a component; add a token
  or alias instead. Two rules that are easy to break: white on green
  fails at 1.66:1, and green fails as type on white. On light surfaces
  the accent is plum; green appears there only as a fill.
- The site supports **light and dark mode**. The toggle sits in the nav and
  the choice is stored in `localStorage`, defaulting to the system
  preference, applied before first paint by an inline script in
  `BaseLayout`. Band rhythm comes from `.section--dark`, which repaints its
  own tokens: on light it is the dark beat against white, on dark it is the
  lighter beat against ink. Anything new must be checked in both modes.
- **All motion lives in `src/scripts/motion.ts`.** Components get a hook
  attribute, never a duration or a delay. Never hide content behind JS
  without the `data-motion` fallback timer described in `docs/HANDOFF.md`.
  `REVEAL` in `motion.ts` and the matching selector list in `global.css`
  must stay in sync.
- **British English.** The site is English only, `lang="en-GB"`. Use -ise
  endings, "programme", "licence" as a noun. There is no i18n layer; do not
  reintroduce one without reading `docs/TRANSLATION-ROUTES.md`.
- **German is an offer, not a frame.** It belongs in `LanguageEdge.astro` and
  nowhere else. Do not thread "native German" back through the hero, the
  datasheet, the pillars or the signal examples.
- **No em dashes and no en dashes anywhere.** Use commas, colons,
  periods or parentheses, and write ranges out ("days 1 to 2"). Run
  `npm run check:dashes` before every drop; it exits non-zero on a hit.
- Asset URLs go through `asset()` in `src/data/assets.ts` (R2-backed).
- New long-form content: markdown in `src/content/insights/` or
  `src/content/glossary/`.
- i18n: English is source of truth. Translations follow the hubsell
  pattern (see docs/HANDOFF.md → i18n).
- Keep docs/HANDOFF.md and docs/SITEMAP.md up to date with every drop
  that changes architecture, routes, or launch TODOs.
