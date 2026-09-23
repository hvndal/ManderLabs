// Tiny, isomorphic locale helpers — safe in server AND client components
// (no next/headers, unlike lib/locale-server.js; no 'use client', unlike
// LocaleProvider.js). Anything that needs to turn an English href into the
// right href for the current locale imports from here, once, rather than
// growing its own copy of the same `/fr` prefix logic.

/** English href ('/pricing', '/', '/locations/metro-vancouver/langley') →
 * the right href for `locale` ('en' passes through unchanged). */
export function localizeHref(href, locale) {
  if (locale !== 'fr') return href;
  return href === '/' ? '/fr' : `/fr${href}`;
}

// Maps each real nav href (lib/content.js NAV_LINKS / NAV_MORE_LINKS) to its
// chrome-string key in lib/ui-strings.js. The nav data itself stays
// English-only, single-source — this is the small translation layer sitting
// on top of it, not a second copy of the nav structure.
export const NAV_LABEL_KEY = {
  '/brand': 'navBrand',
  '/digital': 'navDigital',
  '/growth': 'navGrowth',
  '/pricing': 'navPlans',
  '/services': 'navServices',
  '/work': 'navWork',
  '/industries': 'navIndustries',
  '/about': 'navAbout',
  '/locations': 'navLocations',
  '/careers': 'navCareers',
};
