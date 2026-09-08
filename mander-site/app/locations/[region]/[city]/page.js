import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import GridField from '@/components/GridField';
import Faq from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import Icon from '@/components/Icon';
import PageHeader from '@/components/PageHeader';
import { Spread } from '@/components/Editorial';
import { IndexList, IndexRow } from '@/components/Swiss';
import MarketProvider from '@/components/MarketProvider';
import WhatsAppCta from '@/components/WhatsAppCta';
import { getCity, allCities } from '@/lib/locations';
import { SERVICES, BRAND } from '@/lib/content';
import { getMarket } from '@/lib/markets';
import { breadcrumbSchema, locationServiceSchema, faqSchema, OG_IMAGE, alternates } from '@/lib/seo';

// One entry per city across every region in lib/locations.js — adding a city
// there is what adds a route here.
export function generateStaticParams() {
  return allCities().map(({ region, city }) => ({ region: region.slug, city: city.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }) {
  const found = getCity(params.region, params.city);
  if (!found) return {};
  const { region, city } = found;
  const path = `/locations/${region.slug}/${city.slug}`;
  // Was "Website Design in {City}, {abbr}" — 35-42 characters against a
  // ~50-60 target, on every one of the 15 (now more) city pages. The added
  // clause is a real differentiator, not padding: fixed pricing quoted in
  // writing is the thing named in every one of these pages' own lede.
  const title = `Fixed-price website design in ${city.name}, ${region.abbr}`;
  return {
    title,
    description: city.metaDescription,
    alternates: alternates(path),
    openGraph: {
      title,
      description: city.metaDescription,
      url: path,
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: city.metaDescription,
      images: [OG_IMAGE.url],
    },
  };
}

export default function CityPage({ params }) {
  const found = getCity(params.region, params.city);
  if (!found) notFound();
  const { region, city } = found;

  // The page's market comes from the region, not from the visitor's IP: a
  // page about Mumbai quotes rupees to everyone, including the US-based
  // crawler that decides whether it can rank in India, and a page about
  // Boston quotes dollars to everyone. The provider makes the client
  // components below (the WhatsApp CTA) agree with the server ones.
  const market = getMarket(region.market);

  const regionPath = `/locations/${region.slug}`;
  const path = `${regionPath}/${city.slug}`;
  const trail = [
    { name: 'MANDER', href: '/' },
    { name: 'Locations', href: '/locations' },
    { name: region.name, href: regionPath },
    { name: city.name },
  ];
  const siblings = region.cities.filter((c) => c.slug !== city.slug);
  const mailto = (subject) =>
    `mailto:${BRAND.email}?subject=${encodeURIComponent(subject)}`;

  return (
    <MarketProvider market={market}>
      <JsonLd
        data={breadcrumbSchema(
          trail.map((t) => ({ name: t.name, path: t.href || path }))
        )}
      />
      <JsonLd
        data={locationServiceSchema({
          path,
          areaName: `${city.name}, ${region.abbr}`,
          areaType: 'City',
          description: city.metaDescription,
          market,
        })}
      />
      <JsonLd data={faqSchema(city.faqs)} />

      {/* ---------------------------------------------------------------- Hero */}
      <PageHeader
        meta={[city.name, `${region.name}, ${region.countryName}`, 'Remote studio']}
        eyebrow={`${region.name}, ${region.countryName}`}
        title={city.h1}
        trail={trail}
        media
        mediaSrc="/editorial/pacific-rain.jpg"
        mediaCaption={`MANDER — website design for ${city.name}.`}
        lede={
          <>
            <p>{city.intro}</p>
            <p className="text-label-sm text-ink-mute">
              Fixed price, quoted in writing before anything starts — no hourly
              billing and no revised invoice at the end.
            </p>
          </>
        }
        actions={
          <>
            <a href={mailto(`${city.name} project enquiry`)} className="btn-primary">
              Contact sales
            </a>
            <WhatsAppCta tone="outline" location={`city-${city.slug}`} />
            <Link href="/quote" className="btn-outline">
              Get a quote
            </Link>
          </>
        }
      />

      {/* ------------------------------------------------------------ Industries */}
      {/* The H2 used to read "Sectors." — identical, literal, crawlable text
          on every one of these pages, with the city name only ever appearing
          in the small eyebrow beside it. The city name is in the heading
          itself now. */}
      <section className="border-t border-line bg-paper">
        <Spread index="01" folio="Who we build for">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="h-display max-w-[14ch]">Who we build for in {city.name}.</h2>
            <span className="rail text-ink-mute">{city.industries.length} listed</span>
          </div>
          <div className="mt-14 grid grid-cols-1 border-l border-t border-line md:grid-cols-2">
            {city.industries.map((industry, i) => (
              <Reveal key={industry} delay={i * 50} className="border-b border-r border-line">
                <div className="flex items-baseline gap-5 px-4 py-6">
                  <span className="rail text-ink-mute">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-body-lg text-ink">{industry}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Spread>
      </section>

      {/* ---------------------------------------------------------------- Services */}
      <section className="border-t border-line bg-paper-2">
        <Spread index="02" folio="What we build">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="h-display max-w-[16ch]">What we build in {city.name}.</h2>
            <span className="rail text-ink-mute">{SERVICES.length} total</span>
          </div>
          <IndexList className="mt-14">
            {SERVICES.map((service, i) => (
              <IndexRow
                key={service.title}
                index={service.index}
                title={service.title}
                body={service.body}
                href="/#services"
                action="Read"
                delay={i * 40}
              />
            ))}
          </IndexList>
          <Reveal delay={120} className="mt-8">
            <Link href="/pricing" className="link-underline label-caps text-ink">
              See what each plan includes
              <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
            </Link>
          </Reveal>
        </Spread>
      </section>

      {/* ---------------------------------------------------------------------- FAQ */}
      <section className="border-t border-line bg-paper">
        <Spread index="03" folio="Questions">
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="h-display max-w-[12ch]">{city.name}, answered.</h2>
            </div>
            <div className="lg:col-span-8">
              <Reveal>
                <Faq items={city.faqs} />
              </Reveal>
            </div>
          </div>
        </Spread>
      </section>

      {/* ------------------------------------------------------- More in region */}
      <section className="border-t border-line bg-paper-2">
        <Spread index="04" folio={`Also serving ${region.name}`}>
          <h2 className="h-display max-w-[14ch]">More of {region.name}.</h2>
          <Reveal delay={80} className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <Link href={regionPath} className="link-underline text-body-lg text-ink">
              All of {region.name}
            </Link>
            {siblings.map((c) => (
              <Link
                key={c.slug}
                href={`${regionPath}/${c.slug}`}
                className="link-underline text-body-lg text-ink"
              >
                {c.name}
              </Link>
            ))}
          </Reveal>
        </Spread>
      </section>

      {/* ------------------------------------------------------------------ Final CTA */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <GridField tone="paper" />
        <div className="relative container-max stack-y text-center">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="font-display text-headline-lg-mobile md:text-display-lg">
              Let&apos;s build something for {city.name}.
            </h2>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={mailto(`${city.name} project enquiry`)} className="btn-on-dark">
                Contact sales
              </a>
              <WhatsAppCta tone="on-dark" location={`city-${city.slug}-cta`} />
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
