'use client';

import { useState } from 'react';
import { TIERS, BRAND } from '@/lib/content';

const FIELD =
  'w-full border border-line bg-white px-4 py-3 text-body-md text-ink transition-colors duration-200 placeholder:text-ink-mute/60 focus:border-ink focus:outline-none focus:ring-0';

// Set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local — see .env.local.example.
// The key is bound to the inbox you registered at web3forms.com, so it is safe
// to expose in the browser; it can only deliver to that address.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const FALLBACK_EMAIL = BRAND.email;

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot — bots fill hidden fields, humans don't.
    if (data.botcheck) return;

    if (!ACCESS_KEY) {
      setError(
        'The form is not connected yet. Add NEXT_PUBLIC_WEB3FORMS_KEY to .env.local and restart the dev server.'
      );
      setStatus('error');
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New enquiry from ${data.name || 'the MANDER website'}`,
          from_name: 'MANDER website',
          name: data.name,
          email: data.email,
          plan: data.plan,
          message: data.message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('sent');
        form.reset();
      } else {
        setError(result.message || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setError('Could not reach the mail service. Check your connection and try again.');
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
    <div>
      {/* Webform code preserved, visually hidden */}
      <form
        onSubmit={handleSubmit}
        className="hidden"
        aria-hidden="true"
      >
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
            <label htmlFor="name" className="label-caps mb-2 block text-ink-mute">
              Name
            </label>
            <input id="name" name="name" type="text" required autoComplete="name" className={FIELD} placeholder="Jane Halden" />
          </div>

          <div>
            <label htmlFor="email" className="label-caps mb-2 block text-ink-mute">
              Email
            </label>
            <input id="email" name="email" type="email" required autoComplete="email" className={FIELD} placeholder="jane@company.com" />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="plan" className="label-caps mb-2 block text-ink-mute">
              Plan of interest
            </label>
            <select id="plan" name="plan" defaultValue="Growth" className={FIELD}>
              {TIERS.map((tier) => (
                <option key={tier.name} value={tier.name}>
                  {tier.name} — {tier.price}
                </option>
              ))}
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="message" className="label-caps mb-2 block text-ink-mute">
              What are you building?
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className={`${FIELD} resize-y`}
              placeholder="A little about the business, the goal, and your timeline."
            />
          </div>
        </div>

        <button type="submit" disabled={status === 'sending'} className="btn-primary">
          Send enquiry
        </button>
      </form>

      {/* Visually active direct contact card */}
      <div className="border border-line bg-white p-8 text-center md:p-12">
        <span className="label-caps mb-3 block text-accent">Get in touch</span>
        <h3 className="text-headline-md font-semibold text-ink">
          Ready to start your project?
        </h3>
        <p className="mx-auto mt-4 max-w-md text-body-lg text-ink-soft">
          Email us directly about your business, goals, and timeline. We reply within one business day.
        </p>
        <div className="mt-8">
          <a
            href={`mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(
              'New project enquiry'
            )}`}
            className="btn-primary"
          >
            Email {FALLBACK_EMAIL}
          </a>
        </div>
        <p className="mt-4 text-label-sm text-ink-mute">
          No obligation. Directly connected to our team.
        </p>
      </div>
    </div>
  );
}
