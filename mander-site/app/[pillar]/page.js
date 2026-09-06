import Link from 'next/link';
import { notFound } from 'next/navigation';
import Section, { SectionHeading } from '@/components/Section';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import PageHeader from '@/components/PageHeader';
import Breadcrumbs from '@/components/Breadcrumbs';
import WhatsAppCta from '@/components/WhatsAppCta';
import ContactForm from '@/components/ContactForm';
import JsonLd from '@/components/JsonLd';
import { IndexList, IndexRow, FieldNote } from '@/components/Swiss';
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
  const description = pillar.lede;

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
      <Section tone="paper">
        <SectionHeading
          index="01"
          eyebrow="Capabilities"
          title="What sits inside it."
          meta={`${pillar.capabilities.length} listed`}
        />
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
      </Section>

      {/* -------------------------------------------------------- The engine */}
      {pillar.engine && (
        <Section tone="alt">
          <SectionHeading
            index="02"
            eyebrow="The loop"
            title="How the demand engine runs."
            body="Six steps, repeated. The output of the last one decides the next — which is the difference between a system and a content calendar."
            meta={`${pillar.engine.length} steps`}
          />
          <div className="mt-14 grid grid-cols-1 gap-px border-y border-line bg-line md:grid-cols-3">
            {pillar.engine.map((step, i) => (
              <Reveal key={step.step} delay={i * 60} className="bg-paper">
                <div className="flex h-full flex-col p-6 md:p-8">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                    {step.step}
                  </span>
                  <h3 className="mt-4 font-display text-headline-lg-mobile font-normal leading-none text-ink">
                    {step.name}
                  </h3>
                  <p className="mt-4 text-body-md text-ink-soft">{step.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <FieldNote className="mt-6">
            Local implementation currently focused on Metro Vancouver.
          </FieldNote>
        </Section>
      )}

      {/* ----------------------------------------------------- The other two */}
      <Section tone="paper">
        <SectionHeading
          index={pillar.engine ? '03' : '02'}
          eyebrow="The other two"
          title="It works on its own. It works better in sequence."
          body="Identity settles what you are. Experience is how that reaches people. Demand is how the right ones arrive. Start anywhere; most clients do."
        />
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
      </Section>

      {/* ------------------------------------------------------------ Contact */}
      <Section id="contact" tone="white">
        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              index={pillar.engine ? '04' : '03'}
              eyebrow="Start here"
              title={`Talk to us about ${pillar.label.toLowerCase()}.`}
              body="A few lines is enough. We reply within one business day, and the first answer is usually a question rather than a pitch."
            />
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
