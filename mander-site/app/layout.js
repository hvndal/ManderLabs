import './globals.css';
import { Hanken_Grotesk, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Grain from '@/components/Grain';
import JsonLd from '@/components/JsonLd';
import Analytics from '@/components/Analytics';
import CookieHub from '@/components/CookieHub';
import { CommunityRateProvider } from '@/components/CommunityRate';
import MarketProvider from '@/components/MarketProvider';
import QuickContact from '@/components/QuickContact';
import { getServerMarket } from '@/lib/market-server';
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

/**
 * Metadata is per-market, which is why this is a function now rather than the
 * static object it used to be.
 *
 * `alternates` is deliberately unchanged between markets: both versions live
 * at the same URL, so there is exactly one canonical per page and no
 * duplicate-content question to answer. Googlebot crawls from the US and
 * therefore indexes the US version, which is the intended canonical
 * experience — the India version is a geographic variation of the same page,
 * not a second page competing with it.
 */
export async function generateMetadata() {
  const market = getServerMarket();
  const { meta } = market;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: meta.title,
      template: '%s | MANDER',
    },
    description: meta.description,
    // Keywords carry almost no ranking weight now, but they cost nothing and a
    // few engines still read them. The real work is done by the description,
    // headings and JSON-LD service area.
    keywords: meta.keywords,
    alternates: alternates('/'),
    category: 'Web Design',
    // Search Console verification. Google will not show a property's data —
    // or let a sitemap be submitted — until the domain is verified, and
    // nothing else here can make that happen. Set
    // NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in Vercel to the token Google
    // gives you and the meta tag appears on every page; leave it unset and
    // nothing is emitted.
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? {
          verification: {
            google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
          },
        }
      : {}),
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
      title: meta.ogTitle,
      description: meta.ogDescription,
      type: 'website',
      url: SITE_URL,
      siteName: 'MANDER',
      locale: market.locale,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.ogTitle,
      description: meta.twitterDescription,
      images: [OG_IMAGE.url],
    },
  };
}

export const viewport = {
  themeColor: '#f6f7f7',
};

export default function RootLayout({ children }) {
  // Resolved once, here, from the header the edge middleware set. Server
  // components below call getServerMarket() themselves; MarketProvider hands
  // the same id to the client components.
  const market = getServerMarket();

  return (
    <html
      lang="en"
      className={`${hanken.variable} ${jetbrains.variable} ${instrument.variable}`}
    >
      <body>
        <JsonLd data={organizationSchema(market)} />
        <JsonLd data={websiteSchema} />
        {/* One Service entity per discipline — these can surface independently
            of the homepage for "<service> for small business" queries. */}
        {serviceSchemas(market).map((schema) => (
          <JsonLd key={schema.name} data={schema} />
        ))}
        <a
          href="#main"
          className="label-caps sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Grain />
        {/* Every client component that shows a price or a contact option
            reads its market from here; server components call
            getServerMarket() directly. Wraps the analytics loader too, so
            events are attributed to the market that produced them. */}
        <MarketProvider market={market}>
          {/* Wraps the tree so the pricing note, the plan cards, the section
              and the footer link all open one shared Community Rate drawer. */}
          <CommunityRateProvider>
            <Nav />
            <main id="main">{children}</main>
            <Footer />
            {/* Additive on purpose: nothing above moved to make room for it.
                See components/QuickContact.js. */}
            <QuickContact />
          </CommunityRateProvider>
          {/* CookieHub renders the consent banner and decides whether
              Analytics is allowed to load; Analytics does nothing until it
              says yes. Outside the Community Rate provider on purpose:
              neither has any relationship to that drawer. Order is
              presentational only — the two communicate by event, not by
              position. */}
          <Analytics />
        </MarketProvider>
        <CookieHub />
      </body>
    </html>
  );
}
