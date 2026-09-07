'use client';

import Reveal from './Reveal';
import AperturedType from './AperturedType';

export default function ServiceBand({ service, index = 0 }) {
  return (
    <Reveal delay={index * 60}>
      <div className="group grid grid-cols-2 items-center gap-y-4 py-10 md:grid-cols-12 md:gap-gutter md:py-14 transition-all duration-300 hover:translate-x-1">
        {/* Index, apertured — video loops inside the numeral */}
        <div className="col-span-2 md:col-span-2 flex items-center gap-3">
          <AperturedType
            text={service.index}
            viewBox="0 0 200 120"
            fontSize={116}
            baselineY={96}
            maskId={`service-${service.index}`}
            offset={index / 5}
            className="w-[72px] opacity-80 transition-opacity duration-500 group-hover:opacity-100 md:w-[92px]"
            mediaClassName="brightness-[0.8] saturate-[1.2]"
          />
          <span className="hidden group-hover:inline-block h-1.5 w-1.5 bg-accent rounded-full transition-all duration-300" />
        </div>

        {/* Title */}
        <div className="col-span-2 md:col-span-4">
          <h3 className="font-display text-headline-lg-mobile font-normal text-ink transition-colors duration-400 group-hover:text-accent md:text-headline-lg">
            {service.title}
          </h3>
        </div>

        {/* Copy */}
        <div className="col-span-2 md:col-span-6">
          <p className="max-w-text text-body-lg text-ink-soft font-light leading-relaxed">
            {service.body}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
