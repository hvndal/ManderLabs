/**
 * The column grid, drawn.
 *
 * Replaces an engraved guilloche rosette that was tried here first and cut:
 * it was ornament from the wrong century, and set against a cinematic video
 * hero and a square-cornered, hairline-ruled design system it argued with
 * both. The page's geometry is rectilinear everywhere — zero border radius,
 * hairline rules, a 12-column measure — so its ambient graphic has to be
 * rectilinear too.
 *
 * This is simply the site's own layout grid made faintly visible: twelve
 * column rules on the same container and gutter as the content standing on
 * top of them. It is the one decorative move a web studio can make that is
 * also an argument — the grid is the product.
 *
 * Four columns on phones because twelve hairlines across 320px is a texture,
 * not a grid, and reads as noise.
 *
 * No asset, no request, no animation. Purely a background, so it is
 * aria-hidden and pointer-events-none.
 */
export default function GridField({ tone = 'ink', className = '' }) {
  const color =
    tone === 'paper' ? 'rgba(244, 242, 236, 0.14)' : 'rgba(28, 21, 18, 0.10)';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="container-max h-full">
        <div className="grid h-full grid-cols-4 gap-gutter md:grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={i > 3 ? 'hidden h-full border-l md:block' : 'h-full border-l'}
              style={{ borderColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
