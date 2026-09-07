'use client';

import Image from 'next/image';
import Link from 'next/link';
import Reveal from './Reveal';
import Icon from './Icon';
import MagneticButton from './MagneticButton';
import CursorImage from './CursorImage';
import { BRAND } from '@/lib/content';

/**
 * SECTION TWO — the editorial sheet that arrives after the masthead film.
 *
 * Designed as a high-end architectural spread:
 * - Left column: narrow architectural fragment with pointer depth and coordinates.
 * - Center-right: massive editorial headline, nuanced copy, and magnetic CTA.
 * - Signature Pacific-red rule establishing identity.
 */
export default function Colophon({ headline, body }) {
  return (
    <section className="relative bg-paper border-b border-line overflow-hidden">
      <div className="container-max grid grid-cols-1 gap-y-12 pb-stack-md pt-16 md:grid-cols-12 md:gap-gutter md:pt-24">
        {/* Architectural Fragment (Left Column) */}
        <div className="md:col-span-3 flex flex-col justify-between border-b md:border-b-0 md:border-r border-line pb-8 md:pb-0 md:pr-6">
          <Reveal>
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-ink-mute">
                <span className="h-1 w-4 bg-accent" />
                <span>STUDIO DISPATCH // 01</span>
              </div>
              <div className="relative aspect-[4/3] md:aspect-[3/4] w-full border border-line bg-black/5 overflow-hidden shadow-sm group">
                <CursorImage strength={3} className="w-full h-full">
                  <Image
                    src="/editorial/colophon-arch.jpg"
                    alt="Mander creative studio workstation with dual displays showing digital wireframe architecture"
                    fill
                    sizes="(max-width: 768px) 100vw, 260px"
                    className="object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                  />
                </CursorImage>
                <div className="absolute bottom-2 left-2 bg-ink/90 text-white font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 border border-white/10">
                  DIGITAL CRAFT
                </div>
              </div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-mute leading-relaxed">
                49°16&apos;59&quot;N 123°07&apos;15&quot;W<br />
                WATER STREET // PACIFIC COAST
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="hidden md:block pt-8 border-t border-line/60 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft">
              IND. STUDIO NO. 04<br />
              EST. MMXXIV
            </div>
          </Reveal>
        </div>

        {/* The Proposition Typography */}
        <div className="md:col-span-9 md:pl-6 flex flex-col justify-between">
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent font-semibold">
                  01 // STATEMENT OF PRACTICE
                </span>
                <span className="h-px flex-1 bg-line max-w-[120px]" />
              </div>

              <h1 className="max-w-[15ch] font-display text-headline-lg-mobile font-normal text-ink md:text-display-lg leading-[0.96] tracking-tight">
                {headline}
              </h1>
            </Reveal>

            <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <Reveal delay={120}>
                <p className="text-body-lg leading-relaxed text-ink-soft font-light text-balance">
                  {body}
                </p>
              </Reveal>

              <Reveal delay={160}>
                <div className="border-l border-line pl-6 font-mono text-[10.5px] uppercase tracking-wider text-ink-mute space-y-2">
                  <div className="text-ink font-semibold">DELIVERY PROTOCOL:</div>
                  <div>• CUSTOM TAILORED SCOPES ONLY (NO TEMPLATES)</div>
                  <div>• FULL PRODUCT DESIGN + REACT STACK</div>
                  <div>• LIGHTHOUSE 99+ PERFORMANCE SLA</div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Action Row with Magnetic CTA */}
          <div className="mt-12 pt-8 border-t border-line">
            <Reveal delay={200} className="flex flex-wrap items-center gap-6 sm:gap-8">
              <MagneticButton strength={10} radius={70}>
                <a
                  href={`mailto:${BRAND.email}?subject=${encodeURIComponent(
                    'Project Quote Enquiry — Mander Studio'
                  )}`}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <span>Ask for Quote</span>
                  <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
                </a>
              </MagneticButton>

              <Link href="#work" className="link-underline label-caps text-ink">
                Explore The Work
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
