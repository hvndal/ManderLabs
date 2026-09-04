'use client';

import { useState } from 'react';

/**
 * The MANDER identity, in three cuts.
 *
 *   variant="mark"   → the illustration only, no wordmark.
 *   variant="nav"    → the wordmark alone, recoloured to ink.
 *   variant="full"   → wordmark + illustration lockup, in the original rose.
 *
 * Why three: the supplied artwork is a tall stacked lockup in a pale rose
 * (~1.6:1 against the cream page), which is illegible at header scale and
 * fights a horizontal bar. So the pieces are used where each actually works —
 * the ink mark on light surfaces, the rose lockup only on ink-dark fields
 * like the footer, where the pale rose finally has the contrast to sing.
 *
 * `tone="rose"` forces the untouched rose artwork for use on dark grounds.
 * Everything falls back to a text wordmark rather than a broken image.
 */
const SOURCES = {
  // The figure alone, cropped out of the 1024² lockup at its measured bounds
  // (x 197–808, y 239–786). The lockup files bake in the wordmark and the
  // tagline, so at nav scale they render as an illegible smudge with type
  // inside type. This is the same artwork with the furniture removed.
  mark: { light: '/logo-figure.png', rose: '/logo-figure.png' },
  nav: { light: '/logo-mander-nav.png', rose: '/logo-mander.png' },
  full: { light: '/logo-mander.png', rose: '/logo-mander.png' },
};

export default function Logo({ className = '', variant = 'full', tone = 'light' }) {
  // The artwork is rose line art on transparency — the palette it was drawn
  // for. Against the slate-and-blue system it now sits in, that rose is the
  // one warm thing on the page and it reads as a leftover. `tone="ink"`
  // renders the same drawing in the page's own ink by knocking the colour out
  // of it, rather than shipping a second copy of the file in another colour
  // that would then have to be kept in sync with it.
  const inkFilter = tone === 'ink' ? 'brightness(0) saturate(100%)' : undefined;
  const set = SOURCES[variant] || SOURCES.full;
  const [src, setSrc] = useState(tone === 'rose' ? set.rose : set.light);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={`select-none text-[17px] font-semibold uppercase leading-none tracking-[0.28em] ${className}`}
      >
        Mander
      </span>
    );
  }

  return (
    <span className={`relative inline-block ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="MANDER"
        decoding="async"
        className="h-full w-auto object-contain"
        style={inkFilter ? { filter: inkFilter } : undefined}
        onError={() => {
          if (src !== set.rose) setSrc(set.rose);
          else setFailed(true);
        }}
      />
    </span>
  );
}
