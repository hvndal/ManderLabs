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
import { BRAND, TIERS } from '@/lib/content';
import { breadcrumbSchema, faqSchema, OG_IMAGE, alternates } from '@/lib/seo';

const TITLE = 'Rapid Launch — Online This Month';
const DESCRIPTION =
  'A sharp, professional one-page site for a new venture, in about two weeks. Fixed price, fixed scope — the real Launch tier, stated honestly.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: alternates('/rapid-launch'),
  openGraph: {
    title: `${TITLE} | MANDER`,
    description: DESCRIPTION,
    url: '/rapid-launch',
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

const trail = [{ name: 'MANDER', href: '/' }, { name: 'Rapid Launch' }];

// LAUNCH is TIERS[0] in lib/content.js — this page is that same real tier,
// reframed for someone who searched for a fast turnaround, not a faster tier
// invented to answer the search term. "About two weeks" is what the tier
// actually says; a "48-hour" version of this page was in the research brief
// this page traces back to and is deliberately not here — it is not a real
// timeline this business offers.
const LAUNCH = TIERS.find((t) => t.name === 'Launch');

const FAQS = [
  {
    q: 'Is this actually faster than your other plans?',
    a: 'Yes, in the sense that matters: one page and a tighter scope means less to design, write and review, so it moves faster through the same process every project goes through. It is not a separate rushed process — about two weeks, the same as the Launch tier always states.',
  },
  {
    q: 'Can I upgrade to more pages later?',
    a: 'Yes — a one-page site is a real, complete deliverable on its own, not a trial version of a bigger one, but nothing stops you from coming back for the Starter or Growth scope once the business needs it. The foundation carries over; you are not starting again from zero.',
  },
  {
    q: 'What do I actually get for the price?',
    a: `${LAUNCH.detailed.join(', ')}. One revision round is included; more is a different tier or an agreed add-on, not an ambiguous "unlimited" that changes what the price actually meant.`,
  },
];

export default function RapidLaunchPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd
        data={breadcrumbSchema(trail.map((t) => ({ name: t.name, path: t.href || '/rapid-launch' })))}
      />

      <PageHeader
        meta={['Rapid Launch', LAUNCH.specs.timeline, 'Fixed price']}
        eyebrow="Rapid Launch"
        title="A real site, live in about two weeks."
        trail={trail}
        lede={
          <>
            <p>
              {LAUNCH.blurb} One page, built properly rather than assembled
              from a template — mobile-first, a working contact path, and the
              basic technical setup a search engine actually needs to find
              it.
            </p>
            <p>
              This is the real Launch tier from{' '}
              <Link href="/pricing" className="link-underline text-ink">
                the full plan list
              </Link>
              , not a faster version invented for this page. {LAUNCH.specs.timeline},
              quoted in writing before anything starts.
            </p>
          </>
        }
        actions={
          <>
            <Link href="/quote" className="btn-primary">
              Get a quote
              <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
            </Link>
            <Link href="/pricing" className="btn-outline">
              See all plans
            </Link>
            <WhatsAppCta tone="outline" location="rapid-launch" />
          </>
        }
      />

      <Spread index="01" folio="What's included">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="h-display max-w-[13ch]">Exactly what ships.</h2>
          <span className="rail text-ink-mute">{LAUNCH.detailed.length} items</span>
        </div>
        <IndexList className="mt-14">
          {LAUNCH.detailed.map((item, i) => (
            <IndexRow key={item} index={String(i + 1).padStart(2, '0')} title={item} delay={i * 40} />
          ))}
        </IndexList>
        {LAUNCH.notIncluded && (
          <Reveal delay={60}>
            <p className="mt-8 max-w-text text-label-sm text-ink-mute">
              Not in this tier, on purpose: {LAUNCH.notIncluded.join(', ')} — see{' '}
              <Link href="/pricing" className="link-underline text-ink">
                the other plans
              </Link>{' '}
              for those.
            </p>
          </Reveal>
        )}
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
              Exist online this month.
            </h2>
            <p className="mx-auto mt-5 max-w-text text-body-lg text-paper/70">
              Fixed price, quoted in writing before anything begins.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={`mailto:${BRAND.email}?subject=${encodeURIComponent('Rapid Launch enquiry')}`}
                className="btn-on-dark"
              >
                Contact sales
              </a>
              <WhatsAppCta tone="on-dark" location="rapid-launch-final-cta" />
              <Link href="/quote" className="btn-outline-dark">
                Get a quote
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
