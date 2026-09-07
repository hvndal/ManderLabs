import Image from 'next/image';
import Reveal from './Reveal';
import Icon from './Icon';

/**
 * Selected work, as editorial features.
 *
 * This replaces a rotating card grid: three tiles at a time out of seven,
 * auto-cycling every seven seconds. Two things were wrong with it beyond
 * taste. A carousel decides for the reader how long a project is worth
 * looking at, and it made every project the same size — which flattens a
 * client build and a weekend concept into one undifferentiated row of
 * boxes, exactly the template read the brief objected to.
 *
 * Here the first project runs full width and the rest alternate side to
 * side, so the page has a rhythm and the reader controls the pace. Projects
 * with no usable screenshot get a typographic plate rather than a stock
 * photograph of their sector, which is also how the last remote-CDN image
 * dependency left this codebase.
 */
export default function WorkFeatures({ items }) {
  const [lead, ...rest] = items;

  return (
    <div className="border-t border-line">
      <Reveal>
        <Feature project={lead} index={1} lead />
      </Reveal>
      {rest.map((project, i) => (
        <Reveal key={project.name} delay={40}>
          <Feature project={project} index={i + 2} flipped={i % 2 === 1} />
        </Reveal>
      ))}
    </div>
  );
}

function Feature({ project, index, lead = false, flipped = false }) {
  const num = String(index).padStart(2, '0');

  return (
    <article className="grid grid-cols-1 gap-y-8 border-b border-line py-12 md:grid-cols-12 md:gap-gutter md:py-16">
      {/* Visual. On the lead it spans the field; below it swaps sides so the
          list reads as a spread rather than a stack. */}
      <div
        className={
          lead
            ? 'md:col-span-12'
            : flipped
              ? 'md:col-span-6 md:col-start-7 md:row-start-1'
              : 'md:col-span-6'
        }
      >
        {project.image ? (
          <div
            className={`relative w-full overflow-hidden bg-paper-2 ${
              lead ? 'aspect-[16/9]' : 'aspect-[4/3]'
            }`}
          >
            <Image
              src={project.image}
              alt={project.imageAlt || `${project.name} — ${project.sector}`}
              fill
              // The lead image is the largest thing below the hero, so it is
              // the one worth telling the browser about up front.
              sizes={lead ? '(max-width: 768px) 100vw, 1200px' : '(max-width: 768px) 100vw, 50vw'}
              className="object-cover object-top"
            />
          </div>
        ) : (
          <Plate project={project} lead={lead} />
        )}
      </div>

      {/* Metadata */}
      <div
        className={
          lead
            ? 'md:col-span-10 md:col-start-2'
            : flipped
              ? 'md:col-span-5 md:row-start-1 md:self-center'
              : 'md:col-span-5 md:col-start-8 md:self-center'
        }
      >
        <div className="flex items-baseline gap-4">
          <span className="rail text-ink-mute">{num}</span>
          <span className="rail text-accent">{project.sector}</span>
          {project.kind === 'studio' && (
            <span className="rail text-ink-mute">In-house</span>
          )}
        </div>

        <h3
          className={`mt-5 font-display text-headline-lg-mobile text-ink ${
            lead ? 'md:text-display-lg' : 'md:text-headline-lg'
          }`}
        >
          {project.name}
        </h3>

        <p className="mt-5 max-w-text text-body-md text-ink-soft md:text-body-lg">
          {project.body}
        </p>

        <dl className="mt-8 grid grid-cols-1 gap-px border-y border-line bg-line sm:grid-cols-2">
          <div className="bg-paper py-4 pr-4">
            <dt className="rail text-ink-mute">Disciplines</dt>
            <dd className="mt-2 text-body-md text-ink">
              {project.services.join(' · ')}
            </dd>
          </div>
          <div className="bg-paper py-4 pl-0 pr-4 sm:pl-4">
            <dt className="rail text-ink-mute">Scope</dt>
            <dd className="mt-2 text-body-md text-ink">{project.scope}</dd>
          </div>
        </dl>

        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline label-caps mt-7 text-ink"
          >
            {/* Named rather than "Visit site" — a link that says only "site"
                tells a screen-reader user nothing about where it goes. */}
            Visit {project.name}
            <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
          </a>
        ) : (
          <p className="mt-7 text-label-sm text-ink-mute">{project.location}</p>
        )}
      </div>
    </article>
  );
}

/**
 * The plate a project gets instead of a screenshot: its name set large in the
 * display face over a ruled field, with a colour specimen where the identity
 * work justifies one. Deliberately not a placeholder — a project without a
 * live screenshot should look considered, not unfinished.
 */
function Plate({ project, lead }) {
  const spec = project.specimen;

  return (
    <div
      className={`relative flex w-full flex-col justify-between overflow-hidden border border-line bg-paper-2 p-7 md:p-9 ${
        lead ? 'aspect-[16/9]' : 'aspect-[4/3]'
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-line"
      />
      <div className="relative">
        <span className="rail text-ink-mute">{project.location}</span>
        <p
          className={`mt-4 font-display leading-[0.88] tracking-[-0.04em] text-ink ${
            lead ? 'text-[13vw] md:text-[7rem]' : 'text-[9vw] md:text-[3.5rem]'
          }`}
        >
          {project.name}
        </p>
      </div>

      {spec ? (
        <div className="relative">
          <div className="flex h-8 w-full">
            {spec.palette.map((c) => (
              <span
                key={c.hex}
                title={`${c.name} ${c.hex}`}
                className="h-full flex-1 border-r border-paper-2 last:border-r-0"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
          <p className="rail mt-3 text-ink-mute">
            {spec.services.join(' / ')}
          </p>
        </div>
      ) : (
        <p className="relative rail text-ink-mute">{project.result}</p>
      )}
    </div>
  );
}
