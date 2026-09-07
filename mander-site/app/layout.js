import './globals.css';
import { Hanken_Grotesk, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Grain from '@/components/Grain';
import JsonLd from '@/components/JsonLd';
import Analytics from '@/components/Analytics';
import CookieHub from '@/components/CookieHub';
import { CommunityRateProvider } from '@/components/CommunityRate';
import {
  SITE_URL,
  OG_IMAGE,
  organizationSchema,
  websiteSchema,
  serviceSchemas,
  alternates,
} from '@/lib/seo';

// Both are variable fonts — omitting `weight` pulls the full axis, which is
// what the design system needs (400/500/600).
const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hanken',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

// The display face. Hanken alone was doing every job, which is why the page
// read competent-but-generic below the masthead — a single grotesk at three
// sizes is a UI kit, not a type system. Instrument Serif is high-contrast and
// slightly condensed: it carries an editorial voice at large sizes the way a
// masthead needs to, and it sets up the three-way contrast the design system
// was always describing — serif display, grotesk body, mono label.
//
// Single weight (400) on purpose. It's a display cut; faux-bolding it or
// pulling a heavier optical size would flatten exactly the contrast that
// makes it worth loading.
const instrument = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'MANDER — Vancouver Contemporary Digital Practice & Website Design',
    template: '%s | MANDER',
  },
  description:
    'Architectural web design, digital craft, and organic local search for businesses across Vancouver, Surrey, Langley, Burnaby, and the Pacific Northwest. Bespoke scope, sub-second performance, verified Lighthouse 99+.',
  keywords: [
    'Vancouver website design',
    'Langley web design',
    'Surrey website designer',
    'Burnaby web design agency',
    'Coquitlam web development',
    'Pacific Northwest digital studio',
    'bespoke website design Canada',
    'high performance Next.js agency',
    'small business SEO Vancouver',
    'local SEO Metro Vancouver',
    'Google Business Profile optimization BC',
    'custom web application design',
    'digital craft studio',
  ],
  alternates: alternates('/'),
  category: 'Web Design',
  applicationName: 'MANDER',
  authors: [{ name: 'MANDER', url: SITE_URL }],
  creator: 'MANDER',
  publisher: 'MANDER',
  formatDetection: { telephone: false, address: false, email: false },
  // Explicit crawl directives. `max-image-preview: large` is what allows a
  // full-width thumbnail in results, and it is off by default.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'MANDER — Vancouver Contemporary Digital Practice & Website Design',
    description:
      'Architectural web design, digital craft, and organic local search for businesses across Vancouver, Surrey, Langley, Burnaby, and the Pacific Northwest. Bespoke scope, sub-second performance, verified Lighthouse 99+.',
    type: 'website',
    url: SITE_URL,
    siteName: 'MANDER',
    locale: 'en_US',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MANDER — Vancouver Contemporary Digital Practice & Website Design',
    description:
      'Architectural web design, digital craft, and organic local search for businesses across Vancouver, Surrey, Langley, Burnaby, and the Pacific Northwest. Bespoke scope, sub-second performance, verified Lighthouse 99+.',
    images: [OG_IMAGE.url],
  },
};

export const viewport = {
  themeColor: '#f4f2ec',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${hanken.variable} ${jetbrains.variable} ${instrument.variable}`}
    >
      <body>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        {/* One Service entity per discipline — these can surface independently
            of the homepage for "<service> for small business" queries. */}
        {serviceSchemas.map((schema) => (
          <JsonLd key={schema.name} data={schema} />
        ))}
        <a
          href="#main"
          className="label-caps sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Grain />
        {/* Wraps everything so the pricing note, the plan cards, the section
            and the footer link all open one shared Community Rate drawer. */}
        <CommunityRateProvider>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </CommunityRateProvider>
        {/* CookieHub renders the consent banner and decides whether Analytics
            is allowed to load; Analytics does nothing until it says yes.
            Outside the provider tree on purpose: neither has any relationship
            to the Community Rate drawer, and nesting them there would imply
            one. Order is presentational only — the two communicate by event,
            not by position. */}
        <Analytics />
        <CookieHub />
      </body>
    </html>
  );
}
