'use client';

import { useEffect, useRef, useState } from 'react';
import Logo from './Logo';

/**
 * THE MASTHEAD — the word holds the image.
 *
 * The first viewport is a field of cream with MANDER set enormous along the
 * bottom, cropped by both viewport edges. The letterforms are not filled with
 * ink: they are knocked out of a cream stencil laid over full-bleed film, so
 * the only moving thing on screen is what shows *through* the type. The word
 * is the aperture.
 *
 * On scroll the letterforms scale up and out of frame — the film escapes the
 * word — until nothing is left but the footage running full bleed. The
 * section change is therefore a change of scale, not an ending and a
 * beginning: one continuous composition rather than two stacked blocks.
 *
 * Built as a 220vh scroll track with a sticky 100vh stage inside it. Progress
 * through the track drives a single CSS custom property, which the SVG mask
 * reads. No parallax, no smooth-scroll hijack, no library.
 *
 * Reduced motion: the stencil holds at its resting scale and the track
 * collapses to a single viewport — the composition still reads, it just
 * doesn't animate.
 */
const WORDMARK = {
  fontFamily: 'var(--font-hanken), sans-serif',
  fontWeight: 600,
  letterSpacing: '-0.045em',
};

// Scale about an arbitrary point without relying on CSS transform-origin,
// which browsers disagree about on SVG <g>. Standard translate/scale/untranslate.
function cutTransform(cx, cy, scale) {
  return `translate(${cx} ${cy}) scale(${scale}) translate(${-cx} ${-cy})`;
}

export default function Masthead({ tagline, mono }) {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const set = () => setReducedMotion(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const el = trackRef.current;
    if (!el) return;

    let frame = null;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        if (total <= 0) return;
        const p = Math.min(Math.max(-rect.top / total, 0), 1);
        setProgress(p);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  // Eased so the word sits still for a beat before it starts to go.
  const eased = progress < 0.12 ? 0 : Math.pow((progress - 0.12) / 0.88, 1.6);

  // The letterforms grow from their resting size until they exceed the frame.
  const letterScale = 1 + eased * 7.5;
  // Cream burns off just after the type has left, revealing full-bleed film.
  const stencilOpacity = Math.max(0, 1 - Math.max(0, eased - 0.55) / 0.35);
  // The small furniture clears out early — it would only fight the type.
  const furniture = Math.max(0, 1 - eased / 0.35);

  return (
    <section
      ref={trackRef}
      aria-label="MANDER"
      className="relative h-[165svh] md:h-[220svh]"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-paper">
        {/* Film — always full bleed, only ever seen through the stencil */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Cream stencil with MANDER knocked out of it.
            Two cuts: a portrait viewBox for phones and a landscape one for
            everything else. With preserveAspectRatio="slice" a single viewBox
            can't serve both — on a tall phone a 3:2 box crops so hard you'd
            read "ND" instead of the word. Each is sized so the word overruns
            its box by ~15%, which is what puts the M and the R off the edges.
            Scaling uses an SVG transform rather than CSS transform-origin,
            which is inconsistent on <g> elements across browsers. */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full md:hidden"
          viewBox="0 0 420 800"
          preserveAspectRatio="xMidYMid slice"
          style={{ opacity: stencilOpacity }}
        >
          <mask id="masthead-cut-sm" maskUnits="userSpaceOnUse">
            <rect x="-3000" y="-3000" width="7000" height="7000" fill="#fff" />
            <g transform={cutTransform(210, 636, letterScale)}>
              <text
                x="210"
                y="700"
                textAnchor="middle"
                fill="#000"
                style={{ ...WORDMARK, fontSize: '132px' }}
              >
                MANDER
              </text>
            </g>
          </mask>
          <rect
            x="-3000"
            y="-3000"
            width="7000"
            height="7000"
            fill="#f4f2ec"
            mask="url(#masthead-cut-sm)"
          />
        </svg>

        <svg
          aria-hidden="true"
          className="absolute inset-0 hidden h-full w-full md:block"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          style={{ opacity: stencilOpacity }}
        >
          <mask id="masthead-cut-lg" maskUnits="userSpaceOnUse">
            <rect x="-3000" y="-3000" width="7000" height="7000" fill="#fff" />
            <g transform={cutTransform(600, 572, letterScale)}>
              <text
                x="600"
                y="690"
                textAnchor="middle"
                fill="#000"
                style={{ ...WORDMARK, fontSize: '330px' }}
              >
                MANDER
              </text>
            </g>
          </mask>
          <rect
            x="-3000"
            y="-3000"
            width="7000"
            height="7000"
            fill="#f4f2ec"
            mask="url(#masthead-cut-lg)"
          />
        </svg>

        {/* Furniture — deliberately sparse. No button in the first viewport. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ opacity: furniture }}
        >
          <div className="container-max flex h-full flex-col justify-between py-7 md:py-9">
            <div className="flex items-start justify-between gap-8">
              <Logo variant="mark" className="pointer-events-auto h-9 md:h-11" />
              <p className="label-caps max-w-[19ch] pt-1 text-right text-ink-mute md:max-w-none">
                {mono}
              </p>
            </div>

            <p className="label-caps max-w-[24ch] text-ink-mute">{tagline}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
