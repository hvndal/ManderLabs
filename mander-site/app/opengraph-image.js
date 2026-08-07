import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'MANDER — Affordable, fast website design for small business, Canada & U.S.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Generated at request time (edge runtime) — no static asset to keep in
// sync with copy changes. Falls back to Next.js default system font since
// fetching a webfont here adds a network dependency for one image; the
// heavy weight + tight tracking reads fine without it.
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#1c1512',
          color: '#f4f2ec',
          padding: '90px',
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#e3b2a8',
            marginBottom: 28,
          }}
        >
          Web design for small business — Canada &amp; U.S.
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: -3,
            lineHeight: 1.05,
            maxWidth: 980,
          }}
        >
          Websites that grow small business.
        </div>
        <div
          style={{
            fontSize: 30,
            marginTop: 40,
            color: 'rgba(244,242,236,0.68)',
          }}
        >
          Affordable · Fast · Custom-built — MANDER
        </div>
      </div>
    ),
    { ...size }
  );
}
