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
  // North America
  massachusetts: 'us',
  'rhode-island': 'us',
  'british-columbia': 'us',
  // India
  punjab: 'in',
  'delhi-ncr': 'in',
  maharashtra: 'in',
  karnataka: 'in',
  telangana: 'in',
  'tamil-nadu': 'in',
  gujarat: 'in',
  'west-bengal': 'in',
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
