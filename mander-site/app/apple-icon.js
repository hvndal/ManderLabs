import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// iOS home screen, and the square several crawlers and link unfurlers reach
// for when there's no other icon.
//
// This is the real MANDER figure; icon.svg (the favicon) is the letterform.
// That split is deliberate, and it's the standard small-size logo problem
// rather than a shortcut. The lockup in /public is a fine-line drawing — a
// figure, a card panel with ruled text on it, a wordmark and a tagline. I
// rendered it down and measured it: at 32px it's marginal, and at 16px, the
// size a Google result row and a browser tab actually draw, it collapses
// into an unreadable blob. Thickening the strokes first didn't rescue it,
// because the problem is how much is in the drawing, not how thin the lines
// are, and the figure can't be cropped away from the panel — they overlap,
// with no empty column between them.
//
// At 180px none of that applies. The panel, the arm and the head all read,
// so this size gets the actual artwork: cropped to the figure at its
// measured bounds (x 197-808, y 239-786 of the 1024² original), resampled
// to 35 kB from 331 kB, and inlined rather than fetched.
//
// The rose is the artwork's own #e9a8a6. On white it's roughly 1.6:1 and
// vanishes — the same reason Logo.js won't put this cut on the cream page —
// so it sits on the ink field, where it's about 8:1. icon.svg uses the same
// two colours, so the tab, the home screen and the search result read as one
// family rather than three unrelated marks.
export default async function AppleIcon() {
  const glyph = await fetch(new URL('./logo-glyph.png', import.meta.url)).then(
    (res) => res.arrayBuffer()
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#1c1512',
        }}
      >
        <img src={glyph} width={124} height={111} />
      </div>
    ),
    { ...size }
  );
}
