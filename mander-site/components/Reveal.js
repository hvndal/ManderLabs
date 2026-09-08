'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Context-aware scroll reveal primitive with varied motion signatures:
 * - 'fade-up' (default): subtle 12px lift for cards and paragraphs
 * - 'mask': vertical clip-curtain reveal for monumental editorial headlines
 * - 'scale': 0.975 -> 1.0 soft zoom for architectural photographic plates
 * - 'line': horizontal rule drawing across like drafting pen
 * - 'slide-left': horizontal entry from the right for asymmetrical accents
 * - 'none': static stillness without scroll animations
 *
 * Degrades to "always visible" if IntersectionObserver is missing or the user prefers reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  variant = 'fade-up',
  as: Tag = 'div',
  className = '',
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(true);
      return;
    }

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    setMobile(isMobile);

    // Fire *before* the element reaches the viewport, not as it crosses.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setVisible(true);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: isMobile ? 0 : 0.04,
        rootMargin: isMobile ? '0px 0px 24% 0px' : '0px 0px 48px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (variant === 'none') {
    return <Tag className={className}>{children}</Tag>;
  }

  // Stagger is compressed on phones to prevent cascading queues
  const stagger = mobile ? Math.min(delay * 0.34, 90) : delay;

  let variantClass = 'reveal';
  if (variant === 'mask') variantClass = 'reveal-mask';
  else if (variant === 'scale') variantClass = 'reveal-scale';
  else if (variant === 'line') variantClass = 'reveal-line';
  else if (variant === 'slide-left') variantClass = 'reveal-slide-left';

  return (
    <Tag
      ref={ref}
      style={stagger ? { transitionDelay: `${Math.round(stagger)}ms` } : undefined}
      className={`${variantClass} ${visible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </Tag>
  );
}
