import Link from 'next/link';
import Reveal from '@/components/Reveal';
import GridField from '@/components/GridField';
import Icon from '@/components/Icon';
import TeamShowcase from '@/components/TeamShowcase';
import WhatsAppCta from '@/components/WhatsAppCta';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import { Spread } from '@/components/Editorial';
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
  // Trimmed to survive truncation: a description that runs past ~160
  // characters is cut mid-sentence in the result, which reads as carelessness
  // on the one page a stranger opens to judge whether you are careful.
  const description = `A small remote studio in Metro Vancouver: brand, digital and growth for small and growing businesses across ${market.region}.`;

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
        media
        mediaSrc="/editorial/interview-set.jpg"
        mediaCaption="MANDER — a small studio, deliberately."
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
      <Spread index="01" folio="What we sell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="h-display max-w-[16ch]">Plans, once and monthly.</h2>
          <span className="rail text-ink-mute">
            {buildTiers.length + (monthly?.length || 0)} plans
          </span>
        </div>
        <p className="mt-6 max-w-text text-body-md text-ink-soft">
          What the plans are, and what is billed once versus monthly. Every
          project is quoted in writing before it starts — ask and you get a
          real figure, not a range.
        </p>

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
      </Spread>

      {/* ------------------------------------------------------ Disciplines */}
      <section className="border-t border-line bg-paper-2">
        <Spread index="02" folio="Disciplines">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="h-display max-w-[14ch]">What we actually do.</h2>
            <span className="rail text-ink-mute">{SERVICES.length} total</span>
          </div>
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
        </Spread>
      </section>

      {/* --------------------------------------------------- Commitments */}
      <section className="border-t border-line bg-paper">
        <Spread index="03" folio="How we work">
          <h2 className="h-display max-w-[16ch]">Three commitments, meant literally.</h2>
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
        </Spread>
      </section>

      {/* ------------------------------------------------------- Process */}
      <section className="border-t border-line bg-paper-2">
        <Spread index="04" folio="Process">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="h-display max-w-[14ch]">Four stages, start to handover.</h2>
            <span className="rail text-ink-mute">{PROCESS.length} stages</span>
          </div>
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
        </Spread>
      </section>

      {/* ---------------------------------------------------------- Team */}
      {/* Same TeamShowcase as the homepage's team section — one team-display
          implementation, not a plain grid here and a showcase there.
          `.h-display` hardcodes text-ink (globals.css) and would be
          invisible on this bg-ink section, so the heading is spelled out
          manually instead, same as every other dark section on the site. */}
      <section className="border-t border-line border-b border-paper/10 bg-ink">
        <Spread index="05" folio="Who you work with" tone="dark">
          <h2 className="max-w-[12ch] font-display text-headline-lg-mobile leading-[0.98] text-paper md:text-display-lg">
            The whole studio.
          </h2>
          <TeamShowcase members={TEAM} />
        </Spread>
      </section>

      {/* ----------------------------------------------------- Final CTA */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <GridField tone="paper" />
        <div className="relative container-max stack-y text-center">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="font-display text-headline-lg-mobile md:text-display-lg">
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
