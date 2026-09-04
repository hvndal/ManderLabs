'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMarket } from './MarketProvider';
import Icon from './Icon';
import { BRAND } from '@/lib/content';
import { trackEvent } from '@/lib/analytics';

/**
 * The sticky bar: talk to someone, or see the price.
 *
 * The site reads top-down and rewards reading, which is the right shape for
 * the people who want it and the wrong one for everybody else — a lot of
 * visitors arrive knowing exactly two questions ("what does it cost" and "can
 * I just ask someone") and currently have to scroll a full page to act on
 * either. This is the answer to that, and it is deliberately additive: no
 * existing section, CTA or layout moved to make room for it.
 *
 * Three rules keep it from becoming the pop-up it could easily turn into. It
 * holds two actions, never more. It is quiet — a thin ink bar on mobile, one
 * chip pair bottom-right on desktop — rather than a coloured badge demanding
 * attention. And it can be dismissed, which is remembered for the session, so
 * a reader who does not want it never sees it twice.
 *
 * Hidden on /quote, where the page *is* the call to action and a second one
 * would compete with it.
 */
export default function QuickContact() {
  const market = useMarket();
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);
  const [ready, setReady] = useState(false);
  const [past, setPast] = useState(false);

  // Mounted-only, so the server and the first client render agree; and read
  // from sessionStorage rather than localStorage, because "not right now" is
  // a smaller promise than "never again" and this should come back tomorrow.
  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem('mander:quick-contact') === 'off');
    } catch {
      // Private mode, blocked storage: show the bar. It is not important
      // enough to break a page over.
    }
    setReady(true);
  }, []);

  // Held back until the first screen has been scrolled through. The homepage
  // now opens on a full-viewport triptych, and a fixed bar sitting over the
  // corner of it covers the third panel's caption — the composition is the
  // argument on that screen, and this bar is the argument on every screen
  // after it. Elsewhere there is nothing to protect, so it shows at once.
  useEffect(() => {
    const gate = pathname === '/' ? () => window.innerHeight * 0.6 : () => 0;
    const onScroll = () => setPast(window.scrollY > gate());
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  if (!ready || dismissed || !past || pathname === '/quote') return null;

  const wa = market.whatsapp;
  const phone = market.phone;

  const primary = wa
    ? {
        href: wa.url,
        label: 'WhatsApp us',
        icon: 'whatsapp',
        external: true,
        event: 'contact_whatsapp_click',
      }
    : phone
      ? {
          href: phone.href,
          label: phone.display,
          icon: 'phone',
          external: false,
          event: 'contact_phone_click',
        }
      : {
          href: `mailto:${BRAND.email}?subject=${encodeURIComponent(
            'New project enquiry'
          )}`,
          label: 'Email us',
          icon: 'mail',
          external: false,
          event: 'contact_email_click',
        };

  const onPrimary = () =>
    trackEvent(primary.event, { market: market.id, location: 'quick-bar' });

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[80] flex justify-center px-3 pb-3 md:inset-x-auto md:right-5 md:bottom-5 md:px-0 md:pb-0">
      <div className="pointer-events-auto flex w-full max-w-md items-center gap-2 border border-paper/15 bg-ink/95 p-2 shadow-xl backdrop-blur-sm md:w-auto">
        <a
          href={primary.href}
          onClick={onPrimary}
          {...(primary.external
            ? { target: '_blank', rel: 'noreferrer noopener' }
            : {})}
          className="label-caps flex flex-1 items-center justify-center gap-2 bg-paper px-4 py-3 text-ink transition-colors hover:bg-accent hover:text-on-accent md:flex-none"
        >
          <Icon name={primary.icon} className="h-4 w-4" strokeWidth={2} />
          {primary.label}
        </a>

        <Link
          href="/pricing"
          onClick={() =>
            trackEvent('pricing_shortcut_click', {
              market: market.id,
              location: 'quick-bar',
            })
          }
          className="label-caps flex flex-1 items-center justify-center gap-2 border border-paper/25 px-4 py-3 text-paper transition-colors hover:border-paper md:flex-none"
        >
          Pricing
          <span className="text-paper/50">
            {market.tiers[0].fromLabel || market.tiers[0].price}
          </span>
        </Link>

        <button
          type="button"
          onClick={() => {
            setDismissed(true);
            try {
              sessionStorage.setItem('mander:quick-contact', 'off');
            } catch {
              // Nothing to do — it stays dismissed for this render either way.
            }
          }}
          aria-label="Hide contact bar"
          className="shrink-0 p-2 text-paper/40 transition-colors hover:text-paper"
        >
          <Icon name="close" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
