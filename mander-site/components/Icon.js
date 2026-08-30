// Inline stroke-icon set. 1.5px strokes to match the "refined stroke weights"
// note in the design system. No icon font, no network request.

const PATHS = {
  web: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M3 9h18" />
      <path d="M7 6.5h.01M9.5 6.5h.01" />
    </>
  ),
  brand: (
    <>
      <path d="M12 3l7.5 4.5v9L12 21l-7.5-4.5v-9L12 3z" />
      <path d="M12 8.5l3.5 2.1v4.2L12 16.9l-3.5-2.1v-4.2L12 8.5z" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 12a8 8 0 1 1-2.6-5.9" />
      <path d="M20 4v4.5h-4.5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </>
  ),
  store: (
    <>
      <path d="M4 9.5V20h16V9.5" />
      <path d="M3 9.5L4.8 4h14.4L21 9.5a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5.5c0 4.4-2.9 7.8-7 9.5-4.1-1.7-7-5.1-7-9.5V6l7-3z" />
      <path d="M9.5 12l1.8 1.8L15 10" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="1.5" />
      <rect x="3" y="13" width="18" height="7" rx="1.5" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="1.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18.5a4 4 0 0 1-.4-8A5.5 5.5 0 0 1 17.4 11a3.75 3.75 0 0 1-.4 7.5H7z" />
      <path d="M12 9.5v6M9.75 13.25L12 15.5l2.25-2.25" />
    </>
  ),
  support: (
    <>
      <path d="M4.5 14v-2.5a7.5 7.5 0 0 1 15 0V14" />
      <rect x="2.5" y="13" width="4" height="5.5" rx="1.5" />
      <rect x="17.5" y="13" width="4" height="5.5" rx="1.5" />
      <path d="M19.5 18.5v.5a2 2 0 0 1-2 2H13" />
    </>
  ),
  mobile: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="2" />
      <path d="M10.5 5.5h3" />
      <path d="M10.75 18.5h2.5" />
    </>
  ),
  check: <path d="M4.5 12.5l5 5 10-11" />,
  trending: (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  verified: (
    <>
      <path d="M12 3l2.2 2.1 3-.4 1 2.9 2.6 1.6-1.3 2.8 1.3 2.8-2.6 1.6-1 2.9-3-.4L12 21l-2.2-2.1-3 .4-1-2.9L3.2 14.8l1.3-2.8-1.3-2.8 2.6-1.6 1-2.9 3 .4L12 3z" />
      <path d="M9 12.2l2 2 4-4.4" />
    </>
  ),
  // WhatsApp — same 1.5px stroke language as the rest of the set rather than
  // the official filled glyph, which would be the only solid mark on the site
  // and would drag brand green into a two-colour palette.
  whatsapp: (
    <>
      <path d="M20.5 11.8a8.5 8.5 0 0 1-12.7 7.4L3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 20.5 11.8z" />
      <path d="M9.3 8.9c0 3.2 2.6 5.8 5.8 5.8l.9-1.4-1.9-1-.9.8a4.7 4.7 0 0 1-2.3-2.3l.8-.9-1-1.9-1.4.9z" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
};

export default function Icon({ name, className = 'h-6 w-6', strokeWidth = 1.5 }) {
  const path = PATHS[name];
  if (!path) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {path}
    </svg>
  );
}
