import Link from 'next/link';
import Logo from './Logo';
import GridField from './GridField';
import { CommunityRateFooterLink } from './CommunityRate';
import { CookiePreferencesLink } from './CookieHub';
import WhatsAppCta, { WhatsAppLine } from './WhatsAppCta';
import CountryPicker from './CountryPicker';
import { BRAND, NAV_LINKS, NAV_MORE_LINKS } from '@/lib/content';
import { getServerMarket, getServerRegion } from '@/lib/market-server';
import { getServerLocale } from '@/lib/locale-server';
import { localizeHref, NAV_LABEL_KEY } from '@/lib/locale.js';
import { uiStrings } from '@/lib/ui-strings.js';
import { LEGAL_NAV } from '@/lib/legal';
import { SITE_LAST_UPDATED } from '@/lib/seo';

// "19 September 2026" — the same plain long-date format lib/legal.js already
// uses for policy pages, so the two read as one convention rather than two.
// The date itself never changes by locale, only how it's written.
function updatedDisplay(locale) {
  return SITE_LAST_UPDATED.toLocaleDateString(locale === 'fr' ? 'fr-CA' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

// Derived from the policy data rather than hand-listed, so a new policy is
// linked here automatically. These used to be three href="#" placeholders —
// including a "Cookies" link, pointing nowhere. It has a real destination now:
// CookiePreferencesLink reopens the consent banner, and renders nothing at
// all on a build where analytics was never configured — see lib/analytics.js.
const LEGAL = LEGAL_NAV.map((d) => ({ label: d.nav, href: `/legal/${d.slug}` }));

// The nav bar carries the six links a visitor browses with; the footer also
// carries the two a stranger checks with. About and Contact are kept out of
// the header on purpose — adding them there would crowd it — but a payment
// processor, a first-time client or a crawler looking for who this is should
// never have to hunt, and the footer is where all three look.
const EXPLORE = [
  ...NAV_LINKS,
  ...NAV_MORE_LINKS,
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  const market = getServerMarket();
  const region = getServerRegion();
  const locale = getServerLocale();
  const ui = uiStrings(locale);
  const UPDATED_DISPLAY = updatedDisplay(locale);

  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <GridField tone="paper" />

      <div className="relative container-max stack-y">
        <div className="grid grid-cols-1 gap-stack-md md:grid-cols-12">
          <div className="md:col-span-6">
            <Logo variant="full" tone="paper" className="h-24 md:h-28" />
            <p className="mt-6 max-w-sm text-body-lg text-paper/70">
              {market.tagline}
            </p>
            <p className="mt-3 max-w-sm text-body-md text-paper/50">
              {market.region}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`mailto:${BRAND.email}?subject=${encodeURIComponent(
                  'New project enquiry'
                )}`}
                className="btn-on-dark"
              >
                {ui.contactSales}
              </a>
              <WhatsAppCta tone="on-dark" location="footer" />
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="label-caps mb-6 text-paper/45">{ui.footerExplore}</h3>
            <ul className="flex flex-col gap-3">
              {EXPLORE.map((item) => (
                <li key={item.label}>
                  <Link
                    href={localizeHref(item.href, locale)}
                    className="text-body-md text-paper/75 transition-colors hover:text-paper"
                  >
                    {ui[NAV_LABEL_KEY[item.href]] || (item.href === '/contact' ? ui.navContact : item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="label-caps mb-6 text-paper/45">{ui.footerContact}</h3>
            <ul className="flex flex-col gap-3 text-body-md text-paper/75">
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="transition-colors hover:text-paper"
                >
                  {BRAND.email}
                </a>
              </li>
              {market.phone && (
                <li>
                  <a
                    href={market.phone.href}
                    className="transition-colors hover:text-paper"
                  >
                    {market.phone.display}
                  </a>
                </li>
              )}
              {/* Renders nothing outside India — the number is not in the
                  US markup at all, not hidden in it. */}
              <li>
                <WhatsAppLine className="transition-colors hover:text-paper" />
              </li>
              <li className="text-paper/50">{ui.footerHours}</li>
              <li className="rail text-paper/35">
                Metro Vancouver · 49.2827° N 123.1207° W
              </li>
              <li className="pt-1">
                <Link
                  href="/blog"
                  className="text-paper/60 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
                >
                  {ui.footerJournal}
                </Link>
              </li>
              <li className="pt-1">
                <a
                  href={BRAND.googleBusinessShare}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-paper/60 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
                >
                  {ui.footerFindGoogle}
                </a>
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
                  href={localizeHref('/careers', locale)}
                  className="text-paper/60 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
                >
                  {ui.footerCareers}
                </Link>
              </li>
              <li className="pt-1">
                <CommunityRateFooterLink className="text-left text-paper/60 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper" />
              </li>
              <li className="pt-1">
                <CookiePreferencesLink className="text-left text-paper/60 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper" />
              </li>
              <li className="pt-1">
                <a
                  href={BRAND.portfolio}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-paper/60 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
                >
                  {ui.footerPortfolio}
                </a>
              </li>
              {/* Herman's personal profile, labelled plainly — there is no
                  MANDER company page to link instead. */}
              <li className="pt-1">
                <a
                  href={BRAND.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-paper/60 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
                >
                  {ui.footerLinkedIn}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-stack-md flex flex-col gap-6 border-t border-paper/15 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <p className="text-label-sm text-paper/45">
              © {new Date().getFullYear()} {BRAND.name}. {ui.builtFor} {market.region}.
              {' '}{ui.updated} {UPDATED_DISPLAY}.
            </p>
            {/* The very end of the page, on purpose: everyone is placed by IP
                already, so this is for the visitor that got wrong. */}
            <CountryPicker region={region} />
          </div>
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

      {/* The wordmark, at the foot, set as large as the measure allows.

          This was MANDER knocked out of an ink stencil with film running
          behind the letterforms. The trick belonged to a serif display face
          and a masthead that no longer exist, and it put a video decoder on
          every route on the site for a signature. A grotesque cut this large,
          tracked tight and ruled off, is the same statement made by setting
          type rather than by hiding it behind an effect. */}
      <div className="relative border-t border-paper/15 px-margin-mobile pb-8 pt-10 md:px-margin-desktop">
        <p
          aria-hidden="true"
          className="font-display leading-[0.78] tracking-[-0.05em] text-paper/90"
          // Sized to fill the measure rather than to sit politely inside it —
          // at 17vw it stopped a third of the page short of the right margin.
          style={{ fontSize: 'clamp(3.5rem, 22vw, 19rem)' }}
        >
          {BRAND.name}
        </p>
      </div>
    </footer>
  );
}
