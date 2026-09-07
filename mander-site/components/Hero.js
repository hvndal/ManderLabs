'use client';

import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import MagneticButton from './MagneticButton';
import CursorImage from './CursorImage';
import { BRAND } from '@/lib/content';

const SALES_MAILTO = `mailto:${BRAND.email}?subject=${encodeURIComponent(
  'Project Quote Enquiry — Mander Studio'
)}`;

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Studio Overview"
      className="relative w-full border-b border-line bg-paper lg:min-h-[calc(100svh-76px)] flex flex-col justify-between overflow-hidden"
    >
      {/* Main Asymmetric 12-Column Broadside */}
      <div className="container-max w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-gutter items-stretch">
        
        {/* Left Column: Monumental Proposition & Action Cluster (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col justify-between pt-7 sm:pt-9 lg:pt-8 xl:pt-10 pb-6 lg:pb-7 lg:pr-8 xl:pr-10">
          <div>
            {/* Folio Eyebrow Badge */}
            <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
              <span className="h-1.5 w-1.5 bg-accent inline-block flex-shrink-0" />
              <span className="font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.18em] sm:tracking-[0.24em] text-accent font-semibold">
                MANDER // VANCOUVER CONTEMPORARY DIGITAL PRACTICE
              </span>
              <span className="h-px flex-1 bg-line/80 max-w-[60px] hidden sm:inline-block" />
            </div>

            {/* Monumental Silhouette Headline */}
            <h1 className="font-display text-[2.65rem] sm:text-[3.6rem] md:text-[4rem] lg:text-[4.25rem] xl:text-[4.85rem] text-ink leading-[0.94] tracking-[-0.035em] text-balance mb-5 sm:mb-6 font-normal">
              Websites Engineered With{' '}
              <span className="italic font-light text-accent">Architectural</span>{' '}
              Rigour.
            </h1>

            {/* Editorial Supporting Proposition */}
            <p className="font-sans text-[1rem] sm:text-[1.12rem] lg:text-[1.15rem] text-ink-soft leading-[1.5] font-light max-w-[45ch] text-balance mb-6 sm:mb-8">
              Bespoke digital engineering and restrained identity systems for
              forward-thinking commercial practices, design studios, and founders
              across the Pacific Northwest and North America. Zero templates.
              Verified Lighthouse 99+ speed.
            </p>

            {/* Primary Action Cluster — perfectly responsive stack on mobile */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-6 w-full sm:w-auto">
              <MagneticButton strength={8} radius={65} className="w-full sm:w-auto">
                <a
                  href={SALES_MAILTO}
                  className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-[11px] tracking-[0.14em] shadow-sm"
                >
                  <span>Ask for Quote</span>
                  <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
                </a>
              </MagneticButton>
              <Link
                href="#work"
                className="link-underline label-caps text-ink text-[11px] tracking-[0.14em] py-2 sm:py-3 font-mono text-center sm:text-left inline-block"
              >
                Explore Selected Work ↓
              </Link>
            </div>
          </div>

          {/* Technical Metadata Stamp (Anchored to base of Left Column) */}
          <div className="mt-8 pt-5 border-t border-line/70 flex flex-wrap items-center justify-between gap-3 sm:gap-4 font-mono text-[9px] uppercase tracking-[0.16em] sm:tracking-[0.2em] text-ink-mute">
            <div className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-700 animate-pulse" />
              <span className="text-ink font-medium">STUDIO INTAKE OPEN // 2025–2026</span>
            </div>
            <div className="tracking-[0.18em] sm:tracking-[0.22em]">
              49°16&apos;59&quot;N 123°07&apos;15&quot;W · GASTOWN
            </div>
          </div>
        </div>

        {/* Right Column: Museum-Grade Architectural Exhibition Plate (5 cols on lg) */}
        <div className="lg:col-span-5 relative flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-line pt-6 sm:pt-8 lg:pt-8 xl:pt-10 lg:pl-8 xl:pl-10 pb-6 lg:pb-7 bg-paper/40">
          <div>
            {/* Plate Meta Bar */}
            <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.22em] text-ink-mute pb-2.5 mb-3.5 border-b border-line/70">
              <span className="flex items-center gap-1.5 text-ink font-medium">
                <span className="inline-block w-1.5 h-1.5 bg-accent" />
                PLATE 01 // TECTONIC GEOMETRY
              </span>
              <span className="text-ink-mute text-[8.5px] sm:text-[9px]">REF: VAN-MIES-24</span>
            </div>

            {/* Image Container with Swiss Registration Marks */}
            <div className="relative border border-line bg-paper-2/60 shadow-sm p-2 sm:p-2.5">
              {/* Registration Crosshairs */}
              <span className="absolute -top-2 -left-2 font-mono text-[11px] leading-none text-ink-mute/70 select-none z-20">
                +
              </span>
              <span className="absolute -top-2 -right-2 font-mono text-[11px] leading-none text-ink-mute/70 select-none z-20">
                +
              </span>
              <span className="absolute -bottom-2 -left-2 font-mono text-[11px] leading-none text-ink-mute/70 select-none z-20">
                +
              </span>
              <span className="absolute -bottom-2 -right-2 font-mono text-[11px] leading-none text-ink-mute/70 select-none z-20">
                +
              </span>

              {/* Architectural Image with Cursor Parallax */}
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] max-h-[360px] xl:max-h-[420px] w-full overflow-hidden bg-ink/5">
                <CursorImage strength={4} className="w-full h-full">
                  <Image
                    src="/editorial/concrete-geometry.jpg"
                    alt="Vancouver contemporary architectural grid — steel and glass tectonic geometry"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover object-center contrast-[1.08] brightness-[0.98]"
                  />
                </CursorImage>

                {/* Overlaid Badges */}
                <div className="absolute top-2.5 left-2.5 bg-ink/90 text-paper font-mono text-[8px] uppercase tracking-[0.2em] px-2.5 py-1 border border-white/10 backdrop-blur-xs">
                  PACIFIC URBAN RIGOUR
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-paper/95 text-ink font-mono text-[8px] uppercase tracking-[0.18em] px-2.5 py-1 border border-line backdrop-blur-xs">
                  SLA // 99+ SPEED INDEX
                </div>
              </div>
            </div>

            {/* Plate Caption */}
            <div className="mt-3.5 pt-2.5 border-t border-line/60 space-y-1.5">
              <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft">
                <span>SURFACE TECTONICS</span>
                <span className="text-accent font-semibold">NEXT.JS 14 SSG</span>
              </div>
              <p className="font-mono text-[9px] sm:text-[9.5px] leading-relaxed text-ink-mute tracking-wide">
                Every line of code and typographic datum is calibrated with structural
                precision — engineered to convert discerning commercial clientele.
              </p>
            </div>
          </div>

          {/* Sub-label at foot of right column */}
          <div className="mt-5 pt-3.5 border-t border-line/60 flex items-center justify-between font-mono text-[8.5px] sm:text-[9px] uppercase tracking-[0.2em] text-ink-mute">
            <span>WATER STREET // SEATTLE &amp; VANCOUVER</span>
            <span className="text-ink font-semibold">EST. MMXXIV</span>
          </div>
        </div>

      </div>

      {/* 4-Station Datum Ledger Line (Anchored across base of viewport) */}
      <div className="w-full border-t border-line bg-paper-2/60">
        <div className="container-max py-3 sm:py-3.5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.14em] sm:tracking-[0.16em]">
            <div className="flex items-baseline gap-1.5 sm:gap-2 text-ink-soft">
              <span className="text-accent font-semibold">01 /</span>
              <span className="text-ink">Proprietary Scoping</span>
            </div>
            <div className="flex items-baseline gap-1.5 sm:gap-2 text-ink-soft">
              <span className="text-accent font-semibold">02 /</span>
              <span className="text-ink">Next.js Production</span>
            </div>
            <div className="flex items-baseline gap-1.5 sm:gap-2 text-ink-soft">
              <span className="text-accent font-semibold">03 /</span>
              <span className="text-ink">Lighthouse 99+ SLA</span>
            </div>
            <div className="flex items-baseline gap-1.5 sm:gap-2 text-ink-soft">
              <span className="text-accent font-semibold">04 /</span>
              <span className="text-ink">Measured Return</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
