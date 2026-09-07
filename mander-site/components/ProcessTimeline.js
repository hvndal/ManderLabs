'use client';

import { useState } from 'react';
import Image from 'next/image';
import Reveal from './Reveal';
import CursorImage from './CursorImage';

/**
 * SECTION NINE — The Delivery Protocol as an architectural sequence.
 *
 * Replaces the plain text list with an authoritative 4-stage protocol:
 * - 4 interactive stage cards with timing pills, clear deliverables, and hover elevation.
 * - Right column: authentic physical design craft proof (/editorial/studio-set.jpg)
 *   grounding the methodology in physical grid rigor and tactile prototyping.
 * - Hardware-accelerated GPU transitions optimized for 120fps / 165Hz displays.
 */
export default function ProcessTimeline({ steps, sidebar }) {
  const [activeStep, setActiveStep] = useState(0);

  const defaultSidebar = {
    eyebrow: 'DELIVERY COMMITMENTS',
    title: 'Transparent Execution. Zero Friction.',
    body: 'We believe ambitious small business owners should never wonder where their website build stands. We ship on a fixed schedule with weekly video updates and transparent milestones.',
    image: '/editorial/studio-set.jpg',
    imageAlt: 'Mander tactile UI wireframing in design notebook alongside mobile test device',
    imageTag: 'STAGE 02 // PROTOTYPING ON PAPER',
    standardsTitle: 'COMMERCIAL PROTOCOL STANDARDS:',
    standards: [
      'FIXED SCOPE & PRICE (NO HOURLY OVERRUNS)',
      'CONTINUOUS LIVE PREVIEW ENVIRONMENTS',
      'LIGHTHOUSE 99+ AUDITED PERFORMANCE SLA',
      'COMPLETE CODE, REPO & IP OWNERSHIP HANDOVER',
    ],
  };

  const side = { ...defaultSidebar, ...sidebar };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      {/* Left Column: Integrated Architectural Delivery Sequence */}
      <ol className="lg:col-span-7 border-t border-b border-line divide-y divide-line">
        {steps.map((step, index) => {
          const isActive = activeStep === index;

          return (
            <Reveal key={step.step} delay={index * 80}>
              <li
                onMouseEnter={() => setActiveStep(index)}
                className={`group relative transition-all duration-300 ease-premium p-6 sm:p-8 cursor-pointer ${
                  isActive
                    ? 'bg-paper-2'
                    : 'bg-transparent hover:bg-paper-2/60'
                }`}
              >
                {/* Active Left Indicator Rule */}
                {isActive && (
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-accent transition-all duration-300" />
                )}

                {/* Top Row: Stage Number, Timing Badge & Title */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-baseline gap-4">
                    <span
                      className={`font-display text-3xl sm:text-4xl font-normal leading-none transition-colors duration-300 ${
                        isActive ? 'text-accent' : 'text-line-strong group-hover:text-ink'
                      }`}
                    >
                      {step.step}
                    </span>
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-accent block font-semibold">
                        {step.timing || `PHASE 0${index + 1}`}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl text-ink leading-tight mt-0.5">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest transition-colors duration-300 shrink-0 mt-1 ${
                      isActive ? 'text-accent font-semibold' : 'text-ink-mute'
                    }`}
                  >
                    PHASE // 0{index + 1}
                  </span>
                </div>

                {/* Body Rationale */}
                <p className="font-sans text-sm sm:text-base text-ink-soft leading-relaxed font-light mb-4 max-w-xl">
                  {step.body}
                </p>

                {/* Deliverables Taxonomy */}
                {step.deliverables && step.deliverables.length > 0 && (
                  <div className="pt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-ink-mute">
                    <span className="text-ink font-semibold">DELIVERABLES //</span>
                    <span className="text-ink-soft">{step.deliverables.join('  ·  ')}</span>
                  </div>
                )}
              </li>
            </Reveal>
          );
        })}
      </ol>

      {/* Right Column: Authentic Editorial Design Craft Panel */}
      <div className="lg:col-span-5 lg:sticky lg:top-28">
        <Reveal delay={120}>
          <div className="border border-line bg-white p-6 sm:p-8 shadow-xl">
            {/* Visual Photo: UX Wireframing & Prototype */}
            <div className="relative aspect-[4/3] border border-line bg-black/5 overflow-hidden group mb-6">
              <CursorImage strength={3} className="w-full h-full">
                <Image
                  src={side.image}
                  alt={side.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                />
              </CursorImage>
              <div className="absolute bottom-3 left-3 bg-ink/90 text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 border border-white/10">
                {side.imageTag}
              </div>
            </div>

            {/* Protocol Summary Card */}
            <div>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-accent block font-semibold mb-2">
                {side.eyebrow}
              </span>
              <h4 className="font-display text-2xl text-ink mb-3 leading-snug">
                {side.title}
              </h4>
              <p className="font-sans text-sm text-ink-soft leading-relaxed font-light mb-6">
                {side.body}
              </p>

              {/* Technical Criteria Checklist with Architectural Numbering */}
              <div className="border-t border-line pt-5 space-y-3 font-mono text-[10px] uppercase tracking-wider text-ink-mute">
                <div className="flex items-center gap-2 text-ink font-semibold text-[10.5px]">
                  <span className="h-1.5 w-1.5 bg-accent" />
                  <span>{side.standardsTitle}</span>
                </div>
                <div className="space-y-2">
                  {side.standards.map((std, idx) => (
                    <div key={idx} className="flex items-baseline gap-2.5 text-ink-soft">
                      <span className="text-accent font-semibold">0{idx + 1} /</span>
                      <span>{std}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
