'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { COMMUNITY } from '@/lib/content';
import CommunityRateDialog from './CommunityRateDialog';
import Reveal from './Reveal';
import Icon from './Icon';

/**
 * One drawer, many doors.
 *
 * The rate is discoverable from the pricing note, the plan cards, the main
 * section and the footer — but all of them open the same instance, so the
 * flow is written once and the page isn't carrying four copies of a modal.
 * Provider sits in the layout; anything below it can call `useCommunityRate()`.
 */
const CommunityRateContext = createContext({ open: () => {} });

export function useCommunityRate() {
  return useContext(CommunityRateContext);
}

export function CommunityRateProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <CommunityRateContext.Provider value={{ open }}>
      {children}
      <CommunityRateDialog open={isOpen} onClose={close} />
    </CommunityRateContext.Provider>
  );
}

/**
 * The quiet line that sits beside pricing. Text link, never a button — it must
 * not compete with the plan CTAs it sits next to.
 */
export function CommunityRateNote({ className = '' }) {
  const { open } = useCommunityRate();
  return (
    <p className={`text-body-md text-ink-soft ${className}`}>
      {COMMUNITY.entryPoint}{' '}
      <button
        type="button"
        onClick={open}
        className="link-underline font-medium text-ink"
      >
        {COMMUNITY.entryPointCta} <span aria-hidden="true">→</span>
      </button>
    </p>
  );
}

/** The footer's one-line mention. */
export function CommunityRateFooterLink({ className = '' }) {
  const { open } = useCommunityRate();
  return (
    <button type="button" onClick={open} className={className}>
      {COMMUNITY.footerLink}
    </button>
  );
}

/**
 * The dedicated section.
 *
 * Set on ink rather than paper — it's the one dark field on the page, which is
 * what makes it read as a statement of values rather than a promotion. The
 * flag reference is three hairlines of colour under the eyebrow and nothing
 * else: at that scale it registers as a mark, not a flag.
 *
 * The 20% is set at display scale and hangs in the left column so the eye
 * lands on the number before the argument, and the category list is plain
 * text on rules rather than cards, because cards would make it feel like a
 * product with tiers to qualify for.
 */
export function CommunityRateSection() {
  const { open } = useCommunityRate();

  return (
    <section id="community-rate" className="bg-ink text-paper">
      <div className="container-max stack-y">
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-12 md:gap-gutter md:gap-y-14">
          {/* The number.
              Set as apertured type rather than flat paper-white: at this
              scale a solid numeral sat right against the body column and the
              two masses merged into one grey block. Filling it with moving
              footage separates them by texture instead of by distance, and
              carries the masthead's motif down the page. Held to 4 of 12
              columns so it can no longer run into the copy beside it. */}
          <div className="md:col-span-4">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="label-caps text-paper/50">The rate</span>
                <span aria-hidden="true" className="flex h-[3px] w-12">
                  <span className="h-full flex-1 bg-accent" />
                  <span className="h-full flex-1 bg-paper/70" />
                  <span className="h-full flex-1 bg-[#4a6da8]" />
                </span>
              </div>

              {/* The figure, set. It used to be the percentage knocked out
                  of a stencil with video running behind the counters — a
                  trick that arrived with a display face this site no longer
                  uses, and that pulled a video file onto a page whose whole
                  job is a form. Grotesk at this size does not need help. */}
              <p className="mt-6 font-display text-[4.5rem] leading-[0.82] tracking-[-0.03em] text-paper md:mt-8 md:text-[8rem]">
                {COMMUNITY.rate}
              </p>

              <h2 className="mt-7 max-w-[18ch] text-headline-md font-semibold tracking-tight text-paper">
                {COMMUNITY.title}
              </h2>
            </Reveal>
          </div>

          {/* The argument */}
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={120}>
              <p className="max-w-[26ch] font-display text-headline-lg-mobile leading-[1.12] text-paper md:text-headline-lg">
                {COMMUNITY.lede}
              </p>
              <p className="mt-6 max-w-text text-body-md text-paper/70 md:mt-8 md:text-body-lg">
                {COMMUNITY.body}
              </p>
            </Reveal>

            <Reveal delay={180}>
              <ul className="mt-8 hidden flex-col divide-y divide-paper/15 border-y border-paper/15 md:mt-10 md:flex">
                {COMMUNITY.categories
                  .filter((c) => c.id !== 'other')
                  .map((c) => (
                    <li key={c.id} className="py-3.5 text-body-md text-paper/85">
                      {c.label}
                    </li>
                  ))}
              </ul>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-8 hidden border-l-2 border-accent pl-6 md:mt-12 md:block">
                <h3 className="text-headline-md font-semibold tracking-tight text-paper">
                  {COMMUNITY.smallBusinessTitle}
                </h3>
                <p className="mt-3 max-w-text text-body-md text-paper/70">
                  {COMMUNITY.smallBusinessBody}
                </p>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-8 flex flex-col items-start gap-5 md:mt-12">
                <button type="button" onClick={open} className="btn-on-dark">
                  {COMMUNITY.cta}
                  <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
                </button>
                <p className="text-label-sm text-paper/55">{COMMUNITY.reassurance}</p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* The terms, kept in the room rather than hidden on another page */}
        <Reveal delay={120}>
          <details className="group mt-12 border-t border-paper/15 pt-8 md:mt-24">
            <summary className="label-caps flex cursor-pointer items-center gap-3 text-paper/50 transition-colors hover:text-paper/80">
              How the rate works
              <span
                aria-hidden="true"
                className="transition-transform duration-300 ease-premium group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <ul className="mt-7 grid max-w-4xl grid-cols-1 gap-x-gutter gap-y-4 md:grid-cols-2">
              {COMMUNITY.policy.map((line) => (
                <li key={line} className="text-body-md leading-relaxed text-paper/60">
                  {line}
                </li>
              ))}
            </ul>
          </details>
        </Reveal>
      </div>
    </section>
  );
}
