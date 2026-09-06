'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from './Icon';
import { BRAND } from '@/lib/content';
import { submitForm } from '@/lib/forms';
import { trackEvent } from '@/lib/analytics';
import { useMarket } from './MarketProvider';
import WhatsAppCta from './WhatsAppCta';

// Used only when the form itself fails to send. Now the same public address
// as everything else, so there is one inbox to keep alive rather than two.
const FALLBACK_EMAIL = BRAND.email;

const TIER_ORDER = ['Launch', 'Starter', 'Growth', 'Business Pro'];

// Scoring is market-independent on purpose. It works in the US tier names,
// which are the vocabulary the weights were written in; a market that sells a
// different ladder maps the answer onto its own plans through
// `market.quizTierAlias` rather than carrying a second set of weights that
// would have to be kept in sync with this one.
function scoreAnswers(questions, answers) {
  const totals = {};
  let forceSales = false;

  questions.forEach((q) => {
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
  const market = useMarket();
  const quiz = market.quiz;
  const total = quiz.questions.length;
  const [step, setStep] = useState(0); // 0..total-1 questions, then result
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');
  const [contact, setContact] = useState({ name: '', email: '' });

  const done = step >= total;
  const result = useMemo(
    () => (done ? scoreAnswers(quiz.questions, answers) : null),
    [done, answers, quiz]
  );

  // The scored tier translated into this market's plan names — an identity
  // lookup in the US, two-into-one in India.
  const planName = result
    ? market.quizTierAlias?.[result.tier] || result.tier
    : null;
  const recommended = planName
    ? market.tiers.find((t) => t.name === planName)
    : null;

  const choose = (qId, optIndex) => {
    setAnswers((a) => ({ ...a, [qId]: optIndex }));
    // Small delay so the selection is visible before advancing.
    setTimeout(() => setStep((s) => s + 1), 180);
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const submit = async (event) => {
    event.preventDefault();
    setError('');

    // Human-readable answer summary for the email.
    const summary = quiz.questions
      .map((q) => {
        const opt = q.options[answers[q.id]];
        return `• ${q.question}\n   ${opt ? opt.label : '—'}`;
      })
      .join('\n');

    setStatus('sending');

    const sent = await submitForm({
      subject: `Quiz lead — ${planName}${result.forceSales ? ' (wants sales)' : ''} — ${contact.name || 'no name'}`,
      from_name: 'MANDER quiz',
      name: contact.name,
      email: contact.email,
      recommended_plan: planName,
      wants_sales: result.forceSales ? 'yes' : 'no',
      market: market.id.toUpperCase(),
      answers: summary,
    });

    if (sent.ok) {
      // Which tier the quiz recommends, and how often it hands someone to
      // sales, is the only read there is on whether the quiz is worth having.
      trackEvent('generate_lead', {
        form: 'quiz',
        plan: planName,
        wants_sales: result.forceSales ? 'yes' : 'no',
        market: market.id,
      });
      setStatus('sent');
    } else {
      trackEvent('form_error', { form: 'quiz', market: market.id });
      setError(sent.message);
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
            with a fixed-price proposal for the <strong>{planName}</strong> plan.
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
              <h2 className="font-display text-headline-lg-mobile font-normal md:text-headline-lg">
                {planName}
              </h2>
              {recommended && (
                <p className="label-caps text-paper/60">Fixed price, quoted</p>
              )}
            </div>
            <p className="mt-4 max-w-text text-body-lg text-paper/80">
              {quiz.reasons[result.tier]}
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
                <WhatsAppCta tone="link" location="quiz-result" />
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
  const q = quiz.questions[step];
  const progress = Math.round((step / total) * 100);

  return (
    <div className="mx-auto max-w-4xl">
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
        <div className="grid grid-cols-1 gap-4 border-t border-line pt-6 md:grid-cols-12 md:gap-gutter">
          <div className="md:col-span-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              Question {String(step + 1).padStart(2, '0')}
            </span>
          </div>
          <h2 className="font-display text-headline-lg-mobile font-normal leading-[1.05] text-ink md:col-span-10 md:text-headline-lg">
            {q.question}
          </h2>
        </div>

        <div className="mt-10 flex flex-col">
          {q.options.map((opt, i) => {
            const selected = answers[q.id] === i;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => choose(q.id, i)}
                className={`group grid w-full grid-cols-1 items-baseline gap-3 border-t border-line py-6 text-left transition-colors duration-200 last:border-b md:grid-cols-12 md:gap-gutter ${
                  selected ? 'bg-ink text-paper' : 'text-ink hover:bg-paper-2'
                }`}
              >
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.22em] md:col-span-1 md:pl-2 ${
                    selected ? 'text-paper/60' : 'text-ink-mute'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-body-lg md:col-span-10">{opt.label}</span>
                <span className="md:col-span-1 md:justify-self-end md:pr-2">
                  <Icon
                    name="arrow"
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                      selected
                        ? 'text-paper'
                        : 'text-ink-mute group-hover:translate-x-1 group-hover:text-ink'
                    }`}
                    strokeWidth={2}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
