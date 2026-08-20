// The site loads almost nothing from anywhere else, which is what makes a
// real CSP practical here: one image host for the last remaining stock photo,
// and the Web3Forms endpoint the three forms POST to. Fonts come through
// next/font, which self-hosts them at build time, so there is no Google Fonts
// origin to allow. Every other external URL in the codebase is a link, not a
// resource load, and links are not a CSP concern.
//
// 'unsafe-inline' on scripts is not a lapse: Next.js emits an inline bootstrap
// script on every page, and removing it needs nonce-issuing middleware on
// every request. The CSP is still worth having without it — it stops a script
// being loaded from an attacker's origin, stops data being exfiltrated to one
// via fetch, and stops the site being framed.
const isProd = process.env.NODE_ENV === 'production';

const CSP = [
  "default-src 'self'",
  // React Refresh needs eval; that stays out of production.
  `script-src 'self' 'unsafe-inline'${isProd ? '' : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.pexels.com",
  "font-src 'self' data:",
  "media-src 'self'",
  // Dev additionally opens a websocket back to the dev server for HMR.
  `connect-src 'self' https://api.web3forms.com${isProd ? '' : ' ws: wss: http://localhost:*'}`,
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
