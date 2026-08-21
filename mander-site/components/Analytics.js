'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import {
  ANALYTICS_ENABLED,
  GA_MEASUREMENT_ID,
  CONSENT_EVENT,
} from '@/lib/analytics';

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
 * usePathname rather than useSearchParams on purpose: the latter opts a page
 * out of static rendering unless wrapped in Suspense, which would have
 * quietly turned all 41 statically-generated routes dynamic. Pathname alone
 * carries no such cost and is enough to log a page_view on every route
 * change — query strings on this site are not part of a page's identity.
 */
export default function Analytics() {
  const pathname = usePathname();
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    if (!ANALYTICS_ENABLED) return;
    const onChange = (e) => setGranted(e.detail === 'granted');
    window.addEventListener(CONSENT_EVENT, onChange);
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
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, granted]);

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
            anonymize_ip: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false,
          });
        `}
      </Script>
    </>
  );
}
