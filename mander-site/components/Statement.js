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
export default function Statement({ eyebrow, text, tone = 'paper' }) {
  const tones = {
    paper: 'bg-paper text-ink',
    alt: 'bg-paper-2 text-ink',
    // A soft wash of the logo's true rose over paper — the site's one
    // deliberate warm beat, used sparingly so it still reads as an accent
    // rather than a colour scheme.
    warm: 'bg-accent-soft/[0.16] text-ink',
    ink: 'bg-ink text-paper',
  };

  return (
    <section className={`${tones[tone] || tones.paper} border-b border-line`}>
      <div className="container-max py-stack-lg">
        <Reveal className="mx-auto max-w-4xl text-center">
          {eyebrow && (
            <span
              className={`label-caps mb-8 block ${
                tone === 'ink' ? 'text-paper/50' : 'text-accent'
              }`}
            >
              {eyebrow}
            </span>
          )}
          <p className="text-headline-lg-mobile font-medium leading-[1.15] tracking-tight md:text-headline-lg">
            {text}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
