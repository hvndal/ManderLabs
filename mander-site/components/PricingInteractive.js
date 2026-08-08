'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';
import { BRAND } from '@/lib/content';

// The one shared easing curve for every motion primitive on the site.
const EASE = [0.16, 1, 0.3, 1];

// The expand/collapse runs on a spring rather than a fixed duration. A tween
// samples the same curve regardless of refresh rate, so on a 120Hz panel it
// looks identical to 60Hz — technically smoother, perceptually the same. A
// spring is solved per frame, so it genuinely uses the extra frames, and the
// card settles instead of stopping. Tuned slightly overdamped: no visible
// bounce, just weight.
const SPRING = { type: 'spring', stiffness: 210, damping: 30, mass: 0.9 };

const featureListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};
const featureItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};

/**
 * Four tiers shown equally, side by side. Click one and it expands in place —
 * width grows on desktop, height grows on mobile — while the others dim and
 * narrow. `items-start` on the row keeps every card's own height independent,
 * so a taller open card never stretches its closed siblings. Only one card
 * can be open; opening a new one closes whichever was open, both animating
 * together via framer-motion's `layout`.
 */
export default function PricingInteractive({ tiers }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="flex flex-col gap-px overflow-hidden border border-line bg-line md:flex-row md:items-start">
      {tiers.map((tier, i) => {
        const isOpen = openIndex === i;
        const isDimmed = openIndex !== null && !isOpen;

        return (
          <motion.article
            key={tier.name}
            layout
            transition={{ layout: SPRING }}
            onClick={() => setOpenIndex(isOpen ? null : i)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setOpenIndex(isOpen ? null : i);
              }
            }}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            className="group relative flex cursor-pointer flex-col bg-white p-7 outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ink md:p-8"
            style={{ flexGrow: isOpen ? 2.35 : 1, flexBasis: 0, flexShrink: 0 }}
            animate={{
              opacity: isDimmed ? 0.5 : 1,
              // Closed cards recede a hair as one opens — the row reads as one
              // object reorganising rather than four boxes changing size.
              scale: isDimmed ? 0.985 : 1,
            }}
            transition={{
              opacity: { duration: 0.4, ease: EASE },
              scale: SPRING,
            }}
          >
            {/* Header — always visible, identical anatomy across all four */}
            <motion.div layout="position" transition={SPRING} className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-headline-md text-ink">{tier.name}</h3>
                {tier.featured && (
                  <span className="label-caps mt-2 inline-block bg-accent px-2 py-1 text-[10px] text-on-accent">
                    Most chosen
                  </span>
                )}
              </div>
              <Icon
                name={isOpen ? 'minus' : 'plus'}
                className="mt-1 h-4 w-4 shrink-0 text-ink-mute transition-transform duration-300"
              />
            </motion.div>

            <motion.div layout="position" transition={SPRING} className="mt-6 flex items-baseline gap-2">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={isOpen ? 'open' : 'closed'}
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className={isOpen ? 'text-stat-lg text-ink' : 'text-stat-md text-ink'}
                >
                  {tier.price}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.p layout="position" transition={SPRING} className="mt-4 text-body-md text-ink-soft">
              {tier.blurb}
            </motion.p>

            {/* Specs — the three numbers a buyer compares before reading any
                feature list, on the closed card so the row is scannable
                without opening anything. */}
            {tier.specs && (
              <motion.dl
                layout="position"
                transition={SPRING}
                className="mt-6 grid grid-cols-3 gap-3 border-y border-line py-4"
              >
                {[
                  ['Scope', tier.specs.pages],
                  ['Timeline', tier.specs.timeline],
                  ['Revisions', tier.specs.revisions],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="label-caps text-[10px] text-ink-mute">{k}</dt>
                    <dd className="mt-1.5 text-label-sm font-medium text-ink">{v}</dd>
                  </div>
                ))}
              </motion.dl>
            )}

            {/* Collapsed preview — three headline features, always present */}
            {!isOpen && (
              <ul className="mt-5 flex flex-1 flex-col gap-3">
                {tier.features.slice(0, 3).map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink" strokeWidth={2} />
                    <span className="text-body-md text-ink-soft">{f}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Expanded content — sequential reveal, then the CTA slides in */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <motion.ul
                    variants={featureListVariants}
                    initial="hidden"
                    animate="visible"
                    className="mt-6 flex flex-col gap-3.5"
                  >
                    {tier.detailed.map((f) => (
                      <motion.li
                        key={f}
                        variants={featureItemVariants}
                        className="flex items-start gap-2.5"
                      >
                        <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink" strokeWidth={2} />
                        <span className="text-body-md text-ink-soft">{f}</span>
                      </motion.li>
                    ))}
                  </motion.ul>

                  {/* Who it's for — one line, does more work than three
                      more ticks would. */}
                  {tier.bestFor && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: EASE,
                        delay: 0.06 + tier.detailed.length * 0.06,
                      }}
                      className="mt-7 border-l-2 border-accent/40 pl-4 text-body-md text-ink-soft"
                    >
                      <span className="label-caps mb-1.5 block text-ink-mute">Best for</span>
                      {tier.bestFor}
                    </motion.p>
                  )}

                  {/* And the ceiling. A pricing table that only says yes is
                      why people ring up asking what the catch is. */}
                  {tier.notIncluded?.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: EASE,
                        delay: 0.1 + tier.detailed.length * 0.06,
                      }}
                      className="mt-6"
                    >
                      <span className="label-caps mb-3 block text-ink-mute">
                        Not in this tier
                      </span>
                      <ul className="flex flex-col gap-2">
                        {tier.notIncluded.map((f) => (
                          <li key={f} className="flex items-start gap-2.5">
                            <Icon
                              name="close"
                              className="mt-1 h-3 w-3 shrink-0 text-line-strong"
                              strokeWidth={2}
                            />
                            <span className="text-body-md text-ink-mute">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: EASE,
                      delay: 0.16 + tier.detailed.length * 0.06,
                    }}
                    className="mt-8"
                  >
                    {/* Buying is a conversation, not a checkout — this goes
                        straight to a person rather than into the quiz. */}
                    <a
                      href={`mailto:${BRAND.email}?subject=${encodeURIComponent(
                        `${tier.name} — enquiry from the MANDER site`
                      )}`}
                      onClick={(e) => e.stopPropagation()}
                      className="btn-primary w-full"
                    >
                      {tier.cta}
                      <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
                    </a>

                    {/* Quiet, never a discount badge */}
                    <p className="label-caps mt-4 text-ink-mute">
                      20% Community Rate available
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Closed-state affordance — kept out of the way, click anywhere works.
                The rule wipes in from the left on hover and the label shifts
                with it, so the whole card reads as one target rather than the
                words being the only live thing on it. */}
            {!isOpen && (
              <span className="mt-6 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-6 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-premium group-hover:scale-x-100"
                />
                <span className="label-caps text-ink-mute transition-all duration-500 ease-premium group-hover:translate-x-1 group-hover:text-accent">
                  View details
                </span>
              </span>
            )}

            {/* A hairline that draws across the top edge on hover — the only
                thing separating a hovered card from a resting one, which is
                all the signal a click target this large needs. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-premium group-hover:scale-x-100"
            />
          </motion.article>
        );
      })}
    </div>
  );
}
