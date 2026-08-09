import Image from 'next/image';
import Reveal from './Reveal';
import Icon from './Icon';

/**
 * Selected Work cards with responsive touch & hover animation.
 */
export default function WorkCompact({ items }) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
      {items.map((project, index) => (
        <Reveal key={project.name} delay={index * 70}>
          <article className="group flex flex-col border border-transparent p-2.5 rounded-lg transition-all duration-500 ease-premium active:scale-[0.98] active:border-line-strong active:bg-paper-2 hover:-translate-y-1.5 hover:border-line hover:bg-paper-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-paper-3">
              {project.image && (
                <Image
                  src={project.image}
                  alt={`${project.name} — ${project.sector}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="img-zoom object-cover transition-transform duration-700 ease-premium group-hover:scale-105 group-active:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95 group-active:opacity-95" />
              <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.logo}
                  alt={`${project.name} logo`}
                  className="h-4 w-auto max-w-[110px] object-contain object-left opacity-95 invert transition-transform duration-300 group-hover:scale-105 group-active:scale-105"
                />
                <span className="label-caps rounded bg-paper/90 px-2 py-1 text-[10px] text-ink shadow-sm">
                  {project.result}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-500 ease-premium group-hover:scale-x-100 group-active:scale-x-100" />
            </div>

            <div className="mt-3.5 flex items-center justify-between gap-3">
              <h3 className="text-body-lg font-medium text-ink transition-colors duration-300 group-hover:text-accent group-active:text-accent flex items-center gap-1.5">
                {project.name}
                <Icon name="arrow" className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-active:opacity-100 group-active:translate-x-1" strokeWidth={2} />
              </h3>
              <span className="label-caps shrink-0 text-ink-mute">{project.sector}</span>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
