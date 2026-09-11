// Which market each location region belongs to.
//
// Its own tiny module because two very different places need it and neither
// can import the other: middleware.js runs on the edge, where pulling in
// lib/locations.js would ship every word of location copy on every request,
// and lib/locations.js is that copy. Slugs only — a few hundred bytes.
//
// This is the single source of truth. lib/locations.js stamps each region
// with the market named here rather than carrying its own field, and it
// throws during development if a region is missing, so adding a region
// without deciding its market fails loudly instead of silently serving the
// wrong currency.
export const LOCATION_MARKETS = {
  // Metro Vancouver is the one dedicated local-SEO region. Massachusetts and
  // Rhode Island used to have entries here too, retired along with their
  // pages in lib/locations.js. India has no location pages — the India
  // market is an IP-resolved experience only, never a set of indexed city
  // pages.
  'metro-vancouver': 'us',
};

/**
 * The market a path belongs to by virtue of its URL, or null when the path
 * has no opinion and the visitor's geolocation should decide.
 *
 * Only /locations/<region>/... has an opinion. Everything else — home,
 * pricing, quote, blog — is geolocated, which is the split the whole design
 * rests on: pages *about* a place are resolved by the place, pages about the
 * studio are resolved by who is reading them.
 */
export function marketForPath(pathname) {
  const match = /^\/locations\/([^/]+)/.exec(pathname || '');
  if (!match) return null;
  return LOCATION_MARKETS[match[1]] || null;
}
