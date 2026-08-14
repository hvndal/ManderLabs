import { SITE_URL } from '@/lib/seo';
import { REGIONS, allCities } from '@/lib/locations';
import { LEGAL_DOCS } from '@/lib/legal';

export default function sitemap() {
  // A fixed date that tracks the last real content change. Using new Date()
  // reported "right now" on every crawl, which teaches Google to ignore the
  // lastmod signal entirely. Update this when content meaningfully changes.
  const lastContentUpdate = new Date('2026-08-09');

  const regionUrls = REGIONS.map((region) => ({
    url: `${SITE_URL}/locations/${region.slug}`,
    lastModified: lastContentUpdate,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  const cityUrls = allCities().map(({ region, city }) => ({
    url: `${SITE_URL}/locations/${region.slug}/${city.slug}`,
    lastModified: lastContentUpdate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    { url: `${SITE_URL}/`, lastModified: lastContentUpdate, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/pricing`, lastModified: lastContentUpdate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/quote`, lastModified: lastContentUpdate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/locations`, lastModified: lastContentUpdate, changeFrequency: 'monthly', priority: 0.8 },
    ...regionUrls,
    ...cityUrls,
    ...LEGAL_DOCS.map((doc) => ({
      url: `${SITE_URL}/legal/${doc.slug}`,
      lastModified: lastContentUpdate,
      changeFrequency: 'yearly',
      priority: 0.3,
    })),
  ];
  // Previously also listed `${SITE_URL}/#community-rate` as its own sitemap
  // entry. A URL fragment isn't a separate crawlable document — search
  // engines resolve it to the same page as `/`, so having both in the
  // sitemap was a duplicate-URL entry, one of the things a sitemap should
  // never contain. The section is still linked and shareable at that
  // address; it just doesn't need its own sitemap row to be.
}
