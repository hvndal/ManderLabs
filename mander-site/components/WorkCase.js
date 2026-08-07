import Image from 'next/image';
import Icon from './Icon';
import Reveal from './Reveal';

/**
 * Large, stacked editorial case study — not a card in a grid. A huge image on
 * one side, a big index number and plain-text detail on the other,
 * alternating sides down the page. Generous vertical gaps between entries do
 * the work a border or shadow would otherwise do.
 */
export default function WorkCase({ project, index, flip = false }) {
  const num = String(index + 1).padStart(2, '0');

  return (
    <article className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-x-14">
      {/* Image */}
      <div
        className={`relative aspect-[4/3] overflow-hidden bg-paper-3 md:col-span-7 ${
          flip ? 'md:order-2' : ''
        }`}
      >
        <Reveal className="h-full w-full">
          <div className="group relative h-full w-full overflow-hidden">
            {project.image && (
              <Image
                src={project.image}
                alt={`${project.name} — ${project.sector}`}
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="img-zoom object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 h-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.logo}
                alt={`${project.name} logo`}
                className="h-6 w-auto max-w-[150px] object-contain object-left opacity-95 invert"
              />
            </div>
          </div>
        </Reveal>
      </div>

      {/* Detail */}
      <div className={`md:col-span-5 ${flip ? 'md:order-1' : ''}`}>
        <Reveal delay={100}>
          <span className="font-mono text-stat-md text-line-strong">{num}</span>

          <div className="label-caps mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-mute">
            <span>{project.sector}</span>
            <span aria-hidden="true">·</span>
            <span>{project.location}</span>
          </div>

          <h3 className="mt-3 text-headline-lg-mobile font-semibold tracking-tight text-ink md:text-headline-md">
            {project.name}
          </h3>

          <p className="mt-5 max-w-md text-body-lg text-ink-soft">{project.body}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.services.map((service) => (
              <li key={service} className="label-caps border border-line px-2.5 py-1.5 text-ink-mute">
                {service}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-3 border-t border-line pt-6">
            <span className="text-stat-md text-ink">{project.result}</span>
            <Icon name="arrow" className="h-4 w-4 text-ink-mute" strokeWidth={2} />
          </div>
        </Reveal>
      </div>
    </article>
  );
}
