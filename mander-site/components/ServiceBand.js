import Reveal from './Reveal';

/**
 * A service, set as type — no photography.
 *
 * This used to be a full-bleed photo band. Six of them meant roughly six
 * screens of stock imagery that carried no information and, on an agency
 * site, quietly argued the opposite of the pitch: if you sell design, a
 * stranger in a stock meeting room is the weakest thing you can show.
 *
 * The replacement is a wide editorial row — oversized mono index, title,
 * and copy on a 12-column grid with a hairline between each. Nothing to
 * source, nothing to crop, and it reads as deliberate rather than padded.
 * The index is the only coloured element and it warms to the accent on
 * hover, which is the whole of the interaction.
 */
export default function ServiceBand({ service, index = 0 }) {
  return (
    <Reveal delay={index * 70}>
      <div className="group grid grid-cols-1 gap-4 py-12 transition-colors duration-500 ease-premium md:grid-cols-12 md:gap-gutter md:py-16">
        {/* Index */}
        <div className="md:col-span-2">
          <span className="font-mono text-stat-lg leading-none text-line-strong transition-colors duration-500 ease-premium group-hover:text-accent">
            {service.index}
          </span>
        </div>

        {/* Title */}
        <div className="md:col-span-4">
          <h3 className="text-headline-lg-mobile font-semibold tracking-tight text-ink md:text-headline-md">
            {service.title}
          </h3>
        </div>

        {/* Copy */}
        <div className="md:col-span-6">
          <p className="max-w-text text-body-lg text-ink-soft">{service.body}</p>
        </div>
      </div>
    </Reveal>
  );
}
