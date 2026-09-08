'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from './Reveal';
import Icon from './Icon';
import CursorImage from './CursorImage';

const SPRING = { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 };
const STAGGER = {
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};
const CHILD = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: SPRING },
};

export default function WorkSpotlight({ items }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = items[activeIdx] || items[0];

  return (
    <div className="w-full">
      {/* Top running index rail */}
      <div className="border border-line bg-paper-2 mb-6 p-2 flex items-center justify-between overflow-x-auto gap-4 font-mono text-[10.5px] uppercase tracking-wider text-ink-mute">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-ink font-semibold px-2">FOLIO //</span>
          {items.slice(0, 4).map((p, idx) => (
            <button
              key={p.name}
              onClick={() => setActiveIdx(idx)}
              className={`py-1.5 px-3 transition-all duration-200 active:scale-[0.97] flex items-center gap-1.5 border ${
                activeIdx === idx
                  ? 'border-ink bg-ink text-white font-medium shadow-sm'
                  : 'border-transparent text-ink-soft hover:text-ink hover:border-line'
              }`}
            >
              <span className={activeIdx === idx ? 'text-accent' : 'text-ink-mute'}>0{idx + 1} /</span>
              <span>{p.name}</span>
            </button>
          ))}
        </div>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute px-3 py-1 hidden sm:inline">
          4 CURATED DEPLOYMENTS
        </span>
      </div>

      {/* THE ARCHITECTURAL SPREAD */}
      <div className="border border-line bg-paper-2 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Dominant Image Viewport: Flush Edge-to-Edge */}
        <div className="lg:col-span-8 relative bg-black min-h-[420px] sm:min-h-[540px] border-b lg:border-b-0 lg:border-r border-line overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ ...SPRING, duration: 0.5 }}
              className="absolute inset-0"
            >
              <CursorImage className="w-full h-full" strength={3}>
                {current.image ? (
                  <Image
                    src={current.image}
                    alt={current.imageAlt || current.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    priority
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-paper font-display text-4xl p-12 bg-ink">
                    {current.name}
                  </div>
                )}
              </CursorImage>
            </motion.div>
          </AnimatePresence>

          {/* Minimal Corner Stamp inside the box */}
          <div className="absolute top-5 left-5 z-10 bg-ink/90 backdrop-blur-md text-white px-3 py-1 font-mono text-[10px] uppercase tracking-widest border border-white/10">
            0{activeIdx + 1} / 0{items.length} — {current.kind === 'studio' ? 'STUDIO BUILD' : 'CLIENT FLAGSHIP'}
          </div>

          <div className="absolute bottom-5 right-5 z-10 hidden sm:block bg-ink/90 backdrop-blur-md text-white/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest border border-white/10">
            VERIFIED DEPLOYMENT
          </div>
        </div>

        {/* Editorial Metadata Panel */}
        <div className="lg:col-span-4 p-8 sm:p-10 flex flex-col justify-between bg-paper">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name + '-meta'}
              variants={STAGGER}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              <motion.div variants={CHILD} className="flex items-center gap-2.5 mb-4 font-mono text-[10px] uppercase tracking-[0.2em]">
                <span className="text-accent font-semibold">{current.sector}</span>
                <span className="text-line-strong">/</span>
                <span className="text-ink-mute">{current.location}</span>
              </motion.div>

              <motion.h3 variants={CHILD} className="font-display text-3xl sm:text-4xl text-ink leading-[1.05] tracking-tight mb-4">
                {current.name}
              </motion.h3>

              {/* Commercial outcome */}
              <motion.div variants={CHILD} className="py-4 my-4 border-y border-line">
                <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-accent font-semibold mb-1">
                  VERIFIED COMMERCIAL RESULT
                </div>
                <div className="text-2xl sm:text-3xl font-display text-ink tracking-tight font-normal">
                  {current.result}
                </div>
              </motion.div>

              <motion.p variants={CHILD} className="font-sans text-body-md text-ink-soft font-light leading-relaxed mb-6">
                {current.body}
              </motion.p>

              {/* Scope delivered */}
              <motion.div variants={CHILD} className="border-t border-line pt-4 mb-6">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-mute mb-2">
                  DELIVERED SCOPE
                </div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-ink-soft leading-relaxed">
                  {current.services?.join('  /  ')}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Action Row */}
          <div className="pt-4 border-t border-line flex flex-col gap-3">
            {current.href && (
              <a
                href={current.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full inline-flex items-center justify-center gap-2 bg-ink hover:bg-accent text-white font-mono text-xs uppercase tracking-[0.18em] py-3.5 px-6 font-semibold transition-all duration-200 active:scale-[0.985] text-center"
              >
                <span>Launch Live Site</span>
                <span className="transition-transform duration-200 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            )}
            <a
              href="#quote"
              className="group w-full inline-flex items-center justify-center gap-2 border border-line hover:border-ink text-ink font-mono text-xs uppercase tracking-[0.18em] py-3 px-6 transition-all duration-200 active:scale-[0.985] text-center"
            >
              <span>Ask For Similar Scope</span>
              <span className="transition-transform duration-200 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
