'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';

const FAQ_SPRING = { type: 'spring', stiffness: 260, damping: 28, mass: 0.8 };

export default function Faq({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="border-t border-line">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={item.q} className="border-b border-line group">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-start justify-between gap-6 py-7 text-left transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              >
                <span
                  className={`text-headline-md transition-colors duration-200 ${
                    isOpen ? 'text-accent' : 'text-ink group-hover:text-accent'
                  }`}
                >
                  {item.q}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-1.5 shrink-0"
                >
                  <Icon
                    name={isOpen ? 'minus' : 'plus'}
                    className={`h-5 w-5 transition-colors duration-200 ${
                      isOpen ? 'text-accent' : 'text-ink-mute group-hover:text-accent'
                    }`}
                  />
                </motion.div>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={FAQ_SPRING}
                  className="overflow-hidden"
                >
                  <div className="pb-8 pr-8 md:pr-16">
                    <p className="max-w-text text-body-lg text-ink-soft leading-relaxed">{item.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
