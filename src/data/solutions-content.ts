// One entry per solution page. Rendered by src/pages/solutions/[slug].astro
// via the SolutionDetail component. Add a page by adding an entry here.
export type Solution = {
  slug: string;
  navLabel: string;
  title: string;
  seoTitle: string;
  description: string;
  hero: { heading: string; sub: string };
  sections: { title: string; text: string }[];
  faqHint?: string;
};

export const solutions: Solution[] = [
  {
    slug: 'lead-finding-and-qualification',
    navLabel: 'Lead finding & qualification',
    title: 'Lead finding & qualification',
    seoTitle: 'Lead finding & qualification for traditional industries',
    description:
      'Custom prospect lists from our own data operation, qualified before a meeting ever reaches your calendar.',
    hero: {
      heading: 'Lists built from our own data, not rented from a reseller',
      sub: 'Generic databases are stale by the time you buy them, and they were never good for European traditional industries in the first place. We build your list from Kadanco, our own B2B data operation, plus manual research for the niches no database covers.',
    },
    sections: [
      {
        title: 'Built for your exact ICP',
        text: 'We start from your ICP and personas, not from firmographic filters. If your buyer is the Head of Production at mid-market machine builders in Baden-Württemberg, that is who ends up on the list, verified, deduplicated, and mapped to a real trigger.',
      },
      {
        title: 'Qualified before you meet',
        text: 'Every meeting is checked against your criteria: company fit, decision authority, and timing. Objections are handled in the conversation by our senior team. You approve which meetings land on your calendar.',
      },
      {
        title: 'Your data stays yours',
        text: 'Lists and enrichment live in your hubsell workspace from day one. If you ever in-source, the data comes with you, it was never hostage material.',
      },
    ],
  },
  {
    slug: 'multichannel-outreach',
    navLabel: 'Multichannel outreach',
    title: 'Multichannel outreach',
    seoTitle: 'Multichannel outbound: email, phone, LinkedIn',
    description:
      'Email, cold calling, and LinkedIn running as one coordinated system, set up and managed by senior operators, executed on hubsell.',
    hero: {
      heading: 'Three channels, one system, one team',
      sub: 'Buyers in traditional industries are not glued to one inbox. We coordinate email, phone, and LinkedIn from a single list, a single messaging strategy, and a single set of qualification criteria, so every touch compounds instead of competing.',
    },
    sections: [
      {
        title: 'Sequenced, not scattered',
        text: 'A call references the email. A LinkedIn touch warms the account before the call. Everything is orchestrated in hubsell, so no prospect ever gets contradictory messages from different tools.',
      },
      {
        title: 'In the buyer\u2019s language',
        text: 'English by default, German natively where the buyer works in German. In relationship-driven markets a translated template is worse than silence.',
      },
      {
        title: 'Managed by seniors',
        text: 'The people who design your sequences have run European outbound for 15+ years. Strategy, copy, and reply handling never get delegated to juniors.',
      },
    ],
  },
  {
    slug: 'cold-calling',
    navLabel: 'Cold calling',
    title: 'Cold calling',
    seoTitle: 'Cold calling that starts from a signal',
    description:
      'Callers who ring because something happened, qualify properly, handle objections, and book meetings your team can close.',
    hero: {
      heading: 'Your buyers pick up the phone. In their language.',
      sub: 'In manufacturing, logistics, and industrial markets, the phone still works, if the person calling has a reason to be ringing and belongs in the market. Our callers are native speakers who understand the industry, not a script farm reading transliterated English.',
    },
    sections: [
      {
        title: 'Approach over headcount',
        text: 'We do not sell you a number of SDRs. We sell an approach: research-backed openers, real qualification, and objection handling in the call, so the meetings that get booked are meetings worth taking.',
      },
      {
        title: 'Objections handled, not forwarded',
        text: '\u201cSend me an email\u201d, \u201cwe already have a supplier\u201d, \u201ccall me in Q3\u201d, our team handles these in the conversation. What reaches you is a qualified meeting or an honest nurture note, never a hot potato.',
      },
      {
        title: 'Coordinated with email and LinkedIn',
        text: 'Calls run from the same hubsell system as your other channels, so every caller sees the full touch history before dialing.',
      },
    ],
  },
  {
    slug: 'deliverability',
    navLabel: 'Deliverability',
    title: 'Sending from your own domain',
    seoTitle: 'Sending from your own domain',
    description:
      'No satellite domains and no warm-up schedules. Volume low enough that your real domain does the sending.',
    hero: {
      heading: 'Your domain. Your name. No infrastructure in between.',
      sub: 'Most outbound agencies buy a fleet of lookalike domains, warm them for weeks, and send from addresses your buyer has never seen. They have to, because of the volume they run. We do not run that volume, so we do not need any of it.',
    },
    sections: [
      {
        title: 'A lookalike domain is a tell',
        text: 'In relationship-driven markets, buyers check. A message from an address that almost matches the company they know is not a neutral technical choice, it is the first thing that makes them suspicious. Sending from the real domain means the prospect can look you up, find you on your own website, match the signature to a real person, and reply to an inbox that person actually reads.',
      },
      {
        title: 'Low volume is what makes it safe',
        text: 'Sending from your primary domain is reckless at scale, which is exactly why agencies avoid it. It is safe here because every message waits for a signal, so volume never approaches the level that puts a domain at risk. The constraint that defines the offer is the same one that protects your reputation.',
      },
      {
        title: 'Authentication, not infrastructure',
        text: 'SPF, DKIM and DMARC set up correctly on the domain you already own. That is hygiene every company should have regardless, and it is the whole technical footprint. There is no warm-up period to sit through, which means the first campaign goes live in days rather than after weeks spent preparing domains nobody will ever recognise.',
      },
      {
        title: 'Watched, not automated away',
        text: 'Bounce rates, inbox placement and reply health reviewed by the same people who write the copy, because deliverability and message quality are the same problem. When volume is low, a bad reply rate tells you the message was wrong. It does not tell you the infrastructure needs tuning.',
      },
    ],
  },
  {
    slug: 'done-for-you',
    navLabel: 'Done for you',
    title: 'Done for you',
    seoTitle: 'Fully managed outbound, done for you',
    description:
      'We run your entire outbound end to end: lists, messaging, sending, calling, replies, and booking. You show up and close.',
    hero: {
      heading: 'Everything handled. Nothing hidden.',
      sub: 'No dashboards to babysit, no tools to learn, no one to hire. We take the whole prospecting burden. Unlike every other agency, we do it on a platform you can see, audit, and eventually take over.',
    },
    sections: [
      {
        title: 'Live within the first week',
        text: 'Strategy on days 1 to 2, buildout on days 3 to 5, launch from day 5. Pilots are designed to show real signal inside the first weeks, not to pad a retainer.',
      },
      {
        title: 'Low-commitment contracting',
        text: 'Pilot first, quarterly after, priced fairly, because we are building a name, not milking a logo list. If the numbers do not earn the renewal, do not renew.',
      },
      {
        title: 'Honest reporting',
        text: 'Weekly updates written by the operators running your campaigns. Real reply analysis and A/B testing, no \u201cAI agents learning your business\u201d theatre.',
      },
    ],
  },
  {
    slug: 'platform-handover',
    navLabel: 'Platform handover',
    title: 'Platform handover',
    seoTitle: 'In-source your outbound: the platform handover',
    description:
      'The reason gtmWizards is the agency you can graduate from: your campaigns run on hubsell, and hubsell can become yours.',
    hero: {
      heading: 'The agency you can graduate from',
      sub: 'The dirty secret of outbound agencies is dependency: the tooling, data, and playbooks are theirs, so leaving means starting over. gtmWizards is built the other way around. Your campaigns live in hubsell (the platform our founders own), so in-sourcing is a handover, not a rebuild.',
    },
    sections: [
      {
        title: 'Done for you → done with you → done by you',
        text: 'Start fully managed. When you are ready, your team joins the workflow inside hubsell and learns the playbooks on live campaigns. Finally, you take over the account, campaigns, sequences, data, and processes included.',
      },
      {
        title: 'Nothing held hostage',
        text: 'Lists, messaging, results history, all of it accumulates in your workspace from day one. The longer we work together, the more you own, not the more you owe.',
      },
      {
        title: 'Why nobody else offers this',
        text: 'Agencies rent their tools, so they cannot hand them over. We own ours. That is the structural difference between gtmWizards and every \u201coutbound partner\u201d with a proprietary black box.',
      },
    ],
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
