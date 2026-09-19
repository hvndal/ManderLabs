'use client';

import { createContext, useContext } from 'react';

/**
 * The visitor's market, handed down from the server.
 *
 * The whole market object crosses the boundary rather than just its id —
 * one market today (the India market, and its rupee price ladder, was
 * removed entirely), but the shape is kept in case a second one exists
 * again: sending the resolved market rather than an id-to-look-up means
 * each visitor's payload contains their own market and no other's data,
 * whatever else the registry ever holds.
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
