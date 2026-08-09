import Link from 'next/link';
import GridField from '@/components/GridField';
import { BRAND } from '@/lib/content';

// Next.js's not-found.js convention returns a real HTTP 404 automatically —
// this only changes what renders on it. Without this file, every bad URL
// (a typo'd city slug, an old link) fell through to Next's bare default
// page, which looked broken against a site this art-directed. No Reveal
// here on purpose: an error page shouldn't fade in, it should just be there.
export const metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden border-b border-line">
      <GridField />
      <div className="relative container-max py-stack-lg">
        <span className="label-caps text-accent">404</span>
        <h1 className="h-display mt-6 max-w-[14ch]">
          That page moved, or never existed.
        </h1>
        <p className="mt-6 max-w-text text-body-lg text-ink-soft">
          The link that brought you here is out of date. Try the homepage, or
          get in touch directly if you were looking for something specific.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
          <Link href="/locations" className="btn-outline">
            Browse locations
          </Link>
          <a
            href={`mailto:${BRAND.email}`}
            className="link-underline label-caps inline-flex items-center text-ink"
          >
            {BRAND.email}
          </a>
        </div>
      </div>
    </section>
  );
}
