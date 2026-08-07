import Image from 'next/image';
import Reveal from './Reveal';

/**
 * A deliberately minor, low-key mention of client work — three small tiles,
 * tight grid, short on copy. Not the section that's supposed to carry the
 * page; that's Pricing and the quiz. Swap WorkCase.js back in later if there
 * are real, fleshed-out case studies worth spending a full screen on.
 */
export default function WorkCompact({ items }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {items.map((project, index) => (
        <Reveal key={project.name} delay={index * 70}>
          <article className="group flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden bg-paper-3">
              {project.image && (
                <Image
                  src={project.image}
                  alt={`${project.name} — ${project.sector}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="img-zoom object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 h-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.logo}
                  alt={`${project.name} logo`}
                  className="h-4 w-auto max-w-[110px] object-contain object-left opacity-95 invert"
                />
              </div>
            </div>

            <div className="mt-3 flex items-baseline justify-between gap-3">
              <h3 className="text-body-lg font-medium text-ink">{project.name}</h3>
              <span className="label-caps shrink-0 text-ink-mute">{project.result}</span>
            </div>
            <p className="mt-1 text-label-sm text-ink-mute">{project.sector}</p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
