// The market registry.
//
// One entry today — US/Canada, one price ladder, one set of copy. There used
// to be a second (India: rupee pricing, its own WhatsApp gating, its own
// FAQ/meta/schema) — removed on direct instruction rather than scaled back,
// so an Indian visitor is now indistinguishable from any other. The registry
// is left as a lookup keyed by id, not collapsed into a bare constant, so
// adding a market back (or a genuinely new one) is still a file plus a
// branch in geo.js's regionForCountry, no page or component touched — that
// shape earned its keep once already.
//
// Safe to import from client components: it is plain data with no server-only
// dependency. The resolution of *which* market a visitor is in is separate
// (lib/market-server.js on the server, MarketProvider on the client).
import { US_MARKET } from './us.js';
import { DEFAULT_MARKET_ID } from './geo.js';

export {
  DEFAULT_MARKET_ID,
  DEFAULT_REGION_ID,
  MARKET_HEADER,
  MARKET_SOURCE_HEADER,
  REGION_HEADER,
  MARKET_QUERY_PARAM,
  MARKET_AUTO,
  REGIONS,
  isRegion,
  marketForRegion,
  regionForCountry,
} from './geo.js';

export const MARKETS = {
  us: US_MARKET,
};

/** Narrow any value to a real market id, defaulting to the US site. */
export function resolveMarketId(id) {
  return id && MARKETS[id] ? id : DEFAULT_MARKET_ID;
}

export function getMarket(id) {
  return MARKETS[resolveMarketId(id)];
}
