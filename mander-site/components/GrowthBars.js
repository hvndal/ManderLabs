'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * A small animated bar chart — the "your numbers go up" visual, without a
 * stock photo. Bars sit flat until scrolled into view, then rise to their
 * target height together (PayPal's savings-tracker chart was the direct
 * reference). On hover they warm from a neutral line colour to the brand
 * accent, same trigger as the row's index number.
 *
 * Pure SVG-free CSS/DOM — no image request, no layout shift, respects
 * reduced motion by skipping straight to the resting state.
 */
const DEFAULT_VALUES = [0.32, 0.4, 0.38, 0.56, 0.5, 0.72, 0.64, 1];

export default function GrowthBars({ values = DEFAULT_VALUES, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) {
      setVisible(true);
      return;
    }
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`flex h-14 items-end gap-[5px] md:h-16 ${className}`}
    >
      {values.map((v, i) => (
        <span
          key={i}
          className="w-[7px] origin-bottom bg-line-strong transition-all ease-premium group-hover:bg-accent md:w-2"
          style={{
            height: '100%',
            transform: visible ? `scaleY(${v})` : 'scaleY(0.045)',
            transitionProperty: 'transform, background-color',
            transitionDuration: '650ms, 400ms',
            transitionDelay: `${i * 55}ms, 0ms`,
          }}
        />
      ))}
    </div>
  );
}
