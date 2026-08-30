# CLAUDE.md — working agreement for this project

Instructions for Claude when working on gtmwizards-website. Read this
before making changes or delivering builds.

## Delivery format

Every delivery is a **tarball** (`.tar.gz`), never a zip.

### Tarball naming convention

```
gtmwizards-website_<YYYYMMDD>-<N>.tar.gz
```

- `<YYYYMMDD>` — date of the drop.
- `<N>` — drop number that day, starting at 1.
- Example: `gtmwizards-website_20260725-1.tar.gz`

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
1. One single fenced `bash` block — everything pastable in one go.
2. First line extracts with the **exact versioned filename**:
   `tar -xzf ~/Downloads/gtmwizards-website_<YYYYMMDD>-<N>.tar.gz --strip-components=1`
3. Include `npm install` **only** when dependencies changed, and say so.
4. Last line is `npm run dev` (or `npm run build` if that is the point).
5. No `cd` commands, no `sudo`, no `git` unless explicitly relevant.
6. After the block, at most 1–2 sentences on what to verify.

## Git workflow

The repo lives at https://github.com/gtmwizard/gtmwizards-website and
auto-deploys to Cloudflare Pages on push to `main`.

After extracting each tarball, the update ritual is:

```
git add -A
git commit -m "Drop <YYYYMMDD>-<N> from Claude"
git push
```

Rules for Claude:
- Remind about the commit step when delivering a drop, but keep the
  extract commands and the git commands in SEPARATE blocks (extraction
  must stay pastable on its own).
- Never include `git push --force` or history rewrites in instructions.
- Assume pushes to `main` deploy to production immediately.

## Project conventions

- All copy lives in `src/data/*.ts` — components are dumb renderers.
  Never hard-code copy inside components.
- Colors and radii come from the token layer in `src/styles/global.css`
  (shadcn preset b2qMGARRY: olive base, emerald theme, Instrument Sans).
  Never hard-code a color in a component; add a token/alias instead.
- Asset URLs go through `asset()` in `src/data/assets.ts` (R2-backed).
- New long-form content: markdown in `src/content/insights/` or
  `src/content/glossary/`.
- i18n: English is source of truth. Translations follow the hubsell
  pattern (see docs/HANDOFF.md → i18n).
- Keep docs/HANDOFF.md and docs/SITEMAP.md up to date with every drop
  that changes architecture, routes, or launch TODOs.
