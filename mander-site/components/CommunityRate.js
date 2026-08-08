'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { COMMUNITY } from '@/lib/content';
import CommunityRateDialog from './CommunityRateDialog';
import AperturedType from './AperturedType';
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
      <div className="container-max py-stack-lg">
        <div className="grid grid-cols-1 gap-y-14 md:grid-cols-12 md:gap-gutter">
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

              <AperturedType
                text={COMMUNITY.rate}
                viewBox="0 0 460 300"
                fontSize={250}
                baselineY={238}
                stencil="#1c1512"
                maskId="aperture-community-rate"
                mediaClassName="brightness-[1.32] contrast-[0.88] saturate-[1.05]"
                className="mt-8 w-full max-w-[420px]"
              />

              <h2 className="mt-7 max-w-[18ch] text-headline-md font-semibold tracking-tight text-paper">
                {COMMUNITY.title}
              </h2>
            </Reveal>
          </div>

          {/* The argument */}
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={120}>
              <p className="max-w-[26ch] text-headline-lg-mobile font-medium leading-[1.12] tracking-tight text-paper md:text-headline-lg">
                {COMMUNITY.lede}
              </p>
              <p className="mt-8 max-w-text text-body-lg text-paper/70">
                {COMMUNITY.body}
              </p>
            </Reveal>

            <Reveal delay={180}>
              <ul className="mt-10 flex flex-col divide-y divide-paper/15 border-y border-paper/15">
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
              <div className="mt-12 border-l-2 border-accent pl-6">
                <h3 className="text-headline-md font-semibold tracking-tight text-paper">
                  {COMMUNITY.smallBusinessTitle}
                </h3>
                <p className="mt-3 max-w-text text-body-md text-paper/70">
                  {COMMUNITY.smallBusinessBody}
                </p>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-12 flex flex-col items-start gap-5">
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
          <details className="group mt-24 border-t border-paper/15 pt-8">
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
