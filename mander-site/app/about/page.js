import Link from 'next/link';
import Section, { SectionHeading } from '@/components/Section';
import Reveal from '@/components/Reveal';
import GridField from '@/components/GridField';
import Breadcrumbs from '@/components/Breadcrumbs';
import Icon from '@/components/Icon';
import TeamCard from '@/components/TeamCard';
import WhatsAppCta from '@/components/WhatsAppCta';
import JsonLd from '@/components/JsonLd';
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
  const entry = market.tiers[0];
  const description = `MANDER is a small remote design and development studio building fixed-price websites for small and growing businesses across ${market.region}. Builds from ${entry.fromLabel || entry.price}.`;

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

      <section className="relative overflow-hidden border-b border-line">
        <GridField />
        <div className="relative container-max py-stack-md">
          <Breadcrumbs trail={trail} />
          <Reveal>
            <span className="eyebrow">About</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="h-display max-w-[16ch]">
              A small studio that ships finished work.
            </h1>
          </Reveal>
          <Reveal delay={160} className="mt-8 max-w-text space-y-5 text-body-lg text-ink-soft">
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
          </Reveal>
          <Reveal delay={220} className="mt-9 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Contact us
              <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
            </Link>
            <WhatsAppCta tone="outline" location="about-page" />
            <Link href="/pricing" className="btn-outline">
              See full pricing
            </Link>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------- What we sell */}
      <section className="bg-paper-2 py-stack-md">
        <div className="container-max">
          <SectionHeading
            eyebrow="What we sell"
            title="Products and prices, in one place."
            body="The full breakdown lives on the pricing page. This is the summary — what the plans are, what they cost, and what is billed once versus monthly."
          />

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
            {buildTiers.map((tier) => (
              <Reveal key={tier.name} className="bg-paper">
                <div className="flex h-full flex-col p-8">
                  <span className="label-caps text-accent">One-time build</span>
                  <h3 className="mt-4 text-headline-md text-ink">{tier.name}</h3>
                  <p className="mt-2 text-stat-md text-ink">{tier.price}</p>
                  <p className="mt-4 text-body-md text-ink-soft">{tier.blurb}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {monthly && (
            <div className="mt-px grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
              {monthly.map((tier) => (
                <Reveal key={tier.name} className="bg-paper">
                  <div className="flex h-full flex-col p-8">
                    <span className="label-caps text-accent">Monthly, no lock-in</span>
                    <h3 className="mt-4 text-headline-md text-ink">{tier.name}</h3>
                    <p className="mt-2 text-stat-md text-ink">
                      {tier.fromLabel || tier.price}
                    </p>
                    <p className="mt-4 text-body-md text-ink-soft">{tier.blurb}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal delay={80}>
            <p className="mt-8 max-w-text text-label-sm text-ink-mute">
              {market.priceNote}{' '}
              <Link href="/pricing" className="link-underline text-ink">
                Full pricing and what each plan includes
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------ Services */}
      <Section tone="white">
        <SectionHeading eyebrow="Disciplines" title="What we actually do." />
        <Reveal className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {SERVICES.map((service) => (
            <Link
              key={service.title}
              href="/#services"
              className="link-underline text-body-lg text-ink"
            >
              {service.title}
            </Link>
          ))}
        </Reveal>
      </Section>

      {/* --------------------------------------------------- Commitments */}
      <Section tone="alt">
        <SectionHeading
          eyebrow="How we work"
          title="Three commitments, and we mean them literally."
        />
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
          {TERMS.map((term) => (
            <Reveal key={term.index} className="bg-paper-2">
              <div className="flex h-full flex-col p-8">
                <span className="label-caps text-ink-mute">{term.index}</span>
                <h3 className="mt-4 text-headline-md text-ink">{term.title}</h3>
                <p className="mt-4 text-body-md text-ink-soft">{term.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------- Process */}
      <Section tone="paper">
        <SectionHeading eyebrow="Process" title="Four stages, start to handover." />
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step) => (
            <Reveal key={step.step} className="bg-paper-2">
              <div className="flex h-full flex-col p-7">
                <span className="label-caps text-accent">{step.step}</span>
                <h3 className="mt-4 text-headline-md text-ink">{step.title}</h3>
                <p className="mt-3 text-body-md text-ink-soft">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------- Team */}
      <Section tone="white">
        <SectionHeading eyebrow="Who you work with" title="The whole studio." />
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
