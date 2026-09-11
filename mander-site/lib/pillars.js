// The three pillars — the spine of the whole site.
//
// MANDER used to present six disciplines as a flat list: Website Design,
// Brand Identity, Website Redesign, SEO, Local Search, Care Plan. Six is
// enough items to read as a menu and not enough to read as a point of view,
// and three of them were the same discipline described differently. A list
// like that makes a studio look like it will take any work that comes.
//
// These three are not a shorter version of that list. They are a sequence,
// and the sequence is the argument: BRAND settles who you are, DIGITAL builds
// how people experience you, GROWTH is how the right people find and choose
// you. A client can start at any one of them and move outward, which is the
// commercial reason for organising the studio this way and the reason the
// site should make the connection obvious rather than state it.
//
// GROWTH is deliberately not called SEO. SEO is one channel inside it. What
// is being sold is a demand engine: find what a market is actually searching
// for, work out which of it is commercially worth having, build the asset
// that answers it, put a conversion path under the asset, and measure which
// of it produced a real enquiry — then do the next one based on what the last
// one taught you. Naming that "SEO" would price it like SEO.

export const PILLARS = [
  {
    id: 'brand',
    index: '01',
    label: 'BRAND',
    line: 'Identity people remember.',
    question: 'Who you are',
    href: '/brand',
    meta: 'Brand strategy, positioning, identity and messaging for businesses whose offer is sharper in the founder’s head than anywhere else.',
    lede: 'Most businesses do not have a brand problem. They have a clarity problem that shows up as a brand problem — the offer is sharp in the founder’s head and vague everywhere else.',
    body: [
      'We work out what the business actually is, who it is for, and why anyone should pick it over the one down the street. Then we build the identity that carries that: the mark, the type, the colour, the rules that hold it together, and the language that makes it sound like one company rather than five people writing separately.',
      'The output is a system you can run without us — files, rules and examples — not a logo and a hopeful PDF.',
    ],
    capabilities: [
      { name: 'Brand strategy', note: 'What the business is, and what it is not.' },
      { name: 'Positioning', note: 'The reason to pick you, in a sentence you can defend.' },
      { name: 'Brand identity', note: 'Mark, type, colour, and how they behave together.' },
      { name: 'Visual systems', note: 'Rules that survive being used by other people.' },
      { name: 'Messaging', note: 'The words, from the headline down to the button.' },
      { name: 'Creative direction', note: 'Photography, art direction, and what to say no to.' },
      { name: 'Brand guidelines', note: 'One document your team and suppliers can work from.' },
    ],
    faqs: [
      {
        q: 'Is a brand identity project just a logo?',
        a: 'No. The mark is one piece of it. The output is the mark, the type, the colour, the rules that hold them together and the language that makes the business sound like one company rather than five people writing separately — a system you can run without us, not a logo and a hopeful PDF.',
      },
      {
        q: 'How long does a brand identity project take?',
        a: 'It depends on scope, which is why the timeline is quoted as part of a written plan rather than a fixed number up front — the same four stages run every time: discovery, a scoped strategy, the build itself, then handover.',
      },
      {
        q: 'Do I own the finished identity outright?',
        a: 'Yes. The site, the code and every account it touches are registered in your name from day one — the same rule applies to a brand identity project, so the files, the mark and the guidelines document are yours to use anywhere, with anyone, after handover.',
      },
      {
        q: 'What do I actually receive at the end?',
        a: 'Working files for the mark and type system, the colour rules, and one guidelines document your own team or future suppliers can work from without asking us first — not a single exported logo file.',
      },
    ],
  },
  {
    id: 'digital',
    index: '02',
    label: 'DIGITAL',
    line: 'Digital experiences that work.',
    question: 'How people experience you',
    href: '/digital',
    meta: 'Web design, UX, development, ecommerce and digital products. Fixed scope, quoted before anything starts, and you own it outright.',
    lede: 'A site is not a brochure and it is not a design exercise. It is the first employee that never sleeps, and most of them are quietly bad at the job.',
    body: [
      'We design and build the thing itself: sites, interfaces, stores, and the occasional piece of software that does not exist yet. Fast, accessible, built on foundations you own outright and can hand to any developer afterwards.',
      'Fixed scope, fixed price, quoted before anything starts — which is possible because we scope properly rather than because we cut corners later.',
    ],
    capabilities: [
      { name: 'Web design', note: 'Design that holds up next to the work it represents.' },
      { name: 'UX / UI', note: 'The paths people actually take, made shorter.' },
      { name: 'Web development', note: 'Fast, accessible, maintainable, yours.' },
      { name: 'Ecommerce', note: 'Selling online without a platform running your business.' },
      { name: 'Web applications', note: 'When the workflow does not fit an off-the-shelf tool.' },
      { name: 'Digital products', note: 'Android builds, portals, internal tools.' },
      { name: 'Technical implementation', note: 'Analytics, integrations, migrations, handover.' },
    ],
    faqs: [
      {
        q: 'What is the difference between a redesign and a new build?',
        a: 'A redesign takes a site that has aged out and rebuilds it for better experience, sharper design and the technical performance search engines reward, generally around what already exists. A new build starts from the brand and structure outward — the right call when the existing foundation cannot carry what the business needs next.',
      },
      {
        q: 'Do you build ecommerce sites?',
        a: 'Yes — selling online without a third-party platform effectively running the business is one of the standing capabilities here, built into the same fixed-scope process as any other site.',
      },
      {
        q: 'What if my workflow does not fit an off-the-shelf website builder?',
        a: 'That is what a web application is for — a piece of software built around the workflow rather than the workflow bent to fit a template. It sits alongside standard web development as a separate capability precisely because not every project is a normal website.',
      },
      {
        q: 'Do I own the site and code once it is finished?',
        a: 'Yes, outright. Fast, accessible and maintainable foundations, built to be handed to any developer afterward — not locked to this studio or to a proprietary platform.',
      },
    ],
  },
  {
    id: 'growth',
    index: '03',
    label: 'GROWTH',
    line: 'Systems that bring the right people to you.',
    question: 'How the right people find and choose you',
    href: '/growth',
    meta: 'Not an SEO retainer — a demand engine. Research, gaps, assets, conversion paths, and measurement of which pages produce real enquiries.',
    lede: 'Not an SEO retainer. A demand engine: find what your market is already searching for, work out which of it is worth having, build the thing that answers it, and measure which of it turned into an enquiry.',
    body: [
      'Publishing content and hoping is the default and it does not work. The system underneath this is a loop — research demand, find the gap between what is searched and what exists, build the asset that fills it, put a conversion path under it, measure which pages produce actual business interest, and let that decide the next one.',
      'Some of those assets are pages. Some are calculators, assessments or audits — the things people use, link to and come back to. The point is not volume. The point is that each thing built teaches you what to build next.',
    ],
    capabilities: [
      { name: 'Demand research', note: 'What your market types, before anything is written.' },
      { name: 'Content opportunity discovery', note: 'The gap between what is searched and what exists.' },
      { name: 'SEO', note: 'Technical foundations, structure, and the pages worth ranking.' },
      { name: 'Local SEO', note: 'Business Profile, Maps and the neighbourhood you actually serve.' },
      { name: 'AI search visibility', note: 'Being the source an assistant cites, not just a blue link.' },
      { name: 'Content strategy', note: 'Fewer, better assets aimed at commercial intent.' },
      { name: 'Interactive tools', note: 'Assessments, calculators and audits people use and share.' },
      { name: 'Conversion optimisation', note: 'The path from arriving to asking, shortened.' },
      { name: 'Lead capture & qualification', note: 'Enquiries that arrive with context attached.' },
      { name: 'Analytics & measurement', note: 'Which page produced a real opportunity — not which got traffic.' },
    ],
    // The loop, spelled out. This is the differentiator, so it gets rendered
    // rather than described.
    engine: [
      { step: '01', name: 'Research', note: 'What the market searches, and which of it has commercial intent.' },
      { step: '02', name: 'Gap', note: 'Where the existing results are thin, dated or wrong.' },
      { step: '03', name: 'Build', note: 'The page, tool, guide or assessment that answers it properly.' },
      { step: '04', name: 'Convert', note: 'A path from that asset to a conversation, sized to the intent.' },
      { step: '05', name: 'Measure', note: 'Which assets produce enquiries, not which produce sessions.' },
      { step: '06', name: 'Repeat', note: 'The next asset is chosen by what the last one taught us.' },
    ],
    faqs: [
      {
        q: 'Is this the same thing as an SEO retainer?',
        a: 'No — deliberately not. SEO is one channel inside it, not the whole service. What is actually being run is a demand engine: research what a market is searching for, find the gap between what is searched and what already exists, build the asset that answers it properly, put a conversion path under it, then measure which of it produced a real enquiry rather than which produced traffic.',
      },
      {
        q: 'What counts as an "asset" in this system?',
        a: 'Some are pages. Some are calculators, assessments or audits — the things people actually use, link to and come back to. The point is not publishing volume; it is that each thing built teaches the studio what to build next.',
      },
      {
        q: 'How is success measured?',
        a: 'By which pages produce a real business opportunity, not by which pages get the most sessions. That distinction is the last step of the loop on purpose — traffic that never turns into an enquiry is not treated as a result.',
      },
      {
        q: 'Does Mander guarantee my site will be cited in Google AI Overviews or AI Mode?',
        a: 'No — and any provider that promises this is promising something outside anyone’s control. What "AI search visibility" actually means here is doing the work that makes a site easy for any retrieval system, human or automated, to understand, trust and quote: clear structure, real entities, direct answers, and genuine authority on the topic. Those are the same fundamentals that improve ordinary search results too, which is the honest reason to do them.',
      },
    ],
  },
];

export function getPillar(id) {
  return PILLARS.find((p) => p.id === id) || null;
}

// The sequence, as one line. Used in the masthead rail and the pillar pages.
export const SEQUENCE = ['Identity', 'Experience', 'Demand'];
