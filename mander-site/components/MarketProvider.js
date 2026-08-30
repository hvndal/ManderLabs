'use client';

import { createContext, useContext } from 'react';

/**
 * The visitor's market, handed down from the server.
 *
 * The whole market object crosses the boundary rather than just its id, and
 * that is the point: if the client looked its market up by id it would have
 * to import the registry, which would bundle *every* market's data into the
 * JavaScript every visitor downloads — putting the Indian WhatsApp number and
 * the rupee price ladder in the hands of a US visitor who is never shown
 * them. Sending the resolved market means each visitor's payload contains
 * their market and no other.
 */
const MarketContext = createContext(null);

export default function MarketProvider({ market, children }) {
  return (
    <MarketContext.Provider value={market}>{children}</MarketContext.Provider>
  );
}

/**
 * The resolved market for this visitor.
 *
 * Every consumer sits under the provider in the root layout, so this is never
 * null in practice — but a component rendered outside it would otherwise fail
 * on a property access rather than say why, so it says why.
 */
export function useMarket() {
  const market = useContext(MarketContext);
  if (!market) {
    throw new Error('useMarket must be used inside <MarketProvider>');
  }
  return market;
}

export function useMarketId() {
  return useMarket().id;
}
