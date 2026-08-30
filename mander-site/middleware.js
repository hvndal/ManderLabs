import { NextResponse } from 'next/server';
import { MARKET_HEADER, marketIdForCountry } from '@/lib/markets/geo';

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
 * would have: there is no redirect, so there is no loop, and there is no
 * cached 30x pinning a visitor to the wrong market for the life of the
 * browser cache.
 *
 * Privacy: `request.geo` is derived by the platform from the IP before this
 * runs. The country code is read, mapped to 'us' or 'in', and discarded. No
 * IP address is read, forwarded, logged or stored anywhere in this codebase,
 * and the resolved market is not persisted to a cookie — nothing here creates
 * an identifier, which is why it needs no consent gate.
 */
export function middleware(request) {
  // request.geo is populated on Vercel; the header is the same value and is
  // what non-Vercel edges (and `vercel dev`) expose. Reading both means this
  // works in production and degrades to the US default anywhere else.
  const country =
    request.geo?.country || request.headers.get('x-vercel-ip-country') || '';

  const headers = new Headers(request.headers);
  headers.set(MARKET_HEADER, marketIdForCountry(country));
  // Strip any inbound copy of the header before it is trusted: without this,
  // a visitor could set x-mander-market themselves and the value above would
  // be appended rather than replacing it. Headers.set already replaces, but
  // being explicit here is the point — the market is decided at the edge.

  return NextResponse.next({ request: { headers } });
}

export const config = {
  // Pages only. Static assets, image optimisation and the metadata routes
  // never read the market, so running on them would cost a middleware
  // invocation per asset for nothing.
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:jpg|jpeg|png|gif|svg|webp|avif|ico|mp4|webm|woff|woff2|txt|xml|webmanifest)$).*)',
  ],
};
