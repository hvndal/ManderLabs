'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS, BRAND } from '@/lib/content';
import Logo from './Logo';
import Icon from './Icon';
import WhatsAppCta from './WhatsAppCta';
import { useMarket } from './MarketProvider';
import { trackEvent } from '@/lib/analytics';

// Buying starts a conversation rather than a checkout, so the primary action
// everywhere is a person, not a form.
const SALES_MAILTO = `mailto:${BRAND.email}?subject=${encodeURIComponent(
  'New project enquiry'
)}`;

/**
 * A navigation item set as an editorial entry: its index in mono, then the
 * label. The number is not decoration — it is what stops five equal-weight
 * words in a row from reading as a generic site header, and it matches the
 * numbering every section of the site is already built on.
 */
function NavLink({ href, index, children, onClick, className = '' }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative inline-flex items-baseline gap-1.5 ${className}`}
    >
      <span className="rail text-line-strong transition-colors duration-300 group-hover:text-accent">
        {index}
      </span>
      <span className="label-caps text-ink-soft transition-colors duration-300 group-hover:text-ink">
        {children}
      </span>
      {/* Underline draws in on hover — never present at rest */}
      <span className="pointer-events-none absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-300 ease-premium group-hover:scale-x-100" />
    </Link>
  );
}

const navIndex = (i) => String(i + 1).padStart(2, '0');

export default function Nav() {
  const market = useMarket();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll state used to feed two flags. One of them, `cleared`, existed for a
  // home-page behaviour that was switched off with a hard-coded `false` and
  // never removed — so a listener ran on every scroll to compute a value
  // nothing read. Only the border-and-blur threshold is left.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-premium ${
        scrolled || open
          ? 'border-line bg-paper/90 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[76px] w-full max-w-container items-center justify-between px-margin-mobile md:px-margin-desktop"
      >
        <Link href="/" aria-label="MANDER home" className="text-ink">
          {/* The illustration, not the wordmark — the masthead already sets
              MANDER at full height, so repeating it here is redundant. */}
          <Logo variant="mark" tone="ink" className="h-11 md:h-12" />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link, i) => (
            <li key={link.label}>
              <NavLink href={link.href} index={navIndex(i)}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          {/* The number for this market — the North American line outside
              India, nothing inside it, where WhatsApp is the number. */}
          {market.phone && (
            <a
              href={market.phone.href}
              onClick={() =>
                trackEvent('contact_phone_click', {
                  market: market.id,
                  location: 'nav',
                })
              }
              className="label-caps hidden items-center gap-2 text-ink-soft transition-colors hover:text-ink lg:inline-flex"
            >
              <Icon name="phone" className="h-3.5 w-3.5" strokeWidth={2} />
              {market.phone.display}
            </a>
          )}
          {/* India only. Ordered ahead of email because it is the faster
              route in that market, and absent entirely in every other. */}
          <WhatsAppCta tone="sm" location="nav" />
          <a href={SALES_MAILTO} className="btn-sm">
            Contact sales
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="-mr-2.5 p-2.5 text-ink md:hidden"
        >
          <Icon name={open ? 'close' : 'menu'} className="h-6 w-6" />
        </button>
      </nav>

      {/* Full-screen typographic panel rather than a dropdown list. A
          max-height accordion of five small-caps rows is the phone equivalent
          of a card grid — it is the least considered surface on a site whose
          traffic is mostly phones. Here the labels are set at display scale
          and numbered, and the actions sit at the foot where a thumb is. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[76px] z-40 flex flex-col overflow-y-auto border-t border-line bg-paper md:hidden"
      >
        <ul className="flex flex-col px-margin-mobile pt-2">
          {NAV_LINKS.map((link, i) => (
            <li key={link.label} className="border-b border-line">
              <Link
                href={link.href}
                className="group flex items-baseline gap-4 py-6"
              >
                <span className="rail text-line-strong">{navIndex(i)}</span>
                <span className="font-display text-headline-lg-mobile text-ink transition-colors group-hover:text-accent">
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-3 px-margin-mobile py-8">
          {market.phone && (
            <a
              href={market.phone.href}
              onClick={() =>
                trackEvent('contact_phone_click', {
                  market: market.id,
                  location: 'nav-mobile',
                })
              }
              className="btn-outline w-full"
            >
              <Icon name="phone" className="h-4 w-4" strokeWidth={2} />
              {market.phone.display}
            </a>
          )}
          <WhatsAppCta className="w-full" location="nav-mobile" />
          <a href={SALES_MAILTO} className="btn-primary w-full">
            Contact sales
          </a>
          <Link href="/quote" className="btn-outline w-full">
            Take the fit quiz
          </Link>
        </div>
      </div>

    </header>
  );
}
