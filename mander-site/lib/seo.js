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

import { BRAND, SERVICES, TEAM } from './content';
import { getMarket } from './markets';

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
  alt: 'MANDER — website design for small business across Canada and the U.S.',
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

// Indian states and union territories, for the same reason the US and
// Canadian ones are enumerated above: a service business with no address and
// no areaServed reads to Google like a local business that forgot its
// address, and it will try to rank the site for one city.
const IN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
  'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
  'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir',
  'Ladakh', 'Lakshadweep', 'Puducherry',
];

export const IN_SERVICE_AREA = [
  { '@type': 'Country', name: 'India' },
  ...IN_STATES.map((name) => ({ '@type': 'State', name })),
];

// The service area a market's schema claims. Keyed by market id so a new
// market declares its own without touching the schema builders below.
const MARKET_SERVICE_AREA = {
  us: SERVICE_AREA,
  in: IN_SERVICE_AREA,
};

/**
 * Canonical plus hreflang for a page.
 *
 * The site is English-only, so the usual reason for hreflang — separate
 * translations — does not apply. It still earns its place here for the other
 * reason: MANDER sells into two countries off one set of pages, and en-US and
 * en-CA both resolving to the same URL is the correct way to say "this page
 * serves both markets" rather than leaving Google to guess which one it is
 * for. x-default catches everyone else.
 */
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
      jobTitle: 'Founder & Design Lead',
      url: BRAND.portfolio,
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

export function alternates(path) {
  return {
    canonical: path,
    languages: {
      'en-US': path,
      'en-CA': path,
      'x-default': path,
    },
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
  const countries = schema.countries.map((name) => ({ '@type': 'Country', name }));

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND.name,
    description: schema.description,
    url: SITE_URL,
    email: BRAND.email,
    slogan: market.tagline,
    knowsLanguage: ['en'],
    // sameAs is how Google confirms that this site, that Instagram account and
    // the business behind them are one entity. Both entries have to be profiles
    // that actually resolve, or the signal is worth less than nothing.
    sameAs: [BRAND.instagram, BRAND.googleBusiness, BRAND.portfolio],
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
    // Remote-first: the service is delivered online everywhere it is sold.
    areaServed: MARKET_SERVICE_AREA[market.id] || SERVICE_AREA,
    serviceType: SERVICES.map((s) => s.title),
    availableLanguage: 'English',
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
      availableLanguage: ['English'],
    },
    founder: {
      '@type': 'Person',
      name: 'Herman',
      jobTitle: 'Founder & Design Lead',
      url: BRAND.portfolio,
    },
    employee: TEAM.map((m) => ({
      '@type': 'Person',
      name: m.name,
      jobTitle: m.role,
    })),
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
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Website design services',
      itemListElement: SERVICES.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.body,
          serviceType: service.title,
          provider: { '@id': `${SITE_URL}/#organization` },
          areaServed: countries,
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

  return SERVICES.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.title} — small business`,
    description: service.body,
    serviceType: service.title,
    provider: {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#organization`,
      name: BRAND.name,
      url: SITE_URL,
    },
    areaServed: market.schema.countries.map((name) => ({
      '@type': 'Country',
      name,
    })),
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
