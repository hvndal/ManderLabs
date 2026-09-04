'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';
import PricingInteractive from './PricingInteractive';
import { useMarket } from './MarketProvider';

// Same two motion primitives as PricingInteractive — this is the same
// interaction one level up, not a new one.
const EASE = [0.16, 1, 0.3, 1];
const SPRING = { type: 'spring', stiffness: 210, damping: 30, mass: 0.9 };

/**
 * The Android offering, folded shut.
 *
 * Deliberately one quiet row under the website tiers rather than a section of
 * its own. Most visitors came for a website, and the $899 Growth plan has to
 * stay the loudest number on the page — so this states that apps exist, shows
 * the entry price, and gets out of the way. Anyone it is actually for will
 * open it.
 *
 * Opened, it renders the app packages through PricingInteractive — the same
 * component the website tiers use, so the card behaviour inside is identical
 * and there is nothing new to learn.
 *
 * Only the header row toggles. The body holds three cards that are themselves
 * click targets, so making the whole block a button would mean every click on
 * a package closed the thing you were reading.
 */
export default function AppPricing() {
  const market = useMarket();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group relative border border-line bg-white">
      {/* Hairline drawing across the top edge on hover — the same resting-vs-
          hovered signal the pricing cards use. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-premium group-hover:scale-x-100"
      />

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-controls="app-packages"
        className="flex w-full cursor-pointer flex-col gap-6 p-7 text-left outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ink md:flex-row md:items-center md:justify-between md:gap-10 md:p-8"
      >
        <div className="flex items-start gap-4">
          <Icon
            name="mobile"
            className="mt-0.5 hidden h-5 w-5 shrink-0 text-ink-mute sm:block"
          />
          <div>
            <span className="label-caps text-ink-mute">Android · Google Play</span>
            <h3 className="mt-2.5 text-headline-md text-ink">
              We build Android apps, too.
            </h3>
            <p className="mt-2 max-w-text text-body-md text-ink-soft">
              Native builds — custom UI, authentication, payments and push —
              shipped to the Play Store under your own developer account.
            </p>

            {/* Closed-state affordance, matched to the pricing cards */}
            <span className="mt-5 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-6 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-premium group-hover:scale-x-100"
              />
              <span className="label-caps text-ink-mute transition-all duration-500 ease-premium group-hover:translate-x-1 group-hover:text-accent">
                {isOpen ? 'Hide app packages' : 'View app packages'}
              </span>
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-5 border-t border-line pt-6 md:justify-end md:border-0 md:pt-0">
          <div className="md:text-right">
            <span className="label-caps text-[10px] text-ink-mute">Android</span>
            <span className="mt-1.5 block text-headline-md text-ink">
              Quoted per build
            </span>
          </div>
          <Icon
            name={isOpen ? 'minus' : 'plus'}
            className="h-4 w-4 shrink-0 text-ink-mute"
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="app-packages"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ height: SPRING, opacity: { duration: 0.35, ease: EASE } }}
            className="overflow-hidden"
          >
            <div className="border-t border-line p-7 md:p-8">
              <PricingInteractive tiers={market.appTiers} />
              <p className="mt-6 text-label-sm text-ink-mute">
                App builds are quoted separately from website work. Play Store
                developer account and any third-party service fees are billed
                to you directly at cost.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
