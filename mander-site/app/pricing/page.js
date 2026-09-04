import Link from 'next/link';
import Section, { SectionHeading } from '@/components/Section';
import Reveal from '@/components/Reveal';
import Statement from '@/components/Statement';
import Icon from '@/components/Icon';
import PricingInteractive from '@/components/PricingInteractive';
import PageHeader from '@/components/PageHeader';
import AppPricing from '@/components/AppPricing';
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

      {/* --------------------------------------------------------- Tiers grid */}
      <section className="bg-paper-2">
        <div className="container-max py-stack-md">
          <Reveal>
            <PricingInteractive tiers={tiers} />
          </Reveal>
          {/* Apps sit below the websites, folded shut, because the page is
              read top-down and the $899 Growth plan has to be the decision
              that gets made first. */}
          <Reveal delay={60} className="mt-6">
            <AppPricing />
          </Reveal>
          <Reveal delay={100}>
            {/* Same quiet door as the home page's pricing block */}
            <div className="mt-8 border-t border-line pt-8">
              <CommunityRateNote />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 text-label-sm text-ink-mute">
              {market.priceNote}
            </p>
          </Reveal>
        </div>
      </section>

      <Statement
        eyebrow="On price"
        text="Fixed scope, fixed price, agreed before we design a single pixel."
        tone="paper"
      />

      {/* ----------------------------------------------------- Comparison table */}
      <Section tone="white">
        <SectionHeading
          index="02"
          eyebrow="Side by side"
          title="Compare every plan."
        />

        <Reveal className="mt-12">
          <div className="overflow-x-auto border border-line">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <caption className="sr-only">Feature comparison across the four MANDER plans</caption>
              <thead>
                <tr className="border-b border-line bg-paper">
                  <th scope="col" className="label-caps px-6 py-5 text-ink-mute">Feature</th>
                  {tiers.map((tier) => (
                    <th
                      key={tier.name}
                      scope="col"
                      className={`px-6 py-5 text-center text-label-sm font-semibold ${tier.featured ? 'bg-ink text-paper' : 'text-ink'}`}
                    >
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature} className="border-b border-line last:border-0">
                    <th scope="row" className="px-6 py-4 text-body-md font-normal text-ink">
                      {row.feature}
                    </th>
                    {row.values.map((value, i) => (
                      <td
                        key={`${row.feature}-${i}`}
                        className={`px-6 py-4 text-center ${tiers[i]?.featured ? 'bg-paper' : ''}`}
                      >
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

      {/* ------------------------------------------------- Ongoing / Care Plan */}
      {/* Two shapes of the same idea. The US sells one care plan at one price
          with a feature grid; India sells two monthly plans, which are tiers
          and therefore render through the same card component as the builds
          above rather than through a second pattern. */}
      <Section tone="alt">
        {market.monthlyTiers ? (
          <>
            <SectionHeading
              index="03"
              eyebrow="Ongoing"
              title="Keep it growing."
              body={market.monthlyBody}
              align="center"
            />
            <Reveal className="mt-12">
              <PricingInteractive tiers={market.monthlyTiers} />
            </Reveal>
          </>
        ) : (
          <>
            <SectionHeading
              index="03"
              eyebrow="Add-on"
              title="The Care Plan."
              body={market.carePlanBody}
              align="center"
            />

            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
              {market.carePlan.map((item) => (
                <Reveal key={item.title} className="bg-paper-2">
                  <div className="flex h-full flex-col p-6">
                    <h3 className="text-headline-md text-ink">{item.title}</h3>
                    <p className="mt-3 text-body-md text-ink-soft">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </>
        )}

        <Reveal delay={120}>
          <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={`mailto:${BRAND.email}?subject=${encodeURIComponent(
                market.monthlyTiers ? 'Monthly plan enquiry' : 'Care Plan enquiry'
              )}`}
              className="btn-primary"
            >
              Contact sales
            </a>
            <WhatsAppCta tone="outline" location="pricing-care" />
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
