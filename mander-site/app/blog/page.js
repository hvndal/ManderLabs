import Link from 'next/link';
import Reveal from '@/components/Reveal';
import GridField from '@/components/GridField';
import PageHeader from '@/components/PageHeader';
import { IndexList, IndexRow } from '@/components/Swiss';
import Icon from '@/components/Icon';
import { POSTS_BY_DATE } from '@/lib/blog';
import { BRAND } from '@/lib/content';
import { OG_IMAGE, alternates } from '@/lib/seo';

const TITLE = 'Journal — Website Costs, Local SEO & Small Business Advice';
const DESCRIPTION =
  'Plain writing on what small-business websites cost, how local search actually works, and when an app is worth building.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: alternates('/blog'),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/blog',
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

const readable = (iso) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

export default function BlogIndex() {
  const [lead, ...rest] = POSTS_BY_DATE;

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <PageHeader
        meta={['Journal', 'Notes from the studio', 'Updated occasionally']}
        eyebrow="Journal"
        title="Straight answers, written down."
        lede={
          <p>
            Most of what gets written about small-business websites is either a
            sales pitch or a list of forty tips with no ranking. These are the
            answers we give clients on the phone, with the numbers left in.
          </p>
        }
      />

      {/* ------------------------------------------------------------ Lead post */}
      <section className="bg-paper-2">
        <div className="container-max py-stack-md">
          <Reveal>
            <Link
              href={`/blog/${lead.slug}`}
              className="group flex flex-col gap-6 border border-line bg-white p-7 transition-colors duration-500 ease-premium hover:border-line-strong md:p-10"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="label-caps bg-accent px-2 py-1 text-[10px] text-on-accent">
                  Latest
                </span>
                <span className="label-caps text-ink-mute">{lead.tag}</span>
                <span className="label-caps text-ink-mute">{lead.readingTime}</span>
              </div>

              <h2 className="max-w-[20ch] font-display text-headline-lg-mobile font-normal text-ink transition-colors duration-300 group-hover:text-accent md:text-headline-lg">
                {lead.title}
              </h2>

              <p className="max-w-text text-body-lg text-ink-soft">{lead.lede}</p>

              <span className="mt-2 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-6 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-premium group-hover:scale-x-100"
                />
                <span className="label-caps text-ink transition-all duration-500 ease-premium group-hover:translate-x-1 group-hover:text-accent">
                  Read it
                </span>
              </span>
            </Link>
          </Reveal>

          {/* ------------------------------------------------------ The rest */}
          {/* Cards became rows: number, title, lede, reading time. An archive
              is a list, and a list of two-column boxes was the least
              editorial thing on the site. */}
          {rest.length > 0 && (
            <IndexList className="mt-10">
              {rest.map((post, i) => (
                <IndexRow
                  key={post.slug}
                  index={String(i + 2).padStart(2, '0')}
                  title={post.title}
                  body={post.lede}
                  meta={post.readingTime}
                  href={`/blog/${post.slug}`}
                  action="Read"
                  delay={i * 60}
                />
              ))}
            </IndexList>
          )}

          <Reveal delay={120}>
            <p className="mt-8 text-label-sm text-ink-mute">
              Written by the people who do the work. Questions we have not
              answered here go to{' '}
              <a
                href={`mailto:${BRAND.email}`}
                className="underline underline-offset-4 hover:text-ink"
              >
                {BRAND.email}
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------ Final CTA */}
      <section className="bg-ink text-paper">
        <div className="container-max py-stack-lg text-center">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="font-display text-headline-lg-mobile font-normal md:text-display-lg">
              Rather just get a number?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-body-lg text-paper/70">
              Skip the reading — the 60-second quiz recommends a
              starting point without asking for your email.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/pricing" className="btn-on-dark">
                See pricing
              </Link>
              <Link
                href="/quote"
                className="label-caps inline-flex items-center justify-center gap-2 border border-paper/40 px-8 py-4 text-paper transition-colors duration-300 hover:border-paper"
              >
                Take the fit quiz
                <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
