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
  // The film is 4.1MB. That is fine on the sticky-scroll desktop composition
  // it was built for, and it is the actual reason a phone on cellular used to
  // fail mobile-friendliness checks — preload="auto" pulled the whole file
  // before anything else on the page finished. Below the md breakpoint the
  // stencil holds at rest against the poster image instead: same opening
  // moment, no 4MB fetch. Data Saver mode gets the same treatment regardless
  // of screen size, because it is the visitor stating the same preference
  // explicitly.
  const [skipFilm, setSkipFilm] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const set = () => setReducedMotion(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 767px)');
    const saveData = !!navigator.connection?.saveData;
    const decide = () => setSkipFilm(mqMobile.matches || saveData);
    decide();
    mqMobile.addEventListener('change', decide);
    return () => mqMobile.removeEventListener('change', decide);
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

  // vh first so iOS below 15.4 (which doesn't know svh) still gets a height
  // instead of collapsing to auto; svh layered on top where it's supported, so
  // the sticky stage doesn't jump as Safari's URL bar shows and hides.
  return (
    <section
      ref={trackRef}
      aria-label="MANDER"
      className="relative h-[165vh] supports-[height:100svh]:h-[165svh] md:h-[220vh] md:supports-[height:100svh]:h-[220svh]"
    >
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden bg-paper supports-[height:100svh]:h-[100svh]">
        {/* Film — always full bleed, only ever seen through the stencil.
            iOS needs muted + playsInline + autoPlay all present before it will
            play inline; without playsInline Safari opens it fullscreen. The
            translate3d nudge forces GPU compositing so the video doesn't tear
            or freeze against the sticky parent while scrolling on iOS. */}
        {skipFilm ? (
          /* eslint-disable-next-line @next/next/no-img-element -- fixed
             full-bleed background behind an SVG mask, not content Image
             needs to size or lazy-load. */
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
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        )}

        {/* Cream stencil with MANDER knocked out of it.
            Two cuts, because one viewBox cannot serve both orientations under
            preserveAspectRatio="slice".

            Phone: the word is STACKED — MAN over DER. A single horizontal line
            on a portrait screen can only ever be as tall as screenWidth/4.4,
            which lands around 7% of the viewport — a caption, not a masthead.
            Splitting it in two gets the block to ~37% of the screen, matching
            the desktop proportion. The viewBox is set near a phone's own
            aspect so slice barely crops.

            Desktop: one line, set large enough to overrun the box so the M and
            the R are cut by the viewport edges, and raised off the bottom so
            the empty cream above it reads as composed rather than merely
            unfilled.

            Scaling uses an SVG transform, not CSS transform-origin, which
            browsers disagree about on <g>. */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full md:hidden"
          viewBox="0 0 420 900"
          preserveAspectRatio="xMidYMid slice"
          style={{ opacity: stencilOpacity }}
        >
          <mask id="masthead-cut-sm" maskUnits="userSpaceOnUse">
            <rect x="-3000" y="-3000" width="7000" height="7000" fill="#fff" />
            <g transform={cutTransform(210, 400, letterScale)}>
              <text
                x="210"
                y="400"
                textAnchor="middle"
                fill="#000"
                style={{ ...WORDMARK, fontSize: '218px' }}
              >
                MAN
              </text>
              <text
                x="210"
                y="575"
                textAnchor="middle"
                fill="#000"
                style={{ ...WORDMARK, fontSize: '218px' }}
              >
                DER
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
          viewBox="0 0 1500 800"
          preserveAspectRatio="xMidYMid slice"
          style={{ opacity: stencilOpacity }}
        >
          <mask id="masthead-cut-lg" maskUnits="userSpaceOnUse">
            <rect x="-3000" y="-3000" width="7000" height="7000" fill="#fff" />
            <g transform={cutTransform(750, 386, letterScale)}>
              <text
                x="750"
                y="530"
                textAnchor="middle"
                fill="#000"
                style={{ ...WORDMARK, fontSize: '400px' }}
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
          <div className="container-max flex h-full flex-col justify-between py-6 md:py-8">
            {/* The head sets centred, the way a masthead actually sets. It was
                a left mark with a right-hung line of mono, which on a phone
                wrapped mid-compound ("small & mid-" / "sized") and left the
                mark and the text sitting on two different optical centres —
                so the one element that has to look composed didn't.
                Centred, the mark and the line share an axis with MANDER
                itself, and the region line is short enough to hold one line
                down to 320px. */}
            <div className="flex flex-col items-center gap-3 text-center md:gap-4">
              <Logo variant="mark" className="pointer-events-auto h-14 md:h-[72px]" />
              {/* Tracking is opened up and the size dropped a step: at this
                  width a caps line reads as a rule of small marks rather than
                  a sentence, which is what keeps it furniture and stops it
                  competing with the wordmark below. */}
              <p className="font-mono text-[9.5px] uppercase leading-none tracking-[0.3em] text-ink-mute sm:text-[11px] sm:tracking-[0.34em]">
                {mono}
              </p>
            </div>

            <p className="label-caps mx-auto max-w-[30ch] text-center text-ink-mute">
              {tagline}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
