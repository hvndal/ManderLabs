'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from './Reveal';
import Icon from './Icon';

export default function WorkSpotlight({ items }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = items[activeIdx] || items[0];

  return (
    <div className="w-full">
      {/* Top running index rail */}
      <div className="border border-line bg-white mb-6 p-2 flex items-center justify-between overflow-x-auto gap-4 font-mono text-[11px] uppercase tracking-wider text-ink-mute">
        <div className="flex items-center gap-4 shrink-0 px-2">
          <span className="text-ink font-bold">SELECT //</span>
          {items.slice(0, 4).map((p, idx) => (
            <button
              key={p.name}
              onClick={() => setActiveIdx(idx)}
              className={`py-1 px-3 transition-colors ${
                activeIdx === idx
                  ? 'bg-ink text-white font-bold'
                  : 'hover:text-ink text-ink-soft'
              }`}
            >
              0{idx + 1} {p.name}
            </button>
          ))}
        </div>
        <Link
          href="/work"
          className="shrink-0 text-accent font-semibold hover:underline flex items-center gap-1.5 px-3 py-1"
        >
          <span>Full Archive (7 Sites)</span>
          <Icon name="arrow" className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* THE UNBOXED ARCHITECTURAL BOX: Less frame, direct presentation */}
      <div className="border border-line bg-white shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Dominant Image Viewport: Flush Edge-to-Edge */}
        <div className="lg:col-span-8 relative bg-black min-h-[420px] sm:min-h-[540px] border-b lg:border-b-0 lg:border-r border-line overflow-hidden group">
          {current.image ? (
            <Image
              src={current.image}
              alt={current.imageAlt || current.name}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              priority
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.01]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-paper font-display text-4xl p-12">
              {current.name}
            </div>
          )}

          {/* Minimal Corner Stamp inside the box */}
          <div className="absolute top-5 left-5 bg-ink/90 backdrop-blur-md text-white px-3 py-1 font-mono text-[10px] uppercase tracking-widest border border-white/10">
            0{activeIdx + 1} / 0{items.length} — {current.kind === 'studio' ? 'STUDIO BUILD' : 'CLIENT FLAGSHIP'}
          </div>

          <div className="absolute bottom-5 right-5 hidden sm:block bg-ink/90 backdrop-blur-md text-white/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest border border-white/10">
            VERIFIED DEPLOYMENT
          </div>
        </div>

        {/* Editorial Metadata Panel */}
        <div className="lg:col-span-4 p-8 sm:p-10 flex flex-col justify-between bg-paper/40">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-ink/5 border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink font-semibold">
                {current.sector}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
                {current.location}
              </span>
            </div>

            <h3 className="font-display text-3xl sm:text-4xl text-ink leading-tight mb-2">
              {current.name}
            </h3>

            {/* Commercial outcome */}
            <div className="p-4 bg-white border-l-2 border-accent my-4 shadow-sm">
              <div className="font-mono text-[9px] uppercase tracking-widest text-ink-mute">Verified Result</div>
              <div className="text-lg font-bold font-sans text-ink">{current.result}</div>
            </div>

            <p className="font-sans text-body-md text-ink-soft font-light leading-relaxed mb-6">
              {current.body}
            </p>

            {/* Scope tags */}
            <div className="border-t border-line pt-4 mb-6">
              <div className="font-mono text-[9.5px] uppercase tracking-wider text-ink-mute mb-2">Scope Delivered</div>
              <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                {current.services?.map((s) => (
                  <span key={s} className="bg-white border border-line px-2 py-0.5 text-ink">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-line flex flex-col gap-3">
            {current.href && (
              <a
                href={current.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-ink hover:bg-accent text-white font-mono text-xs uppercase tracking-[0.18em] py-3.5 px-6 font-semibold transition-colors shadow-md text-center"
              >
                <span>Launch Live Site</span>
                <span>↗</span>
              </a>
            )}
            <Link
              href="/work"
              className="w-full inline-flex items-center justify-center gap-2 border border-line hover:border-ink text-ink font-mono text-xs uppercase tracking-[0.18em] py-3 px-6 transition-colors text-center"
            >
              <span>See Full Screenshot Archive →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
