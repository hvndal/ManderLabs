import Reveal from './Reveal';

/**
 * Engagements — what was actually delivered, not what anyone said about it.
 *
 * This was a quote-led testimonial list. The quotes were invented and
 * attributed to named roles at named companies, which is a fabricated
 * endorsement; it has been replaced with the verifiable side of the same
 * data. Every field below is a fact about the work — sector, location,
 * what was built, what it produced — so nothing here can be contradicted
 * by a prospect who picks up the phone and asks.
 *
 * If real, permissioned quotes ever arrive, they belong here as an extra
 * row rather than a replacement for the facts.
 */
export default function Testimonials({ items }) {
  return (
    <div className="flex flex-col divide-y divide-line border-y border-line">
      {items.map((item, index) => (
        <Reveal key={item.name} delay={index * 90} className="group py-10 md:py-14">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-gutter">
            {/* Who — the row index is carried as a large serif numeral in the
                margin rather than a bullet, which gives each row a graphic
                anchor and lets the eye count the engagements at a glance
                instead of reading three near-identical text blocks. */}
            <div className="flex items-baseline gap-5 md:col-span-4">
              <span
                aria-hidden="true"
                className="font-display text-[2.6rem] font-normal leading-none text-line-strong transition-colors duration-500 group-hover:text-accent-soft md:text-[3.4rem]"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-headline-md font-semibold tracking-tight text-ink">
                  {item.name}
                </h3>
                <p className="label-caps mt-3 text-ink-mute">
                  {item.sector} · {item.location}
                </p>
              </div>
            </div>

            {/* What was built */}
            <div className="md:col-span-5">
              <p className="text-body-lg text-ink-soft">{item.scope}</p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-ink-mute">
                {item.services.join('  /  ')}
              </p>
            </div>

            {/* Outcome — set in the display serif and stepped up a size. It is
                the one number on the row that matters and it was previously
                the same weight as the scope copy beside it. */}
            <div className="md:col-span-3 md:text-right">
              <span className="font-display text-stat-lg font-normal leading-none text-ink">
                {item.result}
              </span>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
