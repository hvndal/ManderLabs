// The market registry.
//
// One entry per market, keyed by the ids in geo.js. Everything the site
// renders that differs by country comes from here — prices, positioning,
// contact options, metadata and the JSON-LD inputs — so adding a third
// market is a file plus a line in COUNTRY_MARKETS, with no page or component
// touched.
//
// Safe to import from client components: it is plain data with no server-only
// dependency. The resolution of *which* market a visitor is in is separate
// (lib/market-server.js on the server, MarketProvider on the client).
import { US_MARKET } from './us';
import { IN_MARKET } from './in';
import { DEFAULT_MARKET_ID } from './geo';

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
  marketIdForCountry,
  regionForCountry,
} from './geo';

export const MARKETS = {
  us: US_MARKET,
  in: IN_MARKET,
};

/** Narrow any value to a real market id, defaulting to the US site. */
export function resolveMarketId(id) {
  return id && MARKETS[id] ? id : DEFAULT_MARKET_ID;
}

export function getMarket(id) {
  return MARKETS[resolveMarketId(id)];
}
