import Reveal from './Reveal';

/**
 * A single-line editorial statement with enormous whitespace around it.
 *
 * This is the "breathing room" section — no imagery, no cards, often just
 * one sentence. It exists purely for pacing: dropped between dense sections
 * (Work, Services, Pricing) so the page doesn't read as uniformly important
 * end to end. Skip it and the site feels like a brochure; keep it and the
 * dense sections around it read as considered rather than exhausting.
 */
export default function Statement({ eyebrow, text, tone = 'paper', align = 'center' }) {
  const tones = {
    paper: 'bg-paper text-ink',
    alt: 'bg-paper-2 text-ink',
    // A soft wash of the logo's true rose over paper — the site's one
    // deliberate warm beat, used sparingly so it still reads as an accent
    // rather than a colour scheme.
    warm: 'bg-accent-soft/[0.16] text-ink',
    ink: 'bg-ink text-paper',
  };

  const dark = tone === 'ink';

  // Editorial cut: the eyebrow drops into the left margin as a running head
  // and the sentence is set a full step larger, flush left from the third
  // column. Centred type with an eyebrow stacked over it is the single most
  // recognisable generated-agency composition; this is the same content with
  // an axis and some scale behind it.
  if (align === 'editorial') {
    return (
      <section className={`${tones[tone] || tones.paper}`}>
        <div className="container-max grid grid-cols-1 gap-y-8 py-stack-lg md:grid-cols-12 md:gap-gutter">
          {eyebrow && (
            <div className="md:col-span-2">
              <Reveal>
                <span
                  className={`label-caps block ${dark ? 'text-paper/50' : 'text-accent'}`}
                >
                  {eyebrow}
                </span>
                <span
                  className={`mt-5 hidden h-px w-full md:block ${
                    dark ? 'bg-paper/25' : 'bg-accent/40'
                  }`}
                />
              </Reveal>
            </div>
          )}
          <div className="md:col-span-9 md:col-start-4">
            <Reveal delay={90}>
              <p className="max-w-[20ch] font-display text-headline-lg-mobile leading-[1.08] font-normal md:max-w-[16ch] md:text-display-lg">
                {text}
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${tones[tone] || tones.paper} border-b border-line`}>
      <div className="container-max py-stack-lg">
        <Reveal className="mx-auto max-w-4xl text-center">
          {eyebrow && (
            <span
              className={`label-caps mb-8 block ${dark ? 'text-paper/50' : 'text-accent'}`}
            >
              {eyebrow}
            </span>
          )}
          <p className="font-display text-headline-lg-mobile leading-[1.15] font-normal md:text-headline-lg">
            {text}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
