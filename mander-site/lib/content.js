// Single source of truth for site copy — edit here, every page updates.

export const BRAND = {
  name: 'MANDER',
  tagline: 'Brand, digital and growth. A studio in Metro Vancouver.',
  // The single public address. Every "Contact sales" button, the contact
  // form's fallback, and Community Rate requests all resolve here, so this
  // one string is the whole sales funnel.
  //
  // It needs email forwarding set up at the mander.tech registrar/host
  // (Cloudflare Email Routing is free) pointed at an inbox that's actually
  // read — otherwise mail sent here bounces. Register the Web3Forms key to
  // this same address once forwarding is live; see .env.local.example.
  email: 'sales@mander.tech',
  portfolio: 'https://hermanify.online',
  // The only social profile that exists today. When a second one does, add it
  // here and to `sameAs` in lib/seo.js — those are the two places a crawler
  // looks to tie the site and the profile to the same business.
  instagram: 'https://www.instagram.com/mander.tech/',
  instagramHandle: '@mander.tech',
  // Google Business Profile. The share link is what Google hands you; the
  // knowledge-graph id inside it (/g/11zdgzpwn5) is the stable part, and it
  // is what ties this site to that listing in the eyes of the crawler.
  googleBusiness: 'https://www.google.com/search?kgmid=/g/11zdgzpwn5',
  // Masthead furniture, set centred in caps under the mark. Kept short and
  // free of hyphenated compounds on purpose — the old line ("small &
  // mid-sized businesses across Canada and the U.S.") broke after "mid-" on
  // a phone, which is the one place a masthead cannot afford a bad break.
  // The small-business keyword work is carried by the metadata, the H1 and
  // the schema, not by this line.
  region: 'Canada & the United States',
};

// The nav is the positioning. It used to be six links, four of them anchors
// into the homepage — Work, Services, Process, Team, Locations, Plans — which
// is a table of contents rather than an argument, and it made the studio look
// like it did a bit of everything. Three pillars, then the two pages someone
// ready to act needs. Everything else is reachable from the footer and from
// the pages themselves.
export const NAV_LINKS = [
  { label: 'Brand', href: '/brand' },
  { label: 'Digital', href: '/digital' },
  { label: 'Growth', href: '/growth' },
  { label: 'Work', href: '/#work' },
  { label: 'Plans', href: '/pricing' },
];

// Pexels — free to use, no attribution required (https://www.pexels.com/license/)
export const IMAGES = {
  // Still fallback for the hero — a graded frame pulled straight from
  // hero.mp4 so reduced-motion/no-video visitors see the same warm grade
  // instead of a mismatched stock photo. Regenerate from the video if it
  // ever changes (see setup-video.bat).
  heroWorkspace: {
    src: '/hero-poster.jpg',
    alt: 'Designer sketching on a graphics tablet, warm editorial tone',
  },
  // `growthOwner` (a Pexels shot of an owner holding a tablet) was removed
  // with the value-prop section it sat in — see TERMS below. The homepage now
  // carries no stock photography outside the Work grid.
};

// --- Services --------------------------------------------------------------
// Deliberately no images. These used to be six full-bleed stock photo bands;
// they were cut because generic stock photography is the weakest possible
// argument on a site whose entire product is design — and because six of them
// meant six screens of scrolling that said nothing. The section is typographic
// now (see ServiceBand.js): a matching line icon, title, copy, and a small
// animated bar chart that rises on scroll (GrowthBars.js) instead of a photo.
//
// `icon` keys into Icon.js. `growth` is a purely decorative bar pattern (0–1
// scale) — there's no real metric behind it, it's the "your numbers go up"
// visual, same idea as a PayPal savings-tracker chart. Keep values honest-
// looking (gentle upward drift, not a straight ramp to 1) rather than a
// manufactured hockey stick.
//
// The old service photo files still sit in /public/services and
// setup-assets.bat still copies them; they're unused now.
export const SERVICES = [
  {
    index: '01',
    title: 'Website Design',
    body: 'Custom, conversion-focused sites built on fast, scalable foundations. Clean code, quick to load, easy for you to update.',
    icon: 'web',
    growth: [0.3, 0.34, 0.4, 0.38, 0.5, 0.6, 0.72, 0.86],
  },
  {
    index: '02',
    title: 'Brand Identity',
    body: 'A cohesive visual system — logo, type, colour, and the rules that hold it together — so you look established from day one.',
    icon: 'brand',
    growth: [0.36, 0.32, 0.44, 0.46, 0.4, 0.58, 0.7, 0.8],
  },
  {
    index: '03',
    title: 'Website Redesign',
    body: 'Modernising a site that has aged out. Better experience, sharper design, and the technical performance search engines reward.',
    icon: 'refresh',
    growth: [0.4, 0.42, 0.36, 0.5, 0.62, 0.58, 0.74, 0.92],
  },
  {
    index: '04',
    title: 'SEO',
    body: 'Technical and content work that puts you in front of high-intent local buyers — the people already searching for what you do.',
    icon: 'search',
    growth: [0.28, 0.3, 0.38, 0.46, 0.44, 0.6, 0.76, 1],
  },
  {
    index: '05',
    title: 'Local Search',
    body: 'Google Business Profile, maps, and directory presence tuned so the right customer in the right town lands on the right page.',
    icon: 'pin',
    growth: [0.34, 0.38, 0.36, 0.52, 0.48, 0.66, 0.7, 0.88],
  },
  {
    index: '06',
    title: 'Care Plan',
    body: 'Hosting, security, backups, and unlimited small edits. We keep the site fast and current so you never think about it.',
    icon: 'shield',
    growth: [0.5, 0.52, 0.48, 0.54, 0.56, 0.6, 0.64, 0.7],
  },
];

// --- Terms -----------------------------------------------------------------
// The "why us" argument, restated as what it actually is: three commitments.
// This replaced a stock photograph sitting beside a tick-list — the one
// pattern on the homepage that still looked like a template, and the last
// piece of generic photography on the route. Set as numbered clauses, the
// section carries the same grammar as the services index and the process
// staircase instead of importing a different one.
export const TERMS = [
  {
    index: '01',
    title: 'Fixed scope, fixed price.',
    body: 'Quoted up front against a written scope. The number you approve is the number you pay — there is no hourly meter running behind it.',
  },
  {
    index: '02',
    title: 'You own all of it.',
    body: 'The site, the code, the domain and every account it touches are registered in your name from day one, not ours.',
  },
  {
    index: '03',
    title: 'No retainer lock-in.',
    body: 'The care plan is month to month. Leave whenever you like and the site stays yours and stays running.',
  },
];

export const PROCESS = [
  {
    step: '01',
    title: 'Discovery',
    body: 'A short call to understand the business, the customer, and what a win actually looks like for you.',
  },
  {
    step: '02',
    title: 'Strategy',
    body: 'A tight plan — structure, messaging, and the exact scope — priced up front with no moving targets.',
  },
  {
    step: '03',
    title: 'Build',
    body: 'Design and development in one motion, shown to you as it comes together, not sprung on you at the end.',
  },
  {
    step: '04',
    title: 'Launch',
    body: 'Testing, handover, and a site you own outright. We stay on for support if you want us to.',
  },
];

// --- Pricing --------------------------------------------------------------
// Starter no longer bundles Google Business / Analytics — those moved into
// Local Search as an add-on / higher tiers.
//
// `specs` are the three numbers a buyer actually compares before they read a
// feature list — pages, timeline, revisions — surfaced on the closed card so
// the tiers can be scanned without opening anything.
//
// `notIncluded` exists because a pricing table that only ever says yes is
// the reason people phone to ask what the catch is. Naming the ceiling on
// each tier is what makes the tier above it obviously worth the money, and
// it is the single most trust-building thing on a pricing page.
export const TIERS = [
  {
    name: 'Launch',
    blurb:
      'For businesses that need a sharp, professional online presence without the complexity.',
    specs: { pages: '1 page', timeline: '~2 weeks', revisions: '1 round' },
    bestFor: 'Brand-new ventures that need to exist online this month.',
    features: ['1-page website', 'Mobile-first responsive design', 'Contact form'],
    detailed: [
      '1-page website',
      'Mobile-first responsive design',
      'Contact form',
      'Google Maps / social links',
      'Basic technical setup',
      '1 revision round',
    ],
    notIncluded: ['Multi-page structure', 'Copywriting support', 'SEO beyond the basics'],
    cta: 'Contact sales',
    featured: false,
  },
  {
    name: 'Starter',
    blurb:
      'A proper small-business website with everything needed to establish a professional online presence.',
    specs: { pages: 'Up to 5 pages', timeline: '3–4 weeks', revisions: '2 rounds' },
    bestFor: 'Established local businesses with no real site yet.',
    features: ['Up to 5 pages', 'Copywriting support', 'Contact + enquiry forms'],
    detailed: [
      'Up to 5 pages',
      'Custom responsive design',
      'Contact + enquiry forms',
      'Copywriting support',
      'Basic technical SEO',
      'Google Maps integration',
      '2 revision rounds',
    ],
    // The ceiling here is deliberate and accurate: Starter builds the site,
    // Growth is where it starts getting found. Naming that gap is what makes
    // the $400 step up read as an obvious decision rather than an upsell.
    notIncluded: [
      'Local SEO / Google Business Profile',
      'Google Analytics + Search Console',
      'Booking / CRM integration',
    ],
    cta: 'Contact sales',
    featured: false,
  },
  {
    name: 'Growth',
    blurb:
      'For businesses ready to turn their website into a real customer-acquisition channel.',
    specs: { pages: 'Up to 10 pages', timeline: '4–6 weeks', revisions: '3 rounds' },
    bestFor: 'Businesses where customers search Google before they buy.',
    features: [
      'Up to 10 pages',
      'Local SEO + Google Business Profile',
      'Booking / CRM integration',
    ],
    detailed: [
      'Up to 10 pages',
      'Custom responsive design',
      'Contact + enquiry forms',
      'Local SEO',
      'On-page SEO',
      'Google Business Profile optimization',
      'Google Search Console setup',
      'Google Analytics',
      'Sitemap + indexing setup',
      'Local keyword research',
      'Metadata + basic schema',
      'Booking / CRM integration',
      '3 revision rounds',
    ],
    notIncluded: ['Custom architecture', 'E-commerce', 'API integrations'],
    cta: 'Contact sales',
    featured: true,
  },
  {
    name: 'Business Pro',
    blurb:
      'For established businesses that need custom functionality beyond a standard website.',
    specs: { pages: 'Unlimited', timeline: '6–10 weeks', revisions: 'Until signed off' },
    bestFor: 'Multi-location or multi-service operations.',
    features: ['Everything in Growth', 'E-commerce', 'API integrations'],
    detailed: [
      'Everything in Growth',
      'Custom architecture',
      'Advanced functionality',
      'E-commerce',
      'API integrations',
      'Booking systems',
      'CRM integrations',
      'Custom workflows',
      'Advanced SEO',
      'Priority support',
    ],
    notIncluded: [],
    cta: 'Contact sales',
    featured: false,
  },
];

// --- Android app pricing ---------------------------------------------------
// Same object shape as TIERS on purpose, so the same card component renders
// them. A separate component would mean a second interaction pattern to learn
// on a page that already has one.
//
// `specs` is an array of [label, value] pairs here rather than the website
// object, because what a buyer compares on an app is not pages and revision
// rounds — it is how much app, how much backend, and how long we stay on
// after it ships.
export const APP_TIERS = [
  {
    name: 'App Launch',
    blurb:
      'A real native Android app on the Play Store — the core of what your business does, in your customers’ hands.',
    specs: [
      ['Scope', 'Up to 8 screens'],
      ['Backend', 'Basic'],
      ['Support', '30 days'],
    ],
    bestFor: 'A first app: one clear job, done properly, live on Google Play.',
    features: ['Up to 8 screens', 'User authentication', 'Google Play deployment'],
    detailed: [
      'Custom Android app',
      'Up to 8 screens',
      'Custom UI/UX',
      'User authentication',
      'Basic backend/database',
      'Contact + enquiry functionality',
      'Push notifications',
      'API integrations',
      'Google Play Store deployment',
      'Google Play listing setup',
      'App icon + store graphics',
      'Basic analytics',
      '30 days post-launch support',
    ],
    notIncluded: ['Payments', 'Admin dashboard', 'Booking / reservations'],
    cta: 'Contact sales',
    featured: false,
  },
  {
    name: 'App Growth',
    blurb:
      'The app that runs the business — accounts, payments, bookings, and a dashboard to see it all from.',
    specs: [
      ['Scope', 'Up to 15 screens'],
      ['Backend', 'Advanced'],
      ['Support', '60 days'],
    ],
    bestFor: 'Businesses taking money or bookings through the app itself.',
    features: ['Payments', 'Booking / reservation system', 'Admin dashboard'],
    detailed: [
      'Everything in App Launch',
      'Up to 15 screens',
      'Advanced backend',
      'User accounts',
      'Payments',
      'Booking/reservation system',
      'Push notifications',
      'Admin dashboard',
      'Analytics',
      'Multiple third-party integrations',
      'Google Play deployment',
      'Play Store listing optimization',
      '60 days post-launch support',
    ],
    notIncluded: ['Multiple user roles', 'Custom API development', 'AI integrations'],
    cta: 'Contact sales',
    featured: true,
  },
  {
    name: 'App Pro',
    blurb:
      'Platform-grade Android — multiple roles, custom APIs, and workflows built to your operation rather than around it.',
    specs: [
      ['Scope', 'Unlimited screens'],
      ['Backend', 'Custom API'],
      ['Support', '90 days'],
    ],
    bestFor: 'Operations where the app is the product, not a companion to it.',
    features: ['Multiple user roles', 'Custom API development', 'AI integrations'],
    detailed: [
      'Everything in App Growth',
      'Multiple user roles',
      'Advanced workflows',
      'Custom API development',
      'Complex database architecture',
      'AI integrations',
      'Advanced admin dashboard',
      'Third-party integrations',
      'Advanced notifications',
      'Advanced analytics',
      'Google Play deployment',
      '90 days post-launch support',
    ],
    notIncluded: [],
    cta: 'Contact sales',
    featured: false,
  },
];

// --- Community Rate --------------------------------------------------------
// 20% off, granted on trust rather than proof. The whole point is that asking
// is easy, so the copy avoids the language of applications, approvals and
// eligibility screening wherever it can — "tell us" rather than "submit".
//
// Deliberately not framed as a promotion or a limited-time offer: it's a
// standing rate, which is why it lives in the pricing conversation rather
// than in a banner. Micro-labels elsewhere on the site point back here; none
// of them are allowed to look like a discount badge.
export const COMMUNITY = {
  rate: '20%',
  title: '20% Community Rate',
  lede: "Because circumstances shouldn't be a barrier to getting good service.",
  body: 'We take 20% off for veterans and active-duty military, single parents, people living with a disability, anyone facing financial hardship or barriers to access, and small, independent, owner-operated businesses — along with other communities where it plainly makes sense.',
  smallBusinessTitle: 'Small business? We’ve got you.',
  smallBusinessBody:
    'Independent businesses and owner-operated teams can request the same 20% rate. No headcount test, no revenue threshold.',
  cta: 'Request the Community Rate',
  entryPoint: 'Eligible for our Community Rate? Get 20% off.',
  entryPointCta: 'See if you qualify',
  microLabel: '20% Community Rate available',
  footerLink: 'Community Rate — 20% off for eligible customers',
  reassurance: 'No complicated applications. No invasive paperwork. Just ask.',

  // Shown as the first step of the request flow. `hint` is the lightest
  // possible confirmation we'd ever ask for — never a document upload.
  categories: [
    { id: 'veteran', label: 'Veteran / Military', hint: 'Branch and years served is plenty.' },
    { id: 'single-parent', label: 'Single Parent', hint: 'Your word is enough.' },
    { id: 'small-business', label: 'Small Business', hint: 'A business email or website link works.' },
    { id: 'hardship', label: 'Financial Hardship', hint: 'A sentence about your situation. No documents.' },
    { id: 'accessibility', label: 'Accessibility / Disability', hint: 'Tell us only what you want to.' },
    { id: 'other', label: 'Other', hint: 'Tell us what’s going on and we’ll take it from there.' },
  ],

  // Plain-language terms. Written to read like a person explaining a policy,
  // not a form gating access to one.
  policy: [
    'The 20% applies to our design and build services and to eligible plans.',
    'We may ask for something small and reasonable to confirm eligibility — a business email, a link, a short note. Nothing invasive, and only what we actually need.',
    'It generally can’t be stacked with another promotion, though ask us if you think your situation warrants it.',
    'One Community Rate per qualifying account, unless we agree otherwise with you.',
    'We may check in on eligibility from time to time for ongoing work.',
    'We use common sense and discretion. If your situation isn’t on the list but the spirit fits, say so.',
    'We may change or end the programme in future. Anyone already on the rate keeps it for work already agreed.',
  ],
};

// Monthly, month-to-month, optional on every tier. Kept next to the list it
// prices — it used to be hardcoded in the pricing page's JSX, which is how a
// price ends up updated in one place and stale in another.
// The published price sheet is now a comment rather than data anywhere in
// this codebase. A `price` field does not merely render — it crosses to the
// browser inside the RSC payload whether or not a component prints it, so
// "hidden in the interface" would still read in view-source. Every figure
// lives in the quote instead.
//
//   Launch $299 · Starter $499 · Growth $899 · Business Pro $1,499+
//   Care Plan $40/mo
//   App Launch $2,999 · App Growth $5,999 · App Pro $9,999+

export const CARE_PLAN = [
  { title: 'Managed Hosting', body: 'Fast, reliable infrastructure — we handle it end to end.' },
  { title: 'SSL & Security', body: 'Encryption plus 24/7 malware scanning and threat prevention.' },
  { title: 'Daily Backups', body: 'Automated off-site backups, restorable in minutes.' },
  { title: 'Unlimited Edits', body: 'Small content changes done for you, no hourly billing.' },
  { title: 'Priority Support', body: 'A direct line to the people who built your site.' },
];

export const STATS = [
  { value: '100k+', label: 'Members served on one client build' },
  { value: '2 wks', label: 'Typical time to a launched site' },
  { value: '100%', label: 'Sites you own outright' },
];

export const FAQS = [
  {
    q: 'How much does a website cost?',
    a: 'Every project is quoted individually, because a one-page site and a ten-page site with local SEO are not the same job. What is fixed is the process: we scope it, quote one number in writing before any work starts, and that is the number you pay. No hourly billing, no surprise invoice at the end. The 60-second quiz returns a real figure for your situation.',
  },
  {
    q: 'How fast can you build my website?',
    a: 'A one-page Launch site typically ships in about two weeks. A fuller Starter or Growth build usually takes four to six weeks, mostly gated by how quickly content and feedback come back from you — not by us.',
  },
  {
    q: 'Do you have budget-friendly options for small businesses?',
    a: 'That is the whole premise. Launch and Starter are built specifically for small businesses that need a real, professional site without agency-level spend, with no retainer required. Ask for a quote and you will get a fixed number rather than a range.',
  },
  {
    q: 'Do you only work with local businesses?',
    a: 'No — we work remotely with small and mid-sized businesses anywhere in the United States and Canada. Everything from the first call to handover happens over email and video, so your location makes no difference to the price or the timeline.',
  },
  {
    q: 'Where are you based, and does it matter?',
    a: 'The team is split between Langley, British Columbia and Maynard, Massachusetts, and we deliver every project remotely across both countries. In practice that means you get the same senior people whether you are in Vancouver, Boston, Austin or a town of four thousand — and we cover both Pacific and Eastern hours between us.',
  },
  {
    q: 'Can you do local SEO if you are not in my town?',
    a: 'Yes, and it is one of the things we do most. Local search is won with your Google Business Profile, location-specific pages, citations and reviews — none of which require us to be down the road from you. We have ranked clients in towns none of us have visited.',
  },
  {
    q: 'Do I own the website?',
    a: 'Yes — completely. On final payment you own the design, the code, and every account, all in your name. No lock-in, no hostage hosting.',
  },
  {
    q: 'What if I am not sure which plan I need?',
    a: 'Take the 60-second fit quiz — it recommends a starting point based on your answers, or routes you straight to a person if your situation is unusual.',
  },
  {
    q: 'Do you charge in USD or CAD?',
    a: 'Either. Prices are shown in USD by default; we invoice Canadian clients in CAD at your preference.',
  },
  {
    q: 'Do you offer any discounts?',
    a: 'Yes — a standing 20% Community Rate for veterans and active-duty military, single parents, people living with a disability, anyone facing financial hardship, and small, independent, owner-operated businesses. There is no application process: tell us which applies and we take it from there. At most we might ask for something small like a business email or a link.',
  },
];

// --- Work -----------------------------------------------------------------
// Client logos are SVG placeholders in /public/logos — replace the files with
// the real marks and nothing else changes. `image` is a stock photo picked to
// actually match the industry (Pexels, free to use) — swap for real client
// photography the moment you have it; a stand-in stock shot next to a real
// client name and result is the one thing worth fixing before this goes live.
//
// The `quote` / `person` fields are gone on purpose. They held invented
// testimonials attributed to named roles at named companies ("Operations
// Director, Fitway Gym"), which is a fabricated endorsement — a real problem
// under FTC endorsement rules and the fastest way to lose a prospect who
// checks. The section that displayed them now runs on the verifiable fields
// below instead (see Testimonials.js). Add quotes back only when they are
// real and you have permission to publish them.
export const WORK = [
  {
    name: 'Fitway Gym',
    sector: 'Commercial Fitness',
    location: 'Mohali, Punjab, India',
    logo: '/logos/fitway.svg',
    image: '/work/fitway.png',
    // `imageAlt` describes what is actually in the frame. The cards used to
    // derive alt text as "<name> — <sector>", which is a caption, not a
    // description: it repeated text already sitting next to the image and
    // told a screen reader (and Google Images) nothing about the picture.
    // Fitway and Nouvelle Côte are now real screenshots of the live sites,
    // so their alt text describes the page. Waste Universe is still sector
    // photography on purpose — see the note on that entry.
    imageAlt:
      'The Fitway Gym homepage — a dark hero over a barbell rack, headlined “Push Your Limits”, with the programme nav above it',
    result: '100k+ members',
    body: 'A luxury gym with the floor, the coaches and the programmes already in place, and nothing online carrying any of it. We built a dark, high-contrast site around the eight training programmes, the class timings, the coaching team and member results — so an enquiry arrives already knowing what the gym is. Over 100,000 members served.',
    services: ['Website Design', 'Responsive Build', 'Care Plan'],
    scope: 'Programme pages, class timings, trainer profiles, enquiries',
    href: 'https://fitwaygym.in',
  },
  {
    name: 'Nouvelle Côte',
    sector: 'Hospitality',
    location: 'Nice, France',
    logo: '/logos/nouvelle-cote.svg',
    image: '/work/nouvelle-cote.png',
    imageAlt:
      'The Nouvelle Côte homepage — a serif wordmark and reservation nav over a sunlit dining room, headlined “The Architecture of Flavor”',
    result: 'Direct bookings',
    body: 'A Riviera dining room whose atmosphere never made it online. We built a restrained, image-led site that lets the photography carry the room — seasonal menu, wine cellar, gallery and journal — with direct reservations front and centre to pull bookings back off the aggregators.',
    services: ['Brand Identity', 'Website Design', 'Direct Reservations'],
    scope: 'Seasonal menu, wine cellar, gallery, direct reservations',
    href: 'https://nouvellemaison.vercel.app/',
  },

  // Kept for the Massachusetts footprint, which is worth real search value,
  // but deliberately held back: the owner has since replaced this build with
  // his own design, so the live site no longer shows our work. No link out —
  // linking it would attribute his redesign to us — and no screenshot, for
  // the same reason. The stock photograph stays. Restore both only if the
  // site comes back under our design.
  {
    name: 'Waste Universe',
    sector: 'Waste Management',
    location: 'Rhode Island & Massachusetts',
    logo: '/logos/waste-universe.svg',
    image: 'https://images.pexels.com/photos/16891361/pexels-photo-16891361.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageAlt:
      'A rear-loading refuse truck lit up in a collection depot at night',
    result: 'RI & MA coverage',
    body: 'A family-run waste operation — roll-off dumpster rental, residential curbside and commercial collection across Rhode Island and Massachusetts — sold through a site that looked smaller than the business. We rebuilt it around the three services and a quote request, with local SEO tuned to the towns they actually cover.',
    services: ['Website Redesign', 'Local SEO', 'Local Search'],
    scope: 'Service pages, quote requests, service-area coverage',
  },

  // --- In-house builds ----------------------------------------------------
  // Everything below is MANDER's own work, not a paid client engagement, and
  // `kind: 'studio'` is what puts the "In-house" tag on the card. Two of them
  // say so in their own repositories — KERN's README opens with a portfolio
  // disclaimer calling it a front-end prototype, and Kinetic Roast is built
  // around a deliberately fictional roastery. Presenting either as client
  // work would be inventing a client, which is the one thing the rest of this
  // file is careful never to do. Keep the tag.
  //
  // `image: null` is a supported state — WorkCompact falls back to a
  // typographic tile. KERN's deployment is currently down and TvCan is a
  // Windows desktop app, so neither has a usable screenshot yet; drop one
  // into /public/work and add the path here when they do.
  {
    name: 'RentCan',
    kind: 'studio',
    sector: 'Property Management',
    location: 'Live at rentcan.in',
    image: '/work/rentcan.png',
    imageAlt:
      'RentCan owner dashboard showing portfolio occupancy, rent collection and active property listings',
    result: 'Shipped product',
    body: 'A property management platform for owners running homes remotely — passwordless sign-in over OAuth and SMS, a standardised inspection report backed by timestamped photography, a document vault and a payments ledger. Built mobile-first as a browser substitute for a native app.',
    services: ['Product Design', 'Full-Stack Build', 'Design System'],
    scope: 'Owner dashboard, inspection reports, document vault, payments',
    stack: ['Node / Express', 'Supabase Postgres', 'Tailwind'],
    href: 'https://rentcan.in',
  },
  {
    name: 'TvCan',
    kind: 'studio',
    sector: 'Desktop Software',
    location: 'Windows',
    image: null,
    result: '10k+ channels',
    body: 'A desktop live-TV player built on a VLC engine, aggregating thousands of freely available public IPTV streams into one organised interface. Thousands of fragmented source categories are normalised into a handful of readable groups, and dead redirects are filtered out so listed channels actually play.',
    services: ['Product Design', 'Desktop App', 'Interface Design'],
    scope: 'Channel normalisation, stream filtering, transport controls',
    stack: ['Electron', 'VLC engine', 'HLS.js'],
    href: 'https://github.com/hvndal/TvCan',
  },
  {
    name: 'KERN',
    kind: 'studio',
    sector: 'Product Design',
    location: 'Front-end prototype',
    image: null,
    result: 'Interface study',
    body: 'A workspace interface exploring how project management, tasks, notes, scheduling, files and analytics fit into one coherent product rather than six disconnected tools. Kanban boards, a three-pane notes editor, charted productivity analytics and a keyboard-driven command palette, on a typed component system.',
    services: ['Product Design', 'Design System', 'Front-End Build'],
    scope: 'Dashboard, kanban, notes, calendar, analytics, command palette',
    stack: ['React', 'TypeScript', 'Zustand'],
    href: 'https://github.com/hvndal/KERN',
  },
  {
    name: 'Kinetic Roast',
    kind: 'studio',
    sector: 'Brand & Web',
    location: 'Concept build',
    image: '/work/kinetic-roast.png',
    imageAlt:
      'The Kinetic Roast site — a near-black coffee brand page with architectural display type and heat-lit product photography',
    result: 'Concept build',
    body: 'A cinematic brand site for a deliberately fictional coffee roastery, built as an art-direction study — a near-black palette lit by heat-map gradients, display type used architecturally, and scroll and 3D work carrying the idea that roasting is thermal engineering rather than a lifestyle photograph.',
    services: ['Art Direction', 'Brand Identity', 'Website Design'],
    scope: 'Art direction, motion, 3D product study',
    stack: ['Next.js', 'Framer Motion', 'React Three Fiber'],
    href: 'https://kinetic-roast.vercel.app',
  },
];

// Paid client engagements only. The Selected-clients logo strip and the
// Engagements section ("what we actually delivered") must not pick up the
// in-house builds above — one has no client logo to show, and both would be
// claiming a customer relationship that doesn't exist. The rotating Selected
// Work grid is the one place the two sit together, and there the card carries
// an "In-house" tag.
export const CLIENTS = WORK.filter((project) => project.kind !== 'studio');

// --- Team -----------------------------------------------------------------
// Five people: the founder in Langley, BC and the rest out of Maynard, MA.
// Concentrating them in one town is deliberate — a scattered list of six
// cities across a five-person company reads as stock-photo staffing, and the
// whole pitch here is "small, senior, reachable".
//
// Three of the five build the work (Herman, Danielle, Tyler), one runs the
// platform side (Sophie), one owns the client relationship (Evan) — so the
// team actually accounts for design and engineering rather than implying a
// company of marketers.
//
// `crop` is an art-direction hint consumed by TeamCard: 'half' pushes the
// subject to the frame edge so they sit half out of it.
// photo: null still renders an initials placeholder if a slot goes empty.
// NOTE: these bios are written copy, not verified fact — check before launch.
export const TEAM = [
  {
    name: 'Herman',
    role: 'Founder & Design Lead',
    location: 'Langley, BC',
    bio: 'Studied computing science and philosophy at Trinity Western in Langley — the mix of building things and asking why they should exist that still runs the shop. Designs and builds alongside the team rather than above it.',
    photo: '/team/herman.jpg',
    link: { label: 'Personal portfolio', href: BRAND.portfolio },
  },
  {
    name: 'Danielle Brooks',
    role: 'Creative Director',
    location: 'Maynard, MA',
    bio: 'Came out of print — three years art-directing an independent design quarterly. Sets everything on a grid first and adds colour last, if at all.',
    photo: '/team/danielle.jpg',
  },
  {
    name: 'Tyler Nakamura',
    role: 'Design Engineer',
    location: 'Maynard, MA',
    bio: 'Trained as an industrial designer, moved to the web when tooling cycles got shorter than furniture ones. Owns the component library and most of the front end.',
    photo: '/team/tyler.jpg',
    crop: 'half',
  },
  {
    name: 'Sophie Bennett',
    role: 'Technical Lead',
    location: 'Maynard, MA',
    bio: 'Handles the parts clients never see — hosting, performance budgets, integrations, and the security work that keeps a small business off an incident report.',
    photo: '/team/sophie.jpg',
  },
  {
    name: 'Evan Mercado',
    role: 'Sales & Client Relations',
    location: 'Maynard, MA',
    bio: 'Moved from the Philippines to New England as a child and has been translating between people ever since. First call, scoping, and the one who keeps you posted — so you are never chasing an update.',
    photo: '/team/evan.jpg',
  },
];

// --- Quiz (drives /quote) -------------------------------------------------
// Each option carries a `weight` toward a tier. Highest total wins; ties break
// to the higher tier. `sales: true` on an answer forces a human handoff.
export const QUIZ = {
  intro: {
    eyebrow: 'Fit quiz · 60 seconds',
    title: 'Find the right starting point.',
    body: 'Six quick questions about the business — not about your budget. We recommend a plan based on your answers, or hand you to a person if that is the better move. No email required to see your result.',
  },
  // There used to be a seventh question asking what budget you were working
  // with, and it was the worst question here. It asked what you could pay
  // instead of what you needed, it anchored low (the cheapest option was
  // listed first), and it let someone who genuinely needed local search talk
  // themselves into a brochure site — which is a bad recommendation and a
  // lost sale in the same move. Worse, it told the reader the quiz was a
  // price calculator wearing a diagnosis costume, which is exactly the thing
  // that makes people distrust the answer.
  //
  // What replaced it is the question a decent consultant actually opens
  // with: when someone searches for what you do, what comes up? It is the
  // only question here most owners cannot answer confidently, and every
  // honest answer to it points at the same work.
  questions: [
    {
      id: 'stage',
      question: 'Where is the business today?',
      options: [
        { label: 'Brand new — nothing online yet', weights: { Launch: 2, Starter: 1 } },
        { label: 'Trading already, but no real website', weights: { Starter: 2, Growth: 1 } },
        { label: 'We have a site — it is dated or not working', weights: { Growth: 2, Starter: 1 } },
        { label: 'Established, multiple locations or services', weights: { 'Business Pro': 2, Growth: 1 } },
      ],
    },
    {
      id: 'discovery',
      question: 'How do customers find you today?',
      options: [
        { label: 'Word of mouth, mostly', weights: { Starter: 1, Growth: 1 } },
        { label: 'Social media — Instagram, Facebook', weights: { Starter: 1, Growth: 2 } },
        { label: 'They search Google for what we do', weights: { Growth: 2 } },
        { label: 'Paid ads or referrals we pay for', weights: { Growth: 2, 'Business Pro': 1 } },
      ],
    },
    {
      id: 'search',
      question: 'When someone searches for what you do in your area, what comes up?',
      options: [
        { label: 'Us, near the top', weights: { Growth: 1, Starter: 1 } },
        { label: 'Competitors — not us', weights: { Growth: 2 } },
        { label: 'Just directories — Yelp, Facebook, Yellow Pages', weights: { Growth: 2 } },
        { label: 'Honestly, no idea', weights: { Growth: 1, Starter: 1 } },
      ],
    },
    {
      id: 'pages',
      question: 'How much do you need to say?',
      options: [
        // Weighted heavier than its neighbours on purpose. Someone who tells
        // you one page is plenty has given you the clearest signal in the
        // whole quiz, and nudging them up to a five-page plan anyway is how
        // a recommendation stops being worth reading.
        { label: 'One page is plenty', weights: { Launch: 3 } },
        { label: 'A handful — 3 to 5 pages', weights: { Starter: 2 } },
        { label: 'Ten or so, with room to grow', weights: { Growth: 2 } },
        { label: 'A lot, or a full store', weights: { 'Business Pro': 2 } },
      ],
    },
    {
      id: 'action',
      question: 'What should happen when someone is interested?',
      options: [
        { label: 'They call or email us', weights: { Launch: 1, Starter: 2 } },
        { label: 'They send an enquiry through the site', weights: { Starter: 1, Growth: 2 } },
        { label: 'They book a slot or appointment themselves', weights: { Growth: 2 } },
        { label: 'They order, pay, or use a custom system', weights: { 'Business Pro': 2, sales: true } },
      ],
    },
    {
      id: 'value',
      question: 'Roughly what is one new customer worth to you?',
      options: [
        { label: 'Under $100', weights: { Launch: 1, Starter: 1 } },
        { label: 'A few hundred dollars', weights: { Growth: 2 } },
        { label: '$1,000 or more', weights: { Growth: 2, 'Business Pro': 1 } },
        { label: 'They stay with us for months or years', weights: { Growth: 2, 'Business Pro': 1 } },
      ],
    },
  ],
  // Reasoning shown with each recommended tier. Written to answer "why this
  // one" rather than to congratulate anyone on their answers.
  reasons: {
    Launch: 'You need to look real and get online fast, without paying for pages you will not use yet.',
    Starter: 'A focused few-page site is the sweet spot — enough to sell for you, nothing wasted.',
    Growth: 'People are searching for what you do and finding someone else. Growth is the tier where the site stops being a brochure and starts being found — local SEO, Google Business Profile, and the booking or enquiry flow that turns a search into a customer.',
    'Business Pro': 'Your needs go past a template — custom architecture and integrations are the right call.',
  },
};
// --- Careers ---------------------------------------------------------------
// IMPORTANT, read before this page goes live: everything in this block is a
// statement about how MANDER hires. Unlike the rest of this file, none of it
// can be checked against the site or the code — it has to be checked against
// you. The defaults below are written to be true of a small remote studio and
// to promise nothing specific (no salary bands, no benefits, no headcount),
// which is the safe place to start. Confirm or correct each one before
// publishing, and treat `roles[].status` as the thing most likely to go stale.
//
// Deliberately absent: invented job openings with salaries and closing dates.
// A candidate who applies for a role that does not exist is a candidate who
// tells other people about it. `status: 'rolling'` says the honest thing —
// this is a discipline we hire for, not a vacancy we are promising.
export const CAREERS = {
  intro: {
    eyebrow: 'Careers',
    title: 'Work on sites that have to earn their keep.',
    body: 'MANDER is a small remote studio building websites and Android apps for small businesses across Canada and the United States. Every project is fixed-scope and fixed-price, which changes what the work feels like day to day more than anything else on this page.',
  },

  // What it is actually like. Each of these is downstream of something the
  // studio already does — fixed-price quoting, client ownership, month-to-month
  // care plans — rather than a value statement invented for a careers page.
  culture: [
    {
      title: 'Fixed scope, not open-ended crunch',
      body: 'Work is quoted against a written scope before it starts. That discipline exists for the client, but you get it too: the deadline was agreed by someone who knew what the job was, and nobody is absorbing an invisible overrun on a Friday night.',
    },
    {
      title: 'Small team, visible work',
      body: 'There is no layer between what you make and the person paying for it. You will talk to the business owner, hear what actually broke, and see your work carry real traffic instead of disappearing into a backlog.',
    },
    {
      title: 'Remote across two countries',
      body: 'The team works from British Columbia and Massachusetts. Overlap matters more than location — a few reliable hours against Pacific time is worth more than sitting in a particular city.',
    },
    {
      title: 'Craft is the product',
      body: 'Clients come to us because the work looks considered rather than templated. That only holds if the people making it care about typography, performance and the details nobody is asked to fix.',
    },
  ],

  // Disciplines we hire for, not a list of vacancies. `status` is one of:
  //   'open'    — actively interviewing, shown as a live opening
  //   'rolling' — no vacancy today, applications kept on file
  //   'closed'  — hidden from the page entirely
  roles: [
    {
      id: 'web-design',
      title: 'Web Designer',
      discipline: 'Design',
      type: 'Contract or full-time',
      location: 'Remote — Canada or U.S.',
      status: 'rolling',
      blurb: 'Design small-business sites that look authored rather than assembled, and hand them over in a state a developer can actually build.',
      doing: [
        'Take a business from a discovery call to a designed, build-ready site',
        'Set type, layout and motion inside an existing design system',
        'Write or shape the copy when the words are the problem',
      ],
      looking: [
        'A portfolio where the typography is the strongest thing in it',
        'Comfort designing to a fixed scope instead of an open brief',
        'Figma fluency, and opinions you can defend without a deck',
      ],
    },
    {
      id: 'frontend',
      title: 'Front-End Developer',
      discipline: 'Engineering',
      type: 'Contract or full-time',
      location: 'Remote — Canada or U.S.',
      status: 'rolling',
      blurb: 'Build the sites in Next.js and Tailwind, and keep them fast on the mid-range Android phone most of our clients’ customers are actually holding.',
      doing: [
        'Build responsive marketing sites in Next.js, React and Tailwind',
        'Hold a performance budget and a clean Core Web Vitals pass',
        'Wire up forms, bookings, CRM and analytics integrations',
      ],
      looking: [
        'Production React and Next.js, App Router included',
        'Semantic, accessible markup written on purpose rather than by habit',
        'The instinct to reach for less JavaScript, not more',
      ],
    },
    {
      id: 'android',
      title: 'Android Developer',
      discipline: 'Engineering',
      type: 'Contract',
      location: 'Remote — Canada or U.S.',
      status: 'rolling',
      blurb: 'Build the native Android side of the studio — custom apps shipped to Google Play under the client’s own developer account.',
      doing: [
        'Build native Android apps from a designed spec',
        'Stand up the backend, auth, payments and push a build needs',
        'Take a release through Play Store review and the listing setup',
      ],
      looking: [
        'Shipped Android apps you can point at on Google Play',
        'Kotlin, and comfort owning the backend a small app needs',
        'Patience with store review, because it is half the job',
      ],
    },
    {
      id: 'seo',
      title: 'SEO & Local Search Specialist',
      discipline: 'Growth',
      type: 'Part-time or contract',
      location: 'Remote — Canada or U.S.',
      status: 'rolling',
      blurb: 'Make sure the sites we build actually get found — local search, Google Business Profile, and the technical work underneath it.',
      doing: [
        'Keyword and local research for a specific town, not a category',
        'Google Business Profile, Search Console and indexing setup',
        'Technical SEO: schema, metadata, sitemaps, Core Web Vitals',
      ],
      looking: [
        'Local SEO results you can describe honestly, ranking claims included',
        'Comfort in Search Console and a real analytics stack',
        'Allergy to tactics that need explaining to a client twice',
      ],
    },
  ],

  // An email is a worse form and a better front door. The one thing a form
  // did better was tell people what to send — so that becomes this list
  // instead, and the inbox stops filling with three-line messages that need a
  // reply before they can be read properly.
  applyWith: [
    'Where you are and what you do, in a sentence',
    'The role you are after — or "open application" if none of them fit',
    'Links: portfolio, GitHub, LinkedIn, a CV if you have one',
    'One thing you have made, and why you think it is good',
  ],

  // What actually happens after the application lands. Every step here is a promise
  // to a candidate — including the paid one — so change it if it is not what
  // you intend to do.
  process: [
    {
      step: '01',
      title: 'You apply',
      body: 'One email, to a person, with whatever you have got. No cover letter, no portal, no account to create — and nothing sitting in front of us filtering it.',
    },
    {
      step: '02',
      title: 'We reply',
      body: 'Within one week, either way. A no is a no rather than silence, because being left hanging is the worst part of applying anywhere.',
    },
    {
      step: '03',
      title: 'A conversation',
      body: 'A call about the work you have already done and the work we have on. Not a whiteboard, not a trivia round on framework internals.',
    },
    {
      step: '04',
      title: 'A small paid project',
      body: 'One real, scoped piece of work, paid at your rate. It tells us more than any interview, and you find out what working here is like before either of us commits.',
    },
  ],

  faqs: [
    {
      q: 'Do I need to be in Canada or the U.S.?',
      a: 'For employed roles, yes — that is where the studio operates and pays. For contract work we are more flexible, but we need a few dependable hours of overlap with Pacific time, so a timezone far outside the Americas rarely works well for either side.',
    },
    {
      q: 'There is no opening for my discipline. Should I still apply?',
      a: 'Yes. We are a small studio and we hire in bursts rather than continuously, so most of the disciplines above sit at "applications open" for long stretches. A strong application gets kept and revisited when work lands — that is genuinely how most of the team arrived.',
    },
    {
      q: 'Is there an application form?',
      a: 'No. Email is the whole process — attach a CV if you have one, or just send links. A portfolio or a live site tells us more in thirty seconds than a form does in twenty fields, and you should not have to fill in boxes to start a conversation.',
    },
    {
      q: 'Is the test project really paid?',
      a: 'Yes, at your quoted rate, on a scope agreed in writing before you start. Asking people to work for free is the same thing as asking them to subsidise our hiring, and it filters for who can afford it rather than who is good.',
    },
    {
      q: 'What happens to my information?',
      a: 'It goes to one inbox and stays there. We keep applications on file so we can come back to them when something opens up, and if you would rather we did not, say so in the form or email us and it is deleted.',
    },
  ],
};
