import Reveal from './Reveal';

/**
 * Large, quote-led, no cards, no stars, no avatars — a stacked editorial
 * list with generous space between entries. This section is pure breathing
 * room by design: it carries the pacing, not information density.
 */
export default function Testimonials({ items }) {
  return (
    <div className="flex flex-col divide-y divide-line border-y border-line">
      {items.map((item, index) => (
        <Reveal key={item.person} delay={index * 90} className="py-14 md:py-20">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-12">
            <span
              aria-hidden="true"
              className="font-serif text-6xl leading-none text-line-strong md:col-span-1 md:text-7xl"
            >
              &ldquo;
            </span>
            <blockquote className="md:col-span-8">
              <p className="text-headline-lg-mobile font-medium leading-snug tracking-tight text-ink md:text-headline-md">
                {item.quote}
              </p>
              <footer className="label-caps mt-6 text-ink-mute">
                {item.person}
              </footer>
            </blockquote>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
