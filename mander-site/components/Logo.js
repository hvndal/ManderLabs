'use client';

import { useState } from 'react';
import Image from 'next/image';

/**
 * The MANDER identity, in two cuts.
 *
 *   variant="mark"   → the illustration only, no wordmark.
 *   variant="full"   → wordmark + illustration lockup.
 *
 * The supplied artwork is line art drawn in a dusty rose that belonged to an
 * earlier palette this site no longer uses — the current system is ink,
 * paper, denim blue and yellow (see tailwind.config.js), and rose appears
 * nowhere else in it. Rather than ship the artwork's native colour anywhere,
 * both tones below knock the colour out and recolour the drawing to fit the
 * ground it sits on: `tone="ink"` for light surfaces, `tone="paper"` for
 * dark ones like the footer. There is no path left that shows the raw file.
 */
const SOURCES = {
  // The figure alone, cropped out of the 1024² lockup at its measured bounds
  // (x 197–808, y 239–786). The lockup files bake in the wordmark and the
  // tagline, so at nav scale they render as an illegible smudge with type
  // inside type. This is the same artwork with the furniture removed.
  mark: { src: '/logo-figure.png', w: 536, h: 480 },
  full: { src: '/logo-mander.png', w: 1024, h: 1024 },
};

export default function Logo({ className = '', variant = 'full', tone = 'light' }) {
  // `brightness(0)` flattens the drawing to a solid silhouette on its own
  // transparency; `invert(1)` on top of that turns black to white, for the
  // one case (paper-on-dark) that needs the opposite of the default.
  const filter =
    tone === 'paper' ? 'brightness(0) invert(1)' : 'brightness(0) saturate(100%)';
  const set = SOURCES[variant] || SOURCES.full;
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
      {/* Through next/image, not a bare <img>. These two PNGs were shipping
          at their full source weight — 324 KB for the footer lockup and
          167 KB for a mark rendered 44 px tall — which was over three
          quarters of the homepage's image payload and the whole of an
          "improve image delivery" audit finding. Resized and served as AVIF
          they are a few kilobytes.

          `sizes` is what makes that resizing happen: without it the largest
          candidate is picked regardless of the rendered box. */}
      <Image
        src={set.src}
        alt="MANDER"
        width={set.w}
        height={set.h}
        sizes={variant === 'mark' ? '56px' : '220px'}
        priority={variant === 'mark'}
        className="h-full w-auto object-contain"
        style={{ filter }}
        onError={() => setFailed(true)}
      />
    </span>
  );
}
