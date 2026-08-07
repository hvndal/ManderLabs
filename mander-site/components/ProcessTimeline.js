import Reveal from './Reveal';

/**
 * A vertical connecting-line timeline rather than four equal boxes — reads
 * as a sequence, not a feature grid. One thin ink line runs the full height;
 * each step's marker sits on it.
 */
export default function ProcessTimeline({ steps }) {
  return (
    <ol className="relative flex flex-col">
      {/* The connecting line */}
      <div
        aria-hidden="true"
        className="absolute bottom-6 left-[15px] top-6 w-px bg-line md:left-[19px]"
      />

      {steps.map((step, index) => (
        <Reveal key={step.step} as="li" delay={index * 90} className="relative">
          <div className="flex gap-8 py-8 md:gap-12 md:py-10">
            {/* Marker */}
            <div className="relative shrink-0">
              <div className="flex h-8 w-8 items-center justify-center bg-paper md:h-10 md:w-10">
                <span className="h-2 w-2 bg-ink" aria-hidden="true" />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-2 pb-2 md:flex-row md:items-baseline md:justify-between md:gap-8">
              <div className="flex items-baseline gap-4 md:w-1/3">
                <span className="font-mono text-label-sm text-ink-mute">{step.step}</span>
                <h3 className="text-headline-md text-ink">{step.title}</h3>
              </div>
              <p className="max-w-md text-body-lg text-ink-soft md:w-2/3">{step.body}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
