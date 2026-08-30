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
import {
  BRAND,
  TIERS,
  APP_TIERS,
  CARE_PLAN,
  CARE_PLAN_PRICE,
  FAQS,
  QUIZ,
} from '../content';

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

export const US_MARKET = {
  id: 'us',
  currency: 'USD',
  locale: 'en_US',

  // No WhatsApp number is shown outside India. This is the field every
  // WhatsApp affordance on the site is gated on, so leaving it null is what
  // keeps the Indian number off the US experience entirely — it is absent
  // from the rendered HTML, not hidden with CSS.
  whatsapp: null,

  tagline: BRAND.tagline,
  region: BRAND.region,
  colophon: {
    headline: 'Websites that grow small business.',
    body: 'Premium design and build for small and mid-sized businesses in Canada and the U.S. — at a rate that makes sense for you.',
  },

  tiers: TIERS,
  appTiers: APP_TIERS,
  appsFromLabel: '$2,999',
  comparison: COMPARISON,

  // The US care plan is one price with a feature grid. India sells two
  // monthly plans instead, so it sets `monthlyTiers` and the pricing page
  // renders those as cards; see lib/markets/in.js.
  monthlyTiers: null,
  carePlan: CARE_PLAN,
  carePlanPrice: CARE_PLAN_PRICE,
  carePlanBody:
    'Optional on every tier. Hosting, security, backups, and unlimited small edits so you never think about the site.',

  faqs: FAQS,
  quiz: QUIZ,
  // Quiz scoring works in tier names. The US market's tiers are the ones the
  // scoring was written against, so nothing is remapped here.
  quizTierAlias: null,

  priceNote:
    'Prices in USD; Canadian clients invoiced in CAD on request. One-time build cost unless otherwise agreed. Hosting & maintenance available via the Care Plan.',

  meta: {
    title: 'MANDER | Affordable, Fast Website Design for Small Business',
    description:
      'Remote website design for small business across the U.S. and Canada. Fixed-price builds from $299, with local SEO and ongoing care.',
    ogTitle: 'MANDER | Website Design for Small Business — U.S. & Canada',
    ogDescription:
      'Remote website design, development and SEO for small and mid-sized businesses across the U.S. and Canada. Fixed-price builds from $299.',
    twitterDescription:
      'Remote website design and SEO for small business across the U.S. and Canada. Fixed-price builds from $299.',
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
      'website design from $299',
      'veteran owned business discount website',
      'nonprofit and small business website discount',
    ],
    pricing: {
      title: 'Website Design Pricing — Plans from $299',
      description:
        'One-time website design pricing for small business in Canada and the U.S. Four plans from $299, Android apps from $2,999. No hidden fees.',
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
    description:
      'Remote website design, development and SEO for small and mid-sized businesses across the United States and Canada. Fixed-price custom builds from $299.',
    priceRange: '$299–$9999+',
    currenciesAccepted: 'USD, CAD',
    offerCurrency: 'USD',
    countries: ['United States', 'Canada'],
    countryCodes: ['US', 'CA'],
  },
};
