// --- Analytics ---------------------------------------------------------
// Nothing in this file's orbit runs until NEXT_PUBLIC_GA_MEASUREMENT_ID is
// set in the environment. Until that variable exists, GA_MEASUREMENT_ID is
// null, ANALYTICS_ENABLED is false, and CookieConsent, Analytics and the
// footer's cookie-preferences link all render nothing — the site behaves
// exactly as it did before this file existed. Add the real measurement ID
// in Vercel's project settings and redeploy; nothing else needs to change.
//
// This is a real Google Analytics 4 property or it is nothing — there is no
// placeholder ID here to make the feature "look done". A fake ID would fire
// requests that silently vanish, which is worse than not tracking at all: it
// would look like it works.
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || null;
export const ANALYTICS_ENABLED = Boolean(GA_MEASUREMENT_ID);

const STORAGE_KEY = 'mander-consent';

// Dispatched on <body> whenever a visitor accepts or declines, and whenever
// the decision is reopened for editing. Analytics.js listens for the first;
// the footer link and CookieConsent both use the second so either can drive
// the other without a shared parent component holding state.
export const CONSENT_EVENT = 'mander:consent-change';
export const OPEN_PREFERENCES_EVENT = 'mander:open-cookie-preferences';

// 'granted' | 'denied' | null — null means no decision has been made yet,
// which is different from 'denied' and must stay different: the banner only
// disappears for good once an actual choice has been recorded.
export function getConsent() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw)?.status || null;
  } catch {
    return null;
  }
}

export function setConsent(status) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ status, decidedAt: new Date().toISOString() })
    );
  } catch {
    // Storage can throw in a locked-down context — Safari private mode at
    // quota, some in-app browsers. The choice just doesn't persist and the
    // banner reappears next visit; nothing about the page breaks over it.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: status }));
}

export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}
