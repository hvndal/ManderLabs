import { SITE_URL } from '@/lib/seo';

export default function sitemap() {
  const now = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/quote`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
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
