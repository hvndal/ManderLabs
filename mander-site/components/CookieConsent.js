'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ANALYTICS_ENABLED,
  CONSENT_EVENT,
  OPEN_PREFERENCES_EVENT,
  getConsent,
  setConsent,
  openCookiePreferences,
} from '@/lib/analytics';

const EASE = [0.16, 1, 0.3, 1];

/**
 * The footer's way back in, mirroring CommunityRateFooterLink's shape exactly
 * — a bare button behind whatever classes the footer hands it, so it sits in
 * that link list looking like every other item rather than announcing itself
 * as a different kind of control. Renders nothing when analytics isn't
 * configured, same as everything else in this file — there is no preference
 * to reopen if nothing was ever asked.
 */
export function CookiePreferencesLink({ className = '' }) {
  if (!ANALYTICS_ENABLED) return null;
  return (
    <button type="button" onClick={openCookiePreferences} className={className}>
      Cookie preferences
    </button>
  );
}

/**
 * The cookie banner — the whole reason it can be this short is that there is
 * only one thing on this site that sets a cookie, and this is the only place
 * that asks about it. No "manage 40 vendors" preference centre, no pre-ticked
 * boxes, no button styled to look less clickable than the other one.
 *
 * Doesn't exist at all — never renders, never checks localStorage, never
 * mounts — unless NEXT_PUBLIC_GA_MEASUREMENT_ID is actually set. A site with
 * nothing to track has nothing to ask permission for.
 *
 * Reopens on demand: the footer's "Cookie preferences" link fires
 * OPEN_PREFERENCES_EVENT, which brings this back even after a decision was
 * recorded, because a choice that cannot be revisited is not really consent.
 */
export default function CookieConsent() {
  const [status, setStatus] = useState(null); // null | 'granted' | 'denied'
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ANALYTICS_ENABLED) return;

    const current = getConsent();
    setStatus(current);
    setOpen(current === null);

    const onReopen = () => {
      setStatus(getConsent());
      setOpen(true);
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, onReopen);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, onReopen);
  }, []);

  if (!ANALYTICS_ENABLED) return null;

  const choose = (value) => {
    setConsent(value);
    setStatus(value);
    setOpen(false);
  };

  const variants = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="region"
          aria-label="Cookie notice"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed inset-x-0 bottom-0 z-[90] border-t border-paper/15 bg-ink text-paper"
        >
          <div className="container-max flex flex-col gap-6 py-6 md:flex-row md:items-center md:justify-between md:gap-10 md:py-7">
            <div className="max-w-2xl">
              {status !== null && (
                <p className="label-caps mb-2 text-paper/50">
                  Currently {status === 'granted' ? 'allowed' : 'turned off'} — update it below
                </p>
              )}
              <p className="text-body-md text-paper/80">
                We&apos;d like to use Google Analytics to see which pages help
                visitors and which don&apos;t — nothing beyond that, no ad
                tracking, no data sold. That needs a cookie, so it&apos;s off
                until you say yes.{' '}
                <Link
                  href="/legal/privacy"
                  className="underline decoration-paper/40 underline-offset-4 hover:decoration-paper"
                >
                  Read the privacy policy
                </Link>
                .
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => choose('denied')} className="btn-outline-dark">
                Decline
              </button>
              <button type="button" onClick={() => choose('granted')} className="btn-on-dark">
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
