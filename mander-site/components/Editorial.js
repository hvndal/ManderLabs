import Reveal from './Reveal';

/**
 * The editorial kit.
 *
 * The last revision changed the typefaces and called the result editorial. It
 * was not: a page is not a printed page because its headline is set in a
 * serif, it is a printed page because of the devices around the headline —
 * a standfirst that is visibly not body copy, a drop cap opening the text, a
 * caption under every image, a folio running down the margin, a quote that
 * breaks the measure rather than sitting in a coloured band.
 *
 * That is what lives here. Five small pieces, used on every page, so the
 * whole site speaks one language instead of each route inventing its own.
 */

/**
 * The paragraph between the headline and the article — set larger than body
 * copy, held to a short measure, and ruled off above.
 *
 * `dropCap` opens it with a three-line initial in the display serif. Used on
 * the first standfirst of a page only; a drop cap on every section is a
 * pastiche of the thing rather than the thing.
 */
export function Standfirst({ children, dropCap = false, className = '' }) {
  return (
    <p
      className={`max-w-[46ch] border-t border-line pt-6 text-body-lg leading-[1.6] text-ink-soft ${
        dropCap
          ? // The initial is floated rather than absolutely placed so the
            // following lines wrap around it, which is the entire point of a
            // drop cap and the part a CSS approximation usually gets wrong.
            'first-letter:float-left first-letter:mr-3 first-letter:mt-[0.08em] first-letter:font-editorial first-letter:text-[3.6em] first-letter:leading-[0.78] first-letter:text-ink'
          : ''
      } ${className}`}
    >
      {children}
    </p>
  );
}

/**
 * A caption. Mono, small, ruled above, numbered per page.
 *
 * Every image on this site had nothing under it, which is what made the
 * photography read as decoration rather than as part of the document.
 */
export function Caption({ figure, children, tone = 'light', className = '' }) {
  const dark = tone === 'dark';
  return (
    <figcaption
      className={`mt-3 flex items-baseline gap-3 border-t pt-2.5 ${
        dark ? 'border-paper/20' : 'border-line'
      } ${className}`}
    >
      {figure && (
        <span className={`rail shrink-0 ${dark ? 'text-paper/50' : 'text-ink-mute'}`}>
          Fig. {figure}
        </span>
      )}
      <span className={`text-label-sm ${dark ? 'text-paper/70' : 'text-ink-mute'}`}>
        {children}
      </span>
    </figcaption>
  );
}

/**
 * The running head, pinned in the left margin.
 *
 * Sticky on desktop, so it travels alongside its section the way a folio sits
 * on every page of a printed feature rather than appearing once at the top.
 * On a phone it is a single line above the section, because a margin that is
 * 20px wide has no room for furniture.
 */
export function Folio({ index, children, tone = 'light' }) {
  const dark = tone === 'dark';
  return (
    <div className="md:sticky md:top-28 md:self-start">
      <div className="flex items-baseline gap-3 md:flex-col md:gap-2">
        <span className={`rail ${dark ? 'text-paper/60' : 'text-ink-mute'}`}>
          {index}
        </span>
        <span className={`rail ${dark ? 'text-paper/70' : 'text-ink-mute'}`}>
          {children}
        </span>
      </div>
    </div>
  );
}

/**
 * A section built on the folio grid: running head in columns 1–2, content in
 * 4–12. Everything on the site that is not the cover or a full-bleed image
 * goes through here, which is what makes the pages feel like one document.
 */
export function Spread({ index, folio, children, tone = 'light', className = '', id }) {
  return (
    <div
      id={id}
      className={`container-max grid grid-cols-1 gap-y-8 stack-y md:grid-cols-12 md:gap-gutter ${className}`}
    >
      <div className="md:col-span-2">
        <Folio index={index} tone={tone}>
          {folio}
        </Folio>
      </div>
      <div className="md:col-span-10">{children}</div>
    </div>
  );
}

/**
 * A pull-quote that breaks the measure.
 *
 * The old Statement was a full-width band with centred type in it — an
 * interruption, not a quote. This hangs its opening mark into the left margin
 * and sits inside the text column, the way a magazine sets one.
 */
export function PullQuote({ children, tone = 'light' }) {
  const dark = tone === 'dark';
  return (
    <Reveal>
      <blockquote className="relative max-w-[24ch] py-4">
        <span
          aria-hidden="true"
          className={`absolute -left-[0.42em] -top-[0.18em] font-editorial text-[5rem] leading-none ${
            dark ? 'text-paper/25' : 'text-line-strong'
          }`}
        >
          &ldquo;
        </span>
        <p
          className={`relative font-display text-headline-lg-mobile leading-[1.12] md:text-headline-lg ${
            dark ? 'text-paper' : 'text-ink'
          }`}
        >
          {children}
        </p>
      </blockquote>
    </Reveal>
  );
}
