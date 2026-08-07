'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from './Icon';
import { QUIZ, TIERS, BRAND } from '@/lib/content';

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
// Used only when the form itself fails to send — the guaranteed-working
// inbox, bypassing the mander.tech forwarding chain BRAND.email depends on.
const FALLBACK_EMAIL = 'hundalg968@gmail.com';

const TIER_ORDER = ['Brand Launch', 'Starter', 'Growth', 'Business Pro'];

function scoreAnswers(answers) {
  const totals = {};
  let forceSales = false;

  QUIZ.questions.forEach((q) => {
    const chosen = answers[q.id];
    if (chosen == null) return;
    const opt = q.options[chosen];
    if (!opt) return;
    Object.entries(opt.weights).forEach(([key, val]) => {
      if (key === 'sales') {
        forceSales = true;
        return;
      }
      totals[key] = (totals[key] || 0) + val;
    });
  });

  // Highest total wins; ties break to the higher tier.
  let best = 'Starter';
  let bestScore = -1;
  TIER_ORDER.forEach((name) => {
    const s = totals[name] || 0;
    if (s >= bestScore) {
      bestScore = s;
      best = name;
    }
  });

  return { tier: best, forceSales };
}

export default function Quiz() {
  const total = QUIZ.questions.length;
  const [step, setStep] = useState(0); // 0..total-1 questions, then result
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');
  const [contact, setContact] = useState({ name: '', email: '' });

  const done = step >= total;
  const result = useMemo(() => (done ? scoreAnswers(answers) : null), [done, answers]);
  const recommended = result ? TIERS.find((t) => t.name === result.tier) : null;

  const choose = (qId, optIndex) => {
    setAnswers((a) => ({ ...a, [qId]: optIndex }));
    // Small delay so the selection is visible before advancing.
    setTimeout(() => setStep((s) => s + 1), 180);
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const submit = async (event) => {
    event.preventDefault();
    setError('');

    if (!ACCESS_KEY) {
      setError('The form is not connected yet. Add NEXT_PUBLIC_WEB3FORMS_KEY to .env.local and restart.');
      setStatus('error');
      return;
    }

    // Human-readable answer summary for the email.
    const summary = QUIZ.questions
      .map((q) => {
        const opt = q.options[answers[q.id]];
        return `• ${q.question}\n   ${opt ? opt.label : '—'}`;
      })
      .join('\n');

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Quiz lead — ${result.tier}${result.forceSales ? ' (wants sales)' : ''} — ${contact.name || 'no name'}`,
          from_name: 'MANDER quiz',
          name: contact.name,
          email: contact.email,
          recommended_plan: result.tier,
          from_price: recommended ? `$${recommended.from}` : '',
          wants_sales: result.forceSales ? 'yes' : 'no',
          answers: summary,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) setStatus('sent');
      else {
        setError(data.message || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setError('Could not reach the mail service. Check your connection and try again.');
      setStatus('error');
    }
  };

  // ------------------------------------------------------------- Result view
  if (done && result) {
    if (status === 'sent') {
      return (
        <div className="mx-auto max-w-text text-center">
          <span className="eyebrow justify-center">All set</span>
          <h2 className="h-section">Thanks — that&apos;s on its way to us.</h2>
          <p className="mt-5 text-body-lg text-ink-soft">
            We&apos;ll review your answers and come back within one business day
            with a fixed-price proposal for the <strong>{result.tier}</strong> plan.
          </p>
          <Link href="/" className="btn-outline mt-10">Back to home</Link>
        </div>
      );
    }

    return (
      <div className="mx-auto max-w-3xl">
        <div className="border border-line bg-white">
          {/* Recommendation header — ink block */}
          <div className="bg-ink p-8 text-paper md:p-10">
            <span className="label-caps text-paper/60">Recommended for you</span>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-headline-lg-mobile font-semibold tracking-tight md:text-headline-lg">
                {result.tier}
              </h2>
              {recommended && (
                <p className="text-stat-md">
                  from ${recommended.from}
                </p>
              )}
            </div>
            <p className="mt-4 max-w-text text-body-lg text-paper/80">
              {QUIZ.reasons[result.tier]}
            </p>
          </div>

          {/* What's included + reasoning */}
          <div className="p-8 md:p-10">
            {result.forceSales && (
              <p className="mb-8 border border-accent/40 bg-accent/5 px-4 py-3 text-body-md text-ink">
                Your answers suggest something custom — we&apos;ll want a quick
                call rather than a boxed plan. Send it over and we&apos;ll reach out.
              </p>
            )}

            {recommended && (
              <ul className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {recommended.detailed.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-ink" strokeWidth={2} />
                    <span className="text-body-md text-ink-soft">{f}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Capture contact + send */}
            <form onSubmit={submit} className="border-t border-line pt-8">
              <p className="text-body-md text-ink-soft">
                Want the full proposal? Leave your details and we&apos;ll send it over.
              </p>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={contact.name}
                  onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                  className="w-full border border-line bg-white px-4 py-3 text-body-md text-ink placeholder:text-ink-mute/60 focus:border-ink focus:outline-none"
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={contact.email}
                  onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                  className="w-full border border-line bg-white px-4 py-3 text-body-md text-ink placeholder:text-ink-mute/60 focus:border-ink focus:outline-none"
                />
              </div>

              {status === 'error' && (
                <p role="alert" className="mt-4 border border-error/30 bg-error/5 px-4 py-3 text-label-sm text-error">
                  {error}{' '}
                  <a href={`mailto:${FALLBACK_EMAIL}`} className="underline underline-offset-2">Or email us</a>.
                </p>
              )}

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:opacity-60">
                  {status === 'sending' ? 'Sending…' : 'Send me the proposal'}
                </button>
                <a href={`mailto:${BRAND.email}`} className="link-underline label-caps text-ink-soft">
                  Or talk to sales
                </a>
              </div>
            </form>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setStep(0)}
          className="link-underline label-caps mx-auto mt-8 flex text-ink-mute"
        >
          Retake the quiz
        </button>
      </div>
    );
  }

  // ---------------------------------------------------------- Question view
  const q = QUIZ.questions[step];
  const progress = Math.round((step / total) * 100);

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <span className="label-caps text-ink-mute">
            Question {step + 1} / {total}
          </span>
          {step > 0 && (
            <button type="button" onClick={back} className="link-underline label-caps text-ink-mute">
              Back
            </button>
          )}
        </div>
        <div className="mt-3 h-px w-full bg-line">
          <div
            className="h-px bg-ink transition-all duration-500 ease-premium"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div key={q.id} className="animate-slide-in">
        <h2 className="text-headline-lg-mobile font-semibold tracking-tight text-ink md:text-headline-lg">
          {q.question}
        </h2>

        <div className="mt-8 flex flex-col gap-3">
          {q.options.map((opt, i) => {
            const selected = answers[q.id] === i;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => choose(q.id, i)}
                className={`group flex items-center justify-between gap-4 border px-6 py-5 text-left transition-colors duration-200 ${
                  selected
                    ? 'border-ink bg-ink text-paper'
                    : 'border-line bg-white text-ink hover:border-ink'
                }`}
              >
                <span className="text-body-lg">{opt.label}</span>
                <Icon
                  name="arrow"
                  className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                    selected ? 'text-paper' : 'text-ink-mute group-hover:translate-x-1 group-hover:text-ink'
                  }`}
                  strokeWidth={2}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
