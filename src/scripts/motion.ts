/**
 * Site motion, in one file.
 *
 * Everything animated on gtmwizards.com is choreographed here. Components stay
 * dumb renderers: they carry a hook attribute at most, never timing values.
 *
 * How the anti-flash works, because this is the part that is easy to get wrong:
 *
 *   1. An inline script in BaseLayout sets `data-motion="on"` on <html>, but
 *      only when JS is running and the visitor has not asked for reduced motion.
 *   2. global.css hides the reveal targets ONLY under `[data-motion='on']`.
 *   3. The same inline script arms a fallback timer. If this module never runs
 *      (bundle blocked, JS error, slow network), the timer strips the attribute
 *      and every hidden element comes back. Content is never trapped behind JS.
 *
 * So: no JS, old browser, reduced motion, or a broken bundle all degrade to a
 * plain, fully readable page. That is the deal that makes it safe to animate.
 */

import { animate, createTimeline, createSpring, stagger, svg, utils } from 'animejs';

/* One easing family and one duration scale for the whole site. Change these
   two and everything moves together. */
const EASE = 'out(3)';
const DUR = 620;
const STEP = 70;

/**
 * What gets revealed. Anything nested inside one of these (an h3 in a card,
 * a paragraph in a rail stage) rides along with its parent rather than
 * animating separately, which keeps the page from feeling twitchy.
 *
 * Keep this list in sync with the matching block in global.css.
 */
const REVEAL = '.eyebrow, h2, .lede, .card, .faq__item, .rail__stage, .spec, .cta';

const list = <T extends Element = HTMLElement>(sel: string, ctx: ParentNode = document): T[] =>
  Array.from(ctx.querySelectorAll(sel)) as unknown as T[];

/** Each spark carries its own resting opacity in a --peak custom property,
 *  so green and lilac settle at different strengths. Shaped as an anime
 *  FunctionValue: (target, index, targets) => value. */
const peakOf = (target?: unknown): number => {
  if (!(target instanceof Element)) return 0.4;
  return Number(getComputedStyle(target).getPropertyValue('--peak')) || 0.4;
};

/* ------------------------------------------------------------------------
   Hero: runs on load, not on scroll, because it is already in view.
   ------------------------------------------------------------------------ */

function heroEntrance(): void {
  const hero = document.querySelector<HTMLElement>('[data-motion-hero]');
  if (!hero) return;

  const copy = list('[data-motion-item]', hero);
  const rows = list('.spec__row', hero);
  const sparks = list('.spark', hero);

  utils.set(copy, { opacity: 0, y: 14 });
  utils.set(rows, { opacity: 0, y: 8 });
  utils.set(sparks, { opacity: 0, scale: 0.6 });

  createTimeline({ defaults: { ease: EASE, duration: DUR } })
    /* Eyebrow, headline, lede, buttons, then the datasheet frame. */
    .add(copy, { opacity: 1, y: 0, delay: stagger(STEP) }, 120)
    /* The datasheet fills in row by row, so it reads like a system
       reporting rather than a picture of one. */
    .add(rows, { opacity: 1, y: 0, duration: 420, delay: stagger(55) }, 560)
    /* Sparks arrive last and hand off to the CSS twinkle loop. */
    .add(
      sparks,
      {
        opacity: peakOf,
        scale: 1,
        duration: 900,
        ease: 'out(2)',
        delay: stagger(90),
        onComplete: () => sparks.forEach((s) => s.classList.add('is-live')),
      },
      320,
    );
}

/* ------------------------------------------------------------------------
   Scroll reveals: one observer for the whole page, each section fires once.
   ------------------------------------------------------------------------ */

function scrollReveals(): void {
  const sections = list<HTMLElement>('main section').filter(
    (s) => !s.hasAttribute('data-motion-hero') && !s.hasAttribute('data-no-motion'),
  );
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        revealSection(entry.target as HTMLElement);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
  );

  for (const section of sections) {
    const targets = list<HTMLElement>(REVEAL, section);
    if (!targets.length) continue;
    utils.set(targets, { opacity: 0, y: 14 });
    observer.observe(section);
  }
}

function revealSection(section: HTMLElement): void {
  const targets = list<HTMLElement>(REVEAL, section);
  if (targets.length) {
    animate(targets, {
      opacity: 1,
      y: 0,
      duration: DUR,
      ease: EASE,
      delay: stagger(STEP),
    });
  }

  /* A datasheet anywhere on the page fills in row by row, same as the hero. */
  for (const spec of list<HTMLElement>('.spec', section)) {
    const rows = list<HTMLElement>('.spec__row', spec);
    if (!rows.length) continue;
    utils.set(rows, { opacity: 0, y: 8 });
    animate(rows, {
      opacity: 1,
      y: 0,
      duration: 420,
      ease: EASE,
      delay: stagger(55, { start: 260 }),
    });
  }

  /* Sparks on any dark band, not just the hero. */
  const sparks = list<HTMLElement>('.spark', section);
  if (sparks.length) {
    utils.set(sparks, { opacity: 0, scale: 0.6 });
    animate(sparks, {
      opacity: peakOf,
      scale: 1,
      duration: 900,
      ease: 'out(2)',
      delay: stagger(90, { start: 200 }),
      onComplete: () => sparks.forEach((s) => s.classList.add('is-live')),
    });
  }

  if (section.hasAttribute('data-motion-rail')) railDraw(section);
}

/* ------------------------------------------------------------------------
   The graduation rail: the one place the library earns its keep.
   The connector draws itself, and each marker springs in as the line
   reaches it, so the motion says "we hand this over in three stages".
   ------------------------------------------------------------------------ */

function railDraw(section: HTMLElement): void {
  const line = section.querySelector<SVGPathElement>('[data-motion-rail-line]');
  const markers = list<HTMLElement>('.rail__marker', section);

  /* The connector is hidden on narrow screens, where the stages stack.
     Drawing a zero-width path is pointless and can throw. */
  const drawable = line && line.getBoundingClientRect().width > 4 ? svg.createDrawable(line) : null;

  if (markers.length) utils.set(markers, { scale: 0, opacity: 0 });

  const tl = createTimeline({ defaults: { ease: EASE } });

  if (drawable) {
    tl.add(drawable, { draw: ['0 0', '0 1'], duration: 1300, ease: 'inOut(2)' }, 180);
  }

  markers.forEach((marker, i) => {
    tl.add(
      marker,
      {
        scale: 1,
        opacity: 1,
        ease: createSpring({ stiffness: 140, damping: 12 }),
      },
      drawable ? 240 + i * 420 : 240 + i * 140,
    );
  });
}

/* ------------------------------------------------------------------------
   Boot
   ------------------------------------------------------------------------ */

function start(): void {
  /* Tell the fallback timer in BaseLayout that we made it. */
  const w = window as Window & { __motionFallback?: number };
  if (w.__motionFallback) window.clearTimeout(w.__motionFallback);

  heroEntrance();
  scrollReveals();
}

if (document.documentElement.dataset.motion === 'on') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
}
