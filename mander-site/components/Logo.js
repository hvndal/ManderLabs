'use client';

import { useState } from 'react';

/**
 * The real MANDER mark — a transparent PNG, not a text wordmark.
 *
 * Drop the exported file at:
 *   - public/logo-mander.png       (full lockup — wordmark + illustration + tagline)
 *   - public/logo-mander-nav.png   (optional — a tighter crop for the navbar)
 *
 * See make-logo-transparent.html for how to export both from the black-
 * background source. Until logo-mander.png exists, this quietly falls back
 * to a text wordmark instead of showing a broken image.
 *
 * `variant="nav"` tries the nav-specific crop first (if you made one) and
 * falls back to the full mark; any other variant always uses the full mark.
 */
export default function Logo({ className = '', variant = 'full' }) {
  const preferred = variant === 'nav' ? '/logo-mander-nav.png' : '/logo-mander.png';
  const [src, setSrc] = useState(preferred);
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
        onError={() => {
          // nav crop missing → try the full lockup once before giving up
          if (variant === 'nav' && src !== '/logo-mander.png') {
            setSrc('/logo-mander.png');
          } else {
            setFailed(true);
          }
        }}
      />
    </span>
  );
}
