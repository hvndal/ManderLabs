import Link from 'next/link';

/**
 * Text breadcrumb trail. `trail` is [{ name, href? }] — the last item has no
 * href (it's the current page). Pairs with lib/seo.js's breadcrumbSchema()
 * for the matching JSON-LD; keep the two in sync on any page that uses this.
 */
export default function Breadcrumbs({ trail }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="label-caps flex flex-wrap items-center gap-2 text-ink-mute">
        {trail.map((item, i) => (
          <li key={item.name} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden="true" className="text-line-strong">
                /
              </span>
            )}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-accent">
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
