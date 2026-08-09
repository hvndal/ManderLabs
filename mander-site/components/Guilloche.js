/**
 * The engraved rosette, placed as a decorative plate.
 *
 * Generated procedurally — see scripts/make-guilloche.py for the maths and
 * for why engraving rather than an icon set. Served as a static SVG rather
 * than inlined: the path data is ~22KB, which is nothing as a cached file
 * but would be dead weight in every HTML response, and it is used in five
 * places on two routes.
 *
 * Always decorative. It is an <img> with empty alt and aria-hidden, never
 * announced, and it never sits between the reader and anything they need —
 * every placement is behind content and under 0.14 opacity.
 *
 * `spin` adds a very slow rotation. At 120s per revolution it is below the
 * threshold of noticing motion directly; what it does is stop the plate
 * from reading as a flat sticker when the eye passes it twice. It is a
 * compositor-only transform, and it is dropped entirely under
 * prefers-reduced-motion (see globals.css).
 */
export default function Guilloche({
  tone = 'ink',
  className = '',
  spin = false,
  opacity,
}) {
  const src = tone === 'rose' ? '/guilloche-rose.svg' : '/guilloche-ink.svg';

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute select-none ${className}`}
      style={opacity != null ? { opacity } : undefined}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        draggable="false"
        className={`h-full w-full ${spin ? 'guilloche-spin' : ''}`}
      />
    </span>
  );
}
