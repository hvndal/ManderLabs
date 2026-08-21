'use client';

import { useCallback } from 'react';
import Script from 'next/script';
import {
  COOKIEHUB_ID,
  CONSENT_ENABLED,
  ANALYTICS_CATEGORY,
  publishConsent,
  openCookiePreferences,
} from '@/lib/analytics';

/**
 * CookieHub — the consent banner, and the only thing on this site that
 * decides whether Google Analytics is allowed to load.
 *
 * CookieHub's own install snippet is two raw <script> tags dropped in <head>,
 * with load() called on DOMContentLoaded. That is the right shape for a plain
 * HTML site and the wrong one here: hand-written script tags in a Next.js
 * layout are not deduplicated across client navigations, and DOMContentLoaded
 * has usually already fired by the time a React tree hydrates, so the
 * listener never runs and the banner never appears. next/script with
 * `afterInteractive` solves both — it injects once, and onLoad fires whether
 * the document was already parsed or not.
 *
 * The callbacks are the reason this component exists at all rather than being
 * a copy-paste. CookieHub knows what the visitor consented to; Analytics.js
 * knows how to load GA. This wires the first to the second through one
 * generic event, so the analytics loader never learns which consent vendor is
 * in use and swapping vendors is a one-file change.
 *
 * Fails closed by design: if the script is blocked — ad blocker, network
 * failure, CSP mistake — no callback ever runs, no consent is ever published,
 * and GA never loads. The failure mode of this file is "no tracking", never
 * "tracking without permission".
 */
export default function CookieHub() {
  const handleLoad = useCallback(() => {
    const ch = typeof window !== 'undefined' ? window.cookiehub : null;
    if (!ch || typeof ch.load !== 'function') return;

    const sync = () => {
      try {
        const allowed =
          typeof ch.hasConsented === 'function'
            ? ch.hasConsented(ANALYTICS_CATEGORY)
            : false;
        publishConsent(allowed ? 'granted' : 'denied');
      } catch {
        // A third-party API that throws is a third-party API we do not trust
        // with a yes. Anything unexpected resolves to denied.
        publishConsent('denied');
      }
    };

    try {
      ch.load({
        // Fires once CookieHub has read any existing decision — this is what
        // restores consent for a returning visitor who already accepted.
        onInitialise: sync,
        // Category-level events. Both re-read the real state rather than
        // trusting the argument, so a visitor toggling several categories in
        // the preferences dialog can't leave us on a stale answer.
        onAllow: sync,
        onRevoke: sync,
        onStatusChange: sync,
      });
    } catch {
      publishConsent('denied');
    }
  }, []);

  if (!CONSENT_ENABLED) return null;

  return (
    <Script
      id="cookiehub"
      src={`https://cdn.cookiehub.eu/c2/${COOKIEHUB_ID}.js`}
      strategy="afterInteractive"
      onLoad={handleLoad}
    />
  );
}

/**
 * The footer's way back into the consent decision, mirroring
 * CommunityRateFooterLink's shape so it sits in that link list looking like
 * every other item.
 *
 * Kept in this file rather than the footer because the thing it opens is
 * CookieHub's dialog — if the consent vendor changes, this button changes
 * with it, and the footer never has to know.
 */
export function CookiePreferencesLink({ className = '' }) {
  if (!CONSENT_ENABLED) return null;
  return (
    <button
      type="button"
      onClick={() => openCookiePreferences()}
      className={className}
    >
      Cookie preferences
    </button>
  );
}
