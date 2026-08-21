// --- Analytics & consent ---------------------------------------------------
// Consent is owned by CookieHub, a third-party consent management platform.
// It renders the banner, stores the decision, keeps the audit log a GDPR
// request would ask for, and — the part that matters here — tells us whether
// the visitor allowed the "analytics" category. Nothing in this codebase
// stores a consent decision any more; CookieHub is the single source of truth,
// because two systems each holding half an answer is how a site ends up
// tracking someone who said no.
//
// Both IDs below are publishable by design and already visible in the page
// source of any site using them — the CookieHub account ID is in the script
// URL, the GA4 measurement ID is in every gtag request. They are committed
// for the same reason WEB3FORMS_KEY is (see lib/forms.js): `.env*.local` is
// gitignored, so a value left only there reaches localhost and never reaches
// a deploy. The env vars still win when set, so either can be rotated from
// the Vercel dashboard without a code change.
export const COOKIEHUB_ID = process.env.NEXT_PUBLIC_COOKIEHUB_ID || 'e3274c1f';
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-TNPMWPQX2W';

export const ANALYTICS_ENABLED = Boolean(GA_MEASUREMENT_ID);
export const CONSENT_ENABLED = Boolean(COOKIEHUB_ID);

// The CookieHub category that governs Google Analytics. Their default
// taxonomy is necessary / preferences / analytics / marketing; if that
// category is ever renamed in the CookieHub dashboard, this string has to
// change with it or consent will never register and GA will never load.
export const ANALYTICS_CATEGORY = 'analytics';

// Dispatched whenever CookieHub reports a change. Analytics.js listens for it
// and is otherwise completely unaware of which consent platform is in use —
// swapping CookieHub for something else means rewriting one component, not
// touching the analytics loader.
export const CONSENT_EVENT = 'mander:consent-change';

export function publishConsent(status) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: status }));
}

/**
 * Reopen CookieHub's own preferences dialog.
 *
 * Guarded rather than assumed: this is a third-party global that an ad
 * blocker, a network failure, or a misconfigured account can all prevent from
 * ever existing. Returns false when it isn't there so a caller can decide
 * what to do instead of throwing inside an onClick handler.
 */
export function openCookiePreferences() {
  if (typeof window === 'undefined') return false;
  const ch = window.cookiehub;
  if (ch && typeof ch.openSettings === 'function') {
    ch.openSettings();
    return true;
  }
  return false;
}
