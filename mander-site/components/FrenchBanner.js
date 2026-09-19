'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * "Voir en français" — offered, never forced.
 *
 * Shows only when the edge geolocated the visitor's region as Quebec
 * (`regionCode === 'QC'`, from middleware.js — see lib/markets/geo.js for
 * why this is the *only* thing geolocation controls here) and the current
 * page isn't already under /fr. Explicitly not a redirect: a French speaker
 * outside Quebec gets no signal at all today, and a Quebecer who prefers
 * English is one dismissal away from never seeing it again this session —
 * forcing the switch would get both of those wrong.
 *
 * Same sessionStorage dismiss pattern as QuickContact.js, not a new
 * mechanism: "not right now" is a smaller promise than "never again", so it
 * comes back tomorrow rather than being gone for good.
 */
export default function FrenchBanner({ regionCode }) {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem('mander:fr-banner') === 'off');
    } catch {
      // Private mode, blocked storage: show the banner. Not important
      // enough to break a page over.
    }
    setReady(true);
  }, []);

  const isFrenchPath = pathname === '/fr' || pathname.startsWith('/fr/');
  if (!ready || dismissed || isFrenchPath || regionCode !== 'QC') return null;

  const frHref = pathname === '/' ? '/fr' : `/fr${pathname}`;

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem('mander:fr-banner', 'off');
    } catch {
      // Nothing to persist against; the dismissal still holds for this view.
    }
  };

  return (
    <div className="relative z-40 flex items-center justify-center gap-4 bg-accent px-4 py-2.5 text-center">
      <a href={frHref} className="label-caps text-on-accent underline underline-offset-4">
        Voir en français
      </a>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Fermer"
        className="label-caps text-on-accent/70 transition-colors hover:text-on-accent"
      >
        ✕
      </button>
    </div>
  );
}
