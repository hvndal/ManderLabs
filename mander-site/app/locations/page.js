import Link from 'next/link';
import Reveal from '@/components/Reveal';
import GridField from '@/components/GridField';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import Icon from '@/components/Icon';
import { REGIONS } from '@/lib/locations';
import { BRAND } from '@/lib/content';
import { breadcrumbSchema } from '@/lib/seo';

export const metadata = {
  title: 'Locations — Website Design Across the U.S. & Canada',
  description:
    'MANDER builds websites for small and mid-sized businesses across the United States and Canada, remotely. Featured markets: Massachusetts, Rhode Island and British Columbia.',
  alternates: { canonical: '/locations' },
  openGraph: {
    title: 'Locations — Website Design Across the U.S. & Canada',
    description:
      'MANDER builds websites for small and mid-sized businesses across the United States and Canada, remotely.',
    url: '/locations',
    type: 'website',
  },
};

const trail = [{ name: 'MANDER', href: '/' }, { name: 'Locations' }];

export default function LocationsHubPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema(trail.map((t) => ({ name: t.name, path: t.href || '/locations' })))}
      />

      <section className="relative overflow-hidden border-b border-line">
        <GridField />
        <div className="relative container-max py-stack-md">
          <Breadcrumbs trail={trail} />
          <Reveal>
            <span className="eyebrow">Locations</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="h-display max-w-[16ch]">
              Website design across the U.S. and Canada.
            </h1>
          </Reveal>
          <Reveal delay={160} className="mt-8 max-w-text text-body-lg text-ink-soft">
            <p>
              MANDER works remotely with small and mid-sized businesses
              anywhere in the United States and Canada — the process doesn&apos;t
              change based on your address. These are the markets we&apos;re
              currently building out dedicated local pages for, starting with
              the ones closest to our own team.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-2 py-stack-md">
        <div className="container-max">
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {REGIONS.map((region, i) => (
              <Reveal key={region.slug} delay={i * 70} className="bg-paper">
                <Link
                  href={`/locations/${region.slug}`}
                  className="group flex h-full flex-col justify-between p-8 transition-colors hover:bg-paper-2"
                >
                  <div>
                    <span className="label-caps text-accent">{region.countryName}</span>
                    <h2 className="mt-4 text-headline-md font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
                      {region.name}
                    </h2>
                    <p className="mt-4 text-body-md text-ink-soft">
                      {region.cities.map((c) => c.name).join(', ')}
                    </p>
                  </div>
                  <span className="label-caps mt-10 inline-flex items-center gap-2 text-ink-mute transition-colors group-hover:text-accent">
                    View {region.name}
                    <Icon name="arrow" className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink text-paper">
        <GridField tone="paper" />
        <div className="relative container-max py-stack-lg text-center">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="font-display text-headline-lg-mobile font-normal md:text-display-lg">
              Don&apos;t see your market listed?
            </h2>
            <p className="mx-auto mt-5 max-w-text text-body-lg text-paper/70">
              We build for businesses anywhere in the U.S. and Canada — get in
              touch and we&apos;ll treat it exactly the same.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={`mailto:${BRAND.email}?subject=${encodeURIComponent('New project enquiry')}`}
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
