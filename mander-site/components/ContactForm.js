'use client';

import { useState } from 'react';
import Icon from './Icon';
import { TIERS, BRAND } from '@/lib/content';
import { submitForm } from '@/lib/forms';
import { trackEvent } from '@/lib/analytics';

const FIELD =
  'w-full border border-line bg-white px-4 py-3 text-body-md text-ink transition-colors duration-200 placeholder:text-ink-mute/60 focus:border-ink focus:outline-none focus:ring-0';

/**
 * The site's contact form.
 *
 * This used to render the whole form with `className="hidden"` and show a
 * mailto card in its place — the markup was written but deliberately switched
 * off, and nothing imported the component at all, so there was no working
 * form anywhere on the site. It's live now; the mailto stays underneath as a
 * secondary route for people who'd rather use their own mail client.
 */
export default function ContactForm({ defaultPlan = 'Growth' }) {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot — bots fill hidden fields, humans don't. Bail silently rather
    // than showing an error, so a bot gets no signal about why it failed.
    if (data.botcheck) return;

    setStatus('sending');

    const result = await submitForm({
      subject: `New enquiry from ${data.name || 'the MANDER website'}`,
      from_name: 'MANDER website',
      name: data.name,
      email: data.email,
      plan: data.plan,
      message: data.message,
    });

    if (result.ok) {
      // The conversion that matters. No email address or message body goes
      // to GA — just the fact of an enquiry and which plan it was about.
      trackEvent('generate_lead', {
        form: 'contact',
        plan: data.plan || 'unspecified',
      });
      setStatus('sent');
      form.reset();
    } else {
      trackEvent('form_error', { form: 'contact' });
      setError(result.message);
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="border border-line bg-white p-10 text-center">
        <p className="label-caps mb-3 text-accent">Received</p>
        <p className="text-headline-md text-ink">
          Thanks — we&apos;ll be in touch within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="label-caps mt-6 text-ink-soft underline-offset-4 hover:text-ink hover:underline"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-line bg-white p-8 md:p-10">
      {/* Hidden from people and from assistive tech; only a bot fills it. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="label-caps mb-2 block text-ink-mute">
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={FIELD}
            placeholder="Jane Halden"
          />
        </div>

        <div>
          <label htmlFor="cf-email" className="label-caps mb-2 block text-ink-mute">
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={FIELD}
            placeholder="jane@company.com"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="cf-plan" className="label-caps mb-2 block text-ink-mute">
            Plan of interest
          </label>
          <select id="cf-plan" name="plan" defaultValue={defaultPlan} className={FIELD}>
            {TIERS.map((tier) => (
              <option key={tier.name} value={tier.name}>
                {tier.name} — {tier.price}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className="label-caps mb-2 block text-ink-mute">
            What are you building?
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            className={`${FIELD} resize-y`}
            placeholder="A little about the business, the goal, and your timeline."
          />
        </div>
      </div>

      {status === 'error' && (
        <p
          role="alert"
          className="mt-6 border border-accent/40 bg-accent/5 px-4 py-3 text-label-sm text-ink"
        >
          {error}{' '}
          <a
            href={`mailto:${BRAND.email}?subject=${encodeURIComponent(
              'New project enquiry'
            )}`}
            className="underline underline-offset-2"
          >
            Or email us directly
          </a>
          .
        </p>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-primary disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send enquiry'}
          {status !== 'sending' && (
            <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
          )}
        </button>
        <a
          href={`mailto:${BRAND.email}?subject=${encodeURIComponent(
            'New project enquiry'
          )}`}
          className="link-underline label-caps text-ink-soft"
        >
          Or email {BRAND.email}
        </a>
      </div>

      <p className="mt-4 text-label-sm text-ink-mute">
        No obligation. We reply within one business day.
      </p>
    </form>
  );
}
