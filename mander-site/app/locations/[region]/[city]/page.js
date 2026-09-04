import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import GridField from '@/components/GridField';
import Breadcrumbs from '@/components/Breadcrumbs';
import Faq from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import Icon from '@/components/Icon';
import PageHeader from '@/components/PageHeader';
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
  const title = `Website Design in ${city.name}, ${region.abbr}`;
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
      <section className="bg-paper-2 py-stack-md">
        <div className="container-max">
          <Reveal>
            <span className="label-caps text-accent">Who we build for in {city.name}</span>
          </Reveal>
          <Reveal delay={80} className="mt-6 flex flex-wrap gap-2">
            {city.industries.map((industry) => (
              <span
                key={industry}
                className="label-caps border border-line bg-paper px-3 py-1.5 text-ink-mute"
              >
                {industry}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Services */}
      <section className="bg-paper py-stack-md">
        <div className="container-max">
          <Reveal>
            <span className="label-caps text-accent">What we build</span>
          </Reveal>
          <Reveal delay={80} className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
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
          <Reveal delay={120} className="mt-8">
            <Link href="/pricing" className="link-underline label-caps text-ink">
              See what each plan includes
              <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------------- FAQ */}
      <section className="bg-paper-2 py-stack-md">
        <div className="container-max">
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <span className="label-caps text-accent">Questions</span>
              <h2 className="mt-6 font-display text-headline-lg-mobile font-normal text-ink md:text-headline-lg">
                {city.name}, answered.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <Reveal>
                <Faq items={city.faqs} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- More in region */}
      <section className="bg-paper py-stack-md">
        <div className="container-max">
          <Reveal>
            <span className="label-caps text-accent">Also serving {region.name}</span>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
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
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------------ Final CTA */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <GridField tone="paper" />
        <div className="relative container-max py-stack-lg text-center">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="font-display text-headline-lg-mobile font-normal md:text-display-lg">
              Let&apos;s build something for {city.name}.
            </h2>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={mailto(`${city.name} project enquiry`)} className="btn-on-dark">
                Contact sales
              </a>
              <WhatsAppCta tone="on-dark" location={`city-${city.slug}-cta`} />
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
    </MarketProvider>
  );
}
