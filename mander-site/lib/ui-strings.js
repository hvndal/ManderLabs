// Chrome strings — the handful of UI labels that appear in Nav, Footer and
// the shared CTAs, not page prose. Kept deliberately small and separate from
// the page-content translations (lib/content.fr.js etc.): a nav label and a
// paragraph of marketing copy are different kinds of text with different
// review needs, and conflating them would mean re-scanning a huge file to
// verify one button label.
//
// Every key here is real UI text pulled from the actual English components —
// not retyped from memory, copied from source so English and French say the
// exact same thing in the exact same places.
export const UI_STRINGS = {
  en: {
    navBrand: 'Brand',
    navDigital: 'Digital',
    navGrowth: 'Growth',
    navPlans: 'Plans',
    navMore: 'More',
    navServices: 'Services',
    navWork: 'Work',
    navIndustries: 'Industries',
    navAbout: 'About',
    navLocations: 'Locations',
    navCareers: 'Careers',
    navContact: 'Contact',
    contactSales: 'Contact sales',
    getQuote: 'Get a quote',
    talkToPerson: 'Talk to a person',
    seeAllPlans: 'See all plans',
    whatsappCta: 'Chat with us on WhatsApp',
    footerExplore: 'Explore',
    footerContact: 'Contact',
    footerHours: 'Mon–Fri, 9–5 PT',
    footerJournal: 'Journal',
    footerFindGoogle: 'Find us on Google ↗',
    footerCareers: 'Careers',
    footerPortfolio: 'More work & references ↗',
    footerLinkedIn: 'LinkedIn ↗',
    builtFor: 'Built for',
    updated: 'Updated',
    frenchBannerText: 'Voir en français',
    englishBannerText: 'View in English',
  },
  fr: {
    navBrand: 'Marque',
    navDigital: 'Numérique',
    navGrowth: 'Croissance',
    navPlans: 'Forfaits',
    navMore: 'Plus',
    navServices: 'Services',
    navWork: 'Réalisations',
    navIndustries: 'Secteurs',
    navAbout: 'À propos',
    navLocations: 'Emplacements',
    navCareers: 'Carrières',
    navContact: 'Contact',
    contactSales: 'Contacter les ventes',
    getQuote: 'Obtenir un devis',
    talkToPerson: 'Parler à quelqu’un',
    seeAllPlans: 'Voir tous les forfaits',
    whatsappCta: 'Discuter avec nous sur WhatsApp',
    footerExplore: 'Explorer',
    footerContact: 'Contact',
    footerHours: 'Lun.–ven., 9 h–17 h HP',
    footerJournal: 'Journal',
    footerFindGoogle: 'Trouvez-nous sur Google ↗',
    footerCareers: 'Carrières',
    footerPortfolio: 'Plus de travaux et références ↗',
    footerLinkedIn: 'LinkedIn ↗',
    builtFor: 'Conçu pour',
    updated: 'Mis à jour le',
    frenchBannerText: 'Voir en français',
    englishBannerText: 'View in English',
  },
};

export function uiStrings(locale) {
  return UI_STRINGS[locale] || UI_STRINGS.en;
}
