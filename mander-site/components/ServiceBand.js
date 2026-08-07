import Image from 'next/image';
import Reveal from './Reveal';

/**
 * Full-bleed editorial row: a large photo on one side, big index + title and
 * copy on the other. Alternates sides down the page. No cards, no borders —
 * the photography carries it.
 */
export default function ServiceBand({ service, flip = false }) {
  return (
    <div className="grid grid-cols-1 items-stretch md:grid-cols-2">
      {/* Photo */}
      <div
        className={`relative min-h-[280px] overflow-hidden bg-paper-3 md:min-h-[520px] ${
          flip ? 'md:order-2' : ''
        }`}
      >
        {service.image && (
          <Image
            src={service.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[900ms] ease-premium hover:scale-[1.03]"
          />
        )}
      </div>

      {/* Text */}
      <div
        className={`flex items-center px-margin-mobile py-14 md:px-[7vw] md:py-0 ${
          flip ? 'md:order-1' : ''
        }`}
      >
        <Reveal className="max-w-text">
          <span className="font-mono text-stat-md text-line-strong">
            {service.index}
          </span>
          <h3 className="mt-5 text-headline-lg-mobile font-semibold tracking-tight text-ink md:text-headline-lg">
            {service.title}
          </h3>
          <p className="mt-5 text-body-lg text-ink-soft">{service.body}</p>
        </Reveal>
      </div>
    </div>
  );
}
