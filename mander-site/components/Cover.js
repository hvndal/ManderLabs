'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from './Icon';
import { Caption } from './Editorial';
import { PILLARS } from '@/lib/pillars';
import { trackEvent } from '@/lib/analytics';
import { useMarket } from './MarketProvider';

/**
 * THE COVER.
 *
 * What stood here was a triptych: three panels with art in them, sharing
 * edges. Sharing edges was never enough to make three boxes into a spread,
 * and on a phone it was three 76svh panels stacked — three screens of
 * scrolling before the site had said anything at all.
 *
 * This is built the way a cover is built instead. The masthead sits across
 * the top. One headline, set larger than anything else on the site, takes the
 * left two thirds. Under it a standfirst and the two things a visitor came to
 * do. One image runs off the right edge of the page — bleeding past the
 * container rather than sitting inside it, because an image that respects the
 * margin is an illustration and an image that ignores it is a photograph. And
 * along the foot, the contents: the five places the site goes, numbered.
 *
 * The contents list is doing real work beyond the look. The complaint that
 * the site was "hard to act on" was accurate — a quote, the plans and the
 * phone number were all a scroll away. Every one of them is now on the first
 * screen without a single button competing with the headline.
 */
export default function Cover({ tagline, region, headline, standfirst }) {
  const market = useMarket();

  // Five contents entries: the three pillars, then the work and the plans.
  const contents = [
    ...PILLARS.map((p) => ({
      index: p.index,
      label: p.label,
      line: p.line,
      href: p.href,
    })),
    { index: '04', label: 'WORK', line: 'Selected projects and what we did on them.', href: '/work' },
    { index: '05', label: 'PLANS', line: 'How the work is scoped, quoted and paid for.', href: '/pricing' },
  ];

  return (
    <section className="relative border-b border-line bg-paper" aria-label="MANDER — brand, digital and growth">
      {/* Masthead. One rule, two pieces of information, nothing else. */}
      <div className="container-max flex items-baseline justify-between gap-6 border-b border-line py-4">
        <span className="rail text-ink">MANDER — Design Studio</span>
        <span className="rail text-right text-ink-mute">
          Metro Vancouver
          <span className="hidden sm:inline"> · 49.2827° N 123.1207° W</span>
        </span>
      </div>

      <div className="grid grid-cols-1 items-start lg:grid-cols-12">
        {/* ------------------------------------------------------- The text */}
        <div className="container-max py-10 lg:col-span-7 lg:pr-0 lg:pt-20 xl:py-24">
          <h1 className="max-w-[11ch] font-display text-display-cover text-ink">
            {headline}
          </h1>

          <p className="mt-8 max-w-[42ch] text-body-lg leading-[1.6] text-ink-soft first-letter:float-left first-letter:mr-3 first-letter:mt-[0.09em] first-letter:font-editorial first-letter:text-[3.6em] first-letter:leading-[0.78] first-letter:text-ink md:mt-10">
            {standfirst}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-9 gap-y-5 md:mt-12">
            <Link
              href="/quote"
              onClick={() => trackEvent('quote_shortcut_click', { location: 'cover', market: market.id })}
              className="btn-primary"
            >
              Get a quote
              <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
            </Link>

            {/* The market's own direct line — the North American number
                outside India, nothing inside it, where WhatsApp is the
                number and WhatsAppCta in the nav and footer carries it. */}
            {market.phone && (
              <a
                href={market.phone.href}
                onClick={() =>
                  trackEvent('contact_phone_click', { market: market.id, location: 'cover' })
                }
                className="btn-outline"
              >
                <Icon name="phone" className="h-3.5 w-3.5" strokeWidth={2} />
                {market.phone.display}
              </a>
            )}
          </div>
        </div>

        {/* ------------------------------------------------------ The image */}
        {/* Off the right edge on desktop, a band under the text on a phone.
            Full-bleed on purpose: the container margin is what made every
            image on this site read as an illustration inside an article. */}
        <figure className="lg:col-span-5 lg:pt-20 xl:pt-24">
          <CoverImage />
          <div className="container-max lg:pl-0">
            <Caption figure="01">
              {tagline} — {region}.
            </Caption>
          </div>
        </figure>
      </div>

      {/* ----------------------------------------------------- The contents */}
      <nav aria-label="Contents" className="container-max pb-8 pt-10 md:pb-14 md:pt-20">
        <span className="rail block text-ink-mute">In this issue</span>
        <ul className="mt-5 border-t border-line">
          {contents.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 border-b border-line py-4 md:grid-cols-12 md:gap-gutter md:py-5"
              >
                <span className="rail text-ink-mute transition-colors group-hover:text-accent md:col-span-1">
                  {item.index}
                </span>
                <span className="font-display text-[1.75rem] leading-none text-ink transition-colors group-hover:text-accent md:col-span-4 md:text-[2.25rem]">
                  {item.label}
                </span>
                <span className="col-span-2 hidden text-body-md text-ink-soft md:col-span-6 md:block">
                  {item.line}
                </span>
                <Icon
                  name="arrow"
                  className="h-4 w-4 shrink-0 text-ink-mute transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent md:col-span-1 md:justify-self-end"
                  strokeWidth={2}
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

/**
 * The cover image.
 *
 * The film is 4 MB. It is the right opening on a desktop and the wrong thing
 * to push down a phone on cellular, so below md — and whenever Data Saver is
 * on, which is the visitor saying the same thing out loud — the poster frame
 * holds the frame instead. Same image, no fetch. This is the gate the hero
 * panel used to carry, kept exactly as it was.
 */
function CoverImage() {
  const [canPlay, setCanPlay] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const decide = () =>
      setCanPlay(mq.matches && !reduce.matches && !navigator.connection?.saveData);
    decide();
    mq.addEventListener('change', decide);
    reduce.addEventListener('change', decide);
    return () => {
      mq.removeEventListener('change', decide);
      reduce.removeEventListener('change', decide);
    };
  }, []);

  return (
    // Graded, not shown raw and not flattened to grayscale either. The
    // source footage is lit magenta and green — genuinely garish next to
    // the rest of the page if it ran unedited, but a full desaturation was
    // overcorrecting: it made this the one photograph on the homepage that
    // looked like a black-and-white print rather than the brand's own
    // color. A partial desaturation plus a navy multiply wash pulls the
    // clashing RGB lighting into the site's own accent-deep family instead
    // — still visibly a color photo, just cohered to the palette around it.
    <div className="relative aspect-[3/2] w-full overflow-hidden bg-ink [&_img]:saturate-[0.6] [&_img]:contrast-[1.1] [&_video]:saturate-[0.6] [&_video]:contrast-[1.1] sm:aspect-[16/10] lg:aspect-[3/4]">
      {canPlay ? (
        <video
          ref={ref}
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
        <Image
          src="/hero-poster.jpg"
          alt="A designer at work on a graphics tablet"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 42vw"
          className="object-cover"
        />
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-accent-deep/25 mix-blend-multiply"
      />
    </div>
  );
}
