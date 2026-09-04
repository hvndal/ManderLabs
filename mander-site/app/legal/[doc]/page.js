import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import GridField from '@/components/GridField';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import { LEGAL_NAV, LEGAL_UPDATED, legalDocs, getLegalDoc } from '@/lib/legal';
import { getServerMarket } from '@/lib/market-server';
import { BRAND } from '@/lib/content';
import { breadcrumbSchema, OG_IMAGE, alternates } from '@/lib/seo';

// One route renders all four policies from lib/legal.js. Adding a policy is
// adding an object there — no new route, no new markup.
export function generateStaticParams() {
  return LEGAL_NAV.map((d) => ({ doc: d.slug }));
}

export const dynamicParams = false;

// Section headings double as anchor targets for the contents list.
// A heading that opens with a number — '$500 to $900' — yields an id that
// starts with a digit. That is legal HTML and native fragment jumps honour it,
// but it is not a valid CSS identifier, so any querySelector('#' + id) throws.
// Prefixing only that case keeps every other anchor clean and readable.
const anchor = (h) => {
  const slug = h.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return /^[0-9]/.test(slug) ? `s-${slug}` : slug;
};

export function generateMetadata({ params }) {
  const doc = getLegalDoc(params.doc, getServerMarket());
  if (!doc) return {};
  const path = `/legal/${doc.slug}`;
  return {
    title: doc.title,
    description: doc.description,
    alternates: alternates(path),
    openGraph: {
      title: `${doc.title} | MANDER`,
      description: doc.description,
      url: path,
      type: 'article',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${doc.title} | MANDER`,
      description: doc.description,
      images: [OG_IMAGE.url],
    },
  };
}

export default function LegalPage({ params }) {
  // Policies are rendered for the visitor's market: a refund policy that
  // quotes the wrong currency, or a contact block with a number the reader
  // cannot dial, is not a policy anyone can rely on.
  const docs = legalDocs(getServerMarket());
  const doc = docs.find((d) => d.slug === params.doc);
  if (!doc) notFound();

  const path = `/legal/${doc.slug}`;
  const trail = [{ name: 'MANDER', href: '/' }, { name: doc.title }];
  const others = docs.filter((d) => d.slug !== doc.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(trail.map((t) => ({ name: t.name, path: t.href || path })))}
      />

      {/* ---------------------------------------------------------------- Hero */}
      <PageHeader
        meta={['Legal', doc.title, `Updated ${LEGAL_UPDATED}`]}
        eyebrow="Legal"
        title={doc.title}
        trail={trail}
        lede={<p>{doc.lede}</p>}
      />

      {/* ------------------------------------------------------------- Document */}
      <section className="bg-paper py-stack-md">
        <div className="container-max">
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-16">
            {/* Contents — sticky on desktop, a plain list on phones */}
            <nav aria-label="On this page" className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <span className="label-caps text-accent">On this page</span>
                <ol className="mt-6 flex flex-col gap-2.5 border-l border-line pl-5">
                  {doc.sections.map((s) => (
                    <li key={s.h}>
                      <a
                        href={`#${anchor(s.h)}`}
                        className="text-body-md text-ink-soft transition-colors hover:text-accent"
                      >
                        {s.h}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            <div className="lg:col-span-8">
              {doc.sections.map((s) => (
                <Reveal key={s.h} className="mb-14 last:mb-0">
                  {/* id sits on the heading, not the Reveal — Reveal doesn't
                      forward arbitrary props, so an id passed to it vanishes
                      and every contents link silently does nothing. */}
                  <h2
                    id={anchor(s.h)}
                    className="scroll-mt-28 text-headline-md font-semibold tracking-tight text-ink"
                  >
                    {s.h}
                  </h2>
                  {/* Index keys on purpose: these lists are static content
                      that never reorders, and a text-slice key collides —
                      several clauses legitimately open with the same phrase
                      ("To the maximum extent permitted ..."), which React
                      reports as duplicate keys. */}
                  {s.p?.map((para, pi) => (
                    <p key={pi} className="mt-5 max-w-text text-body-md text-ink-soft">
                      {para}
                    </p>
                  ))}
                  {s.ul && (
                    <ul className="mt-6 flex max-w-text flex-col divide-y divide-line border-y border-line">
                      {s.ul.map((item, li) => (
                        <li key={li} className="py-3.5 text-body-md text-ink-soft">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Other docs */}
      <section className="bg-paper-2 py-stack-md">
        <div className="container-max">
          <Reveal>
            <span className="label-caps text-accent">Also in legal</span>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {others.map((d) => (
                <Link
                  key={d.slug}
                  href={`/legal/${d.slug}`}
                  className="link-underline text-body-lg text-ink"
                >
                  {d.title}
                </Link>
              ))}
            </div>
            <p className="mt-8 max-w-text text-body-md text-ink-soft">
              Something here unclear, or you need it in writing for your own
              records? Email{' '}
              <a href={`mailto:${BRAND.email}`} className="link-underline text-ink">
                {BRAND.email}
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
