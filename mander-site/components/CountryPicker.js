'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { REGIONS, MARKET_QUERY_PARAM, MARKET_AUTO } from '@/lib/markets/geo';

const ORDER = ['us', 'ca', 'in'];

/**
 * The country picker, at the very end of the footer.
 *
 * Everyone is placed automatically by IP — this exists for the visitor the
 * automatic answer is wrong for: someone in Canada on a US VPN, an Indian
 * business owner travelling, or you checking what the other version looks
 * like. It sits below the legal row, at the quietest point on the page, so it
 * never competes with a CTA and nobody feels asked to make a decision before
 * they can read anything.
 *
 * Choosing navigates to `?market=<region>`; the middleware saves it, then
 * redirects the parameter away so the pinned URL is never bookmarked, shared
 * or crawled. Plain anchors, because that round trip is the whole mechanism —
 * a client-side state toggle would change the flag and nothing else.
 *
 * The United States and Canada are one market by design: same prices, same
 * copy (USD, invoiced in CAD on request). Both are listed anyway, because
 * "which country am I being shown" is the question a visitor is actually
 * asking, and answering it with a flag they recognise is the point.
 */
export default function CountryPicker({ region }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const ref = useRef(null);
  const current = REGIONS[region] || REGIONS.us;

  // Click-away and Escape, so the menu behaves like every other menu.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const href = (value) => `${pathname}?${MARKET_QUERY_PARAM}=${value}`;

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="label-caps flex items-center gap-2.5 border border-paper/20 px-3 py-2 text-paper/60 transition-colors duration-300 hover:border-paper/45 hover:text-paper"
      >
        <span aria-hidden="true" className="text-base leading-none">
          {current.flag}
        </span>
        <span>{current.name}</span>
        <span aria-hidden="true" className="text-[9px] text-paper/40">
          {open ? '▲' : '▼'}
        </span>
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Choose country"
          className="absolute bottom-[calc(100%+8px)] left-0 z-50 min-w-[210px] border border-paper/20 bg-ink shadow-xl"
        >
          {ORDER.map((id) => {
            const item = REGIONS[id];
            const active = id === region;
            return (
              <a
                key={id}
                href={href(id)}
                role="menuitem"
                aria-current={active ? 'true' : undefined}
                className={`flex items-center gap-3 border-b border-paper/10 px-4 py-3 text-body-md transition-colors ${
                  active
                    ? 'bg-paper/10 text-paper'
                    : 'text-paper/70 hover:bg-paper/5 hover:text-paper'
                }`}
              >
                <span aria-hidden="true" className="text-base leading-none">
                  {item.flag}
                </span>
                {item.name}
                {active && (
                  <span className="label-caps ml-auto text-[9px] text-paper/40">
                    Current
                  </span>
                )}
              </a>
            );
          })}
          <a
            href={href(MARKET_AUTO)}
            role="menuitem"
            className="label-caps block px-4 py-3 text-[10px] text-paper/50 transition-colors hover:text-paper"
          >
            Detect automatically
          </a>
        </div>
      )}
    </div>
  );
}
