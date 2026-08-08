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
        <Reveal key={item.name} delay={index * 90} className="py-10 md:py-14">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-gutter">
            {/* Who */}
            <div className="md:col-span-4">
              <h3 className="text-headline-md font-semibold tracking-tight text-ink">
                {item.name}
              </h3>
              <p className="label-caps mt-3 text-ink-mute">
                {item.sector} · {item.location}
              </p>
            </div>

            {/* What was built */}
            <div className="md:col-span-5">
              <p className="text-body-lg text-ink-soft">{item.scope}</p>
              <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
                {item.services.map((service) => (
                  <li
                    key={service}
                    className="label-caps border border-line px-3 py-1.5 text-ink-mute"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Outcome */}
            <div className="md:col-span-3 md:text-right">
              <span className="text-stat-md text-ink">{item.result}</span>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
