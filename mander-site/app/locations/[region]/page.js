import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import GridField from '@/components/GridField';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProcessTimeline from '@/components/ProcessTimeline';
import Faq from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import Icon from '@/components/Icon';
import { REGIONS, getRegion } from '@/lib/locations';
import { SERVICES, PROCESS, WORK, BRAND } from '@/lib/content';
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
  const title = `Website Design in ${region.name}`;
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
  const mailto = (subject) =>
    `mailto:${BRAND.email}?subject=${encodeURIComponent(subject)}`;

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail.map((t) => ({ name: t.name, path: t.href || path })))} />
      <JsonLd
        data={locationServiceSchema({
          path,
          areaName: region.name,
          areaType: region.country === 'CA' ? 'AdministrativeArea' : 'State',
          description: region.metaDescription,
        })}
      />
      <JsonLd data={faqSchema(region.faqs)} />

      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <GridField />
        <div className="relative container-max py-stack-md">
          <Breadcrumbs trail={trail} />
          <Reveal>
            <span className="eyebrow">{region.countryName}</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="h-display max-w-[16ch]">{region.h1}</h1>
          </Reveal>
          <Reveal delay={160} className="mt-8 max-w-text space-y-5 text-body-lg text-ink-soft">
            {region.intro.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </Reveal>
          <Reveal delay={220} className="mt-9 flex flex-wrap gap-3">
            <a href={mailto(`${region.name} project enquiry`)} className="btn-primary">
              Contact sales
            </a>
            <Link href="/pricing" className="btn-outline">
              See pricing
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------ Industries */}
      <section className="bg-paper-2 py-stack-md">
        <div className="container-max">
          <Reveal>
            <span className="label-caps text-accent">Who we build for</span>
          </Reveal>
          <Reveal delay={80} className="mt-6 flex flex-wrap gap-2">
            {region.industries.map((industry) => (
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

      {/* ----------------------------------------------------------- Cities grid */}
      {region.cities.length > 0 && (
        <section className="bg-paper py-stack-md">
          <div className="container-max">
            <Reveal>
              <span className="label-caps text-accent">Markets we serve</span>
              <h2 className="mt-6 max-w-[18ch] font-display text-headline-lg-mobile font-normal text-ink md:text-headline-lg">
                Major {region.name} markets.
              </h2>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {region.cities.map((city, i) => (
                <Reveal key={city.slug} delay={i * 60} className="bg-paper-2">
                  <Link
                    href={`${path}/${city.slug}`}
                    className="group flex h-full flex-col justify-between p-7 transition-colors hover:bg-paper"
                  >
                    <div>
                      <h3 className="text-headline-md font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
                        {city.name}
                      </h3>
                      <p className="mt-3 text-body-md text-ink-soft">
                        {city.industries.slice(0, 2).join(' · ')}
                      </p>
                    </div>
                    <span className="label-caps mt-8 inline-flex items-center gap-2 text-ink-mute transition-colors group-hover:text-accent">
                      View {city.name}
                      <Icon name="arrow" className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --------------------------------------------------------------- Proof */}
      {workCase && (
        <section className="bg-paper-2 py-stack-md">
          <div className="container-max">
            <Reveal>
              <span className="label-caps text-accent">Recent work in {region.name}</span>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12 md:items-baseline md:gap-gutter">
                <h3 className="md:col-span-4 text-headline-md font-semibold tracking-tight text-ink">
                  {workCase.name}
                </h3>
                <p className="md:col-span-6 max-w-text text-body-md text-ink-soft">
                  {workCase.body}
                </p>
                <span className="md:col-span-2 md:text-right font-display text-stat-md font-normal text-ink">
                  {workCase.result}
                </span>
              </div>
              <Link href="/#work" className="link-underline label-caps mt-6 inline-flex text-ink">
                See more work
                <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
              </Link>
            </Reveal>
          </div>
        </section>
      )}

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
        </div>
      </section>

      {/* ----------------------------------------------------------------- Process */}
      <section id="process" className="bg-paper-2 py-stack-md">
        <div className="container-max">
          <Reveal>
            <span className="label-caps text-accent">How it works</span>
            <h2 className="mt-6 max-w-[14ch] font-display text-headline-lg-mobile font-normal text-ink md:text-headline-lg">
              The same process, wherever you are.
            </h2>
          </Reveal>
          <div className="mt-10">
            <ProcessTimeline steps={PROCESS} />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------- FAQ */}
      <section className="bg-paper py-stack-md">
        <div className="container-max">
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <span className="label-caps text-accent">Questions</span>
              <h2 className="mt-6 font-display text-headline-lg-mobile font-normal text-ink md:text-headline-lg">
                {region.name}, answered.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <Reveal>
                <Faq items={region.faqs} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ Final CTA */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <GridField tone="paper" />
        <div className="relative container-max py-stack-lg text-center">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="font-display text-headline-lg-mobile font-normal md:text-display-lg">
              Let&apos;s build something for {region.name}.
            </h2>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={mailto(`${region.name} project enquiry`)} className="btn-on-dark">
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
