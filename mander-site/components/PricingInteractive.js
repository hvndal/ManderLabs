'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';

// The one shared easing curve for every motion primitive on the site.
const EASE = [0.16, 1, 0.3, 1];

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
            transition={{ layout: { duration: 0.5, ease: EASE } }}
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
            animate={{ opacity: isDimmed ? 0.45 : 1 }}
            transition={{ opacity: { duration: 0.35, ease: EASE } }}
          >
            {/* Header — always visible, identical anatomy across all four */}
            <motion.div layout="position" className="flex items-start justify-between gap-4">
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

            <motion.div layout="position" className="mt-6 flex items-baseline gap-2">
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

            <motion.p layout="position" className="mt-4 text-body-md text-ink-soft">
              {tier.blurb}
            </motion.p>

            {/* Collapsed preview — three headline features, always present */}
            {!isOpen && (
              <ul className="mt-6 flex flex-1 flex-col gap-3">
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

                  <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: EASE,
                      delay: 0.1 + tier.detailed.length * 0.06,
                    }}
                    className="mt-8"
                  >
                    <Link
                      href="/quote"
                      onClick={(e) => e.stopPropagation()}
                      className="btn-primary w-full"
                    >
                      {tier.cta}
                      <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Closed-state affordance — kept out of the way, click anywhere works */}
            {!isOpen && (
              <span className="label-caps mt-6 text-ink-mute transition-colors duration-300 group-hover:text-ink">
                View details
              </span>
            )}
          </motion.article>
        );
      })}
    </div>
  );
}
