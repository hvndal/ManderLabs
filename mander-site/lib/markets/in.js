// The India market.
//
// Same site, same design system, same components — only the numbers, the
// currency, the contact options and the local-search language change. There
// is no separate Indian layout, no separate stylesheet and no cheaper
// treatment of anything: every value here is fed to the components the US
// market already renders.
//
// On the prices: these are set to what a small Indian business actually pays
// for this work, not to a converted dollar figure. A straight conversion of
// the US card ($499 ≈ ₹42,000) prices the studio out of the market it is
// trying to enter, so the ladder is rebuilt from the local end — a five-page
// custom site at ₹19,999, local search bundled at ₹34,999, and the ongoing
// work sold monthly at ₹2,499 / ₹4,999 where a retainer is a normal expense
// rather than an unusual one. The Play Store tiers follow the same logic.
import { QUIZ } from '../content';

const TIERS = [
  {
    name: 'Starter Website',
    price: '₹19,999',
    priceQualifier: 'Starting at',
    from: 19999,
    fromLabel: '₹19,999',
    blurb:
      'A proper custom website for the business — fast, mobile-first, and built to turn a search into an enquiry.',
    specs: { pages: 'Up to 5 pages', timeline: '2–3 weeks', revisions: '2 rounds' },
    bestFor: 'Businesses running on a Facebook page or a WhatsApp number alone.',
    features: [
      'Custom responsive website',
      'Up to 5 pages',
      'Contact + WhatsApp integration',
    ],
    detailed: [
      'Custom responsive website',
      'Up to 5 pages',
      'Mobile optimization',
      'Contact / WhatsApp integration',
      'Basic on-page SEO',
      'Domain + hosting deployment',
      'Google Search Console setup',
      'Basic analytics setup',
    ],
    // Naming the ceiling is what makes the tier above it an obvious decision
    // rather than an upsell — the same argument the US card makes.
    notIncluded: [
      'Google Business Profile setup',
      'Local SEO foundations',
      'Structured metadata / schema',
    ],
    cta: 'Contact sales',
    featured: false,
  },
  {
    name: 'Website + Local',
    price: '₹34,999',
    priceQualifier: 'Starting at',
    from: 34999,
    fromLabel: '₹34,999',
    blurb:
      'The website plus everything that gets it found on Google Search and Maps in your own city.',
    specs: { pages: 'Up to 5 pages', timeline: '3–4 weeks', revisions: '2 rounds' },
    bestFor: 'Businesses whose customers search Google or Maps before they call.',
    features: [
      'Everything in Starter',
      'Google Business Profile setup',
      'Local SEO foundations',
    ],
    detailed: [
      'Everything in Starter Website',
      'Google Business Profile setup + optimization',
      'Local SEO foundations',
      'Google Maps / Search optimization',
      'Structured metadata + schema basics',
      'Sitemap + indexing setup',
      'Local business information consistency',
    ],
    notIncluded: ['E-commerce', 'Custom integrations', 'Android app'],
    cta: 'Contact sales',
    featured: true,
  },
];

// Sold as plans rather than as a single add-on, because monthly retainers are
// an ordinary line item for a small Indian business in a way a one-off
// "care plan" is not. Same card component as the build tiers.
const MONTHLY_TIERS = [
  {
    name: 'Mander Care',
    price: '₹2,499',
    priceQualifier: 'Per month',
    from: 2499,
    fromLabel: '₹2,499/month',
    blurb:
      'The site stays fast, secure and current, and you never think about it again.',
    specs: { pages: 'Month to month', timeline: 'Same-week edits', revisions: 'Unlimited small' },
    bestFor: 'Any live site that has to stay up and stay accurate.',
    features: ['Hosting & maintenance', 'Backups & security', 'Minor updates included'],
    detailed: [
      'Hosting & technical maintenance',
      'Backups & security',
      'Minor website updates',
      'Content / image changes',
      'Uptime monitoring',
      'Basic technical SEO maintenance',
    ],
    notIncluded: ['Ongoing local SEO', 'Monthly reporting', 'New landing pages'],
    cta: 'Contact sales',
    featured: false,
  },
  {
    name: 'Mander Growth',
    price: '₹4,999',
    priceQualifier: 'Per month',
    from: 4999,
    fromLabel: '₹4,999/month',
    blurb:
      'Everything in Care, plus the ongoing search work that keeps new customers arriving.',
    specs: { pages: 'Month to month', timeline: 'Monthly cycle', revisions: 'Unlimited small' },
    bestFor: 'Businesses competing for the same local searches every month.',
    features: ['Ongoing local SEO', 'Google Business Profile upkeep', 'Monthly report'],
    detailed: [
      'Everything in Mander Care',
      'Ongoing local SEO',
      'Google Business Profile maintenance',
      'Monthly optimization',
      'New / updated landing pages where appropriate',
      'Search performance monitoring',
      'Monthly report',
    ],
    notIncluded: [],
    cta: 'Contact sales',
    featured: true,
  },
];

// Play Store work, priced the same way the websites are — from what the work
// is worth locally, not from the US card.
const APP_TIERS = [
  {
    name: 'App Launch',
    price: '₹49,999',
    priceQualifier: 'Starting at',
    from: 49999,
    fromLabel: '₹49,999',
    blurb:
      'A real native Android app on the Play Store — the core of what the business does, in your customers’ hands.',
    specs: [
      ['Scope', 'Up to 8 screens'],
      ['Backend', 'Basic'],
      ['Support', '30 days'],
    ],
    bestFor: 'A first app: one clear job, done properly, live on Google Play.',
    features: ['Up to 8 screens', 'User authentication', 'Play Store deployment'],
    detailed: [
      'Custom Android app',
      'Up to 8 screens',
      'Custom UI/UX',
      'User authentication',
      'Basic backend / database',
      'Push notifications',
      'Google Play Store deployment',
      'Play listing setup + store graphics',
      'Basic analytics',
      '30 days post-launch support',
    ],
    notIncluded: ['Payments / UPI', 'Admin dashboard', 'Booking / reservations'],
    cta: 'Contact sales',
    featured: false,
  },
  {
    name: 'App Growth',
    price: '₹99,999',
    priceQualifier: 'Starting at',
    from: 99999,
    fromLabel: '₹99,999',
    blurb:
      'The app that runs the business — accounts, UPI payments, bookings, and a dashboard to see it all from.',
    specs: [
      ['Scope', 'Up to 15 screens'],
      ['Backend', 'Advanced'],
      ['Support', '60 days'],
    ],
    bestFor: 'Businesses taking money or bookings through the app itself.',
    features: ['UPI / card payments', 'Booking system', 'Admin dashboard'],
    detailed: [
      'Everything in App Launch',
      'Up to 15 screens',
      'Advanced backend',
      'User accounts',
      'UPI / card payments',
      'Booking / reservation system',
      'Admin dashboard',
      'Analytics',
      'Third-party integrations',
      '60 days post-launch support',
    ],
    notIncluded: ['Multiple user roles', 'Custom API development', 'AI integrations'],
    cta: 'Contact sales',
    featured: true,
  },
  {
    name: 'App Pro',
    price: '₹1,99,999',
    priceQualifier: 'Starting at',
    from: 199999,
    fromLabel: '₹1,99,999',
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
      'Advanced analytics',
      '90 days post-launch support',
    ],
    notIncluded: [],
    cta: 'Contact sales',
    featured: false,
  },
];

// Two tiers, so two value columns per row. The table is positional — this is
// why it cannot be shared with the US market's four-column version.
const COMPARISON = [
  { feature: 'Pages', values: ['Up to 5', 'Up to 5'] },
  { feature: 'Delivery', values: ['2–3 weeks', '3–4 weeks'] },
  { feature: 'Custom responsive design', values: [true, true] },
  { feature: 'Mobile optimization', values: [true, true] },
  { feature: 'Contact / WhatsApp integration', values: [true, true] },
  { feature: 'On-page SEO', values: ['Basic', 'Advanced'] },
  { feature: 'Google Search Console', values: [true, true] },
  { feature: 'Analytics setup', values: ['Basic', 'Basic'] },
  { feature: 'Google Business Profile', values: [false, true] },
  { feature: 'Local SEO foundations', values: [false, true] },
  { feature: 'Google Maps / Search optimization', values: [false, true] },
  { feature: 'Structured metadata + schema', values: [false, true] },
  { feature: 'Sitemap + indexing setup', values: [false, true] },
  { feature: 'Business information consistency', values: [false, true] },
  { feature: 'Revision rounds', values: ['2', '2'] },
];

const FAQS = [
  {
    q: 'How much does a website cost?',
    a: 'A custom five-page website starts at ₹19,999. Adding Google Business Profile setup and the local search work that gets you found on Maps takes it to ₹34,999. Both are fixed prices quoted before any work starts — there is no hourly billing and no surprise invoice at the end.',
  },
  {
    q: 'How fast can you build my website?',
    a: 'A Starter Website typically ships in two to three weeks. Website + Local usually takes three to four, mostly depending on how quickly photos, content and feedback come back from you rather than on us.',
  },
  {
    q: 'Do I own the website?',
    a: 'Yes. The site, the code, the domain and every account it touches are registered in your name from day one. If you ever stop working with us, everything stays yours and stays running.',
  },
  {
    q: 'Will my business show up on Google Maps?',
    a: 'That is exactly what Website + Local is for. We set up or clean up your Google Business Profile, make the business name, address and phone number consistent everywhere Google reads them, add the structured data that tells Google what you do and where, and submit the site for indexing. It is the single highest-return piece of work for a local business in India.',
  },
  {
    q: 'Do I have to take a monthly plan?',
    a: 'No. The build is a one-time cost and the site is yours whether or not you continue with us. Mander Care at ₹2,499/month covers hosting, backups, security and small edits; Mander Growth at ₹4,999/month adds the ongoing local SEO and a monthly report. Both are month to month with no lock-in.',
  },
  {
    q: 'How do we talk?',
    a: 'WhatsApp is the fastest route — message us on +91 81462 08024 and you will get a person, not a form. Email works too, and everything from the first conversation to handover happens remotely, so where you are in India makes no difference to the price or the timeline.',
  },
];

// The quiz is the US quiz with two changes: the one question denominated in
// dollars, and the reasoning text, which has to name Indian tiers. The
// scoring itself is untouched — it still works in US tier names, and
// quizTierAlias below maps its answer onto the two Indian plans. Rewriting
// the scoring per market would mean maintaining two of them.
const QUIZ_IN = {
  ...QUIZ,
  questions: QUIZ.questions.map((question) =>
    question.id !== 'value'
      ? question
      : {
          ...question,
          options: [
            { label: 'Under ₹5,000', weights: { Launch: 1, Starter: 1 } },
            { label: 'A few thousand rupees', weights: { Growth: 2 } },
            { label: '₹50,000 or more', weights: { Growth: 2, 'Business Pro': 1 } },
            { label: 'They stay with us for months or years', weights: { Growth: 2, 'Business Pro': 1 } },
          ],
        }
  ),
  reasons: {
    Launch:
      'You need to look real and get online quickly, without paying for pages you will not use yet.',
    Starter:
      'A focused five-page site is the sweet spot — enough to sell for you, nothing wasted.',
    Growth:
      'People are searching for what you do and finding someone else. This is the plan where the site stops being a brochure and starts being found — Google Business Profile, Maps, and the local search work behind both.',
    'Business Pro':
      'Your needs go past a standard build. Start with Website + Local and we will scope the custom work on a call rather than guess at it here.',
  },
};

export const IN_MARKET = {
  id: 'in',
  currency: 'INR',
  locale: 'en_IN',

  // The only market with a WhatsApp number. Every WhatsApp affordance on the
  // site renders from this object and nothing else, so it appears here and
  // is absent from the US HTML entirely.
  whatsapp: {
    display: '+91 81462 08024',
    // wa.me wants the number with country code and no punctuation.
    url: 'https://wa.me/918146208024',
    cta: 'Chat with us on WhatsApp',
  },

  tagline: 'Websites & digital experiences for growing businesses.',
  region: 'India',
  colophon: {
    headline: 'Websites that grow your business.',
    body: 'Custom design and build for growing businesses across India — priced for a local business, built to the same standard as everything else we ship.',
  },

  tiers: TIERS,
  appTiers: APP_TIERS,
  appsFromLabel: '₹49,999',
  comparison: COMPARISON,

  monthlyTiers: MONTHLY_TIERS,
  monthlyHeading: 'Keep it growing — from ₹2,499/month.',
  monthlyBody:
    'Month to month, cancel any time. Care keeps the site fast, secure and current; Growth adds the ongoing local search work and a monthly report.',
  carePlan: null,
  carePlanPrice: '₹2,499/month',

  faqs: FAQS,
  quiz: QUIZ_IN,
  // Quiz scoring speaks in US tier names; India sells two build plans. This
  // maps one onto the other so a single scoring model serves both markets.
  quizTierAlias: {
    Launch: 'Starter Website',
    Starter: 'Starter Website',
    Growth: 'Website + Local',
    'Business Pro': 'Website + Local',
  },

  priceNote:
    'Prices in INR, inclusive of build. One-time cost unless otherwise agreed — GST extra where applicable. Hosting and ongoing work are available monthly via Mander Care and Mander Growth.',

  meta: {
    title: 'MANDER | Website Design for Growing Businesses in India',
    description:
      'Custom websites and digital experiences for growing businesses across India. Fixed-price builds from ₹19,999, with Google Business Profile and local SEO.',
    ogTitle: 'MANDER | Websites & Digital Experiences for Growing Businesses',
    ogDescription:
      'Custom website design, development and local SEO for growing businesses in India. Fixed-price builds from ₹19,999. WhatsApp us to start.',
    twitterDescription:
      'Custom websites and local SEO for growing businesses across India. Fixed-price builds from ₹19,999.',
    keywords: [
      'website design India',
      'website design for small business India',
      'affordable website design India',
      'website designer near me',
      'local SEO India',
      'Google Business Profile setup India',
      'Google Maps listing for business',
      'small business website ₹19999',
      'website maintenance plan India',
      'Android app development for small business India',
    ],
    pricing: {
      title: 'Website Design Pricing in India — Plans from ₹19,999',
      description:
        'Fixed-price website design for growing businesses in India. Starter Website ₹19,999, Website + Local ₹34,999, monthly care from ₹2,499. No hidden fees.',
    },
    quote: {
      title: 'Get a Quote — Custom Website Design in India',
      description:
        'Answer six quick questions and get a recommended plan and starting price for a custom website — or message us straight away on WhatsApp.',
    },
  },

  schema: {
    description:
      'Website design, development and local SEO for growing businesses across India. Fixed-price custom builds from ₹19,999.',
    priceRange: '₹19,999–₹1,99,999+',
    currenciesAccepted: 'INR',
    offerCurrency: 'INR',
    countries: ['India'],
    countryCodes: ['IN'],
  },
};
