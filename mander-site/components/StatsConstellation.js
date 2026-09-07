'use client';

import Reveal from './Reveal';
import ScrollVelocity from './ScrollVelocity';
import GridField from './GridField';

/**
 * SECTION THREE — the stats as an architectural constellation.
 *
 * Three stats, three scales, three positions, no shared baseline.
 * The primary stat is wrapped in ScrollVelocity: when the visitor scrolls
 * quickly, the massive 22vw display type subtly compresses along its vertical
 * axis and springs back to rest upon stopping.
 *
 * Subtle editorial metadata and architectural gridlines furnish the space
 * without cluttering it.
 */
export default function StatsConstellation({ stats }) {
  const [first, second, third] = stats;

  return (
    <section className="relative overflow-hidden bg-paper-2 py-stack-lg border-b border-line">
      {/* Hairline architectural grid in background */}
      <GridField tone="ink" className="opacity-40" />

      <div className="container-max relative z-10">
        {/* Editorial Eyebrow */}
        <Reveal>
          <div className="flex items-center justify-between border-b border-line/70 pb-4 mb-10 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-accent" />
              <span>AUDITED METRICS // PORTFOLIO DATA</span>
            </div>
            <span>CONFIRMED 2024–2026</span>
          </div>
        </Reveal>

        {/* One — enormous, responsive to scroll velocity */}
        {first && (
          <Reveal>
            <div className="relative">
              <div className="flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-10">
                <ScrollVelocity intensity={0.045}>
                  <span className="whitespace-nowrap font-display text-[22vw] font-normal leading-[0.80] tracking-[-0.03em] text-ink md:text-[15.5vw] select-none block">
                    {first.value}
                  </span>
                </ScrollVelocity>
                <div className="mb-2 lg:mb-6 max-w-[20ch] border-l-2 border-accent pl-4">
                  <span className="font-mono text-[9.5px] uppercase tracking-widest text-accent font-semibold block mb-1">
                    PRIMARY METRIC
                  </span>
                  <span className="text-body-md text-ink-soft leading-snug block">
                    {first.label}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Two — half scale, pushed to the right, well below */}
        {second && (
          <Reveal delay={120}>
            <div className="mt-20 flex justify-end md:mt-28">
              <div className="max-w-[34ch] text-right border-r-2 border-line pr-5">
                <span className="font-mono text-[9px] uppercase tracking-widest text-ink-mute block mb-2">
                  PERFORMANCE BENCHMARK
                </span>
                <span className="block font-display text-stat-xl font-normal leading-none text-ink">
                  {second.value}
                </span>
                <span className="mt-3 block text-body-md text-ink-soft">
                  {second.label}
                </span>
              </div>
            </div>
          </Reveal>
        )}

        {/* Three — small, hard left, quiet */}
        {third && (
          <Reveal delay={200}>
            <div className="mt-16 max-w-[28ch] md:mt-20 border-l-2 border-line pl-4">
              <span className="font-mono text-[9px] uppercase tracking-widest text-ink-mute block mb-1">
                COMMERCIAL CONVERSION
              </span>
              <span className="block font-display text-stat-md font-normal leading-none text-ink">
                {third.value}
              </span>
              <span className="mt-2 block text-body-md text-ink-soft">
                {third.label}
              </span>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
