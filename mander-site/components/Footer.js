import Link from 'next/link';
import Logo from './Logo';
import Guilloche from './Guilloche';
import { CommunityRateFooterLink } from './CommunityRate';
import { BRAND, NAV_LINKS } from '@/lib/content';

const LEGAL = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Cookies', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      {/* Engraved plate, hung off the top-right corner and cropped by two
          edges. Cropping is what keeps it architecture rather than
          decoration — a circle floating fully inside the block would read as
          a sticker. */}
      <Guilloche
        tone="rose"
        spin
        opacity={0.14}
        className="-right-24 -top-40 h-[420px] w-[420px] md:-right-16 md:-top-52 md:h-[620px] md:w-[620px]"
      />

      <div className="relative container-max py-stack-lg">
        <div className="grid grid-cols-1 gap-stack-md md:grid-cols-12">
          <div className="md:col-span-6">
            {/* The one place the pale rose lockup has enough contrast to work */}
            <Logo variant="full" tone="rose" className="h-24 md:h-28" />
            <p className="mt-6 max-w-sm text-body-lg text-paper/70">
              {BRAND.tagline}
            </p>
            <p className="mt-3 max-w-sm text-body-md text-paper/50">
              {BRAND.region}
            </p>
            <a
              href={`mailto:${BRAND.email}?subject=${encodeURIComponent(
                'New project enquiry'
              )}`}
              className="btn-on-dark mt-8"
            >
              Contact sales
            </a>
          </div>

          <div className="md:col-span-3">
            <h3 className="label-caps mb-6 text-paper/45">Explore</h3>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-body-md text-paper/75 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="label-caps mb-6 text-paper/45">Contact</h3>
            <ul className="flex flex-col gap-3 text-body-md text-paper/75">
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="transition-colors hover:text-paper"
                >
                  {BRAND.email}
                </a>
              </li>
              <li className="text-paper/50">Mon–Fri, 9–5 PT</li>
              <li className="pt-1">
                <CommunityRateFooterLink className="text-left text-paper/60 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper" />
              </li>
              <li className="pt-1">
                <a
                  href={BRAND.portfolio}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-paper/60 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
                >
                  More work &amp; references ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-stack-md flex flex-col gap-4 border-t border-paper/15 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-label-sm text-paper/45">
            © {new Date().getFullYear()} {BRAND.name}. Built for Canadian &amp; American business.
          </p>
          <ul className="flex flex-wrap gap-6">
            {LEGAL.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="label-caps text-paper/45 transition-colors hover:text-paper"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* The wordmark set enormous along the bottom edge — the masthead
          gesture returned at the other end of the page, so the document
          opens and closes on the same move.

          Deliberately not a heading and not content: the real lockup is at
          the top of the footer, so this is aria-hidden, and `select-none`
          keeps a 19vw string from being draggable and highlightable.

          Sized to sit flush rather than to be cropped mid-letter. A crop
          into the letterforms depends on the font's baseline sitting where
          you assume it does, and getting that wrong by a few percent is the
          difference between "cropped" and "broken" — so the negative margin
          only trims the empty space below the baseline (MANDER is all caps,
          nothing descends into it) and the letters stay whole. `leading` and
          the margin are in vw so the relationship holds at every width. */}
      <div aria-hidden="true" className="relative select-none overflow-hidden">
        <span className="-mb-[1.2vw] block whitespace-nowrap text-center font-display text-[19vw] font-normal leading-[0.8] tracking-[-0.015em] text-paper/[0.07]">
          {BRAND.name}
        </span>
      </div>
    </footer>
  );
}
