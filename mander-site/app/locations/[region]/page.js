import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import GridField from '@/components/GridField';
import ProcessTimeline from '@/components/ProcessTimeline';
import Faq from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import Icon from '@/components/Icon';
import PageHeader from '@/components/PageHeader';
import { Spread } from '@/components/Editorial';
import { IndexList, IndexRow } from '@/components/Swiss';
import MarketProvider from '@/components/MarketProvider';
import WhatsAppCta from '@/components/WhatsAppCta';
import { REGIONS, getRegion } from '@/lib/locations';
import { SERVICES, PROCESS, WORK, BRAND } from '@/lib/content';
import { getMarket } from '@/lib/markets';
import { breadcrumbSchema, locationServiceSchema, faqSchema, OG_IMAGE, alternates } from '@/lib/seo';

// Static params only — one entry per region in lib/locations.js. Adding a
// state or province there is what adds a route here; this file doesn't
// change.
export function generateStaticParams() {
  return REGIONS.map((r) => ({ region: r.slug }));
}

// Unknown region slugs 404 instead of falling through to a server render —
// every URL this route answers for is one we actually wrote content for.
export const dynamicParams = false;

export function generateMetadata({ params }) {
  const region = getRegion(params.region);
  if (!region) return {};
  const path = `/locations/${region.slug}`;
  // Was a flat "Website Design in {region}" template — 33-42 characters
  // against a ~50-60 target, and it undersold Metro Vancouver specifically:
  // that region's own H1 is "Brand, digital and growth for Metro Vancouver",
  // broader positioning the generic title didn't carry. Using the H1 itself
  // (already written per-region, already accurate) fixes both at once.
  const title = region.h1.replace(/\.$/, '');
  return {
    title,
    description: region.metaDescription,
    alternates: alternates(path),
    openGraph: {
      title,
      description: region.metaDescription,
      url: path,
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: region.metaDescription,
      images: [OG_IMAGE.url],
    },
  };
}

export default function RegionPage({ params }) {
  const region = getRegion(params.region);
  if (!region) notFound();

  const path = `/locations/${region.slug}`;
  const trail = [
    { name: 'MANDER', href: '/' },
    { name: 'Locations', href: '/locations' },
    { name: region.name },
  ];
  const workCase = region.workRef ? WORK.find((w) => w.name === region.workRef) : null;
  // Market by URL, not by IP — see the note in lib/locations.js.
  const market = getMarket(region.market);
  const mailto = (subject) =>
    `mailto:${BRAND.email}?subject=${encodeURIComponent(subject)}`;

  // Sections below this line render in order and each consumes one index —
  // Proof only exists when there's a real client engagement in the region, so
  // the numbering has to be computed rather than hardcoded.
  let sectionIndex = 0;
  const nextIndex = () => String(++sectionIndex).padStart(2, '0');

  return (
    <MarketProvider market={market}>
      <JsonLd data={breadcrumbSchema(trail.map((t) => ({ name: t.name, path: t.href || path })))} />
      <JsonLd
        data={locationServiceSchema({
          path,
          areaName: region.name,
          areaType: region.country === 'CA' ? 'AdministrativeArea' : 'State',
          description: region.metaDescription,
          market,
        })}
      />
      <JsonLd data={faqSchema(region.faqs)} />

      {/* ---------------------------------------------------------------- Hero */}
      <PageHeader
        meta={[region.kicker, region.countryName, `${region.cities.length} markets`]}
        eyebrow={region.countryName}
        title={region.h1}
        trail={trail}
        media
        mediaCaption={`MANDER — serving ${region.name}.`}
        lede={
          <>
            {region.intro.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
            <p className="text-label-sm text-ink-mute">
              Fixed price, quoted in writing before anything starts — no hourly
              billing and no revised invoice at the end.
            </p>
          </>
        }
        actions={
          <>
            <a href={mailto(`${region.name} project enquiry`)} className="btn-primary">
              Contact sales
            </a>
            <WhatsAppCta tone="outline" location={`region-${region.slug}`} />
            <Link href="/quote" className="btn-outline">
              Get a quote
            </Link>
          </>
        }
      />

      {/* ------------------------------------------------------------ Industries */}
      <section className="border-t border-line bg-paper-2">
        <Spread index={nextIndex()} folio="Who we build for">
          <h2 className="h-display max-w-[14ch]">
            Industries in {region.name}.
          </h2>
          <Reveal delay={80} className="mt-8 flex flex-wrap gap-2">
            {region.industries.map((industry) => (
              <span
                key={industry}
                className="label-caps border-b border-line pb-1.5 text-ink-mute"
              >
                {industry}
              </span>
            ))}
          </Reveal>
        </Spread>
      </section>

      {/* ---------------------------------------------------------- Cities index */}
      {region.cities.length > 0 && (
        <section className="border-t border-line bg-paper">
          <Spread index={nextIndex()} folio="Markets we serve">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="h-display max-w-[14ch]">Major {region.name} markets.</h2>
              <span className="rail text-ink-mute">{region.cities.length} cities</span>
            </div>
            <IndexList className="mt-14">
              {region.cities.map((city, i) => (
                <IndexRow
                  key={city.slug}
                  index={String(i + 1).padStart(2, '0')}
                  title={city.name}
                  body={city.industries.slice(0, 2).join(' · ')}
                  href={`${path}/${city.slug}`}
                  delay={i * 50}
                />
              ))}
            </IndexList>
          </Spread>
        </section>
      )}

      {/* --------------------------------------------------------------- Proof */}
      {workCase && (
        <section className="border-t border-line bg-paper-2">
          <Spread index={nextIndex()} folio={`Recent work in ${region.name}`}>
            <Reveal>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-baseline md:gap-gutter">
                <h3 className="md:col-span-4 font-display text-headline-lg-mobile leading-none text-ink md:text-headline-md">
                  {workCase.name}
                </h3>
                <p className="md:col-span-6 max-w-text text-body-md text-ink-soft">
                  {workCase.body}
                </p>
                <span className="md:col-span-2 md:text-right font-display text-stat-md text-ink">
                  {workCase.result}
                </span>
              </div>
              <Link href="/work" className="link-underline label-caps mt-6 inline-flex text-ink">
                See more work
                <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
              </Link>
            </Reveal>
          </Spread>
        </section>
      )}

      {/* ---------------------------------------------------------------- Services */}
      <section className="border-t border-line bg-paper">
        <Spread index={nextIndex()} folio="What we build">
          <h2 className="h-display max-w-[14ch]">What we build in {region.name}.</h2>
          <Reveal delay={80} className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
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
        </Spread>
      </section>

      {/* ----------------------------------------------------------------- Process */}
      <section id="process" className="border-t border-line bg-paper-2">
        <Spread index={nextIndex()} folio="How it works">
          <h2 className="h-display max-w-[16ch]">The same process, wherever you are.</h2>
          <div className="mt-10">
            <ProcessTimeline steps={PROCESS} />
          </div>
        </Spread>
      </section>

      {/* ---------------------------------------------------------------------- FAQ */}
      <section className="border-t border-line bg-paper">
        <Spread index={nextIndex()} folio="Questions">
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="h-display max-w-[12ch]">{region.name}, answered.</h2>
            </div>
            <div className="lg:col-span-8">
              <Reveal>
                <Faq items={region.faqs} />
              </Reveal>
            </div>
          </div>
        </Spread>
      </section>

      {/* ------------------------------------------------------------------ Final CTA */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <GridField tone="paper" />
        <div className="relative container-max stack-y text-center">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="font-display text-headline-lg-mobile md:text-display-lg">
              Let&apos;s build something for {region.name}.
            </h2>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={mailto(`${region.name} project enquiry`)} className="btn-on-dark">
                Contact sales
              </a>
              <WhatsAppCta tone="on-dark" location={`region-${region.slug}-cta`} />
              <Link href="/quote" className="btn-outline-dark">
                Take the fit quiz
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </MarketProvider>
  );
}
