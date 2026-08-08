import Reveal from './Reveal';
import Icon from './Icon';
import GrowthBars from './GrowthBars';

/**
 * A service, set as type — no photography.
 *
 * This used to be a full-bleed photo band. Six of them meant roughly six
 * screens of stock imagery that carried no information and, on an agency
 * site, quietly argued the opposite of the pitch: if you sell design, a
 * stranger in a stock meeting room is the weakest thing you can show.
 *
 * The replacement is a wide editorial row on a 12-column grid: a line icon
 * (same stroke language as the logo mark) above the index, title, copy, and
 * a small animated bar chart that rises on scroll — the "this grows your
 * business" idea made visual instead of decorative. The whole row warms to
 * the accent colour on hover.
 */
export default function ServiceBand({ service, index = 0 }) {
  return (
    <Reveal delay={index * 70}>
      <div className="group grid grid-cols-2 items-center gap-y-6 py-12 md:grid-cols-12 md:gap-gutter md:py-16">
        {/* Icon + index */}
        <div className="col-span-2 flex items-center gap-4 md:col-span-2 md:flex-col md:items-start md:gap-5">
          <Icon
            name={service.icon}
            className="h-7 w-7 text-ink-mute transition-colors duration-500 ease-premium group-hover:text-accent"
            strokeWidth={1.4}
          />
          <span className="font-mono text-stat-lg leading-none text-line-strong transition-colors duration-500 ease-premium group-hover:text-accent">
            {service.index}
          </span>
        </div>

        {/* Title */}
        <div className="col-span-2 md:col-span-3">
          <h3 className="text-headline-lg-mobile font-semibold tracking-tight text-ink md:text-headline-md">
            {service.title}
          </h3>
        </div>

        {/* Copy */}
        <div className="col-span-2 md:col-span-5">
          <p className="max-w-text text-body-lg text-ink-soft">{service.body}</p>
        </div>

        {/* Growth chart */}
        <div className="col-span-2 md:col-span-2 md:flex md:justify-end">
          <GrowthBars values={service.growth} />
        </div>
      </div>
    </Reveal>
  );
}
