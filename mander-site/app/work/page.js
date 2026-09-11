import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import PageHeader from '@/components/PageHeader';
import WorkFeatures from '@/components/WorkFeatures';
import Testimonials from '@/components/Testimonials';
import ContactForm from '@/components/ContactForm';
import JsonLd from '@/components/JsonLd';
import { Spread, Standfirst } from '@/components/Editorial';
import { WORK, CLIENTS, BRAND } from '@/lib/content';
import { getServerMarket } from '@/lib/market-server';
import { breadcrumbSchema, serviceSchemas, OG_IMAGE, alternates, SITE_URL } from '@/lib/seo';

/**
 * Selected work.
 *
 * The nav has promised a Work page since the pillars were introduced and has
 * been pointing at a homepage anchor instead. This is that page: every
 * project as a feature, client engagements first and the studio's own builds
 * below a labelled rule, so nobody has to guess which is which.
 *
 * It also takes the Engagements block off the homepage. What we actually
 * delivered for three clients is the right thing to read *after* the work,
 * not a band halfway down a page somebody landed on thirty seconds ago.
 */
export async function generateMetadata() {
  const description =
    'Selected projects from MANDER — brand identity, websites, ecommerce and demand work for businesses in Metro Vancouver and beyond.';

  return {
    title: 'Selected Work',
    description,
    alternates: alternates('/work'),
    openGraph: {
      title: 'Selected Work — MANDER',
      description,
      url: '/work',
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Selected Work — MANDER',
      description,
      images: [OG_IMAGE.url],
    },
  };
}

const trail = [{ name: 'MANDER', href: '/' }, { name: 'Work' }];

export default function WorkPage() {
  const market = getServerMarket();

  // `kind: 'studio'` marks the builds that are ours rather than a client's.
  // They are kept and labelled rather than quietly mixed in — presenting an
  // in-house prototype as a paid engagement would be inventing a client.
  const client = WORK.filter((w) => w.kind !== 'studio');
  const studio = WORK.filter((w) => w.kind === 'studio');

  return (
    <>
      {/* Every project on this page is delivered work in one of these six
          disciplines — naming them here is what lets the page independently
          answer a "<service> examples" or "<service> portfolio" query. */}
      {serviceSchemas(market).map((schema) => (
        <JsonLd key={schema.name} data={schema} />
      ))}
      <JsonLd
        data={breadcrumbSchema(trail.map((t) => ({ name: t.name, path: t.href || '/work' })))}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': `${SITE_URL}/work#page`,
          url: `${SITE_URL}/work`,
          name: 'Selected Work — MANDER',
          isPartOf: { '@id': `${SITE_URL}/#website` },
          about: { '@id': `${SITE_URL}/#organization` },
        }}
      />

      <PageHeader
        eyebrow="Selected work"
        title="What we have built, and what we did on it."
        lede="Client engagements first, then the studio's own builds. No invented results, no borrowed case studies — scope, discipline and a link where the work is still ours to show."
        meta={['Work', `${WORK.length} projects`, market.region]}
        trail={trail}
      />

      <Spread index="01" folio="Client work">
        <WorkFeatures items={client} />
      </Spread>

      {/* ------------------------------------------------------ In-house */}
      <section className="border-y border-line bg-paper-2">
        <Spread index="02" folio="In-house">
          <h2 className="h-display max-w-[14ch]">Things we built for ourselves.</h2>
          <Standfirst className="mt-8">
            Products and studies made in the studio rather than for a client.
            They are here because they show how we work when nobody is setting
            the brief — and they are labelled so nobody mistakes them for
            client engagements.
          </Standfirst>
          <div className="mt-12">
            <WorkFeatures items={studio} startIndex={client.length + 1} />
          </div>
        </Spread>
      </section>

      {/* --------------------------------------------------- Engagements */}
      <Spread index="03" folio="Engagements">
        <h2 className="h-display max-w-[14ch]">What we actually delivered.</h2>
        <Standfirst className="mt-8">
          Scope and outcome for three recent builds — no paraphrasing, no
          invented praise, and no quotes nobody said.
        </Standfirst>
        <div className="mt-12">
          <Testimonials items={CLIENTS} />
        </div>
      </Spread>

      {/* -------------------------------------------------------- Contact */}
      <section className="border-t border-line bg-paper">
        <Spread index="04" folio="Start one">
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="h-display max-w-[12ch]">Have something like this?</h2>
              <Standfirst className="mt-8">
                Tell us what you are building and we will come back within one
                business day with a scope and a number.
              </Standfirst>
              <Reveal delay={80} className="mt-8 flex flex-wrap items-center gap-x-9 gap-y-4">
                <Link href="/quote" className="btn-primary">
                  Get a quote
                  <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
                </Link>
                <a href={`mailto:${BRAND.email}`} className="btn-outline">
                  Email us
                </a>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
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
