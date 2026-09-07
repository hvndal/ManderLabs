import Link from 'next/link';
import Reveal from './Reveal';
import Icon from './Icon';
import { PILLARS } from '@/lib/pillars';

/**
 * BRAND → DIGITAL → GROWTH, set as one connected composition.
 *
 * These were three rows in an index, which stated the sequence without
 * showing it: three equal entries stacked, indistinguishable in weight from
 * the plans index or the city index elsewhere on the site. But the whole
 * commercial argument for organising the studio this way is that the three
 * are joined — identity, then experience, then demand — and a reader should
 * be able to see that before reading a word of it.
 *
 * So there is one rule running the length of the section with a node on it
 * per pillar, the pillars are numbered along it, and each one's capabilities
 * are set as a column hanging beneath its own node. On a phone the rule turns
 * vertical and runs down the left margin, which is the same drawing rotated
 * rather than a different layout.
 */
export default function PillarSequence() {
  return (
    <div className="mt-16">
      {/* The through-line. Desktop only — on a phone each pillar carries its
          own left rule instead, so the thread is still drawn but never has to
          span a scroll the reader cannot see the end of. */}
      <div className="relative hidden md:block">
        <div className="absolute left-0 right-0 top-[7px] h-px bg-line" aria-hidden="true" />
        <div className="relative grid grid-cols-3 gap-gutter">
          {PILLARS.map((pillar) => (
            <div key={pillar.id} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-[3px] h-[9px] w-[9px] shrink-0 bg-accent"
              />
              <span className="rail text-ink-mute">{pillar.index}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-gutter">
        {PILLARS.map((pillar, i) => (
          <Reveal key={pillar.id} delay={i * 90}>
            <div className="border-l border-line pl-5 pt-6 md:border-l-0 md:pl-0 md:pt-7">
              {/* The number only appears here on a phone — on desktop it is
                  already sitting on the rule above. */}
              <span className="rail mb-3 block text-ink-mute md:hidden">
                {pillar.index}
              </span>

              <Link href={pillar.href} className="group block">
                <h3 className="font-display text-headline-lg-mobile leading-[0.95] text-ink transition-colors duration-300 group-hover:text-accent md:text-headline-lg">
                  {pillar.label}
                </h3>
                <p className="mt-4 max-w-[26ch] text-body-md text-ink-soft">
                  {pillar.line}
                </p>
                <span className="label-caps mt-6 inline-flex items-center gap-2 text-ink transition-colors group-hover:text-accent">
                  {pillar.question}
                  <Icon
                    name="arrow"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </span>
              </Link>

              {/* Four of the seven or eight, desktop only. The pillar page
                  carries the full list; on a phone three of these stacked is
                  twelve rows of small type between the reader and the work. */}
              <ul className="mt-8 hidden border-t border-line md:block">
                {pillar.capabilities.slice(0, 4).map((c) => (
                  <li
                    key={c.name}
                    className="border-b border-line py-2.5 text-label-sm text-ink-mute"
                  >
                    {c.name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
