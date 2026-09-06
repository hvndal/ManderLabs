// The site loads from a short, closed list of third parties, which is what
// makes a real CSP practical here: one image host for the last remaining
// stock photo, the Web3Forms endpoint the three forms POST to, CookieHub for
// the consent banner, and the two Google origins GA4 needs. Fonts come
// through next/font, which self-hosts them at build time, so there is no
// Google Fonts origin to allow. Every other external URL in the codebase is a
// link, not a resource load, and links are not a CSP concern.
//
// 'unsafe-inline' on scripts is not a lapse: Next.js emits an inline bootstrap
// script on every page, and removing it needs nonce-issuing middleware on
// every request. The CSP is still worth having without it — it stops a script
// being loaded from an attacker's origin, stops data being exfiltrated to one
// via fetch, and stops the site being framed.
//
// These are unconditional now. They were previously gated on an env var
// holding the GA measurement ID, but that ID and the CookieHub account ID are
// both committed in lib/analytics.js — so the gate could never be false in a
// real deploy, and a condition that is always true is just a comment that
// lies. Note the direction of the risk: a CSP that allows an origin nothing
// ever calls costs nothing, whereas a CSP missing an origin something does
// call silently breaks the consent banner, which would in turn silently stop
// analytics. Allowing is the safe side of this particular tradeoff.
const isProd = process.env.NODE_ENV === 'production';

// CookieHub needs more origins than its install snippet suggests. The script
// comes from the CDN host, consent records post back to the account
// subdomain, and — the one that is easy to miss — the banner's entire
// appearance comes from a separate stylesheet on the same CDN.
//
// Leaving it out of style-src fails in the worst possible way: the sheet
// still fetches with a 200, so the network tab looks healthy, but the browser
// refuses to apply it and every CookieHub element falls back to browser
// defaults — position: static, no background, zero padding. The banner is
// then present in the DOM, reports itself as visible to its own JS, and is
// invisible or unreadable to the actual visitor. Verified by checking
// computed styles rather than trusting the request status.
const COOKIEHUB = 'https://cdn.cookiehub.eu https://*.cookiehub.eu';
const GA_SCRIPT = 'https://www.googletagmanager.com';
// gtag.js reports through both of these — googletagmanager.com for the
// initial config ping, google-analytics.com (or a region-prefixed
// subdomain, for EU data residency) for the actual hit collection.
const GA_CONNECT =
  'https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com';

const CSP = [
  "default-src 'self'",
  // React Refresh needs eval; that stays out of production.
  `script-src 'self' 'unsafe-inline'${isProd ? '' : " 'unsafe-eval'"} ${GA_SCRIPT} ${COOKIEHUB}`,
  `style-src 'self' 'unsafe-inline' ${COOKIEHUB}`,
  `img-src 'self' data: blob: https://images.pexels.com https://www.google-analytics.com ${COOKIEHUB}`,
  `font-src 'self' data: ${COOKIEHUB}`,
  "media-src 'self'",
  // Dev additionally opens a websocket back to the dev server for HMR.
  `connect-src 'self' https://api.web3forms.com ${GA_CONNECT} ${COOKIEHUB}${isProd ? '' : ' ws: wss: http://localhost:*'}`,
  "frame-ancestors 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  ...(isProd ? ['upgrade-insecure-requests'] : []),
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index.php',
        destination: '/',
        permanent: true,
      },
      // The BC region became Metro Vancouver, and two of its cities were
      // removed as out of scope: local search is won by being genuinely
      // relevant to one place, and Victoria and Kelowna are not in the target
      // market. Redirects rather than 404s, because these URLs are in the
      // sitemap Google has already been handed.
      {
        source: '/locations/british-columbia',
        destination: '/locations/metro-vancouver',
        permanent: true,
      },
      {
        source: '/locations/british-columbia/vancouver',
        destination: '/locations/metro-vancouver/vancouver',
        permanent: true,
      },
      {
        source: '/locations/british-columbia/surrey',
        destination: '/locations/metro-vancouver/surrey',
        permanent: true,
      },
      {
        source: '/locations/british-columbia/:city',
        destination: '/locations/metro-vancouver',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Content-Security-Policy', value: CSP },
          // Hand back capabilities the site never asks for, so a script that
          // does get in cannot prompt for them either.
          {
            key: 'Permissions-Policy',
            value:
              'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=()',
          },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ];
  },
};

export default nextConfig;
