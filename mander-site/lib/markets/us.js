// The US market — the site as it already was.
//
// Nothing here is new copy. Every field points at the same export in
// content.js that the pages used to import directly, so this file is a
// description of the existing site rather than a second copy of it. That is
// deliberate: if the US pricing changes in content.js it changes here, and
// there is no way for the two to drift.
//
// The one thing that genuinely moved is COMPARISON, which used to be a
// const inside app/pricing/page.js. It has to live per-market because its
// rows are positional — one value per tier — so a market with a different
// number of tiers needs its own table.
import { BRAND, TIERS, APP_TIERS, CARE_PLAN, FAQS, QUIZ } from '../content.js';

const COMPARISON = [
  { feature: 'Pages', values: ['1', 'Up to 5', 'Up to 10', 'Unlimited'] },
  { feature: 'Delivery', values: ['~2 weeks', '3–4 weeks', '4–6 weeks', '6–10 weeks'] },
  { feature: 'Enquiry forms', values: ['Contact only', true, true, true] },
  { feature: 'Copywriting support', values: [false, true, true, true] },
  { feature: 'On-page SEO', values: ['Basic', 'Basic', 'Advanced', 'Full strategy'] },
  { feature: 'Local SEO + Google Business Profile', values: [false, false, true, true] },
  { feature: 'Analytics + Search Console', values: [false, false, true, true] },
  { feature: 'Booking / CRM integration', values: [false, false, true, true] },
  { feature: 'E-commerce', values: [false, false, false, true] },
  { feature: 'API integrations', values: [false, false, false, true] },
  { feature: 'Custom workflows', values: [false, false, false, true] },
  { feature: 'Revision rounds', values: ['1', '2', '3', 'Until sign-off'] },
  { feature: 'Priority support', values: [false, false, false, true] },
];

// The internal price sheet, kept as a comment rather than as data. The site
// no longer publishes figures — every project is quoted — and a `price` field
// on a tier does not just render, it crosses to the browser in the RSC
// payload, so "hidden in the interface" would still mean "readable in view
// source". Numbers live here and in the quote, nowhere else.
//
//   Launch $299 · Starter $499 · Growth $899 · Business Pro $1,499+
//   Care Plan $40/mo
//   App Launch $2,999 · App Growth $5,999 · App Pro $9,999+
export const US_MARKET = {
  id: 'us',
  currency: 'USD',
  locale: 'en_US',

  // Universal as of this line — every market gets the same real WhatsApp
  // number. It used to be null here on purpose (India only), reasoned as
  // "no number nobody there can sensibly call" — but a WhatsApp number is
  // reachable internationally by design, and the business explicitly wants
  // WhatsApp, phone and email all offered everywhere rather than split by
  // market. Reusing the existing India number rather than inventing a
  // second one: it is the only WhatsApp line that actually exists in this
  // codebase, and every WhatsAppCta placement (Nav, ContactForm, homepage
  // and quote final CTAs, /contact, /about) was already built additively
  // next to phone/email, so populating this one field is the entire change
  // — no component touched. If a dedicated non-India number exists later,
  // swap it in here; nothing else needs to change.
  whatsapp: {
    display: '+1 (857) 758-7182',
    url: 'https://wa.me/18577587182',
    cta: 'Chat with us on WhatsApp',
  },

  // The North American line. Still gated on existing (`market.phone &&`)
  // rather than assumed, but every market now has both a phone and a
  // WhatsApp number where one exists — this is no longer an either/or by
  // market. E.164 in `href` because that is the only format every dialler,
  // and Google's structured data, read without ambiguity.
  phone: {
    display: '+1 (857) 758-7182',
    href: 'tel:+18577587182',
    e164: '+18577587182',
  },

  tagline: BRAND.tagline,
  region: BRAND.region,
  colophon: {
    headline: 'Define. Build. Grow.',
    body: 'A Metro Vancouver studio working across three things: the identity people remember, the digital experience they judge you on, and the system that brings the right ones to you. Available worldwide; the local search work is aimed at Metro Vancouver first.',
  },

  tiers: TIERS,
  appTiers: APP_TIERS,
  comparison: COMPARISON,

  // The US care plan is one price with a feature grid. India sells two
  // monthly plans instead, so it sets `monthlyTiers` and the pricing page
  // renders those as cards; see lib/markets/in.js.
  monthlyTiers: null,
  carePlan: CARE_PLAN,
  carePlanBody:
    'Optional on every tier. Hosting, security, backups, and unlimited small edits so you never think about the site.',

  faqs: FAQS,
  quiz: QUIZ,
  // Quiz scoring works in tier names. The US market's tiers are the ones the
  // scoring was written against, so nothing is remapped here.
  quizTierAlias: null,

  priceNote:
    'Every project is quoted in writing before it starts, in USD; Canadian clients are invoiced in CAD on request at the same figures. One-time build cost unless otherwise agreed, with hosting and maintenance available monthly via the Care Plan.',

  meta: {
    title: 'MANDER | Affordable, Fast Website Design for Small Business',
    description:
      'Remote website design for small business, worldwide. Fixed-price builds quoted up front, with local SEO and ongoing care.',
    ogTitle: 'MANDER | Website Design for Small Business — Worldwide',
    ogDescription:
      'Remote website design, development and SEO for small and mid-sized businesses, worldwide. Fixed scope, fixed price, quoted before work starts.',
    twitterDescription:
      'Remote website design and SEO for small business, worldwide. Fixed-price builds, quoted up front.',
    keywords: [
      'remote website design',
      'website design for small business',
      'affordable website design USA',
      'website design Canada',
      'small business web design agency',
      'custom website design remote',
      'fixed price website design',
      'small business SEO',
      'local SEO for small business',
      'Google Business Profile optimization',
      'website redesign small business',
      'fixed price website design quote',
      'veteran owned business discount website',
      'nonprofit and small business website discount',
    ],
    pricing: {
      title: 'Plans — Website Design & Android Builds',
      description:
        'Four website plans and three Android plans for small business, worldwide. Fixed scope, fixed price, quoted in writing before work starts.',
    },
    quote: {
      title: 'Get a Quote — Fast Website Design, Custom Priced',
      description:
        'Answer six quick questions and get a recommended plan and starting price for a custom, budget-friendly website — or route straight to a person.',
    },
  },

  // Feeds the JSON-LD in lib/seo.js. Kept as plain values rather than built
  // schema so the schema shape stays in one place.
  schema: {
    // Deliberately broader than `countries`/`countryCodes` below: those two
    // stay US/CA because the pricing they're paired with (USD, CAD) is real
    // only there, but the studio's actual reach is not limited to the two
    // countries it prices in — this description and the Organization-level
    // `areaServed` addition in lib/seo.js both say so; the Service-level
    // schema stays scoped to the priced markets on purpose.
    description:
      'Remote website design, development and SEO for small and mid-sized businesses, worldwide. Fixed-price custom builds, quoted before work starts.',
    priceRange: '$$',
    currenciesAccepted: 'USD, CAD',
    offerCurrency: 'USD',
    countries: ['United States', 'Canada'],
    countryCodes: ['US', 'CA'],
  },
};
