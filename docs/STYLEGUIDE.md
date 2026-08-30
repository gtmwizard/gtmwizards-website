# Style guide, gtmwizards.com

How the site looks and sounds, and the rules that keep it consistent. If
you are adding a section or a page, read this first. The working agreement
for delivery lives in `CLAUDE.md`; the architecture lives in
`docs/HANDOFF.md`.

The site is **light mode only**. There is no dark-mode toggle.

## 1. Colour

Three colours carry the brand. Everything else is a neutral.

| Token | Value | What it is for |
| --- | --- | --- |
| `--green` | `#17E769` | The accent. **Fills only.** Buttons, spark motifs, status dots on dark bands. |
| `--green-hover` | `#12C95B` | Pressed and hover state for green fills. |
| `--green-deep` | `#0A7A40` | The only green safe as type on white, 5.4:1. |
| `--plum-deep` | `#2B0A33` | Dark bands: hero, signal funnel, graduation path, CTA. |
| `--plum` | `#7A2A8C` | Links and accents on light surfaces, 8.3:1. |
| `--lilac` | `#C9A6D6` | Eyebrows and secondary type on dark bands. |
| `--foreground` | `#0C0D0E` | Ink. All body and heading type on light surfaces. |
| `--footer-bg` | `#0C0D0E` | Footer, ink rather than plum so it separates from a plum CTA above it. |

### The two rules that are easy to break

1. **Never white on green.** It measures 1.66:1 and fails badly. Green is a
   light colour, so type on a green fill is ink, which passes at 11.6:1.
2. **Never green as type on white.** It fails as well. On light surfaces
   the accent colour for type and links is plum. Green appears on light
   surfaces only as a fill or a shape.

If you catch yourself wanting green text on a white card, you want plum.

### Never hard-code a colour

Components read tokens, never literals. Layer one holds semantic tokens
under shadcn variable names (`--background`, `--primary`, `--border`,
`--muted-foreground`) so a future shadcn or Tailwind adoption maps one to
one. Layer two holds the site aliases that components actually consume:
`--paper`, `--paper-raised`, `--surface-alt`, `--ink`, `--ink-soft`,
`--steel`, `--line`, `--line-soft`, `--brand`, `--brand-strong`, `--ok`.

Need a new colour? Add a token or an alias in `global.css` and use that.

### Dark bands

`.section--dark` repaints its own tokens rather than restyling its
children. That is why a `.card`, a `.spec` table or a status dot dropped
inside a dark band looks right with no extra CSS. If you build something
new, consume the aliases and it will inherit the same behaviour for free.

The page rhythm on the homepage alternates white, pale (`--surface-alt`)
and plum bands. Two plum bands should not touch.

## 2. Type

- **Instrument Sans** for display and body. Headings are 700, tight at
  `-0.022em`, and `text-wrap: balance`.
- **IBM Plex Mono** for the datasheet register: eyebrows, spec labels,
  margin labels, status text. Always uppercase, letterspaced `0.14em` to
  `0.18em`, small, in `--steel`.
- Both are self-hosted through `@fontsource`. Do not add a Google Fonts
  link; it would ship visitor IPs to Google and break the GDPR position
  that matters for the DACH market.

Sizes are fluid with `clamp()` and set in `global.css`. Do not set a font
size in a component unless the element is genuinely one of a kind.

## 3. Layout

- Content sits in `.container`, max width `72rem`, fluid inline padding.
- `.section` is the vertical unit. `.section--tight` for a slimmer band,
  `.section--raised` for pale, `.section--dark` for plum.
- Radii come from the `--radius` scale, base `0.625rem`. Cards use
  `--radius-lg`, buttons `--radius-md`.
- Grids: `.grid--2`, `.grid--3`, `.grid--4`, collapsing to two columns at
  60rem and one at 40rem.

## 4. The left margin

Two elements share the left margin and one axis, `--rail-x`. Change the
axis in one place and both follow. Never introduce a second offset.

**The thread.** One continuous 1px line down the page with a spark node at
each section top. It is not one long SVG. Each section draws its own
segment as a pseudo-element, and because the segments are contiguous they
read as a single line. That means the line recolours itself inside a dark
band automatically, and it draws in progressively as you scroll without
any scroll-linked animation. Hides below 48rem.

**The margin label.** One or two words per section, set vertically, sitting
just outside the line so the line stays unbroken. It sticks under the nav
while its section is in view, then hands off. Rendered by
`SectionRail.astro`, hidden below 80rem where the margin runs out.

Rules for labels:

- One or two words. Longer labels crowd the margin and get cropped.
- The label lives in the section's data file as `label`, never in the
  component. It is copy, and copy lives in `src/data`.
- Sentence case, no full stop. "Why us", "Ramp up", "Next step".
- Name what the section is for, not what it says. The heading already
  says it.
- Skip the hero. Its `h1` is the label.
- Decorative, so it is `aria-hidden`. Headings carry the structure for
  assistive technology; repeating it there would be noise.

## 5. Motion

All of it lives in `src/scripts/motion.ts`. Components carry a hook
attribute at most, never a duration and never a delay.

The anti-flash contract, which is the part that is easy to get wrong:

1. An inline script in `BaseLayout` sets `data-motion="on"` on `<html>`,
   only when JS runs and reduced motion is not requested.
2. `global.css` hides reveal targets **only** under `[data-motion='on']`.
3. The same inline script arms a fallback timer. If the module never
   loads, the attribute is stripped and everything becomes visible.

So: never hide content behind JS without that fallback, and keep `REVEAL`
in `motion.ts` in sync with the selector list in `global.css`.

If a new element can reuse an existing hook, prefer that to adding a
tween. The margin labels fade with the `.is-threaded` class the thread
already sets, which is why they needed no `REVEAL` entry.

Everything must be legible and complete with JS off and with
`prefers-reduced-motion: reduce`.

## 6. Voice

- **British English.** `-ise` endings, "programme", "licence" as the noun,
  "organisation".
- **No em dashes and no en dashes anywhere**, in copy, comments or docs.
  Use commas, colons, full stops or brackets, and write ranges out, "days
  1 to 2". Run `npm run check:dashes` before every drop; it exits non-zero
  on a hit.
- Plain and concrete. Name the thing. "Signals, not lists" beats
  "intelligent prospect identification".
- Claims must be checkable. The site's whole argument is that our tech and
  data are provable, so do not write a claim we cannot show. No invented
  metrics, no borrowed logos, no testimonials until they are real.
- **German is an offer, not a frame.** It belongs in `LanguageEdge.astro`.
  Do not thread "native German" back through the hero, the datasheet, the
  pillars or the signal examples. Plenty of clients never sell into a
  German-speaking market and still need everything else on the page.
- Sentence case for headings. Title Case only for proper nouns.

## 7. Adding a section, a checklist

1. Copy, including the `label`, goes in the right `src/data/*.ts` export.
2. Component renders that data and holds no copy of its own.
3. `<Sparks />` first if the band needs the motif, then `<SectionRail />`,
   then `.container` for the content.
4. Colours through tokens only. Check the two contrast rules.
5. If it animates, the hook goes in the component and the timing in
   `motion.ts`, with `REVEAL` and `global.css` kept in sync.
6. `npm run check:dashes`, then `npm run build`.
7. Update `docs/SITEMAP.md` if a route changed, `docs/HANDOFF.md` if the
   architecture or the launch list changed.
