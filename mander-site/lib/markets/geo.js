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

// Set alongside MARKET_HEADER so the app can tell a geolocated market from an
// overridden one — the only thing that reads it is the little badge that
// shows you which version you have pinned.
export const MARKET_SOURCE_HEADER = 'x-mander-market-source';

// The override: ?market=in / ?market=us pins a market for whoever asked,
// ?market=auto goes back to geolocation. It is stored in a cookie so it
// survives navigation, and the middleware redirects the query parameter away
// immediately afterwards — so a pinned URL never gets shared, indexed, or
// left lying in someone's history.
//
// "Hidden" here means no UI, not secret: anyone who guesses the parameter can
// see the other market's prices. That is fine — both versions are public
// pages, and the alternative (an auth check for a preview toggle) is a lot of
// machinery for looking at your own site.
export const MARKET_QUERY_PARAM = 'market';
export const MARKET_COOKIE = 'mander_market';
export const MARKET_AUTO = 'auto';

// Header carrying the display region, which is not the same thing as the
// market: Canada and the United States are one market (one price ladder, one
// set of copy) but two countries, and a Canadian visitor should see a maple
// leaf in the footer picker rather than being told they are looking at the
// American site.
export const REGION_HEADER = 'x-mander-region';

// Region → market. The picker offers these three; two of them resolve to the
// same market on purpose. Inventing a separate Canadian price ladder to make
// the menu look symmetrical would put numbers on the site that nobody has
// agreed to charge — the pricing page already says USD, invoiced in CAD on
// request, which is the true answer.
export const REGIONS = {
  us: { market: 'us', flag: '🇺🇸', name: 'United States', short: 'US' },
  ca: { market: 'us', flag: '🇨🇦', name: 'Canada', short: 'CA' },
  in: { market: 'in', flag: '🇮🇳', name: 'India', short: 'IN' },
};

export const DEFAULT_REGION_ID = 'us';

export function isRegion(value) {
  return Boolean(value) && Object.hasOwn(REGIONS, value);
}

export function marketForRegion(region) {
  return REGIONS[region]?.market || DEFAULT_MARKET_ID;
}

/** Display region for a country code — everything unlisted reads as US. */
export function regionForCountry(country) {
  if (!country) return DEFAULT_REGION_ID;
  const code = String(country).trim().toUpperCase();
  if (code === 'IN') return 'in';
  if (code === 'CA') return 'ca';
  return DEFAULT_REGION_ID;
}

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
