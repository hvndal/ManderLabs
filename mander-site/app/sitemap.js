import { SITE_URL } from '@/lib/seo';
import { REGIONS, allCities } from '@/lib/locations';

export default function sitemap() {
  const now = new Date();

  // Region and city pages generated from the same data file the routes read
  // (lib/locations.js) — adding a state/province or city there adds it here
  // too, with no separate list to keep in sync.
  const regionUrls = REGIONS.map((region) => ({
    url: `${SITE_URL}/locations/${region.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  const cityUrls = allCities().map(({ region, city }) => ({
    url: `${SITE_URL}/locations/${region.slug}/${city.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/quote`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/locations`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ...regionUrls,
    ...cityUrls,
  ];
  // Previously also listed `${SITE_URL}/#community-rate` as its own sitemap
  // entry. A URL fragment isn't a separate crawlable document — search
  // engines resolve it to the same page as `/`, so having both in the
  // sitemap was a duplicate-URL entry, one of the things a sitemap should
  // never contain. The section is still linked and shareable at that
  // address; it just doesn't need its own sitemap row to be.
}
