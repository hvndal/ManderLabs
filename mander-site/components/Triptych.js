'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import Logo from './Logo';

/**
 * THE TRIPTYCH — three panels, one composition.
 *
 * The homepage opens on WEB / SOCIAL / BRAND standing side by side at full
 * viewport height, read as one spread rather than three cards. Everything
 * here is in service of that one idea, so a few things are done deliberately
 * against the grain of how a section like this is usually built:
 *
 * The panels share edges rather than sit in a grid with gaps — a single
 * hairline between them, no padding around the set, no rounded corners. Gaps
 * would turn a triptych into three boxes, which is the thing it must not
 * look like.
 *
 * They are not identical. WEB carries film, SOCIAL carries photography under
 * an aggressive crop, BRAND carries almost nothing but type. The contrast
 * between the three is the composition; making them consistent would flatten
 * it into a card row.
 *
 * Hovering one panel widens it and narrows the other two (flex-grow on a
 * spring), so the set redistributes rather than one panel popping forward.
 * Nothing scales, nothing lifts, nothing shadows — it is one continuous
 * object rearranging its own proportions.
 *
 * A salmon hairline runs through all three at a constant height, crossing the
 * dividers. It is the only element allowed to ignore the panel boundaries,
 * which is what makes them read as connected.
 *
 * Mobile stacks them, because three 33vw columns of vertical type on a phone
 * is a poster, not a website. Reduced motion keeps the layout and drops the
 * spring, the film and the zooms.
 */

const EASE = [0.16, 1, 0.3, 1];
const SPRING = { type: 'spring', stiffness: 150, damping: 26, mass: 0.9 };

const PANELS = [
  {
    id: 'web',
    label: 'WEB',
    discipline: 'Web Design & Digital Experiences',
    index: '01',
    href: '/#services',
    meta: ['Sites', 'Interfaces', 'Build'],
  },
  {
    id: 'social',
    label: 'SOCIAL',
    discipline: 'Social Media & Content',
    index: '02',
    href: '/#work',
    meta: ['Content', 'Direction', 'Reach'],
  },
  {
    id: 'brand',
    label: 'BRAND',
    discipline: 'Brand Strategy & Identity',
    index: '03',
    href: '/#services',
    meta: ['Identity', 'Systems', 'Voice'],
  },
];

/** Panel 01 — film, cropped to a column and dimmed under the type. */
function WebPanel({ active, quiet }) {
  const videoRef = useRef(null);
  const [canPlay, setCanPlay] = useState(false);

  // The film is 4MB. It is the right opening on a desktop composition and the
  // wrong thing to push down a phone on cellular, so below md — and whenever
  // Data Saver is on, which is the visitor saying the same thing out loud —
  // the poster frame holds the panel instead. Same image, no fetch.
  useEffect(() => {
    if (quiet) return;
    const mq = window.matchMedia('(min-width: 768px)');
    const decide = () => setCanPlay(mq.matches && !navigator.connection?.saveData);
    decide();
    mq.addEventListener('change', decide);
    return () => mq.removeEventListener('change', decide);
  }, [quiet]);

  return (
    <>
      <div className="absolute inset-0 overflow-hidden bg-ink">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: active ? 1.06 : 1 }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          {canPlay ? (
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src="/videos/hero.mp4"
              poster="/hero-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/hero-poster.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          )}
        </motion.div>
        {/* Graded rather than blanketed: dark at the foot where the type sits,
            almost clear at the top where the footage should breathe. */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/15" />
      </div>

      {/* Interface fragment — three hairlines and a caret, the smallest
          possible gesture at "this is a screen" without drawing a fake browser
          chrome, which would date the page in a year. */}
      <div className="pointer-events-none absolute right-6 top-24 hidden w-28 md:block">
        <motion.div
          animate={{ opacity: active ? 1 : 0.45 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="space-y-2"
        >
          <div className="h-px w-full bg-paper/50" />
          <div className="h-px w-2/3 bg-paper/35" />
          <div className="h-px w-5/6 bg-paper/25" />
        </motion.div>
      </div>
    </>
  );
}

/** Panel 02 — motion and type, no faces. */
function SocialPanel({ active, quiet }) {
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    if (quiet) return;
    const mq = window.matchMedia('(min-width: 768px)');
    const decide = () => setCanPlay(mq.matches && !navigator.connection?.saveData);
    decide();
    mq.addEventListener('change', decide);
    return () => mq.removeEventListener('change', decide);
  }, [quiet]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      {/* The marble footage, not the team's headshots.
          Portraits of the five people who work here were the wrong argument
          for a panel about content: a studio's own staff photographs read as
          an about page, and the panel is meant to read as the work. Stock is
          the obvious alternative and could not be fetched — every image host
          is unreachable from the build environment — so this uses the
          abstract footage already in the repository, which is closer to the
          right register anyway: a surface in motion behind type, rather than
          a picture of somebody being creative. Swapping in real stock is one
          `src` on this element; see the note in the README. */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: active ? 1.08 : 1 }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        {canPlay ? (
          <video
            className="h-full w-full object-cover"
            src="/videos/marble.mp4"
            poster="/marble-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/marble-poster.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        )}
      </motion.div>

      {/* Graded to ink so the panel sits between the film on its left and the
          cream on its right rather than competing with either. */}
      <div className="absolute inset-0 bg-ink/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />

      {/* A contact sheet drawn rather than photographed: six frames on the
          grid, one of them filled. It says "content, scheduled" in the
          vocabulary the rest of the page is already using — rules and
          proportion — instead of borrowing a stranger's face to say it. */}
      <div className="pointer-events-none absolute inset-x-6 top-[16%] hidden md:block">
        <motion.div
          className="grid grid-cols-3 gap-2"
          animate={{ opacity: active ? 1 : 0.55, y: active ? -6 : 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`aspect-[4/5] border ${
                i === 1
                  ? 'border-accent-soft bg-accent-soft/25'
                  : 'border-paper/25'
              }`}
            />
          ))}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute right-6 top-[58%] hidden max-w-[10rem] text-right md:block">
        <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-paper/70">
          Fig. 02
          <br />
          six frames,
          <br />
          one published
        </p>
      </div>
    </div>
  );
}

/** Panel 03 — quiet, typographic, the mark doing the work. */
function BrandPanel({ active }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-paper">
      {/* A construction grid at the weight of a pencil line — the only
          literal identity-system reference on the page. */}
      <div className="absolute inset-0">
        <div className="absolute left-[24%] top-0 h-full w-px bg-line" />
        <div className="absolute left-[70%] top-0 h-full w-px bg-line" />
        <div className="absolute left-0 top-[30%] h-px w-full bg-line" />
      </div>

      {/* The M drawn rather than placed. The logo files in /public are a
          line-art lockup with a wordmark and a tagline baked in — legible at
          poster size, mush at panel scale, and it would sit on top of the
          word BRAND rather than beside it. This is the same letterform the
          favicon uses, as vector, so it holds any size and takes the panel's
          own ink colour. */}
      <motion.svg
        viewBox="0 0 48 48"
        className="absolute right-[6%] top-[34%] h-auto w-[46%] text-ink"
        animate={{ scale: active ? 1.06 : 1, opacity: active ? 1 : 0.85 }}
        transition={{ duration: 0.9, ease: EASE }}
        aria-hidden="true"
      >
        <path
          d="M11 37V11l13 16 13-16v26"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </motion.svg>

      {/* One glyph at three sizes says "system" faster than a paragraph
          about systems does. */}
      <div className="pointer-events-none absolute left-6 top-[34%] hidden items-baseline gap-3 md:flex">
        <span className="font-display text-5xl leading-none text-ink">M</span>
        <span className="font-display text-3xl leading-none text-ink/55">M</span>
        <span className="font-display text-xl leading-none text-ink/30">M</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-paper via-paper/80 to-transparent" />
    </div>
  );
}

const ART = { web: WebPanel, social: SocialPanel, brand: BrandPanel };

export default function Triptych({ tagline, region }) {
  const [hovered, setHovered] = useState(null);
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="MANDER — web, social, brand"
      className="relative border-b border-line bg-paper"
      onMouseLeave={() => setHovered(null)}
    >
      {/* Masthead line. Not a hero — one line of metadata across the top of
          the spread, the way a magazine sets a running head. */}
      <div className="relative z-20 flex items-baseline justify-between gap-6 border-b border-line px-margin-mobile py-4 md:px-margin-desktop">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
          {region}
        </span>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute sm:block">
          {tagline}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
          Est. Studio
        </span>
      </div>

      <div className="relative flex flex-col md:h-[calc(100svh-76px-42px)] md:min-h-[560px] md:flex-row">
        {PANELS.map((panel, i) => {
          const Art = ART[panel.id];
          const isActive = hovered === panel.id;
          const isDimmed = hovered !== null && !isActive;
          // WEB and SOCIAL carry photography under an ink wash; BRAND is the
          // one panel on cream. The type colour follows the ground, not the
          // panel index.
          const dark = panel.id !== 'brand';

          return (
            <motion.div
              key={panel.id}
              className={`group relative h-[62svh] min-h-[420px] overflow-hidden md:h-auto ${
                i > 0 ? 'border-t border-line md:border-l md:border-t-0' : ''
              }`}
              style={{ flexBasis: 0, flexGrow: 1 }}
              animate={
                reduced
                  ? {}
                  : { flexGrow: isActive ? 1.55 : isDimmed ? 0.78 : 1 }
              }
              transition={SPRING}
              onMouseEnter={() => setHovered(panel.id)}
              onFocusCapture={() => setHovered(panel.id)}
            >
              <Art active={isActive} quiet={reduced} />

              {/* The whole panel is the target. A visible focus ring on the
                  link keeps it operable from the keyboard without drawing a
                  button into a composition that should not have one. */}
              <Link
                href={panel.href}
                className="absolute inset-0 z-10 flex flex-col justify-between p-6 outline-none md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
                      dark ? 'text-paper/70' : 'text-ink-mute'
                    }`}
                  >
                    {panel.index}
                  </span>
                  <motion.span
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
                      dark ? 'text-paper' : 'text-accent'
                    }`}
                  >
                    View ↗
                  </motion.span>
                </div>

                <div>
                  {/* The word, set to the panel rather than to a type scale —
                      it should feel cut to fit, and crowd its own column. */}
                  <h2
                    className={`font-display leading-[0.86] tracking-[-0.02em] ${
                      dark ? 'text-paper' : 'text-ink'
                    }`}
                    style={{ fontSize: 'clamp(2.75rem, 7.5vw, 6rem)' }}
                  >
                    {panel.label}
                  </h2>

                  <div
                    className={`mt-5 h-px w-full origin-left ${
                      dark ? 'bg-paper/30' : 'bg-line-strong'
                    }`}
                  />

                  <p
                    className={`mt-5 max-w-[26ch] text-body-md ${
                      dark ? 'text-paper/80' : 'text-ink-soft'
                    }`}
                  >
                    {panel.discipline}
                  </p>

                  {/* Metadata, revealed on hover — the panel has more to say
                      than it shows at rest. */}
                  <motion.ul
                    animate={{
                      opacity: isActive || reduced ? 1 : 0,
                      y: isActive || reduced ? 0 : 8,
                    }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="mt-6 flex flex-wrap gap-x-5 gap-y-2"
                  >
                    {panel.meta.map((item) => (
                      <li
                        key={item}
                        className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
                          dark ? 'text-paper/60' : 'text-ink-mute'
                        }`}
                      >
                        {item}
                      </li>
                    ))}
                  </motion.ul>
                </div>
              </Link>
            </motion.div>
          );
        })}

        {/* The thread. One salmon hairline at a fixed height across the whole
            spread, over the dividers and under the type — the only thing on
            the page that refuses to acknowledge the panel edges, which is
            precisely what makes the three of them read as one object. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[38%] z-[5] hidden h-px bg-accent-soft md:block"
        />
      </div>
    </section>
  );
}
