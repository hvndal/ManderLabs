'use client';

import { useMarket } from './MarketProvider';
import Icon from './Icon';
import { trackEvent } from '@/lib/analytics';

/**
 * The WhatsApp button — universal.
 *
 * Every market now carries a `whatsapp` field (see lib/markets/us.js and
 * lib/markets/in.js), so this renders everywhere. The `if (!wa) return null`
 * guard below is left in place rather than removed: it is what makes adding
 * a future market with no WhatsApp number safe by default, the same way a
 * missing phone number already degrades safely elsewhere on the site.
 *
 * `tone` matches the three button treatments the design system already has,
 * so this sits in a row of existing CTAs without introducing a fourth style.
 */
export default function WhatsAppCta({ tone = 'primary', className = '', label, location }) {
  const market = useMarket();
  const wa = market.whatsapp;
  if (!wa) return null;

  const base =
    tone === 'on-dark'
      ? 'btn-on-dark'
      : tone === 'outline'
        ? 'btn-outline'
        : tone === 'sm'
          ? 'btn-sm'
          : tone === 'link'
            ? 'link-underline label-caps text-ink'
            : 'btn-primary';

  return (
    <a
      href={wa.url}
      target="_blank"
      rel="noreferrer noopener"
      onClick={(e) => {
        e.stopPropagation();
        trackEvent('contact_whatsapp_click', {
          market: market.id,
          location: location || 'unspecified',
        });
      }}
      className={`${base} ${className}`}
    >
      <Icon name="whatsapp" className="h-4 w-4" />
      {label || wa.cta}
    </a>
  );
}

/**
 * The number itself, as a line of text — for the footer and contact blocks
 * where a second full-width button would be one button too many.
 */
export function WhatsAppLine({ className = '', location = 'footer' }) {
  const market = useMarket();
  const wa = market.whatsapp;
  if (!wa) return null;

  return (
    <a
      href={wa.url}
      target="_blank"
      rel="noreferrer noopener"
      onClick={() =>
        trackEvent('contact_whatsapp_click', { market: market.id, location })
      }
      className={className}
    >
      WhatsApp {wa.display} ↗
    </a>
  );
}
