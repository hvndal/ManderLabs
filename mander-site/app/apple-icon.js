import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// iOS uses this when the site is saved to a home screen, and several crawlers
// and link unfurlers fall back to it when there's no other square mark. There
// was no apple-touch-icon at all before, which meant iOS screenshotted the
// page and used that — a blurry crop of the masthead.
//
// Generated rather than checked in as a PNG so it stays in step with
// icon.svg: same ink field, same accent chevron, same proportions, just
// scaled up and given the padding iOS expects (the OS rounds the corners
// itself, so the mark has to sit well inside the square).
export default function AppleIcon() {
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
        <svg width="112" height="112" viewBox="0 0 28 28">
          <path
            d="M6 21V7l8 10 8-10v14"
            fill="none"
            stroke="#a6483a"
            strokeWidth="2.4"
            strokeLinecap="square"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
