'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * ScrollVelocity — wraps large display type and applies subtle vertical
 * compression proportional to scroll speed.
 *
 * Fast scrolling compresses the type to ~scaleY(0.96), slow/stopped
 * scrolling returns to scaleY(1.0). Creates a "wind" feeling on large
 * display numerals without any visible mechanism.
 *
 * Uses only `transform: scaleY()` — compositor-friendly.
 */
const SPRING = { stiffness: 300, damping: 30, mass: 0.8 };

export default function ScrollVelocity({
  children,
  className = '',
  intensity = 0.04,
}) {
  const [reduced, setReduced] = useState(false);
  const scaleY = useSpring(1, SPRING);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const rafId = useRef(null);

  useEffect(() => {
    setReduced(
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    );
  }, []);

  useEffect(() => {
    if (reduced) return;

    const onScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        const now = Date.now();
        const dt = Math.max(now - lastTime.current, 1);
        const dy = Math.abs(window.scrollY - lastScrollY.current);
        const velocity = dy / dt; // px/ms

        // Clamp velocity effect: 0 at rest, `intensity` at very fast scroll
        const compression = Math.min(velocity * 0.012, intensity);
        scaleY.set(1 - compression);

        lastScrollY.current = window.scrollY;
        lastTime.current = now;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [reduced, intensity, scaleY]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} style={{ scaleY, originY: 0.5 }}>
      {children}
    </motion.div>
  );
}
