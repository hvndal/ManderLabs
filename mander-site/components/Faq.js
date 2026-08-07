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
                className="flex w-full items-start justify-between gap-6 py-7 text-left transition-colors hover:text-accent"
              >
                <span className="text-headline-md text-ink">{item.q}</span>
                <Icon
                  name={isOpen ? 'minus' : 'plus'}
                  className="mt-1.5 h-5 w-5 shrink-0 text-ink-mute"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-8 pr-8 md:pr-16"
            >
              <p className="max-w-text text-body-lg text-ink-soft">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
