import { BRAND } from '@/lib/content';

// A manifest isn't a ranking factor on its own, but it's part of what Google
// checks under installability/page-experience, and it's what stops Chrome's
// "Add to Home screen" from falling back to the bare hostname as the app
// name. Cheap to serve, and it makes the site legible to the browser as a
// product rather than a document.
export default function manifest() {
  return {
    name: 'MANDER — Website Design for Small Business',
    short_name: BRAND.name,
    description:
      'Remote website design, development and SEO for small and mid-sized businesses across the U.S. and Canada. Fixed-price builds from $249.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#f4f2ec',
    theme_color: '#f4f2ec',
    lang: 'en',
    categories: ['business', 'design', 'productivity'],
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
