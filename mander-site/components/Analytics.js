'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import {
  ANALYTICS_ENABLED,
  GA_MEASUREMENT_ID,
  CONSENT_EVENT,
  getConsent,
  trackEvent,
} from '@/lib/analytics';
import { useMarketId } from './MarketProvider';

/**
 * Google Analytics 4 — and only GA4. No Google Signals, no ad
 * personalisation, no remarketing audiences.
 *
 * Starts in the denied state on every render and only ever leaves it when
 * CookieHub says the analytics category is allowed (see CookieHub.js). There
 * is deliberately no cached local value consulted on mount: a stale "granted"
 * read would load gtag for the moment before the consent platform finished
 * initialising and had a chance to say otherwise, which is exactly the window
 * in which a site tracks someone who revoked.
 *
 * usePathname rather than useSearchParams on purpose: the latter needs a
 * Suspense boundary around every page that renders this, and pathname alone
 * is enough to log a page_view on every route change — query strings on this
 * site are not part of a page's identity.
 */
export default function Analytics() {
  const pathname = usePathname();
  // Every hit is stamped with the market that produced it. Without it the
  // Indian and US funnels are one undifferentiated number, and the whole
  // point of running two price ladders is being able to tell them apart.
  const marketId = useMarketId();
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    if (!ANALYTICS_ENABLED) return;
    const onChange = (e) => setGranted(e.detail === 'granted');
    window.addEventListener(CONSENT_EVENT, onChange);
    // Consent can already have been published before this listener existed —
    // CookieHub's script is frequently warm in cache and its onInitialise
    // callback beats hydration, and that one dispatch is not repeated. Read
    // the stored answer once on mount so a returning visitor who accepted
    // gets analytics on this page, not on the next one they navigate to.
    if (getConsent() === 'granted') setGranted(true);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  // gtag's own bootstrap already sends the first page_view on load. Only
  // report the ones after that, once granted flips true partway through a
  // session and on every route change from then on.
  useEffect(() => {
    if (!ANALYTICS_ENABLED || !granted) return;
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', 'page_view', {
      page_path: pathname,
      page_location: window.location.href,
      market: marketId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, granted, marketId]);

  // Every "Contact sales" button on this site is a mailto:, and a mailto:
  // click leaves no trace of its own — no page view, no navigation, nothing.
  // Without this, the most common way people start a conversation here is
  // simply invisible in the reporting. One delegated listener catches them
  // all rather than threading a handler through a dozen components.
  useEffect(() => {
    if (!ANALYTICS_ENABLED || !granted) return;
    const onClick = (e) => {
      const link = e.target.closest?.('a[href^="mailto:"]');
      if (!link) return;
      trackEvent('contact_email_click', { page_path: pathname, market: marketId });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [granted, pathname, marketId]);

  if (!ANALYTICS_ENABLED || !granted) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            market: '${marketId}',
            anonymize_ip: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false,
          });
        `}
      </Script>
    </>
  );
}
