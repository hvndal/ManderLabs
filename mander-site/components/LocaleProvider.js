'use client';

import { createContext, useContext } from 'react';
import { uiStrings } from '@/lib/ui-strings.js';

/**
 * The visitor's locale ('en' or 'fr'), handed down from the server the same
 * way MarketProvider hands down the market — see that file for the reasoning
 * on why this crosses the boundary as a resolved value rather than being
 * re-derived on the client from the URL, which would flash English content
 * before hydration on every French page.
 */
const LocaleContext = createContext(null);

export default function LocaleProvider({ locale, children }) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const locale = useContext(LocaleContext);
  if (!locale) {
    throw new Error('useLocale must be used inside <LocaleProvider>');
  }
  return locale;
}

/** The chrome-string dictionary for the current locale — see lib/ui-strings.js. */
export function useUiStrings() {
  return uiStrings(useLocale());
}
