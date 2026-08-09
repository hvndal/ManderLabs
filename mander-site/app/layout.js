import './globals.css';
import { Hanken_Grotesk, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Grain from '@/components/Grain';
import JsonLd from '@/components/JsonLd';
import { CommunityRateProvider } from '@/components/CommunityRate';
import {
  SITE_URL,
  organizationSchema,
  websiteSchema,
  serviceSchemas,
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
    default: 'MANDER | Affordable, Fast Website Design for Small Business',
    template: '%s | MANDER',
  },
  description:
    'Remote website design for small business across the U.S. and Canada. Fixed-price custom builds from $249, plus SEO, local search and ongoing care. 20% Community Rate available.',
  // Keywords carry almost no ranking weight now, but they cost nothing and a
  // few engines still read them. The real work is done by the description,
  // headings and JSON-LD service area. Weighted toward remote/nationwide
  // intent rather than a single city, because that's how the business sells.
  keywords: [
    'remote website design',
    'website design for small business',
    'affordable website design USA',
    'website design Canada',
    'small business web design agency',
    'custom website design remote',
    'fixed price website design',
    'small business SEO',
    'local SEO for small business',
    'Google Business Profile optimization',
    'website redesign small business',
    'website design from $249',
    'veteran owned business discount website',
    'nonprofit and small business website discount',
  ],
  alternates: {
    canonical: '/',
  },
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
    title: 'MANDER | Website Design for Small Business — U.S. & Canada',
    description:
      'Remote website design, development and SEO for small and mid-sized businesses across the U.S. and Canada. Fixed-price builds from $249.',
    type: 'website',
    url: SITE_URL,
    siteName: 'MANDER',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MANDER | Website Design for Small Business — U.S. & Canada',
    description:
      'Remote website design and SEO for small business across the U.S. and Canada. Fixed-price builds from $249.',
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
      </body>
    </html>
  );
}
