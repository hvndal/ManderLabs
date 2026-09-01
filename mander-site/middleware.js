import { NextResponse } from 'next/server';
import {
  MARKET_HEADER,
  MARKET_SOURCE_HEADER,
  REGION_HEADER,
  MARKET_QUERY_PARAM,
  MARKET_COOKIE,
  MARKET_AUTO,
  isRegion,
  marketForRegion,
  regionForCountry,
} from '@/lib/markets/geo';

/**
 * Edge geolocation → two request headers, and nothing else.
 *
 * The India version is not a separate URL. Every page keeps the exact path it
 * already had; the middleware only annotates the request with the visitor's
 * region and market, and the server components render that market's copy and
 * prices. That is what makes this safe for SEO — there is one canonical URL
 * per page rather than two competing ones, so there is no duplicate-content
 * question to answer and no /in prefix to keep out of the index.
 *
 * Geolocation never redirects, so it cannot loop. The explicit picker does
 * redirect, once, and only to strip its own query parameter — a target that
 * can never match the condition that produced it.
 *
 * Privacy: `request.geo` is derived by the platform from the IP before this
 * runs. The country code is read, mapped to a region, and discarded. No IP
 * address is read, forwarded, logged or stored anywhere in this codebase, and
 * the geolocated region is not persisted — nothing here creates an
 * identifier, which is why it needs no consent gate. The cookie is written
 * only when someone picks a country themselves, and holds two letters.
 */
export function middleware(request) {
  // request.geo is populated on Vercel; the header is the same value and is
  // what non-Vercel edges (and `vercel dev`) expose. Reading both means this
  // works in production and degrades to the US default anywhere else.
  const country =
    request.geo?.country || request.headers.get('x-vercel-ip-country') || '';
  const geoRegion = regionForCountry(country);

  const requested = request.nextUrl.searchParams.get(MARKET_QUERY_PARAM);
  const cookie = request.cookies.get(MARKET_COOKIE)?.value;

  // Precedence: an explicit choice this request, then a previously saved one,
  // then geolocation. A stale or hand-edited cookie naming nothing real falls
  // through to geolocation rather than pinning the visitor to a broken state.
  const picked = isRegion(requested)
    ? requested
    : requested === MARKET_AUTO
      ? null
      : isRegion(cookie)
        ? cookie
        : null;

  const region = picked || geoRegion;

  const headers = new Headers(request.headers);
  // Set, not append: any inbound copy of these headers is replaced, so a
  // visitor cannot hand themselves a market by sending the header directly.
  headers.set(MARKET_HEADER, marketForRegion(region));
  headers.set(REGION_HEADER, region);
  headers.set(MARKET_SOURCE_HEADER, picked ? 'picked' : 'geo');

  // No ?market= in play: the ordinary path, no redirect, nothing written.
  if (requested === null) {
    return NextResponse.next({ request: { headers } });
  }

  // Someone used the picker. Remember the choice, then strip the parameter
  // with a single redirect to the same path, so the pinned URL is never what
  // gets bookmarked, shared or crawled.
  const url = request.nextUrl.clone();
  url.searchParams.delete(MARKET_QUERY_PARAM);

  const response = NextResponse.redirect(url);
  if (picked) {
    response.cookies.set(MARKET_COOKIE, picked, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
      // Nothing client-side needs to read this, so nothing client-side can.
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
