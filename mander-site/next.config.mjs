// The site loads almost nothing from anywhere else, which is what makes a
// real CSP practical here: one image host for the last remaining stock photo,
// the Web3Forms endpoint the three forms POST to, and — only when
// NEXT_PUBLIC_GA_MEASUREMENT_ID is actually set, see lib/analytics.js — the
// two Google origins GA4 needs. Fonts come through next/font, which
// self-hosts them at build time, so there is no Google Fonts origin to
// allow. Every other external URL in the codebase is a link, not a resource
// load, and links are not a CSP concern.
//
// 'unsafe-inline' on scripts is not a lapse: Next.js emits an inline bootstrap
// script on every page, and removing it needs nonce-issuing middleware on
// every request. The CSP is still worth having without it — it stops a script
// being loaded from an attacker's origin, stops data being exfiltrated to one
// via fetch, and stops the site being framed.
const isProd = process.env.NODE_ENV === 'production';

// Same gate Analytics.js and CookieConsent.js use. Until the measurement ID
// exists, the CSP stays exactly as tight as it was before analytics was a
// possibility at all — no Google origin allowed, because nothing would call it.
const gaEnabled = Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
const GA_SCRIPT = 'https://www.googletagmanager.com';
// gtag.js reports through both of these — googletagmanager.com for the
// initial config ping, google-analytics.com (or a region-prefixed
// subdomain, for EU data residency) for the actual hit collection.
const GA_CONNECT = 'https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com';

const CSP = [
  "default-src 'self'",
  // React Refresh needs eval; that stays out of production.
  `script-src 'self' 'unsafe-inline'${isProd ? '' : " 'unsafe-eval'"}${gaEnabled ? ` ${GA_SCRIPT}` : ''}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https://images.pexels.com${gaEnabled ? ' https://www.google-analytics.com' : ''}`,
  "font-src 'self' data:",
  "media-src 'self'",
  // Dev additionally opens a websocket back to the dev server for HMR.
  `connect-src 'self' https://api.web3forms.com${gaEnabled ? ` ${GA_CONNECT}` : ''}${isProd ? '' : ' ws: wss: http://localhost:*'}`,
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
