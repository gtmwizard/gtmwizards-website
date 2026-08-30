# CLAUDE.md: working agreement for this project

Instructions for Claude when working on gtmwizards-website. Read this
before making changes or delivering builds.

## Delivery format

Every delivery is a **tarball** (`.tar.gz`), never a zip.

### Tarball naming convention

```
gtmwizards-website-<YYYYMMDD>-<HHMM>.tar.gz
```

- `<YYYYMMDD>-<HHMM>`, date and time of the drop, Germany time zone.
- Example: `gtmwizards-website-20260822-1050.tar.gz`

The unique name matters: the file lands in `~/Downloads`, and macOS
renames duplicate filenames to `file (1).tar.gz`, which silently breaks
copy-pasted commands. Never reuse a tarball name.

### Tarball contents

- One top-level folder `gtmwizards-website/`.
- Exclude: `node_modules/`, `dist/`, `.astro/`, `.env`.
- Must build cleanly (`npm run build`) before delivery.

## How to give copy-pastable commands

Assumptions that always hold:
- The tarball is in `~/Downloads`.
- The terminal is already `cd`'d into the project root.
- The machine is a Mac (zsh).

Rules:
1. One single fenced `bash` block, everything pastable in one go.
2. First line extracts with the **exact versioned filename**:
   `tar -xzf ~/Downloads/gtmwizards-website-<YYYYMMDD>-<HHMM>.tar.gz --strip-components=1`
3. Include `npm install` **only** when dependencies changed, and say so.
4. Last line is `npm run dev` (or `npm run build` if that is the point).
5. No `cd` commands, no `sudo`, no `git` unless explicitly relevant.
6. After the block, at most 1 or 2 sentences on what to verify.

## Git workflow

The repo lives at https://github.com/gtmwizard/gtmwizards-website and
auto-deploys to Cloudflare Pages on push to `main`.

After extracting each tarball, the update ritual is:

```
git add -A
git commit -m "Drop <YYYYMMDD>-<HHMM> from Claude"
git push
```

Rules for Claude:
- Remind about the commit step when delivering a drop, but keep the
  extract commands and the git commands in SEPARATE blocks (extraction
  must stay pastable on its own).
- Never include `git push --force` or history rewrites in instructions.
- Assume pushes to `main` deploy to production immediately.

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
