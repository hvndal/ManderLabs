import Reveal from './Reveal';

export function Section({ id, children, className = '', tone = 'paper' }) {
  const tones = {
    paper: 'bg-paper',
    alt: 'bg-paper-2',
    white: 'bg-white',
    warm: 'bg-accent-soft/[0.16]',
    ink: 'bg-ink text-paper',
  };

  return (
    <section id={id} className={`${tones[tone] || tones.paper} py-stack-lg ${className}`}>
      <div className="container-max">{children}</div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, body, align = 'left', dark = false, className = '' }) {
  const centred = align === 'center';

  return (
    <Reveal className={`${centred ? 'mx-auto max-w-text text-center' : 'max-w-text'} ${className}`}>
      {eyebrow && (
        <span className={`eyebrow ${centred ? 'justify-center' : ''} ${dark ? 'text-paper/50' : ''}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`h-section ${dark ? 'text-paper' : ''}`}>{title}</h2>
      {body && (
        <p className={`mt-5 text-body-lg ${dark ? 'text-paper/70' : 'text-ink-soft'}`}>{body}</p>
      )}
    </Reveal>
  );
}

export default Section;
