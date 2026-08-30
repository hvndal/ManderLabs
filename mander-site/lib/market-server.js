// Server-side market resolution.
//
// Separate from lib/markets/index.js because this imports next/headers, which
// cannot be pulled into a client component. Anything rendering on the server
// calls getServerMarket(); client components read the same answer out of
// MarketProvider.
//
// Reading headers() opts a route out of static rendering, which is the real
// cost of geolocated content and is unavoidable: a statically cached page
// cannot show two different prices. It is also what keeps the two markets
// from bleeding into each other through a CDN cache.
import { headers } from 'next/headers';
import {
  MARKET_HEADER,
  MARKET_SOURCE_HEADER,
  getMarket,
  resolveMarketId,
} from './markets';

export function getServerMarketId() {
  try {
    return resolveMarketId(headers().get(MARKET_HEADER));
  } catch {
    // Rendering outside a request (a build-time metadata pass, say) has no
    // headers to read. The US site is the right answer there — it is what
    // Googlebot and every non-Indian visitor gets.
    return resolveMarketId(null);
  }
}

export function getServerMarket() {
  return getMarket(getServerMarketId());
}

/**
 * 'override' when a market was pinned with ?market=, 'geo' otherwise.
 *
 * Only the override badge reads this — everything else on the site behaves
 * identically whichever way the market was arrived at, which is the point:
 * pinning India shows you exactly what an Indian visitor sees, not a preview
 * mode with its own quirks.
 */
export function getServerMarketSource() {
  try {
    return headers().get(MARKET_SOURCE_HEADER) === 'override' ? 'override' : 'geo';
  } catch {
    return 'geo';
  }
}
