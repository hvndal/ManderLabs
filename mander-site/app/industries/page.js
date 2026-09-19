import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import GridField from '@/components/GridField';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import WhatsAppCta from '@/components/WhatsAppCta';
import { Spread } from '@/components/Editorial';
import { IndexList, IndexRow } from '@/components/Swiss';
import { INDUSTRIES } from '@/lib/industries';
import { BRAND } from '@/lib/content';
import { breadcrumbSchema, OG_IMAGE, alternates } from '@/lib/seo';

const TITLE = 'Industries';
const DESCRIPTION =
  'Websites built around what a specific kind of business actually needs — contractors and trades, restaurants and bakeries. Fixed scope, fixed price.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: alternates('/industries'),
  openGraph: {
    title: `${TITLE} | MANDER`,
    description: DESCRIPTION,
    url: '/industries',
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

const trail = [{ name: 'MANDER', href: '/' }, { name: 'Industries' }];

/**
 * The industries hub — two entries today, deliberately not padded out to
 * look bigger than it is.
 *
 * Every capability described on the three pillar pages applies to any
 * business; these pages exist for the two audiences where the portfolio
 * already has real, on-topic evidence to point at (see lib/industries.js).
 * A third industry belongs here the day a third piece of real evidence
 * exists, which is also why this hub is written to read as a genuine start
 * rather than a completed set — the way /locations reads before its next
 * city gets added.
 */
export default function IndustriesHubPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema(trail.map((t) => ({ name: t.name, path: t.href || '/industries' })))}
      />

      <PageHeader
        meta={['Industries', `${INDUSTRIES.length} today`, 'Fixed scope']}
        eyebrow="Industries"
        title="Built around what your business actually needs."
        trail={trail}
        lede={
          <p>
            The approach on this site — fixed scope, mobile-first, a site
            that is yours outright — applies to any small business. These two
            pages exist because the portfolio already has real, on-topic work
            behind them, not because they are the only kind of business we
            build for.
          </p>
        }
      />

      <Spread index="01" folio="By industry">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="h-display max-w-[14ch]">Two, so far.</h2>
          <span className="rail text-ink-mute">{INDUSTRIES.length} listed</span>
        </div>
        <IndexList className="mt-14">
          {INDUSTRIES.map((industry) => (
            <IndexRow
              key={industry.id}
              index={industry.index}
              title={industry.label}
              body={industry.line}
              href={`/industries/${industry.id}`}
              action="Open"
            />
          ))}
        </IndexList>
        <Reveal delay={60}>
          <p className="mt-8 max-w-text text-label-sm text-ink-mute">
            Don&apos;t see yours listed?{' '}
            <Link href="/digital" className="link-underline text-ink">
              The capabilities are the same either way
            </Link>
            .
          </p>
        </Reveal>
      </Spread>

      {/* ----------------------------------------------------- Final CTA */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <GridField tone="paper" />
        <div className="relative container-max stack-y text-center">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="font-display text-headline-lg-mobile md:text-display-lg">
              Tell us what the business does.
            </h2>
            <p className="mx-auto mt-5 max-w-text text-body-lg text-paper/70">
              We quote a fixed price before anything begins, whether or not
              your industry has a page here yet.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={`mailto:${BRAND.email}?subject=${encodeURIComponent('New project enquiry')}`}
                className="btn-on-dark"
              >
                Contact sales
              </a>
              <WhatsAppCta tone="on-dark" location="industries-final-cta" />
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
