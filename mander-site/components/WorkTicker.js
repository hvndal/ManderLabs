'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Fast on purpose. The old rotating grid this borrows its mechanics from held
// a trio for 7.2 seconds, which is long enough that a reader starts waiting on
// it — the reason it was cut. At 2.5s nobody waits: it reads as a window with
// something moving past it, which is all it is meant to be.
const DWELL = 2000;
const FADE = 500;

/**
 * One small window, cycling the work screenshots.
 *
 * Everything this shows is already beside it as text in WorkIndex, which is
 * what makes the window decorative rather than load-bearing — and what makes
 * it safe to hide from assistive tech instead of narrating four screenshots
 * that change every two seconds.
 *
 * Only the projects with a real screenshot cycle here. The four without one
 * are in the index beside this, not rendered as typographic plates in the
 * frame: a plate is text, and text flashing past at this speed is unreadable
 * decoration pretending to be content.
 *
 * No dots, no links, no buttons — the brief was explicitly a window you can't
 * click. It does pause on hover and on focus-within, which costs nothing to
 * that brief and is the only pause mechanism available to a mouse or keyboard
 * user; prefers-reduced-motion stops it moving at all.
 */
export default function WorkTicker({ items }) {
  const [index, setIndex] = useState(0);
  const [onScreen, setOnScreen] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const ref = useRef(null);

  const frames = items.filter((project) => project.image);
  const rotates = frames.length > 1 && !reduced;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Off-screen and hidden-tab pausing is a performance measure, not an
  // accessibility one — a timer repainting a panel nobody is looking at is
  // just battery.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(el);

    const onVisibility = () => setOnScreen(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  useEffect(() => {
    if (!rotates || paused || !onScreen) return;
    const timer = setInterval(
      () => setIndex((n) => (n + 1) % frames.length),
      DWELL + FADE
    );
    return () => clearInterval(timer);
  }, [rotates, paused, onScreen, frames.length]);

  if (frames.length === 0) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="select-none"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-paper-2">
        {/* Every frame is mounted and stacked; only opacity moves. Swapping
            the src on a single Image would show an empty frame on each tick
            at this speed, which is the whole reason this crossfades. */}
        {frames.map((project, n) => (
          <Image
            key={project.name}
            src={project.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            style={{ transitionDuration: `${FADE}ms` }}
            className={`object-cover object-top transition-opacity ease-premium ${
              n === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* Captioned on the same clock as the frame, so a screenshot is never
          labelled with the previous project's name. Hand-built rather than
          Editorial's Caption, which is a figcaption and cannot be stacked. */}
      <div className="relative mt-3 h-[1.6em] border-t border-line pt-2.5">
        {frames.map((project, n) => (
          <span
            key={project.name}
            style={{ transitionDuration: `${FADE}ms` }}
            className={`absolute inset-x-0 top-2.5 flex items-baseline gap-3 transition-opacity ease-premium ${
              n === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="rail shrink-0 text-ink-mute">
              Fig. {String(n + 1).padStart(2, '0')}
            </span>
            <span className="truncate text-label-sm text-ink-mute">
              {project.name} — {project.location}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
