'use client';

import { useEffect, useState } from 'react';

/**
 * The hero's cinematic cover — a looping showcase video, run edge to edge.
 *
 * It used to sit inside a thin paper "mat" with a hairline border, framed
 * like a print. Full-bleed reads with considerably more weight on desktop
 * and lets the footage actually behave like film. To stop the bottom edge
 * cutting off like a pasted rectangle, a short gradient blends the last
 * few percent of the frame into the paper background beneath it.
 *
 * Falls back to a still poster if the video 404s or the visitor has
 * reduced-motion enabled; never autoplays sound (always muted, as browsers
 * require for autoplay anyway).
 *
 * Expects the file at /public/videos/hero.mp4 — see setup-video.bat. The
 * poster is a graded frame pulled from that same file, so the fallback
 * matches the video's colour rather than jumping to a different photo.
 */
export default function HeroVideo({ poster, posterAlt = '' }) {
  const [failed, setFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const showVideo = !failed && !reducedMotion;

  return (
    <div className="relative w-full overflow-hidden bg-paper-3">
      <div className="relative h-[62vh] w-full md:h-[86vh]">
        {showVideo ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={poster}
            onError={() => setFailed(true)}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt={posterAlt} className="h-full w-full object-cover" />
        )}

        {/* Blend the bottom edge into the page instead of a hard cut */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-paper md:h-32"
        />
      </div>
    </div>
  );
}
