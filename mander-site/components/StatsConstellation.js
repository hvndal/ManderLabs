import Reveal from './Reveal';

/**
 * SECTION THREE — the stats, as a constellation rather than a table.
 *
 * A row of three evenly-spaced stats is the single most generic module on
 * the modern agency web, and it wastes the only genuinely impressive number
 * on this site by giving it the same weight as the other two.
 *
 * So: three stats, three different scales, three different positions, no
 * shared baseline and no dividers. The first is set at display scale — as
 * large as it can go while staying fully legible, since cropping a number
 * costs more than the gesture is worth — with its caption dropped to the
 * baseline beside it. The second sits at roughly half that size, pushed far
 * right. The third is small, low and hard left. The eye travels a diagonal
 * instead of scanning a rule, and the hierarchy says which number matters.
 *
 * The generous empty space between them is the composition, not a gap.
 */
export default function StatsConstellation({ stats }) {
  const [first, second, third] = stats;

  return (
    <section className="relative overflow-hidden bg-paper-2 py-stack-lg">
      <div className="container-max">
        {/* One — enormous, cropped by the right edge */}
        {first && (
          <Reveal>
            <div className="relative">
              <div className="flex items-end gap-6 md:gap-10">
                <span className="whitespace-nowrap font-display text-[22vw] font-normal leading-[0.82] tracking-[-0.02em] text-ink md:text-[15.5vw]">
                  {first.value}
                </span>
                <span className="mb-3 max-w-[16ch] text-body-md text-ink-soft md:mb-5">
                  {first.label}
                </span>
              </div>
            </div>
          </Reveal>
        )}

        {/* Two — half scale, pushed to the right, well below */}
        {second && (
          <Reveal delay={120}>
            <div className="mt-20 flex justify-end md:mt-28">
              <div className="max-w-[34ch] text-right">
                <span className="block font-display text-stat-xl font-normal leading-none text-ink">
                  {second.value}
                </span>
                <span className="mt-4 block text-body-md text-ink-soft">
                  {second.label}
                </span>
              </div>
            </div>
          </Reveal>
        )}

        {/* Three — small, hard left, quiet */}
        {third && (
          <Reveal delay={200}>
            <div className="mt-16 max-w-[26ch] md:mt-20">
              <span className="block font-display text-stat-md font-normal leading-none text-ink">
                {third.value}
              </span>
              <span className="mt-3 block text-body-md text-ink-soft">
                {third.label}
              </span>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
