import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import GridField from '@/components/GridField';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import WhatsAppCta from '@/components/WhatsAppCta';
import Faq from '@/components/Faq';
import { Spread } from '@/components/Editorial';
import { IndexList, IndexRow } from '@/components/Swiss';
import { BRAND } from '@/lib/content';
import { breadcrumbSchema, faqSchema, OG_IMAGE, alternates } from '@/lib/seo';

const TITLE = 'Performance & Ownership';
const DESCRIPTION =
  'Why a handcrafted site is fast where a page-builder one usually is not, and why you own the code outright rather than licensing it back from us.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: alternates('/performance'),
  openGraph: {
    title: `${TITLE} | MANDER`,
    description: DESCRIPTION,
    url: '/performance',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TITLE} | MANDER`,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

const trail = [{ name: 'MANDER', href: '/' }, { name: 'Performance' }];

// Deliberately no benchmark numbers anywhere on this page — no specific
// Lighthouse score, no millisecond figure. Nothing in this codebase has
// measured one for a client site, and a specific number with nothing behind
// it is exactly the kind of claim this project has avoided everywhere else.
// The argument here is structural and checkable instead: what a page-builder
// stack adds that a handcrafted one does not.
const REASONS = [
  {
    index: '01',
    title: 'No page-builder plugin stack',
    body: 'Elementor, Divi, a dozen WordPress plugins stacked on top of each other — each one is real code the browser has to download and run before the page does anything, on top of whatever the theme itself ships. A handcrafted site ships what the page actually needs and nothing it does not.',
  },
  {
    index: '02',
    title: 'Built on the framework, not around it',
    body: 'This site and every client build run on the same modern foundations (Next.js, React) rather than a visual builder bolted onto an older CMS. That is not a brand name to reach for — it is the difference between a site built for the browser it will actually run in and one built for the editing interface.',
  },
  {
    index: '03',
    title: 'Images and fonts handled once, correctly',
    body: 'Compressed, correctly sized, and loaded in the order the page actually needs them — done as part of the build rather than left to a plugin to guess at afterward, which is where a lot of page-builder sites lose the speed they could have had.',
  },
];

const FAQS = [
  {
    q: 'What Lighthouse or PageSpeed score should I expect?',
    a: 'We do not quote a specific score up front — a number promised before a design exists is a marketing figure, not a measurement. What is true instead: nothing here runs through a page-builder plugin stack, which is the single biggest, most checkable reason those sites tend to score low. Run any delivered site through PageSpeed Insights yourself once it ships.',
  },
  {
    q: 'Do I own the code, or am I locked into your hosting?',
    a: 'You own it outright. The site, the code and every account it touches are registered in your name from day one, built to be handed to any developer afterward — not licensed back to you through a monthly plan you can never quite leave.',
  },
  {
    q: 'Does a fast site actually help me rank higher?',
    a: 'It is one real factor among many, not the whole story — Google has said as much itself. It matters more directly for conversion: a page that loads slowly loses visitors before they see what it says, on mobile most of all.',
  },
];

export default function PerformancePage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd
        data={breadcrumbSchema(trail.map((t) => ({ name: t.name, path: t.href || '/performance' })))}
      />

      <PageHeader
        meta={['Performance', 'No plugin stack', 'Full ownership']}
        eyebrow="Performance"
        title="Fast because of what it doesn't carry."
        trail={trail}
        lede={
          <>
            <p>
              Most slow small-business sites are not slow because the
              business is small — they are slow because of what got stacked
              on top of a page builder to make it work: a theme, a page
              builder plugin, a slider plugin, an SEO plugin, three more
              nobody remembers installing.
            </p>
            <p>
              Nothing built here carries that stack. The site loads what the
              page actually needs, in the order it is actually needed, and
              you own the result outright when it ships.
            </p>
          </>
        }
        actions={
          <>
            <Link href="/quote" className="btn-primary">
              Get a quote
              <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
            </Link>
            <Link href="/digital" className="btn-outline">
              See what we build
            </Link>
            <WhatsAppCta tone="outline" location="performance" />
          </>
        }
      />

      <Spread index="01" folio="Why it's fast">
        <h2 className="h-display max-w-[14ch]">Three structural reasons, not one trick.</h2>
        <IndexList className="mt-14">
          {REASONS.map((reason) => (
            <IndexRow
              key={reason.title}
              index={reason.index}
              title={reason.title}
              body={reason.body}
            />
          ))}
        </IndexList>
      </Spread>

      <section className="border-t border-line bg-paper-2">
        <Spread index="02" folio="Questions">
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="h-display max-w-[12ch]">Answered.</h2>
            </div>
            <div className="lg:col-span-8">
              <Reveal>
                <Faq items={FAQS} />
              </Reveal>
            </div>
          </div>
        </Spread>
      </section>

      {/* ----------------------------------------------------- Final CTA */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <GridField tone="paper" />
        <div className="relative container-max stack-y text-center">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="font-display text-headline-lg-mobile md:text-display-lg">
              See it on your own site first.
            </h2>
            <p className="mx-auto mt-5 max-w-text text-body-lg text-paper/70">
              We quote a fixed price before anything begins, worldwide.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={`mailto:${BRAND.email}?subject=${encodeURIComponent('New project enquiry')}`}
                className="btn-on-dark"
              >
                Contact sales
              </a>
              <WhatsAppCta tone="on-dark" location="performance-final-cta" />
              <Link href="/contact" className="btn-outline-dark">
                All contact details
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
