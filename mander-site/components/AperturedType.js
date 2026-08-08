'use client';

import { useEffect, useState } from 'react';

/**
 * The masthead's move, reused as a motif.
 *
 * Text knocked out of a flat stencil with the hero footage running behind it,
 * so the characters read as apertures rather than shapes. The masthead does
 * this with MANDER at full viewport; this does it with short strings — the
 * services count, the Community Rate percentage — so the same idea recurs
 * down the page instead of appearing once and never returning.
 *
 * It exists because those numerals were the flattest things on the page: a
 * pale grey 06 and a white 20% doing nothing while the hero did all the work.
 * Filling them with moving colour costs no extra download (the browser reuses
 * the cached hero file) and makes the page feel like one authored object.
 *
 * `stencil` must match the surface it sits on — paper on light sections, ink
 * on the dark one — or the illusion breaks and it reads as a pasted box.
 */
export default function AperturedType({
  text,
  viewBox = '0 0 420 300',
  fontSize = 260,
  baselineY = 245,
  stencil = '#f4f2ec',
  letterSpacing = '-0.045em',
  className = '',
  maskId,
}) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const set = () => setReducedMotion(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  const id = maskId || `aperture-${text.replace(/[^a-z0-9]/gi, '')}`;
  const [, , vbW, vbH] = viewBox.split(' ').map(Number);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {reducedMotion ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/hero-poster.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <video
          className="absolute inset-0 h-full w-full object-cover [transform:translate3d(0,0,0)]"
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          preload="metadata"
          poster="/hero-poster.jpg"
          disablePictureInPicture
          aria-hidden="true"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      )}

      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid slice"
      >
        <mask id={id} maskUnits="userSpaceOnUse">
          <rect x="-3000" y="-3000" width="7000" height="7000" fill="#fff" />
          <text
            x={vbW / 2}
            y={baselineY}
            textAnchor="middle"
            fill="#000"
            style={{
              fontFamily: 'var(--font-hanken), sans-serif',
              fontWeight: 600,
              fontSize: `${fontSize}px`,
              letterSpacing,
            }}
          >
            {text}
          </text>
        </mask>
        <rect
          x="-3000"
          y="-3000"
          width="7000"
          height="7000"
          fill={stencil}
          mask={`url(#${id})`}
        />
      </svg>

      {/* The visible string for screen readers and copy/paste */}
      <span className="sr-only">{text}</span>
      <div style={{ paddingTop: `${(vbH / vbW) * 100}%` }} />
    </div>
  );
}
