import Reveal from './Reveal';

export default function ServiceBand({ service, index = 0 }) {
  return (
    <Reveal delay={index * 70}>
      <div className="group grid grid-cols-2 items-center gap-y-6 py-12 md:grid-cols-12 md:gap-gutter md:py-16">
        {/* Index */}
        <div className="col-span-2 md:col-span-2">
          <span className="font-mono text-body-md font-medium text-ink-mute transition-colors duration-500 group-hover:text-accent">
            {service.index}
          </span>
        </div>

        {/* Title */}
        <div className="col-span-2 md:col-span-4">
          <h3 className="text-headline-lg-mobile font-semibold tracking-tight text-ink md:text-headline-md">
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

