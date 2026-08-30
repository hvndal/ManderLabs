// Country → market resolution, and nothing else.
//
// Deliberately its own tiny module with no imports: middleware.js runs on the
// edge runtime and is bundled separately from the app, so anything it pulls
// in ships on every single request. Importing the market registry here would
// drag all of the site's copy into that bundle to answer one string
// comparison. The registry imports these constants too, so there is still one
// definition of which country maps to which market.

// Request header the middleware sets and the server components read. Not a
// cookie: a cookie survives the visitor moving country, is readable by client
// JS, and would need a consent conversation. A per-request header is derived
// fresh from the edge's own geolocation every time and is never stored.
export const MARKET_HEADER = 'x-mander-market';

export const DEFAULT_MARKET_ID = 'us';

// The whole geographic rule, in one object. Adding a market later means one
// entry here plus one file in lib/markets — no page or component changes.
// Everything not listed falls through to the default (US) experience, which
// is the existing site.
export const COUNTRY_MARKETS = {
  IN: 'in',
};

/**
 * Market id for an ISO 3166-1 alpha-2 country code.
 *
 * Tolerant of what the platform actually hands over: lowercase, padded, the
 * literal 'XX' Vercel returns when it cannot place an IP, or nothing at all
 * on a local dev request. All of those mean "not India", which means the
 * existing US site.
 */
export function marketIdForCountry(country) {
  if (!country) return DEFAULT_MARKET_ID;
  return COUNTRY_MARKETS[String(country).trim().toUpperCase()] || DEFAULT_MARKET_ID;
}
