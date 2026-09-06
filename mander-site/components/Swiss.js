import Link from 'next/link';
import Reveal from './Reveal';

/**
 * The Swiss kit — the four objects every interior page is now built from.
 *
 * The site's pages were assembled from cards: bordered boxes with padding,
 * arranged in threes, each one repeating the same internal rhythm. That is
 * the pattern the brief called generic, and no amount of recolouring fixes
 * it, because the problem is the object rather than its finish.
 *
 * What replaces a card here is a ROW. Rows share edges, carry a number in the
 * margin, put one line of type in the field and the metadata at the right,
 * and are separated by a hairline rather than by whitespace and a border on
 * four sides. A list of rows reads as an index — a document — where a grid of
 * cards reads as an interface. That single swap is most of what makes the
 * difference between the two look and feel like different sites.
 *
 * Everything below shares one grid: 12 columns, metadata in 1–3, content in
 * 4–12. Keeping every page on those two positions is what makes the whole
 * thing cohere without a visual theme being applied on top.
 */

/** A numbered row. The core object — used for plans, cities, posts, roles. */
export function IndexRow({
  index,
  title,
  meta,
  body,
  href,
  external = false,
  action = 'View',
  delay = 0,
}) {
  const inner = (
    <div className="grid grid-cols-1 gap-3 py-7 md:grid-cols-12 md:items-baseline md:gap-gutter">
      <div className="md:col-span-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
          {index}
        </span>
      </div>

      <div className={body ? 'md:col-span-5' : 'md:col-span-8'}>
        <h3 className="font-display text-headline-lg-mobile font-normal leading-[1.05] text-ink transition-colors duration-300 group-hover:text-accent">
          {title}
        </h3>
      </div>

      {body && (
        <div className="md:col-span-4">
          <p className="max-w-text text-body-md text-ink-soft">{body}</p>
        </div>
      )}

      <div className="flex items-baseline justify-between gap-4 md:col-span-2 md:justify-end">
        {meta && (
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
            {meta}
          </span>
        )}
        {href && (
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent">
            {action} ↗
          </span>
        )}
      </div>
    </div>
  );

  const className =
    'group block border-t border-line transition-colors duration-300 hover:bg-paper-2';

  if (!href) {
    return (
      <Reveal delay={delay}>
        <div className="border-t border-line">{inner}</div>
      </Reveal>
    );
  }

  return (
    <Reveal delay={delay}>
      {external ? (
        <a href={href} className={className} target="_blank" rel="noreferrer noopener">
          {inner}
        </a>
      ) : (
        <Link href={href} className={className}>
          {inner}
        </Link>
      )}
    </Reveal>
  );
}

/** A list of rows, closed by a rule so the set reads as one block. */
export function IndexList({ children, className = '' }) {
  return <div className={`border-b border-line ${className}`}>{children}</div>;
}

/**
 * A specification block: label in the margin, value in the field.
 *
 * This is what replaces a card's inner list. Same grid as everything else, so
 * a spec sitting under a row lines up with the row's own columns.
 */
export function SpecRow({ label, children, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="grid grid-cols-1 gap-3 border-t border-line py-6 md:grid-cols-12 md:gap-gutter">
        <div className="md:col-span-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
            {label}
          </span>
        </div>
        <div className="md:col-span-9">{children}</div>
      </div>
    </Reveal>
  );
}

/** Small caption type — figure numbers, notes under a block. */
export function FieldNote({ children, className = '' }) {
  return (
    <p
      className={`font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-ink-mute ${className}`}
    >
      {children}
    </p>
  );
}
