// Structured data (JSON-LD) for search engines. Kept separate from
// content.js because it reshapes that copy into schema.org's vocabulary
// rather than being copy itself.
//
// IMPORTANT: SITE_URL is a placeholder until the site has a real domain.
// Update it here (and metadataBase in app/layout.js) the day that's live —
// search engines treat these as the canonical address of the business.
export const SITE_URL = 'https://mander.agency';

import { BRAND, SERVICES, TIERS } from './content';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: BRAND.name,
  description:
    'Affordable, fast, custom website design for small and mid-sized businesses across Canada and the United States.',
  url: SITE_URL,
  email: BRAND.email,
  areaServed: [
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Country', name: 'United States' },
  ],
  priceRange: '$249–$1499+',
  makesOffer: TIERS.map((tier) => ({
    '@type': 'Offer',
    name: tier.name,
    price: String(tier.from),
    priceCurrency: 'USD',
    description: tier.blurb,
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
      },
    })),
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: BRAND.name,
  url: SITE_URL,
};

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
