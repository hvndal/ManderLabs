import Reveal from './Reveal';
import GridField from './GridField';
import Breadcrumbs from './Breadcrumbs';

/**
 * The running head — the triptych's grammar, applied to every other route.
 *
 * The homepage opens on a mono metadata rail above a full-bleed composition;
 * the rest of the site used to open on a centred-ish eyebrow and a serif
 * title, which was fine and belonged to a different design. This is what
 * connects them: the same rail, the same hairline, the same relationship
 * between tiny uppercase metadata and enormous serif.
 *
 * Deliberately a layout, not a hero. It takes the page's own eyebrow, title
 * and lede and arranges them — no illustration, no gradient, no button by
 * default. Pages that need actions pass them in; the ones that do not stay
 * quiet, which is most of them.
 *
 * `meta` is the rail: two or three short strings, set in mono at 10px, that
 * say where you are rather than trying to sell anything. On a location page
 * that is the region and country; on a policy it is the document and the date
 * it was last changed. Anything longer than about four words per item breaks
 * the line on a phone, so the middle item is hidden below `sm` rather than
 * allowed to wrap into a paragraph.
 */
export default function PageHeader({
  eyebrow,
  title,
  lede,
  meta = [],
  trail,
  actions,
  align = 'left',
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      <GridField />

      {meta.length > 0 && (
        <div className="relative z-10 flex items-baseline justify-between gap-6 border-b border-line px-margin-mobile py-4 md:px-margin-desktop">
          {meta.map((item, i) => (
            <span
              key={item}
              className={`rail text-ink-mute ${
                i === 1 ? 'hidden sm:block' : ''
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      )}

      <div className="relative container-max py-stack-md">
        {trail && <Breadcrumbs trail={trail} />}

        <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : ''}>
          {eyebrow && (
            <Reveal>
              <span className={`eyebrow ${align === 'center' ? 'justify-center' : ''}`}>
                {eyebrow}
              </span>
            </Reveal>
          )}

          <Reveal delay={80}>
            <h1 className="h-display max-w-[16ch]">{title}</h1>
          </Reveal>

          {/* The hairline the cover runs under its masthead, doing the same
              job at the top of a page: separating the statement from the
              explanation without a box or a background change. */}
          <Reveal delay={140}>
            <div className="mt-8 h-px w-full max-w-[34rem] bg-accent-soft" />
          </Reveal>

          {lede && (
            <Reveal
              delay={180}
              className={
                // Two columns, because these ledes run to three or four
                // paragraphs and a single 46rem measure four paragraphs deep
                // is a wall rather than an opening. The first paragraph opens
                // on a drop cap, exactly as the cover does — one page, one
                // initial, which is what keeps it a device rather than a tic.
                align === 'center'
                  ? 'mt-8 max-w-text space-y-5 text-body-lg text-ink-soft'
                  : 'mt-9 max-w-[62rem] text-body-lg leading-[1.65] text-ink-soft md:columns-2 md:gap-16 [&>p+p]:mt-5 [&>p]:break-inside-avoid [&>p:first-child]:first-letter:float-left [&>p:first-child]:first-letter:mr-2.5 [&>p:first-child]:first-letter:mt-[0.09em] [&>p:first-child]:first-letter:font-editorial [&>p:first-child]:first-letter:text-[3.4em] [&>p:first-child]:first-letter:leading-[0.78] [&>p:first-child]:first-letter:text-ink'
              }
            >
              {lede}
            </Reveal>
          )}

          {actions && (
            <Reveal
              delay={240}
              className={`mt-10 flex flex-wrap items-center gap-x-9 gap-y-4 ${
                align === 'center' ? 'justify-center' : ''
              }`}
            >
              {actions}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
