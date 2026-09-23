// Structured data (JSON-LD) for search engines. Kept separate from
// content.js because it reshapes that copy into schema.org's vocabulary
// rather than being copy itself.
//
// Must match the domain Vercel actually serves the site on, not just the
// registered domain. The Vercel project has www.mander.tech set as the
// primary domain, with bare mander.tech configured as a 308 redirect to it —
// so a canonical/sitemap/JSON-LD URL of "https://mander.tech" is a URL that
// itself redirects, which Google explicitly advises against for canonicals.
// If the Vercel primary domain is ever flipped to the bare domain, this needs
// to flip with it.
export const SITE_URL = 'https://www.mander.tech';

// The one real, disciplined "last changed" date for the site's general
// content — previously duplicated as a second hardcoded literal inside
// app/sitemap.js, which is exactly the kind of copy that quietly drifts.
// One place now; app/sitemap.js imports this instead of declaring its own.
//
// Also rendered as visible text in the footer (see components/Footer.js),
// which is what closes the "no freshness signal" finding
// scripts/audit-answerability.mjs raises on every page that isn't a blog
// post or a legal document — both of which already carry a real date the
// same way. Update this whenever site content meaningfully changes, same
// rule the sitemap comment has always stated; a value that never moves would
// be as dishonest as a fabricated one.
export const SITE_LAST_UPDATED = new Date('2026-09-23');

import { BRAND, TEAM } from './content.js';
import { getMarket } from './markets/index.js';
import { SERVICE_CATALOGUE } from './services.js';

// Shared social-card image. Next.js does NOT deep-merge `openGraph`/`twitter`
// between a layout and a page — if a page defines its own `openGraph` object
// at all (every page here does, for a page-specific title/description), that
// object entirely replaces the layout's, images included. So this has to be
// spread into every page's openGraph.images and twitter.images individually
// (see app/layout.js and every route under app/) rather than set once and
// relied on to inherit.
//
// Points at the generated card in app/opengraph-image.js, not the old static
// /og-image.jpg. Two reasons. The site was previously serving two different
// thumbnails: the homepage picked up the generated route (Next's file
// convention overrides inherited layout metadata), while every other page
// used the static logo card — and on the homepage og:image and twitter:image
// disagreed with each other outright. Naming one source here makes all of it
// consistent. Second, the static file was a bare wordmark on cream; the
// generated card carries the hero footage, which is what a share preview is
// actually for.
export const OG_IMAGE = {
  url: `${SITE_URL}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: 'MANDER — website design for small business, worldwide.',
};

// The business is delivered remotely across two countries, so the schema has
// to say that explicitly. A ProfessionalService with no address and no
// areaServed reads to Google like a local business that forgot its address,
// and it will try to rank the site for one city. Naming the countries plus
// the individual states and provinces is what tells it the service area is
// national on both sides of the border.
//
// Deliberately NO aggregateRating or review markup. There are no collected
// reviews, and inventing them is both a Google structured-data violation and
// the kind of thing that gets a site manually penalised. Add it the day real
// reviews exist, not before.
const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
];

const CA_PROVINCES = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
  'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia',
  'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan',
  'Yukon',
];

export const SERVICE_AREA = [
  { '@type': 'Country', name: 'United States' },
  { '@type': 'Country', name: 'Canada' },
  ...US_STATES.map((name) => ({ '@type': 'State', name })),
  ...CA_PROVINCES.map((name) => ({ '@type': 'State', name })),
];

// The Metro Vancouver municipalities, named individually.
//
// This is the one place where listing every city is right rather than lazy:
// areaServed is a machine-readable claim about where the service is
// delivered, not a page that has to justify itself with content. Naming them
// tells Google the studio serves the region without publishing fifteen thin
// city pages to say the same thing — which is the exact distinction between
// the schema and the /locations tree, where only Vancouver and Surrey have
// earned a page.
//
// Deliberately excludes Victoria, Nanaimo and Kelowna. They are not Metro
// Vancouver, they are not in the target market, and an areaServed that
// stretches to the Island and the Okanagan is the "we serve everywhere"
// signal this repositioning was meant to remove.
const METRO_VANCOUVER = [
  'Vancouver',
  'North Vancouver',
  'West Vancouver',
  'Burnaby',
  'Richmond',
  'Surrey',
  'Coquitlam',
  'Port Coquitlam',
  'Port Moody',
  'New Westminster',
  'Delta',
  'Langley',
  'Maple Ridge',
  'Pitt Meadows',
  'White Rock',
];

export const METRO_VANCOUVER_AREA = METRO_VANCOUVER.map((name) => ({
  '@type': 'City',
  name,
}));

// Langley sits on the Metro Vancouver / Fraser Valley line; the wider valley
// is named as one region rather than a city list nobody has written for.
const FRASER_VALLEY = { '@type': 'AdministrativeArea', name: 'Fraser Valley, British Columbia' };
const LOCAL_AREA = [...METRO_VANCOUVER_AREA, FRASER_VALLEY];

// The service area a market's schema claims. Keyed by market id so a new
// market declares its own without touching the schema builders below.
// India used to have its own entry here (a full enumerated state list,
// matching its own separate market) — removed along with the rest of the
// India market, see lib/markets/index.js.
const MARKET_SERVICE_AREA = {
  // Metro Vancouver first, then the wider countries, then one closing entry
  // for everywhere else: the order is a priority signal as well as a list,
  // and it matches where the local work is aimed, then where it is
  // genuinely sold, then who is actually welcome to ask.
  //
  // The last entry is deliberately a single generic Place rather than an
  // enumerated country list — schema.org's own convention for "we serve
  // clients anywhere" is exactly this, one broad entry, not fifty specific
  // ones. Naming every country individually here would be the schema
  // equivalent of the "spam city pages" this project has explicitly ruled
  // out elsewhere (see docs/ and the audits in scripts/): it would read as
  // an attempt to rank for two hundred places rather than an honest
  // statement of reach. Metro Vancouver, the US and Canada keep their real,
  // specific, locally-relevant entries above this because those genuinely
  // carry local-SEO weight; this line exists only to stop the schema from
  // implying a narrower reach than the business actually has.
  us: [...LOCAL_AREA, ...SERVICE_AREA, { '@type': 'Place', name: 'Worldwide' }],
};

/**
 * BlogPosting for a journal entry.
 *
 * publisher points at the same @id the organisation schema declares, so the
 * post is attached to the existing business entity rather than introducing a
 * second, unrelated one — which is what happens when a blog gets bolted on
 * with its own Organization block and is a common way sites end up with two
 * competing entities in Google's index.
 */
export function articleSchema(post) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'en',
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: OG_IMAGE.url,
    author: {
      '@type': 'Person',
      name: 'Herman',
      jobTitle: 'Front-End Web Designer',
      url: BRAND.portfolio,
      email: BRAND.email,
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

/**
 * Canonical plus hreflang for a page.
 *
 * (This docstring used to sit, misplaced, above articleSchema instead of
 * here — moved to the function it actually describes.)
 *
 * The site is English-only, so the usual reason for hreflang — separate
 * translations — does not apply. It earns its place here for the other
 * reason: one set of pages serves several English-speaking markets, and
 * marking each locale as resolving to the same URL is the correct way to
 * say "this page serves that market too" rather than leaving Google to
 * guess which one it's for. x-default catches everyone else.
 *
 * US and Canada were the original two, because the business genuinely
 * priced and marketed to both. The four added alongside them — GB, AU, NZ,
 * IE — are not a new market: no new pricing, no new copy branch, no
 * geo-detection deciding what a visitor from one of them sees. They exist
 * because the site already states, in its own copy and in
 * organizationSchema's areaServed (the "Worldwide" Place entry), that the
 * business takes clients anywhere — this is that same fact expressed as a
 * locale tag instead of a sentence, for the core English-speaking countries
 * specifically. A dedicated `/uk` or `/au` page with its own pricing and
 * positioning would be the real, bigger project the "Worldwide" line
 * doesn't yet promise; this is deliberately smaller than that.
 */
export function alternates(path) {
  return {
    canonical: path,
  };
}

/**
 * The business, as schema.org sees it — per market.
 *
 * A function rather than a constant because the prices, currency, service
 * area and contact area all differ between the US and India, and JSON-LD
 * that contradicts the visible page is worse than no JSON-LD at all. The
 * shape is identical for every market; only the values from
 * `market.schema` change.
 */
export function organizationSchema(marketOrId) {
  const market =
    typeof marketOrId === 'string' || !marketOrId ? getMarket(marketOrId) : marketOrId;
  const { schema } = market;

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND.name,
    description: schema.description,
    url: SITE_URL,
    email: BRAND.email,
    slogan: market.tagline,
    knowsLanguage: ['en', 'fr'],
    // sameAs is how Google confirms that this site, that Instagram account and
    // the business behind them are one entity. Both entries have to be profiles
    // that actually resolve, or the signal is worth less than nothing.
    sameAs: [
      BRAND.googleBusinessShare,
      BRAND.googleBusiness,
      BRAND.instagram,
      BRAND.portfolio,
    ],
    // hasMap points at the Business Profile listing. Paired with the profile's
    // own website field, it closes the loop Google uses to decide that the
    // listing and the domain are one entity — which is the whole reason the
    // local pack ever shows a website link.
    hasMap: BRAND.googleBusinessShare,
    // Google matches a site to a Business Profile on the strength of the
    // entity looking like the same thing in both places, and logo is the
    // first thing it reads.
    //
    // A static 512² PNG with declared dimensions, not the generated
    // /apple-icon route this used to point at and not the lockup in /public.
    // Three reasons, in order of how much they cost: Google wants a logo it
    // can fetch and cache like any other image, it wants to know the size
    // without downloading it first, and the lockup is pale rose line art on
    // a transparent background — on the white card a search result draws, it
    // is very close to invisible. This is the same mark as the favicon, on
    // the ink field, so the tab, the home screen and the search result are
    // recognisably one thing.
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo-mander-square.png`,
      width: 512,
      height: 512,
      caption: BRAND.name,
    },
    image: OG_IMAGE.url,
    // The number the visitor is actually shown: the North American line
    // outside India, the WhatsApp number inside it. Structured data that
    // names a number the page does not display is a contradiction Google
    // reads as a quality signal, and it would be an easy one to introduce
    // with two markets.
    ...(market.phone
      ? { telephone: market.phone.e164 }
      : market.whatsapp
        ? { telephone: market.whatsapp.display.replace(/\s/g, '') }
        : {}),
    // Not invented — the footer has published "Mon–Fri, 9–5 PT" since launch,
    // and this states the same thing in a form Google can read. If the Business
    // Profile ever says different hours, change both: a listing and a site
    // disagreeing about opening times is the kind of small inconsistency that
    // quietly costs a local ranking.
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    // No street address, because there is no public office and inventing one
    // is what gets a local listing suspended. Region and country are true and
    // are the parts that carry a local signal for a service-area business.
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Langley',
      addressRegion: 'BC',
      addressCountry: 'CA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '49.1042',
      longitude: '-122.6604',
    },
    // Remote-first: the service is delivered online everywhere it is sold.
    areaServed: MARKET_SERVICE_AREA[market.id] || SERVICE_AREA,
    // The one action the site actually offers. QuoteAction is the correct
    // type for it (Thing > Action > TradeAction > QuoteAction) and it points
    // at the quiz, which is where a quote request is genuinely handled —
    // pointing it at a contact page would be a claim the page cannot honour.
    potentialAction: {
      '@type': 'QuoteAction',
      name: 'Request a fixed-price quote',
      target: `${SITE_URL}/quote`,
    },
    serviceType: SERVICE_CATALOGUE.map((s) => s.name),
    availableLanguage: ['English', 'French'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: BRAND.email,
      // Each market publishes only the number it actually shows.
      ...(market.phone
        ? { telephone: market.phone.e164 }
        : market.whatsapp
          ? { telephone: market.whatsapp.display.replace(/\s/g, '') }
          : {}),
      areaServed: schema.countryCodes,
      availableLanguage: ['English', 'French'],
    },
    // No `founder` property: the studio is presented as a team rather than a
    // person who owns it, and the CEO is not the founder.
    //
    // `employee` names exactly one person — the CEO. The site shows no team
    // section anywhere, so listing all seven would be markup asserting
    // content a visitor cannot find on any page. A named officer is the one
    // exception worth making: it is the standard way an organization entity
    // is tied to the person who runs it, and it is a far smaller claim than
    // a full staff roster nobody can see.
    //
    // The address on it is the real one on purpose. No individual mailbox
    // exists — mail to anyone by name lands in the same inbox — and left
    // implicit, a crawler or an AI system tends to guess a firstname@domain
    // pattern that was never real, a mistake already observed in the wild
    // for this site.
    employee: TEAM.filter((m) => m.role === 'CEO').map((m) => ({
      '@type': 'Person',
      name: m.name,
      jobTitle: m.role,
      email: BRAND.email,
    })),
    // MANDER is a subsidiary of Waste Universe — unconditional now, matching
    // /about (also unconditional as of the India removal). Was gated to the
    // India market only; when that market was removed, this fact had nowhere
    // left to show, and it's real regardless of who's reading — narrowing a
    // true fact to "nobody sees this now" for lack of a gate was the wrong
    // default, so it applies to every visitor instead. `parentOrganization`
    // means ownership specifically, which is why it is the right property
    // here. Name only: there is no verified Waste Universe URL in this repo
    // (WorkIndex withholds its link deliberately), and inventing one to fill
    // a schema property is not on.
    parentOrganization: { '@type': 'Organization', name: 'Waste Universe' },
    priceRange: schema.priceRange,
    currenciesAccepted: schema.currenciesAccepted,
    // Offers without a price, deliberately. The site no longer publishes
    // figures — every project is quoted — and structured data that names a
    // number the page does not show is the contradiction Google is entitled
    // to distrust. The plans are still declared so the catalogue is legible;
    // `priceRange` carries the band instead.
    makesOffer: [
      ...market.tiers,
      ...(market.monthlyTiers || []),
      ...market.appTiers,
    ].map((tier) => ({
      '@type': 'Offer',
      name: tier.name,
      priceCurrency: schema.offerCurrency,
      description: tier.blurb,
      availability: 'https://schema.org/InStock',
      areaServed: schema.countryCodes,
      url: `${SITE_URL}/pricing`,
    })),
    // Named exactly as the Google Business Profile services (lib/services.js)
    // so Ask Maps sees one catalogue, not two that half-agree.
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web design, SEO and app services',
      itemListElement: SERVICE_CATALOGUE.map((service) => ({
        '@type': 'Offer',
        ...(service.priceRange ? { priceSpecification: { '@type': 'PriceSpecification', description: service.priceRange } } : {}),
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.what,
          serviceType: service.name,
          url: `${SITE_URL}/services#${service.id}`,
          provider: { '@id': `${SITE_URL}/#organization` },
          areaServed: LOCAL_AREA,
        },
      })),
    },
  };
}

// Individual Service entities. Separate from the offer catalogue above
// because Google reads these independently and they can surface for
// "<service> near me" style queries in either country.
export function serviceSchemas(marketOrId) {
  const market =
    typeof marketOrId === 'string' || !marketOrId ? getMarket(marketOrId) : marketOrId;

  return SERVICE_CATALOGUE.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.what,
    serviceType: service.name,
    url: `${SITE_URL}/services#${service.id}`,
    provider: {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#organization`,
      name: BRAND.name,
      url: SITE_URL,
    },
    areaServed: [
      ...LOCAL_AREA,
      ...market.schema.countries.map((name) => ({ '@type': 'Country', name })),
    ],
    audience: {
      '@type': 'BusinessAudience',
      name: 'Small and mid-sized businesses',
    },
  }));
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: BRAND.name,
  url: SITE_URL,
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en',
};

// Breadcrumbs for the two secondary routes. Cheap to add, and it's what gets
// the "mander.tech › Pricing" line into the result instead of a bare URL.
export function breadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

// One Service entity per location page (state/province or city), reusing the
// same organization @id so these read as offers from the one
// ProfessionalService rather than separate businesses. Pair with
// breadcrumbSchema() above and faqSchema() below — a location page renders
// all three.
export function locationServiceSchema({
  path,
  areaName,
  areaType = 'City',
  description,
  market,
}) {
  const resolved = market || getMarket(null);
  const entry = resolved.tiers[0];

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Website design — ${areaName}`,
    description,
    serviceType: 'Website design',
    provider: {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#organization`,
      name: BRAND.name,
      url: SITE_URL,
    },
    areaServed: { '@type': areaType, name: areaName },
    // The entry plan in the currency the page itself works in, with no
    // figure — the pages no longer publish one, and structured data naming a
    // number the page does not show is the contradiction that gets rich
    // results dropped.
    offers: {
      '@type': 'Offer',
      name: entry.name,
      priceCurrency: resolved.schema.offerCurrency,
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/pricing`,
    },
    url: `${SITE_URL}${path}`,
  };
}

// Turns the FAQS array (or any {q,a}[] list) into FAQPage schema. Used on any
// page that actually renders that FAQ content — don't attach it to a page
// where the text isn't visible, Google's guidelines treat that as spam.
export function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}
