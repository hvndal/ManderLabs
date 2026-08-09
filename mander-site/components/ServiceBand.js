import Reveal from './Reveal';
import AperturedType from './AperturedType';

export default function ServiceBand({ service, index = 0 }) {
  return (
    <Reveal delay={index * 70}>
      <div className="group grid grid-cols-2 items-center gap-y-6 py-12 md:grid-cols-12 md:gap-gutter md:py-16">
        {/* Index, apertured — film through the numeral rather than flat mono.
            The same move as the masthead and the footer wordmark, so the
            page's two numbered lists and both ends of the document all speak
            with one idea.

            These were flattened to plain mono at one point to cut the cost of
            six simultaneously decoding videos; AperturedType now pauses
            whatever is off screen, which keeps two or three live at a time
            instead of all of them, so the motif can come back. */}
        <div className="col-span-2 md:col-span-2">
          <AperturedType
            text={service.index}
            viewBox="0 0 200 120"
            fontSize={116}
            baselineY={96}
            maskId={`service-${service.index}`}
            className="w-[76px] opacity-80 transition-opacity duration-500 group-hover:opacity-100 md:w-[96px]"
            mediaClassName="brightness-[0.8] saturate-[1.2]"
          />
        </div>

        {/* Title */}
        <div className="col-span-2 md:col-span-4">
          <h3 className="font-display text-headline-lg-mobile font-normal text-ink transition-colors duration-500 group-hover:text-accent md:text-headline-lg">
            {service.title}
          </h3>
        </div>

        {/* Copy */}
        <div className="col-span-2 md:col-span-6">
          <p className="max-w-text text-body-lg text-ink-soft">{service.body}</p>
        </div>
      </div>
    </Reveal>
  );
}

