import Link from 'next/link';
import Reveal from '@/components/Reveal';
import GridField from '@/components/GridField';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import { Spread } from '@/components/Editorial';
import { IndexList, IndexRow } from '@/components/Swiss';
import { REGIONS } from '@/lib/locations';
import { BRAND } from '@/lib/content';
import { breadcrumbSchema, OG_IMAGE, alternates } from '@/lib/seo';

const TITLE = 'Locations — Metro Vancouver';
const DESCRIPTION =
  'Brand, web design and local SEO for Metro Vancouver — Vancouver, Burnaby, Richmond, Surrey and more. Fixed-price, quoted in writing.';

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
// path into the city pages, and Googlebot crawls from the United States, so
// nothing here is gated by IP the way the homepage's prices are.
//
// India has no entry: it's an IP-resolved market experience only (rupee
// pricing, WhatsApp), never a set of indexed city pages — see
// lib/markets/location-markets.js. This page used to advertise India
// location pages that didn't exist; don't reintroduce that.
//
// US is not listed either, for the same reason: Massachusetts and Rhode
// Island were retired as marketed local-SEO regions (Metro Vancouver is the
// one dedicated region now), so there is currently no US entry in REGIONS
// for this to group. The `.filter` below already drops any country with
// zero regions automatically — this array just doesn't list one that isn't
// there. Add it back the moment a real US region exists again.
const COUNTRY_ORDER = [{ code: 'CA', name: 'Canada' }];

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
        meta={['Locations', 'Metro Vancouver', 'Remote across US & CA']}
        eyebrow="Locations"
        title="Brand, digital and growth for Metro Vancouver."
        trail={trail}
        media
        mediaSrc="/editorial/urban-aerial.jpg"
        mediaCaption="MANDER — remote studio, wherever you are."
        lede={
          <>
            <p>
              Metro Vancouver is where MANDER is based and the one region with
              dedicated local pages. We also take on remote work for small and
              mid-sized businesses anywhere in the United States and Canada —
              the process and the fixed-scope quote don&apos;t change based on
              your address — it just isn&apos;t marketed city by city outside
              Vancouver.
            </p>
            {/* Massachusetts is named because it is true twice over — three
                of the six people work out of Maynard, and the Waste Universe
                build was delivered across Massachusetts and Rhode Island —
                and it is said plainly that there is no page behind it, which
                is the honest version of a presence without a page. */}
            <p>
              New England is not an abstraction here either: part of the team
              works out of Maynard, Massachusetts, and the waste-management
              rebuild in our portfolio was delivered across Massachusetts and
              Rhode Island. There are no per-city pages for those states —
              there is a team, a client and a phone that answers.
            </p>
          </>
        }
      />

      {GROUPS.map((group, gi) => (
        <section
          key={group.code}
          className={`${gi > 0 ? 'border-t border-line' : ''} ${gi % 2 === 0 ? 'bg-paper' : 'bg-paper-2'}`}
        >
          <Spread index={String(gi + 1).padStart(2, '0')} folio={group.name}>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="h-display max-w-[12ch]">
                {group.regions.length} {group.regions.length === 1 ? 'region' : 'regions'}.
              </h2>
              <span className="rail text-ink-mute">
                {group.regions.reduce((n, r) => n + r.cities.length, 0)} cities
              </span>
            </div>

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
          </Spread>
        </section>
      ))}

      <section className="relative overflow-hidden bg-ink text-paper">
        <GridField tone="paper" />
        <div className="relative container-max stack-y text-center">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="font-display text-headline-lg-mobile md:text-display-lg">
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
              <Link href="/quote" className="btn-outline-dark">
                Take the fit quiz
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
