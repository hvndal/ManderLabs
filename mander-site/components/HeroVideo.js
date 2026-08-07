'use client';

import { useEffect, useState } from 'react';

/**
 * The hero's cinematic cover — a looping showcase video, presented like a
 * framed print: a thin paper "mat" and hairline border around it rather than
 * a raw edge-to-edge clip. Falls back to a still poster if the video 404s or
 * the visitor has reduced-motion enabled; never autoplays sound (always
 * muted, as browsers require for autoplay anyway).
 *
 * Expects the file at /public/videos/hero.mp4 — see setup-video.bat.
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
    <div className="border border-line bg-paper p-2 md:p-3">
      <div className="relative h-[58vh] w-full overflow-hidden bg-paper-3 md:h-[80vh]">
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
      </div>
    </div>
  );
}
