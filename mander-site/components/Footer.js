import Link from 'next/link';
import Logo from './Logo';
import GridField from './GridField';
import AperturedType from './AperturedType';
import { CommunityRateFooterLink } from './CommunityRate';
import { BRAND, NAV_LINKS } from '@/lib/content';
import { LEGAL_DOCS } from '@/lib/legal';

// Derived from the policy data rather than hand-listed, so a new policy is
// linked here automatically. These used to be three href="#" placeholders —
// including a "Cookies" link, which was doubly wrong: the site sets no
// cookies, so the honest answer lives in the privacy policy instead.
const LEGAL = LEGAL_DOCS.map((d) => ({ label: d.nav, href: `/legal/${d.slug}` }));

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <GridField tone="paper" />

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
                <Link
                  href="/blog"
                  className="text-paper/60 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
                >
                  Journal
                </Link>
              </li>
              <li className="pt-1">
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-paper/60 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
                >
                  Instagram {BRAND.instagramHandle} ↗
                </a>
              </li>
              <li className="pt-1">
                <Link
                  href="/careers"
                  className="text-paper/60 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
                >
                  Careers
                </Link>
              </li>
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
                <Link
                  href={item.href}
                  className="label-caps text-paper/45 transition-colors hover:text-paper"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* The masthead's move, returned at the other end of the document.
          MANDER knocked out of an ink stencil with film running behind it,
          set wide enough that the M and the R are cut by the viewport edges
          exactly as they are in the hero — so the page opens and closes on
          the same gesture rather than trailing off into a link list.

          A flat tinted wordmark was tried here first. It filled the space
          but it was inert, and next to a hero whose entire idea is
          type-as-aperture it read as a different design speaking. This is
          the same idea, quieter.

          The marble clip, not the hero clip: the hero footage is a scene and
          turns to mush cropped inside letterforms, where the marble has
          structure at any scale. It is already cached from the service
          indices further up, so this costs no extra download.

          Brightened hard because the stencil is ink — wherever a dark
          passage of film meets the dark stencil the letterform silently
          disappears, and MANDER dissolving halfway through its own loop is
          not a subtle bug. */}
      <div className="relative">
        <AperturedType
          text={BRAND.name}
          viewBox="0 0 1000 210"
          fontSize={240}
          baselineY={182}
          stencil="#1c1512"
          maskId="footer-wordmark"
          mediaClassName="brightness-[1.4] saturate-[1.15] contrast-[1.08]"
        />
      </div>
    </footer>
  );
}
