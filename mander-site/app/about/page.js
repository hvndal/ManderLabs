import Link from 'next/link';
import Section, { SectionHeading } from '@/components/Section';
import Reveal from '@/components/Reveal';
import GridField from '@/components/GridField';
import Breadcrumbs from '@/components/Breadcrumbs';
import Icon from '@/components/Icon';
import TeamCard from '@/components/TeamCard';
import WhatsAppCta from '@/components/WhatsAppCta';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import { IndexList, IndexRow } from '@/components/Swiss';
import { BRAND, TEAM, TERMS, SERVICES, PROCESS } from '@/lib/content';
import { getServerMarket } from '@/lib/market-server';
import { breadcrumbSchema, OG_IMAGE, alternates, SITE_URL } from '@/lib/seo';

/**
 * About Us.
 *
 * Everything here already existed somewhere on the homepage — the team, the
 * three commitments, the process. What did not exist was one page a stranger
 * could open to answer "who is this, what do they sell, and what does it
 * cost", which is the question a payment processor, a first-time client and a
 * search engine all arrive with. Rather than write new claims, this assembles
 * the ones already made and adds the plain commercial summary the homepage
 * deliberately spreads across six sections.
 */
export async function generateMetadata() {
  const market = getServerMarket();
  const description = `MANDER is a small remote design and development studio building fixed-price websites, apps and local search presence for small and growing businesses across ${market.region}.`;

  return {
    title: 'About Us',
    description,
    alternates: alternates('/about'),
    openGraph: {
      title: 'About MANDER',
      description,
      url: '/about',
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About MANDER',
      description,
      images: [OG_IMAGE.url],
    },
  };
}

const trail = [{ name: 'MANDER', href: '/' }, { name: 'About' }];

export default function AboutPage() {
  const market = getServerMarket();
  const buildTiers = market.tiers;
  const monthly = market.monthlyTiers;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          trail.map((t) => ({ name: t.name, path: t.href || '/about' }))
        )}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          '@id': `${SITE_URL}/about#page`,
          url: `${SITE_URL}/about`,
          name: 'About MANDER',
          mainEntity: { '@id': `${SITE_URL}/#organization` },
        }}
      />

      <PageHeader
        meta={['About', market.region, 'Remote studio']}
        eyebrow="About"
        title="A small studio that ships finished work."
        trail={trail}
        lede={
          <>
            <p>
              MANDER is a remote design and development studio building
              websites, Android apps and local search presence for small and
              growing businesses across {market.region}. Every project is
              fixed-scope and fixed-price, quoted in writing before any work
              starts.
            </p>
            <p>
              We are deliberately small. There is no account layer between you
              and the people building the thing, which is most of why the
              prices look the way they do and all of why the work does.
            </p>
          </>
        }
        actions={
          <>
            <Link href="/contact" className="btn-primary">
              Contact us
              <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
            </Link>
            <WhatsAppCta tone="outline" location="about-page" />
            <Link href="/quote" className="btn-outline">
              Get a quote
            </Link>
          </>
        }
      />

      {/* --------------------------------------------------- What we sell */}
      <Section tone="paper">
        <SectionHeading
          index="01"
          eyebrow="What we sell"
          title="Plans, once and monthly."
          body="What the plans are, and what is billed once versus monthly. Every project is quoted in writing before it starts — ask and you get a real figure, not a range."
          meta={`${buildTiers.length + (monthly?.length || 0)} plans`}
        />

        <IndexList className="mt-14">
          {buildTiers.map((tier, i) => (
            <IndexRow
              key={tier.name}
              index={String(i + 1).padStart(2, '0')}
              title={tier.name}
              body={tier.blurb}
              meta="One-time"
              href="/quote"
              action="Quote"
              delay={i * 50}
            />
          ))}
          {(monthly || []).map((tier, i) => (
            <IndexRow
              key={tier.name}
              index={String(buildTiers.length + i + 1).padStart(2, '0')}
              title={tier.name}
              body={tier.blurb}
              meta="Monthly"
              href="/quote"
              action="Quote"
              delay={i * 50}
            />
          ))}
        </IndexList>

        <Reveal delay={80}>
          <p className="mt-8 max-w-text text-label-sm text-ink-mute">
            {market.priceNote}{' '}
            <Link href="/pricing" className="link-underline text-ink">
              What each plan includes
            </Link>
            .
          </p>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------ Disciplines */}
      <Section tone="alt">
        <SectionHeading
          index="02"
          eyebrow="Disciplines"
          title="What we actually do."
          meta={`${SERVICES.length} total`}
        />
        <IndexList className="mt-14">
          {SERVICES.map((service) => (
            <IndexRow
              key={service.title}
              index={service.index}
              title={service.title}
              body={service.body}
              href="/#services"
              action="Read"
            />
          ))}
        </IndexList>
      </Section>

      {/* --------------------------------------------------- Commitments */}
      <Section tone="paper">
        <SectionHeading
          index="03"
          eyebrow="How we work"
          title="Three commitments, meant literally."
        />
        <IndexList className="mt-14">
          {TERMS.map((term) => (
            <IndexRow
              key={term.index}
              index={term.index}
              title={term.title}
              body={term.body}
            />
          ))}
        </IndexList>
      </Section>

      {/* ------------------------------------------------------- Process */}
      <Section tone="alt">
        <SectionHeading
          index="04"
          eyebrow="Process"
          title="Four stages, start to handover."
          meta={`${PROCESS.length} stages`}
        />
        <IndexList className="mt-14">
          {PROCESS.map((step) => (
            <IndexRow
              key={step.step}
              index={step.step}
              title={step.title}
              body={step.body}
            />
          ))}
        </IndexList>
      </Section>

      {/* ---------------------------------------------------------- Team */}
      <Section tone="white">
        <SectionHeading index="05" eyebrow="Who you work with" title="The whole studio." />
        <div className="mt-12 grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </Section>

      {/* ----------------------------------------------------- Final CTA */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <GridField tone="paper" />
        <div className="relative container-max py-stack-lg text-center">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="font-display text-headline-lg-mobile font-normal md:text-display-lg">
              Start with a conversation.
            </h2>
            <p className="mx-auto mt-5 max-w-text text-body-lg text-paper/70">
              Tell us what the business does and what the site has to achieve.
              We quote a fixed price before anything begins.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={`mailto:${BRAND.email}?subject=${encodeURIComponent(
                  'New project enquiry'
                )}`}
                className="btn-on-dark"
              >
                Contact sales
              </a>
              <WhatsAppCta tone="on-dark" location="about-final-cta" />
              <Link
                href="/contact"
                className="label-caps inline-flex items-center justify-center gap-2 border border-paper/40 px-8 py-4 text-paper transition-colors duration-300 hover:border-paper"
              >
                All contact details
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
