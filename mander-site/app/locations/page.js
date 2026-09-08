import Link from 'next/link';
import Reveal from '@/components/Reveal';
import GridField from '@/components/GridField';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import Icon from '@/components/Icon';
import { REGIONS } from '@/lib/locations';
import { BRAND } from '@/lib/content';
import { breadcrumbSchema, OG_IMAGE, alternates } from '@/lib/seo';

const TITLE = 'Metro Vancouver Web Design & Digital Practice';
const DESCRIPTION =
  'Architectural web design, Next.js engineering, and local search for businesses across Metro Vancouver, BC — Vancouver, Burnaby, Richmond, Surrey, North Vancouver, Langley, and the Tri-Cities.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: alternates('/locations'),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/locations',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

const trail = [{ name: 'MANDER', href: '/' }, { name: 'Locations' }];

export default function LocationsHubPage() {
  const bcRegion = REGIONS.find((r) => r.slug === 'british-columbia') || REGIONS[0];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(trail.map((t) => ({ name: t.name, path: t.href || '/locations' })))}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-line bg-paper">
        <GridField />
        <div className="relative container-max py-stack-md">
          <Breadcrumbs trail={trail} />
          <Reveal>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 bg-accent" />
              <span className="font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.22em] text-accent font-semibold">
                METRO VANCOUVER &middot; BRITISH COLUMBIA
              </span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="h-display max-w-[18ch]">
              Website design across Metro Vancouver.
            </h1>
          </Reveal>
          <Reveal delay={160} className="mt-8 max-w-text text-body-lg text-ink-soft">
            <p>
              MANDER is grounded in Metro Vancouver (Water Street, Gastown &amp; Langley). We
              architect bespoke websites and custom digital flagships for ambitious businesses,
              creative studios, and commercial enterprises across the Lower Mainland. Explore our
              municipal dossiers below to see how our engineering and art direction align with each
              local market.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Overarching Region Bar */}
      <section className="border-b border-line bg-paper-2 py-6">
        <div className="container-max flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-ink-mute">
            <span>PROVINCIAL DIRECTORY // <strong className="text-ink font-semibold">BRITISH COLUMBIA</strong></span>
            <span className="hidden sm:inline text-line-strong">|</span>
            <a
              href={BRAND.googleBusiness}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden sm:inline-flex items-center gap-1.5 text-ink-soft hover:text-accent transition-colors"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 inline-block" />
              <span>GOOGLE VERIFIED PROFILE ↗</span>
            </a>
          </div>
          <Link
            href="/locations/british-columbia"
            className="label-caps inline-flex items-center gap-2 text-accent transition-colors hover:text-ink"
          >
            View Regional British Columbia Dossier
            <Icon name="arrow" className="h-3.5 w-3.5" strokeWidth={2} />
          </Link>
        </div>
      </section>

      {/* Municipalities Grid */}
      <section className="bg-paper py-stack-md">
        <div className="container-max">
          <div className="mb-10 flex items-center justify-between border-b border-line pb-4">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft font-semibold">
              MUNICIPAL SERVICE ARCHITECTURE
            </h2>
            <span className="font-mono text-[10px] text-ink-mute tracking-widest">
              8 LOCAL CENTRES
            </span>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {bcRegion.cities.map((city, i) => (
              <Reveal key={city.slug} delay={i * 50} className="bg-paper">
                <Link
                  href={`/locations/british-columbia/${city.slug}`}
                  className="group flex h-full flex-col justify-between p-7 sm:p-8 transition-colors hover:bg-paper-2"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-ink-mute">
                      <span>0{i + 1} // BC</span>
                      <span className="text-accent group-hover:underline">VIEW &rarr;</span>
                    </div>
                    <h3 className="mt-4 text-headline-md font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
                      {city.name}
                    </h3>
                    <p className="mt-3 text-body-sm text-ink-soft line-clamp-3">
                      {city.metaDescription}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {city.industries.slice(0, 2).map((ind) => (
                        <span
                          key={ind}
                          className="bg-paper-2 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-ink-mute border border-line"
                        >
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="label-caps mt-8 inline-flex items-center gap-2 text-[10px] text-ink-mute transition-colors group-hover:text-accent">
                    Explore {city.name}
                    <Icon name="arrow" className="h-3 w-3" strokeWidth={2} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond Metro Vancouver Section */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <GridField tone="paper" />
        <div className="relative container-max py-stack-lg text-center">
          <Reveal className="mx-auto max-w-3xl">
            <span className="font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.25em] text-accent block font-semibold mb-4">
              REGIONAL &amp; REMOTE COLLABORATION
            </span>
            <h2 className="font-display text-headline-lg-mobile font-normal md:text-display-lg">
              Serving British Columbia &amp; beyond.
            </h2>
            <p className="mx-auto mt-5 max-w-text text-body-lg text-paper/70 font-light">
              While our studio practice is grounded in Metro Vancouver, we collaborate with
              ambitious founders and established companies across British Columbia, the Pacific
              Northwest, and beyond. Every project is delivered with identical architectural rigor.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={`mailto:${BRAND.email}?subject=${encodeURIComponent('Project inquiry — Metro Vancouver & Beyond')}`}
                className="btn-on-dark"
              >
                Contact our studio
              </a>
              <Link
                href="/#quote"
                className="label-caps inline-flex items-center justify-center gap-2 border border-paper/40 px-8 py-4 text-paper transition-colors duration-300 hover:border-paper"
              >
                Bespoke estimate builder
                <Icon name="arrow" className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
