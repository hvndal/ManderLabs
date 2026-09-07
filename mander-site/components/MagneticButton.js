'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * MagneticButton — a wrapper that makes its child subtly track the cursor.
 *
 * Within a configurable radius the button displaces toward the pointer by
 * up to `strength` pixels. On leave it springs back to rest. Disabled on
 * touch devices and when the user prefers reduced motion.
 *
 * Uses only `transform: translate3d()` — fully compositor-friendly.
 */
const SPRING = { stiffness: 280, damping: 22, mass: 0.6 };

export default function MagneticButton({
  children,
  className = '',
  strength = 8,
  radius = 60,
}) {
  const ref = useRef(null);
  const [isTouch, setIsTouch] = useState(false);
  const [reduced, setReduced] = useState(false);

  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  useEffect(() => {
    setIsTouch('ontouchstart' in window);
    setReduced(
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    );
  }, []);

  const handlePointerMove = useCallback(
    (e) => {
      if (isTouch || reduced) return;
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const pull = 1 - dist / radius;
        x.set(dx * pull * (strength / radius));
        y.set(dy * pull * (strength / radius));
      } else {
        x.set(0);
        y.set(0);
      }
    },
    [isTouch, reduced, radius, strength, x, y]
  );

  const handlePointerLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (reduced || isTouch) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </motion.div>
  );
}
