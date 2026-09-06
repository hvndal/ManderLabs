'use client';

import { useState } from 'react';
import Icon from './Icon';

export default function Faq({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="border-t border-line">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={item.q} className="border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="grid w-full grid-cols-1 items-baseline gap-3 py-7 text-left transition-colors hover:text-accent md:grid-cols-12 md:gap-gutter"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute md:col-span-1">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-headline-md text-ink md:col-span-10">
                  {item.q}
                </span>
                <span className="md:col-span-1 md:justify-self-end">
                  <Icon
                    name={isOpen ? 'minus' : 'plus'}
                    className="h-4 w-4 shrink-0 text-ink-mute"
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-8 md:grid md:grid-cols-12 md:gap-gutter"
            >
              {/* The answer starts in column two, under the question rather
                  than under the number — the margin stays clear the whole way
                  down, which is what makes a long list of these read as a
                  document. */}
              <p className="max-w-text text-body-lg text-ink-soft md:col-span-10 md:col-start-2">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
