import Link from 'next/link';
import Logo from './Logo';
import { BRAND, NAV_LINKS } from '@/lib/content';

const LEGAL = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Cookies', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="container-max py-stack-lg">
        <div className="grid grid-cols-1 gap-stack-md md:grid-cols-12">
          <div className="md:col-span-6">
            {/* The one place the pale rose lockup has enough contrast to work */}
            <Logo variant="full" tone="rose" className="h-24 md:h-28" />
            <p className="mt-6 max-w-sm text-body-lg text-paper/70">
              {BRAND.tagline}
            </p>
            <p className="mt-3 max-w-sm text-body-md text-paper/50">
              {BRAND.region}
            </p>
            <Link href="/quote" className="btn-on-dark mt-8">
              Get a quote
            </Link>
          </div>

          <div className="md:col-span-3">
            <h3 className="label-caps mb-6 text-paper/45">Explore</h3>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-body-md text-paper/75 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="label-caps mb-6 text-paper/45">Contact</h3>
            <ul className="flex flex-col gap-3 text-body-md text-paper/75">
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="transition-colors hover:text-paper"
                >
                  {BRAND.email}
                </a>
              </li>
              <li className="text-paper/50">Mon–Fri, 9–5 PT</li>
              <li className="pt-1">
                <a
                  href={BRAND.portfolio}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-paper/60 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
                >
                  More work &amp; references ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-stack-md flex flex-col gap-4 border-t border-paper/15 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-label-sm text-paper/45">
            © {new Date().getFullYear()} {BRAND.name}. Built for Canadian &amp; American business.
          </p>
          <ul className="flex flex-wrap gap-6">
            {LEGAL.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="label-caps text-paper/45 transition-colors hover:text-paper"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
