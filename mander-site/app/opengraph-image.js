import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt =
  'MANDER — website design for small business across Canada and the U.S.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// The share card is the site's thumbnail everywhere it gets linked — Google's
// result cards, iMessage, Slack, LinkedIn, WhatsApp. It used to be type on a
// flat ink field, which is legible but reads as a placeholder in a feed: no
// image, nothing to look at, indistinguishable from every other dark card.
//
// So it now carries the same footage the masthead opens on. The poster frame
// is bundled alongside this route (og-hero.jpg, a copy of the hero poster)
// rather than fetched from /public at render time — an absolute-URL fetch
// would make every scrape depend on the network and break entirely on
// localhost. `new URL(..., import.meta.url)` inlines it into the edge bundle
// at build time, which is the one approach that works in both places.
//
// The scrim is a horizontal gradient, not a flat overlay: the photograph is
// darkest at the left where the type sits and stays readable on the right,
// so the image is visible as an image instead of being dimmed into a texture.
export default async function Image() {
  const hero = await fetch(new URL('./og-hero.jpg', import.meta.url)).then(
    (res) => res.arrayBuffer()
  );

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: '#1b242c',
        }}
      >
        <img
          src={hero}
          width={1200}
          height={630}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            objectFit: 'cover',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            background:
              'linear-gradient(90deg, rgba(28,21,18,0.95) 0%, rgba(28,21,18,0.88) 44%, rgba(28,21,18,0.38) 100%)',
          }}
        />

        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: 1200,
            height: 630,
            padding: '0 88px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 24,
              letterSpacing: 5,
              textTransform: 'uppercase',
              color: '#f2c230',
            }}
          >
            Web design for small business — Canada &amp; U.S.
          </div>

          {/* The accent rule is the one piece of the site's own furniture that
              survives at thumbnail scale — it reads as a brand mark even when
              the card is 200px wide in a chat preview. */}
          <div
            style={{
              width: 84,
              height: 4,
              marginTop: 30,
              marginBottom: 30,
              backgroundColor: '#2f6690',
            }}
          />

          <div
            style={{
              display: 'flex',
              fontSize: 82,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.06,
              color: '#f6f7f7',
              maxWidth: 760,
            }}
          >
            Websites that grow small business.
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 44,
              fontSize: 27,
              color: 'rgba(244,242,236,0.72)',
            }}
          >
            <span
              style={{
                fontWeight: 700,
                letterSpacing: 7,
                color: '#f6f7f7',
              }}
            >
              MANDER
            </span>
            <span style={{ margin: '0 18px', color: 'rgba(244,242,236,0.35)' }}>
              ·
            </span>
            <span>Fixed-price builds from $299</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
