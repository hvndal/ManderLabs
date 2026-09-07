'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * CursorImage — wraps an image container and applies subtle inverse
 * displacement on pointer move, creating depth without scroll hijacking.
 *
 * The image shifts 2-4px opposite to the cursor direction, suggesting
 * the image sits on a plane slightly behind the viewport. Springs back
 * on pointer leave.
 *
 * Disabled on touch devices and reduced motion.
 * Uses only `transform: translate3d()` — compositor-friendly.
 */
const SPRING = { stiffness: 150, damping: 20, mass: 0.5 };

export default function CursorImage({
  children,
  className = '',
  strength = 4,
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

      // Normalize to -1..1 within the element bounds
      const nx = (e.clientX - cx) / (rect.width / 2);
      const ny = (e.clientY - cy) / (rect.height / 2);

      // Inverse displacement — image moves opposite to cursor
      x.set(-nx * strength);
      y.set(-ny * strength);
    },
    [isTouch, reduced, strength, x, y]
  );

  const handlePointerLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (reduced || isTouch) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div style={{ x, y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
