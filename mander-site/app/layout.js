import './globals.css';
import { Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Grain from '@/components/Grain';
import JsonLd from '@/components/JsonLd';
import { SITE_URL, organizationSchema, websiteSchema } from '@/lib/seo';

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

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'MANDER | Affordable, Fast Website Design for Small Business',
    template: '%s | MANDER',
  },
  description:
    'Budget-friendly custom website design, built fast — from $249. Small and mid-sized businesses across Canada and the U.S. get a premium site, SEO, and ongoing care without agency prices.',
  keywords: [
    'affordable website design',
    'budget website design',
    'fast website design',
    'small business website design',
    'custom website design',
    'website design Canada',
    'website design United States',
    'cheap website for small business',
    'website design and SEO',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MANDER | Affordable, Fast Website Design for Small Business',
    description:
      'Budget-friendly custom website design, built fast — from $249. Premium design and build for small and mid-sized businesses across Canada and the U.S.',
    type: 'website',
    url: SITE_URL,
    siteName: 'MANDER',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MANDER | Affordable, Fast Website Design for Small Business',
    description:
      'Budget-friendly custom website design, built fast — from $249, for small and mid-sized businesses across Canada and the U.S.',
  },
};

export const viewport = {
  themeColor: '#f4f2ec',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${hanken.variable} ${jetbrains.variable}`}>
      <body>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <a
          href="#main"
          className="label-caps sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Grain />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
