'use client';

import Image from 'next/image';
import Reveal from './Reveal';
import ScrollVelocity from './ScrollVelocity';
import GridField from './GridField';

/**
 * SECTION FIVE — Audited Metrics & Verified Scale in High-Contrast Monochrome.
 *
 * Atmospheric architectural depth (aerial urban backdrop with dark scrim)
 * combined with the verified 100k+ client flagship build (Fitway Gym) and core performance SLAs.
 * The primary 100k+ numeral reacts dynamically to scroll velocity.
 */
export default function StatsConstellation({ stats, featuredProject }) {
  const [first, second, third, fourth] = stats || [];

  return (
    <section className="relative overflow-hidden bg-[#100d0b] text-white py-20 sm:py-28 border-b border-white/10">
      {/* Atmospheric Aerial Urban Photography Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/editorial/urban-aerial.jpg"
          alt="Dense urban architectural grid"
          fill
          sizes="100vw"
          className="object-cover opacity-20 mix-blend-luminosity grayscale contrast-125"
          priority={false}
        />
        {/* Filmic Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#100d0b]/90 via-[#100d0b]/75 to-[#100d0b]/95" />
        <GridField tone="paper" className="opacity-15" />
      </div>

      <div className="container-max relative z-10">
        {/* Editorial Eyebrow */}
        <Reveal>
          <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-12 font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-white font-medium">AUDITED METRICS // PORTFOLIO DATA</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">SCALE &amp; RIGOR</span>
              <span className="text-white/40">CONFIRMED 2024–2026</span>
            </div>
          </div>
        </Reveal>

        {/* Top Split: Massive 100k+ Metric & 100k+ Client Website Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16 lg:mb-20">
          {/* Left Column: 100k+ Hero Stat */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {first && (
              <Reveal>
                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent font-semibold">
                      {first.kicker || 'PRIMARY VERIFIED METRIC'}
                    </span>
                    <span className="h-px w-8 bg-accent/40" />
                  </div>

                  <ScrollVelocity intensity={0.045}>
                    <span className="whitespace-nowrap font-display text-[20vw] sm:text-[14vw] lg:text-[10.5vw] font-normal leading-[0.80] tracking-[-0.03em] text-white select-none block drop-shadow-md">
                      {first.value}
                    </span>
                  </ScrollVelocity>

                  <div className="mt-6 border-l-2 border-accent pl-5 max-w-lg">
                    <span className="font-display text-xl sm:text-2xl text-white font-normal block leading-tight mb-2">
                      {first.label}
                    </span>
                    <p className="font-sans text-sm sm:text-base text-white/70 font-light leading-relaxed">
                      {first.body || 'Over 100,000 active users and members served across verified high-volume client deployments. Built for continuous uptime and frictionless conversion.'}
                    </p>
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          {/* Right Column: 100k+ Client Website Mockup in Black & White */}
          <div className="lg:col-span-6">
            <Reveal delay={100}>
              <div className="relative group overflow-hidden border border-white/20 bg-black/60 backdrop-blur-md rounded-sm shadow-2xl transition-all duration-500 hover:border-accent/60">
                {/* Browser Chrome Header */}
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-[#151210]/95 text-white/50 font-mono text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20 group-hover:bg-accent transition-colors" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  </div>
                  <div className="flex items-center gap-2 text-white/70 tracking-wider bg-white/[0.05] px-3 py-1 rounded-sm border border-white/10">
                    <span className="text-[10px] text-accent">●</span>
                    <span>fitwaygym.in</span>
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-accent font-semibold hidden sm:inline">
                    100K+ MEMBERS
                  </span>
                </div>

                {/* Mockup Frame */}
                <a
                  href={featuredProject?.href || 'https://fitwaygym.in'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative aspect-[16/10] overflow-hidden group/img cursor-pointer"
                >
                  <Image
                    src={featuredProject?.image || '/work/fitway.png'}
                    alt="Fitway Gym client website — luxury fitness flagship serving over 100,000 members, engineered by MANDER"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top grayscale contrast-125 brightness-95 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-700 ease-out"
                  />
                  {/* Subtle Dark Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-30 transition-opacity duration-500" />

                  {/* Stamp & CTA */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between pointer-events-none">
                    <div className="bg-black/85 backdrop-blur-md border border-white/15 px-3 py-1.5 font-mono text-[9.5px] uppercase tracking-wider text-white">
                      <span className="text-accent font-bold mr-1.5">●</span> FITWAY GYM // 100K+ SERVED
                    </div>
                    <span className="bg-accent text-white font-mono text-[9.5px] uppercase tracking-widest px-3 py-1.5 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                      VIEW LIVE SITE ↗
                    </span>
                  </div>
                </a>

                {/* Technical Specs Footer */}
                <div className="border-t border-white/10 px-4 py-2.5 bg-[#151210]/95 flex flex-wrap items-center justify-between gap-2 font-mono text-[9px] uppercase tracking-widest text-white/50">
                  <span>PRODUCTION ARCHITECTURE</span>
                  <span className="text-white/80">NEXT.JS // HIGH CONVERSION</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom Constellation: 3 Secondary Architectural Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/15">
          {second && (
            <Reveal delay={120}>
              <div className="border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm hover:border-white/20 transition-all duration-300">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/40 block mb-2">
                  {second.kicker || 'PERFORMANCE SLA'}
                </span>
                <span className="block font-display text-4xl sm:text-5xl font-normal leading-none text-white mb-3">
                  {second.value}
                </span>
                <span className="font-sans text-sm text-white/70 block leading-snug">
                  {second.label}
                </span>
                {second.body && (
                  <span className="font-sans text-xs text-white/40 block mt-2 font-light">
                    {second.body}
                  </span>
                )}
              </div>
            </Reveal>
          )}

          {third && (
            <Reveal delay={180}>
              <div className="border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm hover:border-white/20 transition-all duration-300">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/40 block mb-2">
                  {third.kicker || 'DELIVERY VELOCITY'}
                </span>
                <span className="block font-display text-4xl sm:text-5xl font-normal leading-none text-white mb-3">
                  {third.value}
                </span>
                <span className="font-sans text-sm text-white/70 block leading-snug">
                  {third.label}
                </span>
                {third.body && (
                  <span className="font-sans text-xs text-white/40 block mt-2 font-light">
                    {third.body}
                  </span>
                )}
              </div>
            </Reveal>
          )}

          {fourth && (
            <Reveal delay={240}>
              <div className="border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm hover:border-white/20 transition-all duration-300">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/40 block mb-2">
                  {fourth.kicker || 'IP AUTONOMY'}
                </span>
                <span className="block font-display text-4xl sm:text-5xl font-normal leading-none text-white mb-3">
                  {fourth.value}
                </span>
                <span className="font-sans text-sm text-white/70 block leading-snug">
                  {fourth.label}
                </span>
                {fourth.body && (
                  <span className="font-sans text-xs text-white/40 block mt-2 font-light">
                    {fourth.body}
                  </span>
                )}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
