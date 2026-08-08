import Link from 'next/link';
import Reveal from './Reveal';
import Icon from './Icon';
import { BRAND } from '@/lib/content';

/**
 * SECTION TWO — the sheet that arrives after the film.
 *
 * The masthead ends on full-bleed footage, so this cannot be another polite
 * band inside the same grid or the whole gesture is wasted. It arrives as a
 * sheet of cream over the film: client marks small and hard left at the top
 * edge, then the proposition deliberately off-axis — a wide empty left
 * column, text starting at the 4th of 12 columns, and the one CTA placed
 * far below the paragraph rather than beside it.
 *
 * The empty left column is doing real work. It's the pause between the
 * spectacle of the masthead and the argument of the page, and it is the
 * reason the headline lands.
 */
export default function Colophon({ headline, body, clients }) {
  return (
    <section className="relative bg-paper">
      {/* Client marks — small, low, unlabelled. They are evidence, not a badge row. */}
      <div className="container-max pt-10 md:pt-14">
        <Reveal>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
            <span className="label-caps text-ink-mute">Selected clients</span>
            <ul className="flex flex-wrap items-center gap-x-10 gap-y-5">
              {clients.map((c) => (
                <li key={c.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.logo}
                    alt={`${c.name} logo`}
                    className="h-5 w-auto max-w-[130px] object-contain opacity-40 transition-opacity duration-500 ease-premium hover:opacity-100"
                  />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* The proposition — pushed off the left edge into the 4th column */}
      <div className="container-max grid grid-cols-1 gap-y-10 pb-stack-lg pt-16 md:grid-cols-12 md:pt-28">
        <div className="md:col-start-4 md:col-span-8">
          <Reveal>
            <h1 className="max-w-[16ch] text-headline-lg-mobile font-semibold tracking-tight text-ink md:text-display-lg">
              {headline}
            </h1>
          </Reveal>
        </div>

        <div className="md:col-start-8 md:col-span-4">
          <Reveal delay={120}>
            <p className="text-body-lg text-ink-soft">{body}</p>
          </Reveal>
        </div>

        {/* CTA sits low and left of the paragraph — never beside the headline */}
        <div className="md:col-start-4 md:col-span-8 md:mt-8">
          <Reveal delay={200} className="flex flex-wrap items-center gap-8">
            <a
              href={`mailto:${BRAND.email}?subject=${encodeURIComponent(
                'New project enquiry'
              )}`}
              className="btn-primary"
            >
              Contact sales
              <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
            </a>
            <Link href="#work" className="link-underline label-caps text-ink">
              See the work
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
