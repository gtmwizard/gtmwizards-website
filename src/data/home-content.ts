// All homepage copy lives here; components render it.
// Same pattern as hubsell-website/src/data/home-content.ts.
import { SITE } from './site';

export const hero = {
  eyebrow: 'Outbound for traditional industries · DE / NL / EN',
  heading: 'Qualified meetings with buyers who ignore everyone else.',
  sub: `We run your entire outbound (lists, messaging, email, calling, LinkedIn) for companies selling into manufacturing, logistics, industrial and other hard-to-crack markets across DACH, Benelux, and beyond. In the buyer's own language, on technology we own and you can inspect.`,
  primaryCta: { label: 'Apply for a strategy call', href: '/book-a-call' },
  secondaryCta: { label: 'How the handover works', href: '/solutions/platform-handover' },
} as const;

// The "datasheet" card next to the hero, a snapshot of a running campaign.
export const heroSpec = {
  title: 'Campaign datasheet',
  rows: [
    { label: 'ICP', value: 'Mid-market machine builders, DACH' },
    { label: 'Persona', value: 'Head of Operations / COO' },
    { label: 'Language', value: 'German (native)' },
    { label: 'Channels', value: 'Email · Phone · LinkedIn' },
    { label: 'Data source', value: 'Kadanco + custom research' },
    { label: 'Engine', value: 'hubsell' },
    { label: 'Status', value: 'Live, day 6', live: true },
  ],
} as const;

export const proofStrip = {
  heading: 'Not a black box. Our tech has a name.',
  items: [
    {
      title: 'hubsell',
      text: 'Every campaign runs on hubsell, the outbound platform our founders built and operate. You can inspect it, demo it, and one day run it yourself.',
      href: SITE.hubsellUrl,
      linkLabel: 'See the platform',
    },
    {
      title: 'Kadanco',
      text: 'Lead lists come from our own B2B data operation, not a reseller of stale databases. Built for European traditional industries.',
      href: SITE.kadancoUrl,
      linkLabel: 'See the data company',
    },
    {
      title: '15+ years in market',
      text: 'The people who plan and run your campaigns have been doing European B2B outbound since before it was a category. Seniors only, nothing is handed to juniors.',
      href: '/about',
      linkLabel: 'Meet the team',
    },
  ],
} as const;

export const pillars = {
  eyebrow: 'Why gtmWizards',
  heading: 'Built for the markets where outbound is hardest',
  items: [
    {
      title: 'Native-language outbound',
      text: 'German, Dutch, and English: written and spoken by natives, not translated. In relationship-driven industries, language precision is the difference between a reply and the bin.',
    },
    {
      title: 'Own tech, own data',
      text: 'No generic data providers, no rented tooling. Lists from Kadanco, execution on hubsell. Both provable, both ours.',
    },
    {
      title: 'Senior operators only',
      text: 'Your campaigns are planned and run by people with 15+ years in European B2B sales. We never sell you seniors and deliver juniors.',
    },
    {
      title: 'No lock-in, by design',
      text: 'Pilot first, then quarterly. Fair pricing, low commitment. And when you want to in-source, we hand you the platform instead of a goodbye.',
    },
  ],
} as const;

export const graduation = {
  eyebrow: 'The exit path',
  heading: 'The agency you can graduate from',
  sub: 'Every other agency is designed to keep you dependent. gtmWizards is designed to make itself optional. Your campaigns, sequences, and data live in hubsell (the platform our founders own), so in-sourcing is a handover, not a rebuild.',
  stages: [
    {
      label: 'Done for you',
      text: 'We run everything: lists, messaging, sending, calling, replies, booking. You show up and close.',
    },
    {
      label: 'Done with you',
      text: 'Your team joins the workflow inside hubsell. We coach, you learn the playbooks on live campaigns.',
    },
    {
      label: 'Done by you',
      text: 'You take over the hubsell account, campaigns, sequences, data, and playbooks included. We step back, or stay on call.',
    },
  ],
  note: 'No other outbound agency can offer this, because no other agency owns its platform.',
} as const;

export const channels = {
  eyebrow: 'Channels',
  heading: 'Email, phone, and LinkedIn: one team, one system',
  sub: 'Set up and managed by our senior team, executed on hubsell. Every channel works from the same list, the same messaging strategy, and the same qualification criteria.',
  items: [
    {
      title: 'Email',
      text: 'Personalised at scale from real research signals, on managed infrastructure that keeps you out of spam.',
    },
    {
      title: 'Cold calling',
      text: 'Native-language callers who qualify and handle objections, because in traditional industries, buyers still pick up the phone. What matters is the approach, not a headcount figure.',
    },
    {
      title: 'LinkedIn',
      text: 'Deliberate, low-volume touches that warm accounts before and between the other channels.',
    },
  ],
} as const;

export const qualification = {
  eyebrow: 'Qualification',
  heading: 'We qualify and objection-handle before you ever join a call',
  sub: 'A meeting only reaches your calendar when the company fits your ICP, the person can decide, and the timing is real. Objections get handled in the conversation, not forwarded to you.',
  checks: [
    { label: 'Company fits the ICP', pass: true },
    { label: 'Decision-maker confirmed', pass: true },
    { label: 'Objections handled in-channel', pass: true },
    { label: 'Timing unclear, nurture, not book', pass: false },
  ],
} as const;

export const timeline = {
  eyebrow: 'Ramp-up',
  heading: 'Live within the first week',
  sub: 'Pilot first. Then quarterly, if the numbers earn it. No long-term contracts, we would rather make a name than make you a hostage.',
  steps: [
    {
      phase: 'Days 1 to 2',
      title: 'Strategy & ICP',
      text: 'ICP, personas, qualification criteria, and messaging frameworks agreed with a senior operator, not an account manager reading a script.',
    },
    {
      phase: 'Days 3 to 5',
      title: 'Buildout',
      text: 'Lists built from Kadanco and custom research. Sequences drafted in the buyer\u2019s language. Sending infrastructure warmed on hubsell.',
    },
    {
      phase: 'Day 5+',
      title: 'Launch',
      text: 'Email, calling, and LinkedIn running in parallel. Replies managed, objections handled, qualified meetings offered for your approval.',
    },
    {
      phase: 'Ongoing',
      title: 'Optimise, honestly',
      text: 'Weekly reporting and A/B testing by humans who read every reply. No \u201cself-learning agents\u201d theatre: real analysis of your data, for your campaigns only.',
    },
  ],
} as const;

export const homeCta = {
  heading: 'Start with a pilot. Keep the platform.',
  sub: 'Apply for a strategy call. If we don\u2019t believe we can book you meetings in your market and language, we will tell you on that call.',
  primaryCta: { label: 'Apply for a strategy call', href: '/book-a-call' },
  secondaryCta: { label: 'Or write to us', href: '/contact' },
} as const;
