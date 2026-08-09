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
    // Anchors, so the Community Rate can be linked and shared directly. Google
    // treats these as the parent page, but they give the section a canonical
    // address for anyone citing it.
    {
      url: `${SITE_URL}/#community-rate`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}
