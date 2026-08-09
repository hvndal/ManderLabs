import Link from 'next/link';
import Section, { SectionHeading } from '@/components/Section';
import Reveal from '@/components/Reveal';
import Statement from '@/components/Statement';
import Icon from '@/components/Icon';
import PricingInteractive from '@/components/PricingInteractive';
import GridField from '@/components/GridField';
import Faq from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import {
  CommunityRateSection,
  CommunityRateNote,
} from '@/components/CommunityRate';
import { TIERS, CARE_PLAN, FAQS, BRAND } from '@/lib/content';
import { faqSchema } from '@/lib/seo';

export const metadata = {
  title: 'Website Design Pricing — Plans from $249',
  description:
    'Plain, one-time website design pricing for small and mid-sized businesses across Canada and the U.S. Four tiers from $249, plus an optional Care Plan. No hidden fees.',
  alternates: {
    canonical: '/pricing',
  },
};

const COMPARISON = [
  { feature: 'Pages', values: ['1', 'Up to 5', '10+ / store', 'Unlimited'] },
  { feature: 'Copywriting support', values: [false, true, true, true] },
  { feature: 'On-page SEO', values: ['Basic', 'All pages', 'Advanced', 'Full strategy'] },
  { feature: 'Local search / GBP', values: [false, false, true, true] },
  { feature: 'Custom motion', values: [false, false, true, true] },
  { feature: 'CRM / booking integration', values: [false, false, true, true] },
  { feature: 'E-commerce', values: [false, false, true, true] },
  { feature: 'API integrations', values: [false, false, false, true] },
  { feature: 'Revision rounds', values: ['1', '2', 'Unlimited', 'Unlimited'] },
  { feature: 'Dedicated manager', values: [false, false, false, true] },
];

function Cell({ value }) {
  if (value === true) return <Icon name="check" className="mx-auto h-4 w-4 text-ink" strokeWidth={2} />;
  if (value === false) return <span className="text-line-strong">—</span>;
  return <span className="text-body-md text-ink-soft">{value}</span>;
}

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />

      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <GridField />
        <div className="relative container-max py-stack-md">
          <Reveal>
            <span className="eyebrow">Pricing</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="h-display max-w-[15ch]">Plain prices. No games.</h1>
          </Reveal>
          <Reveal delay={160} className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-text text-body-lg text-ink-soft">
              One-time build cost, quoted up front. Not sure which fits? The
              60-second quiz recommends a starting point.
            </p>
            <Link href="/quote" className="btn-primary shrink-0">
              Take the fit quiz
              <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- Tiers grid */}
      <section className="bg-paper-2">
        <div className="container-max py-stack-md">
          <Reveal>
            <PricingInteractive tiers={TIERS} />
          </Reveal>
          <Reveal delay={100}>
            {/* Same quiet door as the home page's pricing block */}
            <div className="mt-8 border-t border-line pt-8">
              <CommunityRateNote />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 text-label-sm text-ink-mute">
              Prices in USD; Canadian clients invoiced in CAD on request.
              One-time build cost unless otherwise agreed. Hosting &amp;
              maintenance available via the Care Plan.
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
        <SectionHeading eyebrow="Side by side" title="Compare every plan." align="center" />

        <Reveal className="mt-12">
          <div className="overflow-x-auto border border-line">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <caption className="sr-only">Feature comparison across the four MANDER plans</caption>
              <thead>
                <tr className="border-b border-line bg-paper">
                  <th scope="col" className="label-caps px-6 py-5 text-ink-mute">Feature</th>
                  {TIERS.map((tier) => (
                    <th
                      key={tier.name}
                      scope="col"
                      className={`px-6 py-5 text-center text-label-sm font-semibold ${tier.featured ? 'bg-ink text-paper' : 'text-ink'}`}
                    >
                      {tier.name}
                      <span className={`mt-1 block text-label-sm font-normal ${tier.featured ? 'text-paper/60' : 'text-ink-mute'}`}>
                        {tier.price}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature} className="border-b border-line last:border-0">
                    <th scope="row" className="px-6 py-4 text-body-md font-normal text-ink">
                      {row.feature}
                    </th>
                    {row.values.map((value, i) => (
                      <td
                        key={`${row.feature}-${i}`}
                        className={`px-6 py-4 text-center ${TIERS[i].featured ? 'bg-paper' : ''}`}
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

      {/* ------------------------------------------------------------ Care Plan */}
      <Section tone="alt">
        <SectionHeading
          eyebrow="Add-on"
          title="The Care Plan — $29/mo."
          body="Optional on every tier. Hosting, security, backups, and unlimited small edits so you never think about the site."
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {CARE_PLAN.map((item) => (
            <Reveal key={item.title} className="bg-paper-2">
              <div className="flex h-full flex-col p-6">
                <h3 className="text-headline-md text-ink">{item.title}</h3>
                <p className="mt-3 text-body-md text-ink-soft">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 flex justify-center">
            <a
              href={`mailto:${BRAND.email}?subject=${encodeURIComponent(
                'Care Plan enquiry'
              )}`}
              className="btn-primary"
            >
              Contact sales
            </a>
          </div>
        </Reveal>
      </Section>

      {/* ------------------------------------------------ Community Rate · 20% */}
      <CommunityRateSection />

      {/* ------------------------------------------------------------------ FAQ */}
      <Section tone="paper">
        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Questions" title="Pricing, answered." />
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <Faq items={FAQS} />
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
