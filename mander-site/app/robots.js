import { SITE_URL } from '@/lib/seo';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Only genuinely non-content paths. `/_next/static/chunks/` used to
        // be listed here too, on the theory that JS chunks "waste crawl
        // budget" — but Googlebot's renderer fetches those same chunks to
        // execute client components before indexing a page, and Google's own
        // guidance is explicit: never disallow the CSS/JS a page needs to
        // render. Blocking it risked content produced by client components
        // being invisible to the renderer, for a crawl-budget concern that
        // doesn't actually apply (Google doesn't index .js files as pages
        // regardless of whether they're disallowed). `/api/` stays — this
        // project has no routes there today, but it's the right place to
        // keep any future internal endpoint out of the index by default.
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
