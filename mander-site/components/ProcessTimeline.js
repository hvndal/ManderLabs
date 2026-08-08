import Reveal from './Reveal';

/**
 * The process, as a staircase.
 *
 * This was a vertical connecting line with four evenly-weighted rows — legible,
 * but it read as a checklist and every step looked equally important, which is
 * exactly the flatness that makes a page feel unauthored.
 *
 * Now each step is indented one column further than the last, so the four of
 * them descend across the grid and the shape of the section itself describes
 * a sequence — you can see it's a progression before you read a word. The step
 * numeral grows with the indent and the rule above each row shortens, which
 * gives the whole block a diagonal without any element being decorative.
 *
 * Deliberately no connecting line: the offset does the work, and a line would
 * only re-impose the single axis this is trying to escape.
 */

// 12-col placements per step. Kept explicit rather than computed so the
// classes survive Tailwind's static extraction.
const PLACEMENT = [
  { col: 'md:col-span-9 md:col-start-1', num: 'md:text-[7vw]', rule: 'md:w-full' },
  { col: 'md:col-span-8 md:col-start-3', num: 'md:text-[7.8vw]', rule: 'md:w-4/5' },
  { col: 'md:col-span-7 md:col-start-5', num: 'md:text-[8.6vw]', rule: 'md:w-3/5' },
  { col: 'md:col-span-6 md:col-start-7', num: 'md:text-[9.4vw]', rule: 'md:w-2/5' },
];

export default function ProcessTimeline({ steps }) {
  return (
    <ol className="grid grid-cols-1 gap-y-4 md:grid-cols-12">
      {steps.map((step, index) => {
        const place = PLACEMENT[index] || PLACEMENT[PLACEMENT.length - 1];

        return (
          <Reveal
            key={step.step}
            as="li"
            delay={index * 110}
            className={`${place.col} process-step pt-7 md:pt-9`}
          >
            {/* The rule draws itself left-to-right as the step arrives, so the
                staircase builds rather than simply appearing. Transform-only,
                so it stays on the compositor at high refresh rates. */}
            <span
              aria-hidden="true"
              className="process-rule block h-px w-full origin-left bg-line-strong"
            />

            <div className="flex items-start gap-6 pt-7 md:gap-10 md:pt-9">
              <span
                className={`font-mono text-stat-lg leading-[0.8] text-line-strong ${place.num}`}
                aria-hidden="true"
              >
                {step.step}
              </span>

              <div className="flex-1 pb-10 md:pb-14">
                <h3 className="text-headline-md font-semibold tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-text text-body-lg text-ink-soft">
                  {step.body}
                </p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
