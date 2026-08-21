import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import GridField from '@/components/GridField';
import Breadcrumbs from '@/components/Breadcrumbs';
import Icon from '@/components/Icon';
import JsonLd from '@/components/JsonLd';
import { POSTS, POSTS_BY_DATE, getPost } from '@/lib/blog';
import { BRAND } from '@/lib/content';
import { articleSchema, breadcrumbSchema, OG_IMAGE, alternates } from '@/lib/seo';

// One route renders every post from lib/blog.js. Adding a post is adding an
// object there — same arrangement as the legal documents.
export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

// A heading that opens with a number — '$500 to $900' — yields an id that
// starts with a digit. That is legal HTML and native fragment jumps honour it,
// but it is not a valid CSS identifier, so any querySelector('#' + id) throws.
// Prefixing only that case keeps every other anchor clean and readable.
const anchor = (h) => {
  const slug = h.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return /^[0-9]/.test(slug) ? `s-${slug}` : slug;
};

const readable = (iso) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return {};
  const path = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: alternates(path),
    openGraph: {
      title: `${post.title} | MANDER`,
      description: post.description,
      url: path,
      type: 'article',
      publishedTime: post.date,
      authors: ['Herman'],
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | MANDER`,
      description: post.description,
      images: [OG_IMAGE.url],
    },
  };
}

export default function BlogPost({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const trail = [
    { name: 'Home', href: '/' },
    { name: 'Journal', href: '/blog' },
    { name: post.nav || post.title },
  ];

  // Two others to read, newest first, never this one.
  const more = POSTS_BY_DATE.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <JsonLd
        data={breadcrumbSchema(trail.map((t) => ({ name: t.name, path: t.href || path })))}
      />

      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <GridField />
        <div className="relative container-max py-stack-md">
          <Breadcrumbs trail={trail} />
          <Reveal>
            <span className="eyebrow">{post.tag}</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="h-display max-w-[20ch]">{post.title}</h1>
          </Reveal>
          <Reveal delay={160} className="mt-8 max-w-text text-body-lg text-ink-soft">
            <p>{post.lede}</p>
          </Reveal>
          <Reveal delay={200} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-6">
            <span className="label-caps text-ink-mute">Herman</span>
            <time dateTime={post.date} className="label-caps text-ink-mute">
              {readable(post.date)}
            </time>
            <span className="label-caps text-ink-mute">{post.readingTime}</span>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- Article */}
      <section className="bg-paper py-stack-md">
        <div className="container-max">
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-16">
            {/* Contents — sticky on desktop, a plain list on phones */}
            <nav aria-label="On this page" className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <span className="label-caps text-accent">On this page</span>
                <ol className="mt-6 flex flex-col gap-2.5 border-l border-line pl-5">
                  {post.sections.map((s) => (
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

            <article className="lg:col-span-8">
              {post.sections.map((s) => (
                <Reveal key={s.h} className="mb-14 last:mb-0">
                  {/* id on the heading rather than the Reveal — Reveal does not
                      forward arbitrary props, so an id given to it disappears
                      and every contents link silently does nothing. */}
                  <h2
                    id={anchor(s.h)}
                    className="scroll-mt-28 text-headline-md font-semibold tracking-tight text-ink"
                  >
                    {s.h}
                  </h2>
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

              {/* The point of the whole exercise: authority pointed at the
                  location pages, with the anchor text they are trying to win. */}
              {post.related?.length > 0 && (
                <Reveal className="mt-16 border-t border-line pt-8">
                  <span className="label-caps text-ink-mute">Keep reading</span>
                  <ul className="mt-5 flex flex-col gap-3">
                    {post.related.map((r) => (
                      <li key={r.href}>
                        <Link
                          href={r.href}
                          className="link-underline label-caps text-ink hover:text-accent"
                        >
                          {r.label}
                          <Icon name="arrow" className="h-3.5 w-3.5" strokeWidth={2} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              <Reveal className="mt-12 border-l-2 border-accent/40 pl-5">
                <p className="text-body-md text-ink-soft">
                  <span className="label-caps mb-1.5 block text-ink-mute">
                    Got a question this did not answer?
                  </span>
                  Email{' '}
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="underline underline-offset-4 hover:text-ink"
                  >
                    {BRAND.email}
                  </a>{' '}
                  and a person will answer it. No form, no funnel.
                </p>
              </Reveal>
            </article>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- More posts */}
      {more.length > 0 && (
        <section className="bg-paper-2 py-stack-md">
          <div className="container-max">
            <span className="label-caps text-ink-mute">More from the journal</span>
            <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
              {more.map((p) => (
                <Reveal key={p.slug} className="bg-white">
                  <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col p-7 md:p-8">
                    <span className="label-caps text-ink-mute">{p.tag}</span>
                    <h3 className="mt-3 text-headline-md text-ink transition-colors duration-300 group-hover:text-accent">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-body-md text-ink-soft">{p.description}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
