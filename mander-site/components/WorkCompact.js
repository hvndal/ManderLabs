'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Reveal from './Reveal';
import Icon from './Icon';

const PER_PAGE = 3;
const DWELL = 6500; // how long a trio holds before it changes
const FADE = 700; // crossfade duration, matched by the duration-700 below

/**
 * Selected Work.
 *
 * Three tiles at a time, and the whole trio changes together rather than one
 * card swapping while its neighbours sit still — a staggered swap reads as a
 * glitch, a synchronised one reads as a deliberate change of view. It is
 * deliberately slow: six and a half seconds is long enough to read three
 * cards, and the crossfade is long enough that nothing snaps.
 *
 * It stops rotating whenever rotating would be wrong: on hover or keyboard
 * focus (so a card can't move out from under a click), while scrolled out of
 * view or on a hidden tab (no work while nobody's looking), and entirely
 * under prefers-reduced-motion, where every project renders as a plain grid
 * instead — an auto-rotating carousel is exactly what that setting is for.
 */
export default function WorkCompact({ items }) {
  const [start, setStart] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef(null);
  const swapRef = useRef(null);

  const rotates = items.length > PER_PAGE && !reduced;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Don't animate a section nobody is looking at.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(el);
    const onVis = () => setOnScreen(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  // Fade the trio out, swap it, fade it back in.
  const goTo = useCallback((next) => {
    clearTimeout(swapRef.current);
    setVisible(false);
    swapRef.current = setTimeout(() => {
      setStart(next);
      setVisible(true);
    }, FADE);
  }, []);

  useEffect(() => {
    if (!rotates || paused || !onScreen) return;
    const t = setInterval(
      () => goTo((start + PER_PAGE) % items.length),
      DWELL + FADE
    );
    return () => clearInterval(t);
  }, [rotates, paused, onScreen, start, items.length, goTo]);

  useEffect(() => () => clearTimeout(swapRef.current), []);

  // Every project is rendered, always — the rotation only decides which three
  // are displayed. Slicing the array instead would put just three cards in the
  // HTML and leave the rest existing solely inside the serialised RSC payload,
  // where a crawler reads them as data rather than as content. With seven
  // projects that quietly hid four of them from search, which is the opposite
  // of what the rest of this site is built for.
  //
  // Stepping by three with a wrap also keeps every view full, rather than
  // ending on a short page with one card and two gaps.
  const windowIdx = new Set(
    Array.from({ length: PER_PAGE }, (_, i) => (start + i) % items.length)
  );

  const pages = rotates ? Math.ceil(items.length / PER_PAGE) : 0;

  return (
    <div
      ref={rootRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className={`grid grid-cols-1 gap-8 transition-opacity duration-700 ease-premium sm:grid-cols-3 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {items.map((project, index) => (
          <div
            key={project.name}
            className={rotates && !windowIdx.has(index) ? 'hidden' : undefined}
          >
            <Reveal delay={rotates ? 0 : index * 70}>
              <WorkTile project={project} />
            </Reveal>
          </div>
        ))}
      </div>

      {rotates && (
        <div className="mt-8 flex items-center justify-center gap-3">
          {Array.from({ length: pages }, (_, i) => {
            const target = (i * PER_PAGE) % items.length;
            const active = start === target;
            return (
              <button
                key={i}
                type="button"
                onClick={() => goTo(target)}
                aria-label={`Show projects ${i * PER_PAGE + 1}–${i * PER_PAGE + PER_PAGE}`}
                aria-current={active}
                className={`h-[3px] transition-all duration-500 ease-premium ${
                  active ? 'w-8 bg-accent' : 'w-4 bg-line-strong hover:bg-ink-mute'
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function WorkTile({ project }) {
  const Wrapper = project.href ? 'a' : 'div';
  const linkProps = project.href
    ? { href: project.href, target: '_blank', rel: 'noreferrer noopener' }
    : {};

  return (
    <Wrapper
      {...linkProps}
      className="group flex h-full flex-col rounded-lg border border-transparent p-2.5 transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:border-line hover:bg-paper-2 active:scale-[0.98] active:border-line-strong active:bg-paper-2"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-paper-3">
        {project.image ? (
          <>
            <Image
              src={project.image}
              alt={`${project.name} — ${project.sector}`}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="img-zoom object-cover object-top transition-transform duration-700 ease-premium group-hover:scale-105 group-active:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95 group-active:opacity-95" />
          </>
        ) : (
          /* No screenshot yet. Rather than an empty grey box, the tile falls
             back to the wordmark set large on the ink field the rest of the
             site uses — it reads as a designed panel instead of a gap. */
          <div className="absolute inset-0 flex flex-col justify-between bg-ink p-5">
            <span className="label-caps text-paper/45">{project.sector}</span>
            <span className="font-display text-headline-lg-mobile font-normal leading-none text-paper">
              {project.name}
            </span>
            {project.stack && (
              <span className="label-caps text-paper/45">{project.stack.join(' · ')}</span>
            )}
          </div>
        )}

        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between gap-2">
          {project.logo ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={project.logo}
              alt={`${project.name} logo`}
              className="h-4 w-auto max-w-[110px] object-contain object-left opacity-95 invert transition-transform duration-300 group-hover:scale-105 group-active:scale-105"
            />
          ) : (
            <span />
          )}
          <span className="label-caps rounded bg-paper/90 px-2 py-1 text-[10px] text-ink shadow-sm">
            {project.result}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-500 ease-premium group-hover:scale-x-100 group-active:scale-x-100" />
      </div>

      <div className="mt-3.5 flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-1.5 text-body-lg font-medium text-ink transition-colors duration-300 group-hover:text-accent group-active:text-accent">
          {project.name}
          <Icon
            name="arrow"
            className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-active:translate-x-1 group-active:opacity-100"
            strokeWidth={2}
          />
        </h3>
        <span className="label-caps shrink-0 text-ink-mute">
          {/* The one honest distinction between a paid engagement and our own
              work. Cheap to render, and the alternative is implying a client
              that doesn't exist. */}
          {project.kind === 'studio' ? 'In-house' : project.sector}
        </span>
      </div>
    </Wrapper>
  );
}
