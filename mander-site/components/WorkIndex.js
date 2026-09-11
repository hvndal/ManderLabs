/**
 * The work, as an index rather than a portfolio.
 *
 * The homepage used to run three full editorial features here — big images,
 * alternating columns, most of the page's length spent on a portfolio before
 * a first-time visitor found out what anything costs. This is the same
 * information as a list: every project, not three of eight, in a few
 * centimetres of ruled text. The full features still exist on /work, which is
 * where someone who actually wants to read a portfolio is going.
 *
 * Deliberately not IndexRow from Swiss.js, though it looks like the same
 * shape: that component is a twelve-column object with headline-scale type,
 * and nesting it inside this section's seven-column column would put a
 * twelve-column grid inside a seven-column one and set eight project names at
 * plate size. This matches the compact ruled-row idiom the plans list on the
 * same page already uses instead.
 *
 * No per-row links. The ask was a text, half these entries have no outbound
 * link to give (Waste Universe's is withheld on purpose — see its note in
 * lib/content.js), and the section already carries one "All work" button.
 *
 * `kind: 'studio'` is marked In-house on the row. That distinction is not
 * decoration: presenting the studio's own weekend builds as paid client
 * engagements would be inventing clients.
 */
export default function WorkIndex({ items }) {
  return (
    <ol className="border-t border-line">
      {items.map((project, i) => (
        <li
          key={project.name}
          className="grid grid-cols-[auto_1fr] items-baseline gap-x-4 gap-y-1.5 border-b border-line py-4 sm:grid-cols-[auto_1fr_auto]"
        >
          <span className="rail text-ink-mute">
            {String(i + 1).padStart(2, '0')}
          </span>

          <span className="font-display text-[1.45rem] leading-none text-ink">
            {project.name}
          </span>

          <span className="col-start-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 sm:col-start-3 sm:justify-end">
            {project.kind === 'studio' && (
              <span className="rail text-ink-mute">In-house</span>
            )}
            <span className="rail text-accent">{project.sector}</span>
            <span className="rail text-ink-mute">{project.result}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
