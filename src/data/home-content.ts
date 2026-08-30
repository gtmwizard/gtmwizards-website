// All homepage copy lives here; components render it.
// Same pattern as hubsell-website/src/data/home-content.ts.
import { SITE } from './site';

export const hero = {
  eyebrow: 'Signal-led outbound for traditional industries',
  heading: 'Qualified meetings with buyers who ignore everyone else.',
  sub: `They ignore everyone else because nothing else has a reason to exist. We wait for a signal, a role opened, a stand booked at a trade fair, an event attended, then write one message in their language. Fewer messages, sent from your own domain.`,
  primaryCta: { label: 'Apply for a strategy call', href: '/book-a-call' },
  secondaryCta: { label: 'How the handover works', href: '/solutions/platform-handover' },
} as const;

// The "datasheet" card next to the hero, a snapshot of a running campaign.
export const heroSpec = {
  title: 'Campaign datasheet',
  rows: [
    { label: 'Trigger', value: 'Exhibitor, LogiMAT 2026', cycle: true },
    { label: 'ICP', value: 'Mid-market machine builders' },
    { label: 'Persona', value: 'Head of Operations / COO' },
    { label: 'Language', value: "Buyer's own" },
    { label: 'Channels', value: 'Email · Phone · LinkedIn' },
    { label: 'Sending', value: 'Your own domain' },
    { label: 'Status', value: 'Live, day 6', live: true },
  ],
  // The trigger row cycles through these when motion is on. The first value
  // above is what a no-JS or reduced-motion visitor sees, so keep them in step.
  triggerCycle: [
    'Exhibitor, LogiMAT 2026',
    'Hiring: Head of Maintenance',
    'Attended: Logistics Summit',
    'Exhibitor, Hannover Messe 2026',
    'Hiring: ERP migration lead',
  ],
} as const;

// Full-width band under the proof strip. Signals scroll in, most are dropped,
// a few become one written message. The discarding is the argument, so it has
// to be visible rather than implied.
export const signalFunnel = {
  label: 'Signals',
  eyebrow: 'How a campaign starts',
  heading: 'Most signals are noise. A few are a reason to write.',
  sub: 'We watch exhibitor lists, job postings, event attendance and engagement in your category. Most of what comes back is discarded. What survives becomes one message, in the buyer\u2019s language, from your own domain.',
  watchedLabel: 'Signals watched',
  writtenLabel: 'What gets written',
  signals: [
    { src: 'Exhibitor list', text: 'LogiMAT 2026, Hall 8', keep: true },
    { src: 'Hiring', text: 'Head of Maintenance, Midlands', keep: true },
    { src: 'Post engagement', text: 'Competitor launch thread', keep: false },
    { src: 'Event', text: 'Regional logistics summit', keep: true },
    { src: 'Hiring', text: 'Marketing intern', keep: false },
    { src: 'Exhibitor list', text: 'Hannover Messe 2026', keep: true },
    { src: 'Post engagement', text: 'Reacted to a pricing post', keep: false },
    { src: 'Hiring', text: 'ERP migration lead', keep: true },
  ],
  output: {
    label: 'Trigger',
    title: 'Exhibitor list, LogiMAT 2026, Hall 8',
    body: 'One message referencing the stand they just booked and the line they run, in the language they work in. Written by a person who read the signal, not generated from a template.',
    from: 'from: sales@yourcompany.com',
  },
  note: 'Nothing here is bought from a list reseller. If you ask why a company is in your campaign, there is an answer.',
} as const;

export const proofStrip = {
  label: 'Proof',
  heading: 'Not a black box. Our tech has a name.',
  items: [
    {
      title: 'hubsell',
      text: 'Every campaign runs on hubsell, the outbound platform our co-founder built and runs. You can inspect it, demo it, and one day run it yourself.',
      href: SITE.hubsellUrl,
      linkLabel: 'See the platform',
    },
    {
      title: 'Signals, not lists',
      text: 'Nothing is bought from a list reseller. Every contact enters a campaign because something happened: a role opened, a stand went live, a competitor post got a reaction.',
      href: '/solutions/lead-finding-and-qualification',
      linkLabel: 'How we find them',
    },
    {
      title: '15+ years in market',
      text: 'The people who plan and run your campaigns have been doing European B2B outbound since before it was a category. Seniors only, nothing is handed to juniors.',
      href: '/about',
      linkLabel: 'Meet the team',
    },
  ],
} as const;

// Named stack. Replaces the old "data by Kadanco" claim: we say what we run
// on rather than pointing at a sibling company. Add tools here, the component
// takes any number.
// Language gets its own section rather than framing the whole site. Plenty of
// clients never touch a German-speaking market and still need everything else
// on this page, so this is an edge we offer, not the premise we sell on.
export const language = {
  label: 'Language',
  eyebrow: 'Where it gets harder',
  heading: 'And if your buyer does not work in English',
  sub: 'Traditional industries are relationship markets. In a lot of Europe the buyer will read an English email and quietly decide you are not serious. A translated template reads worse than no email at all, because it proves nobody in the room understands their market.',
  points: [
    {
      title: 'German, natively',
      text: 'Written and spoken by a native speaker who has sold into these markets, not translated after the fact. Signals get read in German too, which is where most of the value sits: a job ad or an exhibitor entry only becomes a signal if you understand what it implies.',
    },
    {
      title: 'English, everywhere else',
      text: 'Most markets are reachable in English and we run them that way. If your buyers are in the UK, the Nordics, the Netherlands or North America, language is not the hard part and we will not sell it to you as though it were.',
    },
  ],
  note: 'If you are not selling into a German-speaking market, ignore this section. Nothing else on this page depends on it.',
} as const;

export const tools = {
  label: 'Stack',
  eyebrow: 'The stack',
  heading: 'Named tools, not a black box',
  sub: 'Most agencies will not tell you what they run on, because the answer is a rented seat on somebody else\u2019s platform. Here is ours.',
  items: [
    {
      name: 'hubsell',
      role: 'Outreach platform',
      text: 'Campaigns, sequences, sending and CRM sync. Built and run by our co-founder Karan, which is why the handover at the end of an engagement is a transfer rather than a rebuild.',
    },
    {
      name: 'Claude',
      role: 'Research and drafting',
      text: 'Reads job ads, exhibitor lists and company sites at a volume a person could not, and drafts in the buyer\u2019s language. A human decides what is a signal, and a human writes the message that goes out.',
    },
    {
      name: 'n8n',
      role: 'Workflow automation',
      text: 'Watches the sources, catches a signal when it fires, and moves it into the campaign. Self-hosted in the EU, so nothing routes through a third-party cloud we do not control.',
    },
  ],
  note: 'Nothing here is a secret and none of it is rented. Ask us to demo any of it on the first call.',
} as const;

export const pillars = {
  label: 'Why us',
  eyebrow: 'Why gtmWizards',
  heading: 'Built for the markets where outbound is hardest',
  items: [
    {
      title: 'We wait for a signal',
      text: 'Trade fair exhibitor lists, companies hiring for specific roles, people engaging with content in your category, event attendees. Every campaign starts from something that actually happened, and nothing is bought from a reseller.',
    },
    {
      title: 'A person writes it',
      text: 'A job ad or an exhibitor list only becomes a signal if someone understands what it implies about the buyer. A person reads it and a person writes the message. No template fires because a box was ticked.',
    },
    {
      title: 'Your domain, not ours',
      text: 'No lookalike domains, no warm-up schedules, no sending infrastructure between you and the buyer. Volume stays low enough that your real domain does the sending, and replies land in a real inbox.',
    },
    {
      title: 'No lock-in, by design',
      text: 'Pilot first, then quarterly. Fair pricing, low commitment. And when you want to in-source, we hand you the platform instead of a goodbye.',
    },
  ],
} as const;

export const graduation = {
  label: 'Handover',
  eyebrow: 'The exit path',
  heading: 'The agency you can graduate from',
  sub: 'Every other agency is designed to keep you dependent. gtmWizards is designed to make itself optional. Your campaigns, sequences, and data live in hubsell, the platform our co-founder built and runs, so in-sourcing is a handover, not a rebuild.',
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
  note: 'No other outbound agency can offer this, because no other agency has a co-founder who can sign the handover.',
} as const;

export const channels = {
  label: 'Channels',
  eyebrow: 'Channels',
  heading: 'Email, phone, and LinkedIn: one team, one system',
  sub: 'Set up and managed by our senior team, executed on hubsell. Every channel works from the same list, the same messaging strategy, and the same qualification criteria.',
  items: [
    {
      title: 'Email',
      text: 'Written from the signal that triggered the campaign, sent from your own domain. Low enough volume that it does not need infrastructure to survive.',
    },
    {
      title: 'Cold calling',
      text: 'Callers working in the buyer\u2019s own language who qualify and handle objections, because in traditional industries, buyers still pick up the phone. What matters is the approach, not a headcount figure.',
    },
    {
      title: 'LinkedIn',
      text: 'Deliberate, low-volume touches that warm accounts before and between the other channels.',
    },
  ],
} as const;

export const qualification = {
  label: 'Qualifying',
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
  label: 'Ramp up',
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
      text: 'Signals monitored and turned into a list. Sequences drafted in the buyer\u2019s language. Authentication checked on your own domain, no warm-up to wait out.',
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
  label: 'Next step',
  heading: 'Start with a pilot. Keep the platform.',
  sub: 'Apply for a strategy call. If we don\u2019t believe we can book you meetings in your market and language, we will tell you on that call.',
  primaryCta: { label: 'Apply for a strategy call', href: '/book-a-call' },
  secondaryCta: { label: 'Or write to us', href: '/contact' },
} as const;
