import Link from 'next/link';
import Section, { SectionHeading } from '@/components/Section';
import Reveal from '@/components/Reveal';
import Statement from '@/components/Statement';
import Icon from '@/components/Icon';
import PageHeader from '@/components/PageHeader';
import { IndexList, IndexRow, FieldNote } from '@/components/Swiss';
import GridField from '@/components/GridField';
import Faq from '@/components/Faq';
import ContactForm from '@/components/ContactForm';
import JsonLd from '@/components/JsonLd';
import {
  CommunityRateSection,
  CommunityRateNote,
} from '@/components/CommunityRate';
import WhatsAppCta from '@/components/WhatsAppCta';
import { BRAND } from '@/lib/content';
import { getServerMarket } from '@/lib/market-server';
import { faqSchema, OG_IMAGE, alternates } from '@/lib/seo';

export async function generateMetadata() {
  const { pricing } = getServerMarket().meta;

  return {
    title: pricing.title,
    description: pricing.description,
    // Same URL for both markets, so the canonical does not move — see the
    // note in app/layout.js.
    alternates: alternates('/pricing'),
    openGraph: {
      title: pricing.title,
      description: pricing.description,
      url: '/pricing',
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: pricing.title,
      description: pricing.description,
      images: [OG_IMAGE.url],
    },
  };
}

// The comparison table's rows are positional — one value per tier — so they
// live with the tiers in lib/markets/<id>.js rather than here. The US table
// is the same thirteen rows it always was; India's has its own, because it
// sells two plans rather than four.
function Cell({ value }) {
  if (value === true) return <Icon name="check" className="mx-auto h-4 w-4 text-ink" strokeWidth={2} />;
  if (value === false) return <span className="text-line-strong">—</span>;
  return <span className="text-body-md text-ink-soft">{value}</span>;
}

export default function PricingPage() {
  const market = getServerMarket();
  const { tiers, comparison } = market;

  return (
    <>
      <JsonLd data={faqSchema(market.faqs)} />

      {/* ---------------------------------------------------------------- Hero */}
      <PageHeader
        meta={['Plans', market.region, 'Fixed scope']}
        eyebrow="Plans"
        title="Fixed scope. Fixed price."
        lede={
          <p>
            Every plan is quoted in writing before a pixel is drawn, and the
            number you approve is the number you pay. The 60-second quiz
            recommends a starting point and comes back with a real figure.
          </p>
        }
        actions={
          <>
            <Link href="/quote" className="btn-primary">
              Get a quote
              <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
            </Link>
            <WhatsAppCta tone="outline" location="pricing-hero" />
          </>
        }
      />

      {/* ------------------------------------------------------- Plan index */}
      {/* Was four interactive cards in a row, then a second folded card panel
          for apps. Both are gone. A plan is a row now: number in the margin,
          name in the field, what it is beside it, scope at the right — and
          the detail lives under it as spec rows on the same twelve columns
          rather than inside a box with its own padding. Nothing here has a
          border on four sides. */}
      <Section tone="paper">
        <SectionHeading
          index="01"
          eyebrow="Websites"
          title="Four plans."
          meta={`${tiers.length} total`}
        />

        <IndexList className="mt-14">
          {tiers.map((tier, i) => (
            <IndexRow
              key={tier.name}
              index={String(i + 1).padStart(2, '0')}
              title={tier.name}
              body={tier.blurb}
              meta={tier.featured ? 'Most chosen' : tier.specs?.pages}
              href="/quote"
              action="Quote"
              delay={i * 60}
            />
          ))}
        </IndexList>

        {/* Android, on the same grid rather than behind a disclosure. */}
        <div className="mt-stack-md">
          <SectionHeading
            index="02"
            eyebrow="Android"
            title="Three app builds."
            meta={`${market.appTiers.length} total`}
          />
          <IndexList className="mt-14">
            {market.appTiers.map((tier, i) => (
              <IndexRow
                key={tier.name}
                index={String(i + 1).padStart(2, '0')}
                title={tier.name}
                body={tier.blurb}
                meta={Array.isArray(tier.specs) ? tier.specs[0][1] : undefined}
                href="/quote"
                action="Quote"
                delay={i * 60}
              />
            ))}
          </IndexList>
          <FieldNote className="mt-6">
            Play Store developer account and third-party service fees are
            billed to you directly at cost.
          </FieldNote>
        </div>

        <Reveal delay={100}>
          <div className="mt-10 border-t border-line pt-8">
            <CommunityRateNote />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-8 max-w-text text-label-sm text-ink-mute">
            {market.priceNote}
          </p>
        </Reveal>
      </Section>

      {/* ------------------------------------------------- Ongoing / Care Plan */}
      {/* Same object as everything above: rows on the same twelve columns.
          India sells two monthly plans and North America one care plan with a
          feature list — both are lists, so both are rendered as one. */}
      <Section tone="alt">
        <SectionHeading
          index="03"
          eyebrow={market.monthlyTiers ? 'Ongoing' : 'Add-on'}
          title={market.monthlyTiers ? 'Keep it growing.' : 'The Care Plan.'}
          body={market.monthlyTiers ? market.monthlyBody : market.carePlanBody}
        />

        <IndexList className="mt-14">
          {market.monthlyTiers
            ? market.monthlyTiers.map((tier, i) => (
                <IndexRow
                  key={tier.name}
                  index={String(i + 1).padStart(2, '0')}
                  title={tier.name}
                  body={tier.blurb}
                  meta="Month to month"
                  href="/quote"
                  action="Quote"
                  delay={i * 60}
                />
              ))
            : market.carePlan.map((item, i) => (
                <IndexRow
                  key={item.title}
                  index={String(i + 1).padStart(2, '0')}
                  title={item.title}
                  body={item.body}
                  delay={i * 50}
                />
              ))}
        </IndexList>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/quote" className="btn-primary">
              Get a quote
              <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
            </Link>
            <a
              href={`mailto:${BRAND.email}?subject=${encodeURIComponent(
                market.monthlyTiers ? 'Monthly plan enquiry' : 'Care Plan enquiry'
              )}`}
              className="btn-outline"
            >
              Contact sales
            </a>
            <WhatsAppCta tone="outline" location="pricing-care" />
          </div>
        </Reveal>
      </Section>

      {/* ------------------------------------------------- Specification table */}
      {/* The comparison table, rebuilt as a specification sheet: mono column
          heads, hairline rules, no fills, no rounded corners, no zebra
          striping. A table is the one card-free object the old page already
          had — it just needed to stop looking like a UI component and start
          looking like a printed spec. */}
      <Section tone="paper">
        <SectionHeading
          index="04"
          eyebrow="Specification"
          title="Line by line."
          meta={`${comparison.length} rows`}
        />

        <Reveal className="mt-14">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">
                Feature comparison across the MANDER plans
              </caption>
              <thead>
                <tr className="border-y border-ink">
                  <th
                    scope="col"
                    className="py-4 pr-6 font-mono text-[10px] font-normal uppercase tracking-[0.22em] text-ink-mute"
                  >
                    Feature
                  </th>
                  {tiers.map((tier) => (
                    <th
                      key={tier.name}
                      scope="col"
                      className="px-4 py-4 text-center font-mono text-[10px] font-normal uppercase tracking-[0.18em] text-ink"
                    >
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature} className="border-b border-line">
                    <th
                      scope="row"
                      className="py-4 pr-6 text-body-md font-normal text-ink"
                    >
                      {row.feature}
                    </th>
                    {row.values.map((value, i) => (
                      <td key={`${row.feature}-${i}`} className="px-4 py-4 text-center">
                        <Cell value={value} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Section>

      {/* ------------------------------------------------ Community Rate · 20% */}
      <CommunityRateSection />

      {/* ------------------------------------------------------------------ FAQ */}
      <Section tone="paper">
        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading index="04" eyebrow="Questions" title="Answered." />
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <Faq items={market.faqs} />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------------------- Contact */}
      <Section id="contact" tone="white">
        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              index="05"
              eyebrow="Get in touch"
              title="Ready when you are."
              body="Tell us which plan fits and what you're building. We reply within one business day."
            />
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------ Final CTA */}
      <section className="bg-ink text-paper">
        <div className="container-max py-stack-lg text-center">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="font-display text-headline-lg-mobile font-normal md:text-display-lg">
              Find your fit in 60 seconds.
            </h2>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={`mailto:${BRAND.email}?subject=${encodeURIComponent(
                  'Pricing enquiry'
                )}`}
                className="btn-on-dark"
              >
                Contact sales
              </a>
              <WhatsAppCta tone="on-dark" location="pricing-final-cta" />
              <Link
                href="/quote"
                className="label-caps inline-flex items-center justify-center gap-2 border border-paper/40 px-8 py-4 text-paper transition-colors duration-300 hover:border-paper"
              >
                Take the fit quiz
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
