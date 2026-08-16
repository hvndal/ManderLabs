'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMMUNITY, BRAND } from '@/lib/content';
import { submitForm } from '@/lib/forms';
import Icon from './Icon';

const EASE = [0.16, 1, 0.3, 1];

const FIELD =
  'w-full border-0 border-b border-line bg-transparent px-0 py-3 text-body-lg text-ink transition-colors duration-300 placeholder:text-ink-mute/50 focus:border-ink focus:outline-none focus:ring-0';

/**
 * The Community Rate request — a drawer, not a form page.
 *
 * Two steps, because three would start to feel like an application: pick what
 * brings you here, then name, email and an optional note. Nothing is required
 * beyond a name and an email, no upload field exists anywhere in the flow, and
 * the confirmation hint under each category is phrased to lower the stakes
 * ("your word is enough") rather than to set a bar.
 *
 * Enters from the right on desktop and from the bottom on phones, over an ink
 * scrim. Focus is trapped while open, Escape closes, and the page behind is
 * locked so the drawer feels like a surface rather than a div.
 */
export default function CommunityRateDialog({ open, onClose }) {
  const [category, setCategory] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  // Reset only once fully closed, so the content doesn't flicker on the way out
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      setCategory(null);
      setStatus('idle');
      setError('');
    }, 400);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab') return;
      const nodes = panelRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!nodes?.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => closeRef.current?.focus(), 60);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [open, onClose]);

  const chosen = COMMUNITY.categories.find((c) => c.id === category);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.botcheck) return;

    setStatus('sending');

    const result = await submitForm({
      subject: `Community Rate request — ${chosen?.label || 'Unspecified'}`,
      from_name: 'MANDER website',
      category: chosen?.label,
      name: data.name,
      email: data.email,
      note: data.note,
    });

    if (result.ok) {
      setStatus('sent');
      form.reset();
    } else {
      setError(result.message);
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100]">
          <motion.button
            type="button"
            aria-label="Close"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/40 backdrop-blur-[2px]"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={COMMUNITY.title}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[560px] flex-col overflow-y-auto bg-paper"
          >
            {/* A single hairline of flag colour — the only patriotic gesture */}
            <div aria-hidden="true" className="flex h-[3px] w-full shrink-0">
              <span className="h-full flex-1 bg-accent" />
              <span className="h-full flex-1 bg-paper-3" />
              <span className="h-full flex-1 bg-[#1f3a63]" />
            </div>

            <div className="flex items-start justify-between gap-6 px-7 pt-7 md:px-10 md:pt-9">
              <div>
                <p className="label-caps text-accent">{COMMUNITY.rate} off</p>
                <h2 className="mt-3 font-display text-headline-lg-mobile font-normal text-ink">
                  {COMMUNITY.title}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="-mr-2 -mt-1 p-2 text-ink-mute transition-colors hover:text-ink"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 px-7 pb-10 pt-8 md:px-10">
              {status === 'sent' ? (
                <div>
                  <p className="label-caps mb-4 text-accent">Received</p>
                  <p className="text-headline-md text-ink">
                    Thanks — we&apos;ll come back to you within one business day
                    with the rate applied.
                  </p>
                  <p className="mt-5 text-body-md text-ink-soft">
                    Nothing else needed from you right now.
                  </p>
                  <button type="button" onClick={onClose} className="btn-primary mt-9">
                    Close
                  </button>
                </div>
              ) : (
                <>
                  {/* Step 1 — what brings you here */}
                  <fieldset>
                    <legend className="label-caps text-ink-mute">
                      What brings you here?
                    </legend>
                    <div className="mt-5 flex flex-col divide-y divide-line border-y border-line">
                      {COMMUNITY.categories.map((c) => {
                        const active = category === c.id;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setCategory(c.id)}
                            aria-pressed={active}
                            className="group flex items-center justify-between gap-5 py-4 text-left transition-colors duration-300 ease-premium"
                          >
                            <span
                              className={`text-body-lg transition-colors duration-300 ${
                                active ? 'text-accent' : 'text-ink group-hover:text-accent'
                              }`}
                            >
                              {c.label}
                            </span>
                            <span
                              aria-hidden="true"
                              className={`h-[7px] w-[7px] shrink-0 transition-all duration-300 ease-premium ${
                                active
                                  ? 'scale-100 bg-accent'
                                  : 'scale-0 bg-line-strong group-hover:scale-100'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  {/* Step 2 — the little we actually need */}
                  <AnimatePresence initial={false}>
                    {chosen && (
                      <motion.form
                        key="details"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="mt-9"
                      >
                        <input
                          type="checkbox"
                          name="botcheck"
                          tabIndex={-1}
                          autoComplete="off"
                          className="hidden"
                          aria-hidden="true"
                        />

                        <p className="border-l-2 border-accent/40 pl-4 text-body-md text-ink-soft">
                          {chosen.hint}
                        </p>

                        <div className="mt-7 flex flex-col gap-6">
                          <div>
                            <label htmlFor="cr-name" className="label-caps mb-1 block text-ink-mute">
                              Name
                            </label>
                            <input
                              id="cr-name"
                              name="name"
                              type="text"
                              required
                              autoComplete="name"
                              className={FIELD}
                              placeholder="Your name"
                            />
                          </div>
                          <div>
                            <label htmlFor="cr-email" className="label-caps mb-1 block text-ink-mute">
                              Email
                            </label>
                            <input
                              id="cr-email"
                              name="email"
                              type="email"
                              required
                              autoComplete="email"
                              className={FIELD}
                              placeholder="you@example.com"
                            />
                          </div>
                          <div>
                            <label htmlFor="cr-note" className="label-caps mb-1 block text-ink-mute">
                              Anything you&apos;d like to add{' '}
                              <span className="normal-case tracking-normal">(optional)</span>
                            </label>
                            <textarea
                              id="cr-note"
                              name="note"
                              rows={3}
                              className={`${FIELD} resize-y`}
                              placeholder="Only if it helps. A link, a line, or nothing at all."
                            />
                          </div>
                        </div>

                        {status === 'error' && (
                          <p
                            role="alert"
                            className="mt-6 border border-error/30 bg-error/5 px-4 py-3 text-label-sm text-error"
                          >
                            {error}{' '}
                            <a
                              href={`mailto:${BRAND.email}?subject=${encodeURIComponent(
                                'Community Rate request'
                              )}`}
                              className="underline underline-offset-2"
                            >
                              Email us directly
                            </a>
                            .
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={status === 'sending'}
                          className="btn-primary mt-9 w-full disabled:opacity-60"
                        >
                          {status === 'sending' ? 'Sending…' : 'Send request'}
                          <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
                        </button>

                        <p className="mt-5 text-label-sm text-ink-mute">
                          {COMMUNITY.reassurance}
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
