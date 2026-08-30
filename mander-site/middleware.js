import { NextResponse } from 'next/server';
import {
  MARKET_HEADER,
  MARKET_SOURCE_HEADER,
  MARKET_QUERY_PARAM,
  MARKET_COOKIE,
  MARKET_AUTO,
  COUNTRY_MARKETS,
  marketIdForCountry,
} from '@/lib/markets/geo';

// A cookie is only honoured if it names a market that exists — otherwise a
// stale or hand-edited value could pin someone to nothing.
const KNOWN_MARKETS = new Set(['us', ...Object.values(COUNTRY_MARKETS)]);

const isKnown = (value) => Boolean(value) && KNOWN_MARKETS.has(value);

/**
 * Edge geolocation → one request header, and nothing else.
 *
 * The India version is not a separate URL. Every page keeps the exact path it
 * already had; the middleware only annotates the request with which market
 * the visitor is in, and the server components render that market's copy and
 * prices. That is what makes this safe for SEO — there is one canonical URL
 * per page rather than two competing ones, so there is no duplicate-content
 * question to answer and no /in prefix to keep out of the index.
 *
 * It also rules out the two failure modes a redirect-based version of this
 * would have: geolocation never redirects, so it cannot loop, and there is no
 * cached 30x pinning a visitor to the wrong market for the life of the
 * browser cache. (The override below does redirect once, but only when the
 * query parameter is present, and only to the same path without it — the
 * target can never match the condition that produced it.)
 *
 * Privacy: `request.geo` is derived by the platform from the IP before this
 * runs. The country code is read, mapped to 'us' or 'in', and discarded. No
 * IP address is read, forwarded, logged or stored anywhere in this codebase,
 * and the geolocated market is not persisted — nothing here creates an
 * identifier, which is why it needs no consent gate. The override cookie is
 * set only by an explicit ?market= request and holds two letters.
 */
export function middleware(request) {
  // request.geo is populated on Vercel; the header is the same value and is
  // what non-Vercel edges (and `vercel dev`) expose. Reading both means this
  // works in production and degrades to the US default anywhere else.
  const country =
    request.geo?.country || request.headers.get('x-vercel-ip-country') || '';
  const geoMarket = marketIdForCountry(country);

  const requested = request.nextUrl.searchParams.get(MARKET_QUERY_PARAM);
  const cookie = request.cookies.get(MARKET_COOKIE)?.value;

  // Precedence: an explicit ?market= this request, then a previously pinned
  // cookie, then geolocation.
  const pinned = isKnown(requested)
    ? requested
    : requested === MARKET_AUTO
      ? null
      : isKnown(cookie)
        ? cookie
        : null;

  const market = pinned || geoMarket;

  const headers = new Headers(request.headers);
  // Set, not append: any inbound copy of these headers is replaced, so a
  // visitor cannot hand themselves a market by sending the header directly.
  // The market is decided here or not at all.
  headers.set(MARKET_HEADER, market);
  headers.set(MARKET_SOURCE_HEADER, pinned ? 'override' : 'geo');

  // No ?market= in play: the ordinary path, no redirect, nothing stored.
  if (requested === null) {
    return NextResponse.next({ request: { headers } });
  }

  // ?market= was used. Remember the choice, then strip the parameter with a
  // single redirect to the same path so the pinned URL is never what gets
  // bookmarked, shared or crawled.
  const url = request.nextUrl.clone();
  url.searchParams.delete(MARKET_QUERY_PARAM);

  const response = NextResponse.redirect(url);
  if (pinned) {
    response.cookies.set(MARKET_COOKIE, pinned, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax',
      // No client-side JS needs to read this, and nothing should be able to.
      httpOnly: true,
    });
  } else {
    response.cookies.delete(MARKET_COOKIE);
  }
  return response;
}

export const config = {
  // Pages only. Static assets, image optimisation and the metadata routes
  // never read the market, so running on them would cost a middleware
  // invocation per asset for nothing.
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:jpg|jpeg|png|gif|svg|webp|avif|ico|mp4|webm|woff|woff2|txt|xml|webmanifest)$).*)',
  ],
};
