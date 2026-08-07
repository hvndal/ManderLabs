// A whisper of film grain over the whole viewport — the texture premium
// editorial sites use so large flat colour fields (and photography) don't
// read as flat digital vector. Fixed, ~3.5% opacity, blend-mode overlay so
// it stays a texture rather than visible noise. Purely decorative — hidden
// from assistive tech.
export default function Grain() {
  return (
    <div className="grain-overlay" aria-hidden="true">
      <svg width="100%" height="100%">
        <filter id="grain-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-noise)" />
      </svg>
    </div>
  );
}
