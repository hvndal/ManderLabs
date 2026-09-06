import Link from 'next/link';
import Reveal from '@/components/Reveal';
import GridField from '@/components/GridField';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import Icon from '@/components/Icon';
import PageHeader from '@/components/PageHeader';
import Section, { SectionHeading } from '@/components/Section';
import { IndexList, IndexRow } from '@/components/Swiss';
import { REGIONS } from '@/lib/locations';
import { BRAND } from '@/lib/content';
import { breadcrumbSchema, OG_IMAGE, alternates } from '@/lib/seo';

const TITLE = 'Locations — Website Design in India, the U.S. & Canada';
const DESCRIPTION =
  'Remote website design across India, the United States and Canada — Mumbai, Delhi NCR, Bengaluru, Mohali, Boston, Vancouver and more. Fixed-price builds.';

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

// Grouped by country rather than listed flat, and — this is the part that
// matters — every group is rendered for every visitor. The hub is the crawl
// path into the city pages, and Googlebot crawls from the United States: if
// the Indian regions were hidden from non-Indian visitors the way the
// homepage's prices are, the Indian pages would have no internal links
// pointing at them and would effectively not exist to search.
const COUNTRY_ORDER = [
  { code: 'IN', name: 'India' },
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
];

const GROUPS = COUNTRY_ORDER.map((country) => ({
  ...country,
  regions: REGIONS.filter((region) => region.country === country.code),
})).filter((group) => group.regions.length > 0);

export default function LocationsHubPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema(trail.map((t) => ({ name: t.name, path: t.href || '/locations' })))}
      />

      <PageHeader
        meta={['Locations', 'India · U.S. · Canada', `${GROUPS.length} countries`]}
        eyebrow="Locations"
        title="Website design across India, the U.S. and Canada."
        trail={trail}
        lede={
          <p>
            MANDER works remotely with small and mid-sized businesses across
            India, the United States and Canada — the process doesn&apos;t
            change based on your address, and neither does the fixed-scope
            quote. These are the markets with dedicated local pages so far.
          </p>
        }
      />

      <Section tone="paper">
        {GROUPS.map((group, gi) => (
          <div key={group.code} className={gi > 0 ? 'mt-stack-md' : ''}>
            <SectionHeading
              index={String(gi + 1).padStart(2, '0')}
              eyebrow={group.name}
              title={`${group.regions.length} ${
                group.regions.length === 1 ? 'region' : 'regions'
              }.`}
              meta={`${group.regions.reduce(
                (n, r) => n + r.cities.length,
                0
              )} cities`}
            />

            <IndexList className="mt-14">
              {group.regions.map((region, i) => (
                <IndexRow
                  key={region.slug}
                  index={String(i + 1).padStart(2, '0')}
                  title={region.name}
                  body={region.cities.map((c) => c.name).join(', ')}
                  meta={`${region.cities.length} cities`}
                  href={`/locations/${region.slug}`}
                  delay={i * 50}
                />
              ))}
            </IndexList>
          </div>
        ))}
      </Section>

      <section className="relative overflow-hidden bg-ink text-paper">
        <GridField tone="paper" />
        <div className="relative container-max py-stack-lg text-center">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="font-display text-headline-lg-mobile font-normal md:text-display-lg">
              Don&apos;t see your market listed?
            </h2>
            <p className="mx-auto mt-5 max-w-text text-body-lg text-paper/70">
              We build for businesses anywhere in India, the U.S. and Canada —
              get in touch and we&apos;ll treat it exactly the same.
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
