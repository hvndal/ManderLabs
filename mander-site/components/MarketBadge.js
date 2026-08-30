'use client';

import { usePathname } from 'next/navigation';

/**
 * The market override badge — yours, and only visible to you.
 *
 * It renders exclusively when a market has been pinned with `?market=`, which
 * means it needs the cookie the middleware sets in response to that. An
 * ordinary visitor never asks for it, never gets the cookie, and never sees
 * this: it is not in their HTML at all. A crawler is in the same position.
 *
 * Pinning does not put the site into a preview mode — the pinned market
 * renders exactly as it would for a visitor in that country, which is the
 * only way looking at it is worth anything. This strip is the one difference,
 * and it is here because a pin that lasts 30 days needs to announce itself;
 * discovering next month that you have been looking at rupees the whole time
 * is a genuinely confusing half hour.
 *
 * Plain anchors rather than <Link> on purpose: the switch has to reach the
 * middleware to re-set the cookie, so it wants a real navigation.
 */
export default function MarketBadge({ active, markets }) {
  const pathname = usePathname();
  const href = (value) => `${pathname}?market=${value}`;

  return (
    <div className="fixed bottom-4 left-4 z-[90] flex items-center gap-3 border border-paper/20 bg-ink/95 px-3 py-2 text-paper shadow-lg backdrop-blur-sm">
      <span className="label-caps text-[10px] text-paper/50">Pinned</span>
      <span className="label-caps text-[10px] text-paper">{active.toUpperCase()}</span>
      <span aria-hidden="true" className="h-3 w-px bg-paper/20" />
      <nav aria-label="Market override" className="flex items-center gap-2.5">
        {markets.map((id) => (
          <a
            key={id}
            href={href(id)}
            aria-current={id === active ? 'true' : undefined}
            className={`label-caps text-[10px] transition-colors ${
              id === active
                ? 'text-paper/40'
                : 'text-paper/70 underline decoration-paper/30 underline-offset-4 hover:text-paper'
            }`}
          >
            {id.toUpperCase()}
          </a>
        ))}
        <a
          href={href('auto')}
          className="label-caps text-[10px] text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-paper"
        >
          Auto
        </a>
      </nav>
    </div>
  );
}
