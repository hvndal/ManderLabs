import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import PageHeader from '@/components/PageHeader';
import WhatsAppCta from '@/components/WhatsAppCta';
import ContactForm from '@/components/ContactForm';
import JsonLd from '@/components/JsonLd';
import { Spread } from '@/components/Editorial';
import { IndexList, IndexRow, FieldNote, CellGrid, Cell } from '@/components/Swiss';
import { PILLARS, getPillar } from '@/lib/pillars';
import { BRAND } from '@/lib/content';
import { getServerMarket } from '@/lib/market-server';
import { breadcrumbSchema, OG_IMAGE, alternates, SITE_URL } from '@/lib/seo';

/**
 * One page per pillar: /brand, /digital, /growth.
 *
 * These are the pages the whole positioning rests on, so they are a route
 * rather than three anchors on the homepage — a pillar someone is hiring for
 * needs a URL they can be sent, a search engine can rank, and a proposal can
 * point at. Three files would have been three copies of one layout; the
 * differences between the pillars are content, and content lives in
 * lib/pillars.js.
 *
 * Each page ends by naming the other two. The commercial argument for
 * organising a studio this way is that a client arrives for one and expands
 * into the others, and that only happens if the page they landed on tells
 * them the others exist.
 */
export function generateStaticParams() {
  return PILLARS.map((p) => ({ pillar: p.id }));
}

export const dynamicParams = false;

export function generateMetadata({ params }) {
  const pillar = getPillar(params.pillar);
  if (!pillar) return {};
  const path = `/${pillar.id}`;
  const title = `${pillar.label} — ${pillar.line}`;
  // The page lede is written to be read on the page; a description is written
  // to survive a 160-character truncation and still make someone click. They
  // are different jobs, so pillars carry both.
  const description = pillar.meta;

  return {
    title,
    description,
    alternates: alternates(path),
    openGraph: {
      title: `MANDER ${pillar.label}`,
      description,
      url: path,
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: `MANDER ${pillar.label}`,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export default function PillarPage({ params }) {
  const pillar = getPillar(params.pillar);
  if (!pillar) notFound();

  const market = getServerMarket();
  const others = PILLARS.filter((p) => p.id !== pillar.id);
  const trail = [
    { name: 'MANDER', href: '/' },
    { name: pillar.label },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          trail.map((t) => ({ name: t.name, path: t.href || `/${pillar.id}` }))
        )}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          '@id': `${SITE_URL}/${pillar.id}#service`,
          name: `${pillar.label} — ${pillar.line}`,
          description: pillar.lede,
          serviceType: pillar.label,
          provider: { '@id': `${SITE_URL}/#organization` },
          url: `${SITE_URL}/${pillar.id}`,
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `${pillar.label} capabilities`,
            itemListElement: pillar.capabilities.map((c) => ({
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
        meta={[pillar.index, pillar.question, market.region]}
        eyebrow={pillar.label}
        title={pillar.line}
        trail={trail}
        lede={
          <>
            <p>{pillar.lede}</p>
            {pillar.body.map((para) => (
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
            <WhatsAppCta tone="outline" location={`pillar-${pillar.id}`} />
          </>
        }
      />

      {/* ------------------------------------------------------ Capabilities */}
      <Spread index="01" folio="Capabilities">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="h-display max-w-[13ch]">What sits inside it.</h2>
          <span className="rail text-ink-mute">{pillar.capabilities.length} listed</span>
        </div>
        <IndexList className="mt-14">
          {pillar.capabilities.map((capability, i) => (
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

      {/* -------------------------------------------------------- The engine */}
      {pillar.engine && (
        <section className="border-t border-line bg-paper-2">
          <Spread index="02" folio="The loop">
            <h2 className="h-display max-w-[15ch]">How the demand engine runs.</h2>
            <p className="mt-6 max-w-text text-body-md text-ink-soft">
              Six steps, repeated. The output of the last one decides the
              next — which is the difference between a system and a content
              calendar.
            </p>
            <CellGrid cols={3} className="mt-14">
              {pillar.engine.map((step, i) => (
                <Cell key={step.step} delay={i * 60}>
                  <div className="p-6 md:p-8">
                    <span className="rail text-accent">{step.step}</span>
                    <h3 className="mt-4 font-display text-headline-lg-mobile leading-none text-ink">
                      {step.name}
                    </h3>
                    <p className="mt-4 text-body-md text-ink-soft">{step.note}</p>
                  </div>
                </Cell>
              ))}
            </CellGrid>
            {/* The locations tree is Growth's own output — the local pages are
                what the loop produces — so it is linked from here rather than
                from a nav item. Without this the whole /locations subtree has
                no internal links pointing at it, which is how pages become
                invisible to a crawler while still sitting in the sitemap. */}
            <Reveal delay={80}>
              <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-line pt-8">
                <FieldNote>Local implementation — Metro Vancouver first</FieldNote>
                <Link
                  href="/locations/metro-vancouver"
                  className="link-underline label-caps text-ink"
                >
                  Metro Vancouver
                  <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
                </Link>
                <Link href="/locations" className="link-underline label-caps text-ink-soft">
                  All markets we have pages for
                </Link>
              </div>
            </Reveal>
          </Spread>
        </section>
      )}

      {/* ----------------------------------------------------- The other two */}
      <section className="border-t border-line bg-paper">
        <Spread index={pillar.engine ? '03' : '02'} folio="The other two">
          <h2 className="h-display max-w-[16ch]">
            It works on its own. It works better in sequence.
          </h2>
          <p className="mt-6 max-w-text text-body-md text-ink-soft">
            Identity settles what you are. Experience is how that reaches
            people. Demand is how the right ones arrive. Start anywhere; most
            clients do.
          </p>
          <IndexList className="mt-14">
            {others.map((other) => (
              <IndexRow
                key={other.id}
                index={other.index}
                title={other.label}
                body={other.line}
                meta={other.question}
                href={other.href}
                action="Open"
              />
            ))}
          </IndexList>
        </Spread>
      </section>

      {/* ------------------------------------------------------------ Contact */}
      <section id="contact" className="border-t border-line bg-white">
        <Spread index={pillar.engine ? '04' : '03'} folio="Start here">
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="h-display max-w-[14ch]">
                Talk to us about {pillar.label.toLowerCase()}.
              </h2>
              <p className="mt-6 max-w-text text-body-md text-ink-soft">
                A few lines is enough. We reply within one business day, and
                the first answer is usually a question rather than a pitch.
              </p>
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
