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
  LOCALE_HEADER,
  localeForPath,
  REGION_CODE_HEADER,
} from '@/lib/markets/geo';
import { marketForPath } from '@/lib/markets/location-markets';

/**
 * Two independent things happen here, on purpose kept separate.
 *
 * MARKET (pricing, contact options) is never a separate URL. Every page
 * keeps the exact path it already had; the middleware only annotates the
 * request with the visitor's region and market, and server components
 * render that market's copy and prices. One canonical URL per page, no
 * duplicate-content question, no prefix to keep out of the index. This used
 * to also carry India (its own prefix-free rupee experience) — removed
 * along with that market; only US/CA remains, and they share one market by
 * design.
 *
 * LOCALE (English vs. French) is the opposite on purpose: a real, separate
 * `/fr/` URL prefix, not a geo-gated swap of the same page. The whole point
 * of building French pages is for them to rank for French search queries,
 * which requires an independently crawlable URL — a same-URL geo-gated
 * version would be invisible to Google entirely, since Google's crawler
 * isn't in Quebec. So `localeForPath` reads pure URL structure, never
 * geolocation; geolocation's only job for locale is the region code below,
 * which does nothing but decide whether a banner offers itself.
 *
 * Geolocation never redirects, so it cannot loop. The explicit market picker
 * does redirect, once, and only to strip its own query parameter — a target
 * that can never match the condition that produced it.
 *
 * Privacy: `request.geo` is derived by the platform from the IP before this
 * runs. The country code and region code are read, mapped, and discarded. No
 * IP address is read, forwarded, logged or stored anywhere in this codebase,
 * and nothing geolocated is persisted — nothing here creates an identifier,
 * which is why it needs no consent gate. The cookie is written only when
 * someone picks a country themselves, and holds two letters.
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

  // A page about a place is resolved by the place, not by who is reading it.
  // /locations/punjab/mohali quotes rupees to everyone including the US-based
  // crawler that decides whether it can rank in India, and /locations/
  // metro-vancouver/vancouver quotes dollars to everyone including a visitor
  // in Delhi. Deciding it here rather than inside the page is what keeps the
  // header, the footer, the sticky contact bar and the JSON-LD agreeing with
  // the page body — they all read the market off the request, and a page that
  // said rupees while its own structured data said dollars would be a
  // contradiction Google is entitled to distrust.
  //
  // The region header is deliberately left alone: the footer picker still
  // shows the visitor their own country, because that is what it controls.
  const urlMarket = marketForPath(request.nextUrl.pathname);
  const market = urlMarket || marketForRegion(region);

  // Locale is pure URL structure — the prefix, nothing else. Deliberately
  // computed independently of everything above: market/region answer "what
  // do they see priced and offered", locale answers "what language", and
  // conflating them is exactly the mistake that would make a French page
  // stop rendering for a visitor geolocation gets wrong.
  const locale = localeForPath(request.nextUrl.pathname);

  // Raw ISO 3166-2 region code, Vercel's own geolocation — used only to
  // decide whether the French-language banner offers itself, never to route.
  const regionCode =
    request.geo?.countryRegion ||
    request.headers.get('x-vercel-ip-country-region') ||
    '';

  const headers = new Headers(request.headers);
  // Set, not append: any inbound copy of these headers is replaced, so a
  // visitor cannot hand themselves a market by sending the header directly.
  headers.set(MARKET_HEADER, market);
  headers.set(REGION_HEADER, region);
  headers.set(
    MARKET_SOURCE_HEADER,
    urlMarket ? 'url' : picked ? 'picked' : 'geo'
  );
  headers.set(LOCALE_HEADER, locale);
  headers.set(REGION_CODE_HEADER, regionCode);

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
