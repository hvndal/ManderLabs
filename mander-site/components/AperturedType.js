'use client';

import { useEffect, useRef, useState } from 'react';

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
  stencil = '#f6f7f7',
  letterSpacing = '-0.045em',
  className = '',
  maskId,
  // Which footage shows through. Defaults to the marbled asset rather than
  // the hero clip: one film doing every job on the page reads as a shortcut,
  // and marbled endpaper suits small numerals better — it has structure at
  // any crop, where a filmed scene turns to mush inside a 40px counter.
  src = '/videos/marble.mp4',
  poster = '/marble-poster.jpg',
  // Tone correction for the ground it sits on. The stencil hides everything
  // except the characters, so wherever the footage happens to match the
  // stencil colour the letterform silently disappears — cream passages vanish
  // into paper, dark passages into ink. Push the media away from the stencil
  // and the characters hold their shape at every frame of the loop.
  mediaClassName = '',
  // Which part of the field this aperture looks at, 0 (left) to 1 (right).
  //
  // This is the whole reason the source is a wide 4:1 field rather than a
  // square. Every aperture used to show the entire frame scaled into its own
  // box, so eleven openings displayed the identical image at the identical
  // moment — which reads as eleven separate little loops rather than one
  // thing seen through eleven holes. Giving each a different offset makes
  // them windows onto a single continuous field, which is what they should
  // have been from the start.
  //
  // object-fit: cover scales the field to fill the box's height, leaving
  // horizontal overflow; objectPosition is what pans through it.
  offset = 0.5,
}) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const hostRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const set = () => setReducedMotion(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  // Play only while on screen.
  //
  // This motif now recurs a dozen times across the homepage — six service
  // indices, the section count, three terms, the Community Rate figure and
  // the footer wordmark. They all point at one cached file, so it is a
  // single download, but a dozen simultaneously *decoding* video elements is
  // a different cost entirely: on a mid-range phone that is real battery and
  // real jank, and iOS caps how many can play at once, so the ones past the
  // limit silently freeze on their poster.
  //
  // Pausing the offscreen ones keeps at most two or three live at any scroll
  // position. Errors from play() are swallowed on purpose — a rejected
  // autoplay promise is expected on some browsers and is not worth surfacing
  // for a decorative element.
  useEffect(() => {
    if (reducedMotion) return;
    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;
        if (entry.isIntersecting) {
          const p = video.play();
          if (p && typeof p.catch === 'function') p.catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const id = maskId || `aperture-${text.replace(/[^a-z0-9]/gi, '')}`;
  const [, , vbW, vbH] = viewBox.split(' ').map(Number);
  const objectPosition = `${Math.round(
    Math.min(Math.max(offset, 0), 1) * 100
  )}% 50%`;

  return (
    <div ref={hostRef} className={`relative overflow-hidden ${className}`}>
      {reducedMotion ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          style={{ objectPosition }}
          className={`absolute inset-0 h-full w-full object-cover ${mediaClassName}`}
        />
      ) : (
        <video
          ref={videoRef}
          style={{ objectPosition }}
          className={`absolute inset-0 h-full w-full object-cover [transform:translate3d(0,0,0)] ${mediaClassName}`}
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          preload="metadata"
          poster={poster}
          disablePictureInPicture
          aria-hidden="true"
        >
          <source src={src} type="video/mp4" />
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
