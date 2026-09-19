// Server-side locale resolution — the same pattern as lib/market-server.js,
// for the same reason: this imports next/headers, which cannot be pulled
// into a client component. Anything rendering on the server calls
// getServerLocale(); client components read the same answer out of
// LocaleProvider.
import { headers } from 'next/headers';
import { LOCALE_HEADER, DEFAULT_LOCALE, REGION_CODE_HEADER } from './markets/geo.js';

export function getServerLocale() {
  try {
    const locale = headers().get(LOCALE_HEADER);
    return locale === 'fr' ? 'fr' : DEFAULT_LOCALE;
  } catch {
    // Rendering outside a request (a build-time metadata pass) has no
    // headers to read. English is the right answer there, same reasoning
    // as getServerMarket's fallback.
    return DEFAULT_LOCALE;
  }
}

/** The raw ISO 3166-2 region code, or '' — for the French banner only. */
export function getServerRegionCode() {
  try {
    return headers().get(REGION_CODE_HEADER) || '';
  } catch {
    return '';
  }
}
