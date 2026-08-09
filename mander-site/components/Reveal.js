'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Fades + lifts children into view once. Degrades to "always visible" if
 * IntersectionObserver is missing or the user prefers reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    setMobile(isMobile);

    // Fire *before* the element reaches the viewport, not as it crosses.
    // Waiting for it to be on screen means the animation plays over content
    // the eye has already landed on, which is what reads as lag. A positive
    // bottom margin arms it roughly a third of a screen early on phones, so
    // by the time it's actually looked at it has already settled.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setVisible(true);
          observer.unobserve(entry.target);
        });
      },
      {
        // Any sliver counts on mobile. A 12% threshold on a tall block can
        // require most of a phone screen before it trips.
        threshold: isMobile ? 0 : 0.08,
        rootMargin: isMobile ? '0px 0px 22% 0px' : '0px 0px -8% 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Stagger is a desktop device. On a phone the items in a stagger are
  // stacked rather than side by side, so a 60–70ms step compounds down the
  // column into a visible cascade — the "one at a time" clunk. Compressed to
  // a third and capped, it's a soft offset instead of a queue.
  const stagger = mobile ? Math.min(delay * 0.34, 90) : delay;

  return (
    <Tag
      ref={ref}
      style={stagger ? { transitionDelay: `${Math.round(stagger)}ms` } : undefined}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </Tag>
  );
}
