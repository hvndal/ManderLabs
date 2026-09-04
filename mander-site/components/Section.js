import Reveal from './Reveal';

/**
 * The section shell.
 *
 * `rule` draws the hairline that separates one section from the next. The
 * site used to rely on alternating background tones for that job, which is a
 * softer, more familiar device and the reason the page read as a stack of
 * bands rather than as a spread. A rule is the Swiss answer: the structure is
 * drawn, not shaded, and the ground can then stay one colour for several
 * sections at a stretch.
 */
export function Section({
  id,
  children,
  className = '',
  tone = 'paper',
  rule = true,
}) {
  const tones = {
    paper: 'bg-paper',
    alt: 'bg-paper-2',
    white: 'bg-white',
    warm: 'bg-accent-soft/[0.10]',
    ink: 'bg-ink text-paper',
  };

  return (
    <section
      id={id}
      className={`${tones[tone] || tones.paper} ${
        rule ? 'border-t border-line' : ''
      } py-stack-lg ${className}`}
    >
      <div className="container-max">{children}</div>
    </section>
  );
}

/**
 * The section head, set as a spread rather than a stack.
 *
 * Three things make this read as editorial rather than as a marketing block,
 * and all three are structural rather than decorative:
 *
 * The index and eyebrow sit in their own narrow column to the left of the
 * title on desktop, against a hairline that runs the full measure. That is
 * the running head of a magazine page — metadata in the margin, statement in
 * the field — and it is what stops every section opening with the same
 * centred label-then-headline rhythm.
 *
 * The type does the hierarchy on its own: 10px mono uppercase against a
 * display serif several times its size, with nothing in between. The middle
 * sizes are what made the old version read as generic.
 *
 * `meta` is optional and hangs off the right edge — a count, a date, a place.
 * It fills the gap that opens up beside a short title on a wide screen, which
 * is otherwise the emptiest and least deliberate part of the composition.
 */
export function SectionHeading({
  eyebrow,
  index,
  title,
  body,
  meta,
  align = 'left',
  dark = false,
  className = '',
}) {
  const centred = align === 'center';

  if (centred) {
    return (
      <Reveal className={`mx-auto max-w-text text-center ${className}`}>
        {eyebrow && (
          <span className={`eyebrow justify-center ${dark ? 'text-paper/50' : ''}`}>
            {eyebrow}
          </span>
        )}
        <h2 className={`h-section ${dark ? 'text-paper' : ''}`}>{title}</h2>
        {body && (
          <p className={`mt-5 text-body-lg ${dark ? 'text-paper/70' : 'text-ink-soft'}`}>
            {body}
          </p>
        )}
      </Reveal>
    );
  }

  return (
    <Reveal className={className}>
      <div
        className={`border-t pt-6 ${dark ? 'border-paper/20' : 'border-line'}`}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-gutter">
          <div className="md:col-span-3">
            <div className="flex items-baseline gap-4">
              {index && (
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
                    dark ? 'text-paper/40' : 'text-ink-mute'
                  }`}
                >
                  {index}
                </span>
              )}
              {eyebrow && (
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
                    dark ? 'text-paper/60' : 'text-accent'
                  }`}
                >
                  {eyebrow}
                </span>
              )}
            </div>
          </div>

          <div className="md:col-span-8">
            <h2
              className={`font-display text-headline-lg-mobile font-normal leading-[1.02] md:text-headline-lg ${
                dark ? 'text-paper' : 'text-ink'
              }`}
            >
              {title}
            </h2>
            {body && (
              <p
                className={`mt-6 max-w-text text-body-lg ${
                  dark ? 'text-paper/70' : 'text-ink-soft'
                }`}
              >
                {body}
              </p>
            )}
          </div>

          {meta && (
            <div className="md:col-span-1 md:text-right">
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
                  dark ? 'text-paper/40' : 'text-ink-mute'
                }`}
              >
                {meta}
              </span>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default Section;
