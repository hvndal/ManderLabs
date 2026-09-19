import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import PageHeader from '@/components/PageHeader';
import WhatsAppCta from '@/components/WhatsAppCta';
import ContactForm from '@/components/ContactForm';
import JsonLd from '@/components/JsonLd';
import { Spread } from '@/components/Editorial';
import { IndexList, IndexRow, FieldNote } from '@/components/Swiss';
import Faq from '@/components/Faq';
import { INDUSTRIES, getIndustry } from '@/lib/industries';
import { getServerMarket } from '@/lib/market-server';
import { breadcrumbSchema, faqSchema, OG_IMAGE, alternates, SITE_URL } from '@/lib/seo';

/**
 * One page per industry: /industries/contractors-trades,
 * /industries/restaurants-bakeries.
 *
 * A near-copy of app/[pillar]/page.js on purpose — same job, aimed sideways
 * (an audience) instead of down (a discipline). Kept as a separate route
 * tree rather than folded into the pillars: a pillar page answers "what do
 * you sell", this answers "why does that matter to a business like mine",
 * and conflating the two would have made every pillar page's already-full
 * layout carry a second job.
 */
export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ industry: i.id }));
}

export const dynamicParams = false;

export function generateMetadata({ params }) {
  const industry = getIndustry(params.industry);
  if (!industry) return {};
  const path = `/industries/${industry.id}`;
  // Not industry.line concatenated — "Contractors & Trades — A site that
  // earns the call before the quote does." is 85 characters before the
  // layout template's own " | MANDER" suffix, well past what a SERP keeps
  // whole. A short, dedicated title instead, the same fix the pillar pages
  // never needed because their labels are one word.
  const title = `Website Design for ${industry.label}`;
  const description = industry.meta;

  return {
    title,
    description,
    alternates: alternates(path),
    openGraph: {
      title: `MANDER for ${industry.label}`,
      description,
      url: path,
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: `MANDER for ${industry.label}`,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export default function IndustryPage({ params }) {
  const industry = getIndustry(params.industry);
  if (!industry) notFound();

  const market = getServerMarket();
  const others = INDUSTRIES.filter((i) => i.id !== industry.id);
  const trail = [
    { name: 'MANDER', href: '/' },
    { name: 'Industries', href: '/industries' },
    { name: industry.label },
  ];

  return (
    <>
      {industry.faqs && <JsonLd data={faqSchema(industry.faqs)} />}
      <JsonLd
        data={breadcrumbSchema(
          trail.map((t) => ({ name: t.name, path: t.href || `/industries/${industry.id}` }))
        )}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          '@id': `${SITE_URL}/industries/${industry.id}#service`,
          name: `${industry.label} — ${industry.line}`,
          description: industry.lede,
          serviceType: industry.label,
          provider: { '@id': `${SITE_URL}/#organization` },
          url: `${SITE_URL}/industries/${industry.id}`,
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `${industry.label} capabilities`,
            itemListElement: industry.capabilities.map((c) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: c.name,
                description: c.note,
              },
            })),
          },
        }}
      />

      <PageHeader
        meta={['Industries', industry.label, market.region]}
        eyebrow="Industries"
        title={industry.line}
        trail={trail}
        lede={
          <>
            <p>{industry.lede}</p>
            {industry.body.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </>
        }
        actions={
          <>
            <Link href="/quote" className="btn-primary">
              Get a quote
              <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
            </Link>
            <Link href="/contact" className="btn-outline">
              Talk to a person
            </Link>
            <WhatsAppCta tone="outline" location={`industry-${industry.id}`} />
          </>
        }
      />

      {/* -------------------------------------------------- What's included */}
      <Spread index="01" folio="What's included">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="h-display max-w-[13ch]">What sits inside it.</h2>
          <span className="rail text-ink-mute">{industry.capabilities.length} listed</span>
        </div>
        <IndexList className="mt-14">
          {industry.capabilities.map((capability, i) => (
            <IndexRow
              key={capability.name}
              index={String(i + 1).padStart(2, '0')}
              title={capability.name}
              body={capability.note}
              delay={i * 40}
            />
          ))}
        </IndexList>
      </Spread>

      {/* ------------------------------------------------------- Evidence */}
      {/* A real WORK entry, named — not a fabricated case study. This is the
          one piece of every industry page that cannot be written; it has to
          already exist in the portfolio, which is why there are two of these
          pages rather than the five a research brief proposed. */}
      <section className="border-t border-line bg-paper-2">
        <Spread index="02" folio="Real work">
          <h2 className="h-display max-w-[14ch]">Not a hypothetical.</h2>
          <p className="mt-6 max-w-text text-body-md text-ink-soft">
            <strong className="font-semibold text-ink">{industry.evidence.workName}.</strong>{' '}
            {industry.evidence.note}
          </p>
          <Reveal delay={60}>
            <Link href="/work" className="link-underline label-caps mt-8 inline-flex items-center gap-2 text-ink">
              See it in the full portfolio
              <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
            </Link>
          </Reveal>
        </Spread>
      </section>

      {/* ------------------------------------------------------- Questions */}
      {industry.faqs && (
        <section className="border-t border-line bg-paper-2">
          <Spread index="03" folio="Questions">
            <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <h2 className="h-display max-w-[12ch]">Answered.</h2>
              </div>
              <div className="lg:col-span-8">
                <Reveal>
                  <Faq items={industry.faqs} />
                </Reveal>
              </div>
            </div>
          </Spread>
        </section>
      )}

      {/* -------------------------------------------------- The other one */}
      {others.length > 0 && (
        <section className="border-t border-line bg-paper">
          <Spread index="04" folio="Other industries">
            <h2 className="h-display max-w-[16ch]">Not quite your business?</h2>
            <IndexList className="mt-14">
              {others.map((other) => (
                <IndexRow
                  key={other.id}
                  index={other.index}
                  title={other.label}
                  body={other.line}
                  href={`/industries/${other.id}`}
                  action="Open"
                />
              ))}
            </IndexList>
            <Reveal delay={60}>
              <p className="mt-8 max-w-text text-label-sm text-ink-mute">
                Every capability here applies outside these two industries as well — see{' '}
                <Link href="/digital" className="link-underline text-ink">
                  what we build
                </Link>{' '}
                for the general case.
              </p>
            </Reveal>
          </Spread>
        </section>
      )}

      {/* ------------------------------------------------------------ Contact */}
      <section id="contact" className="border-t border-line bg-white">
        <Spread index="05" folio="Start here">
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="h-display max-w-[14ch]">
                Talk to us about your site.
              </h2>
              <p className="mt-6 max-w-text text-body-md text-ink-soft">
                A few lines is enough. We reply within one business day, and
                the first answer is usually a question rather than a pitch.
              </p>
              <FieldNote className="mt-6">Fixed scope, quoted before anything starts.</FieldNote>
            </div>
            <div className="lg:col-span-8">
              <Reveal>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </Spread>
      </section>
    </>
  );
}
