'use client';

import { useMarket } from './MarketProvider';
import Icon from './Icon';
import { trackEvent } from '@/lib/analytics';

/**
 * The WhatsApp button — India only.
 *
 * Renders nothing at all when the visitor's market has no WhatsApp number,
 * which is every market except India. That is a null return rather than a
 * hidden element on purpose: the number is not in the US page's HTML, so it
 * cannot be found by a US visitor reading the source, and no CSS or JS
 * mistake can reveal it.
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
