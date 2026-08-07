'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/content';
import Logo from './Logo';
import Icon from './Icon';

function NavLink({ href, children, onClick, className = '' }) {
  return (
    <Link href={href} onClick={onClick} className={`group relative inline-block ${className}`}>
      <span className="label-caps text-ink-soft transition-colors duration-300 group-hover:text-ink">
        {children}
      </span>
      {/* Underline draws in from the centre on hover — never present at rest */}
      <span className="pointer-events-none absolute -bottom-1.5 left-0 h-px w-full origin-center scale-x-0 bg-ink transition-transform duration-300 ease-premium group-hover:scale-x-100" />
    </Link>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-premium ${
        scrolled || open
          ? 'border-line bg-paper/90 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[68px] w-full max-w-container items-center justify-between px-margin-mobile md:px-margin-desktop"
      >
        <Link href="/" aria-label="MANDER home" className="text-ink">
          <Logo variant="nav" className="h-10 md:h-11" />
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <NavLink href={link.href}>{link.label}</NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <Link href="/quote" className="btn-sm">
            Get a quote
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="-mr-2 p-2 text-ink md:hidden"
        >
          <Icon name={open ? 'close' : 'menu'} className="h-6 w-6" />
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t bg-paper transition-[max-height] duration-300 ease-premium md:hidden ${
          open ? 'max-h-[420px] border-line' : 'max-h-0 border-transparent'
        }`}
      >
        <ul className="flex flex-col px-margin-mobile py-1">
          {NAV_LINKS.map((link) => (
            <li key={link.label} className="border-b border-line last:border-0">
              <Link
                href={link.href}
                className="label-caps block py-5 text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-margin-mobile py-5">
          <Link href="/quote" className="btn-primary w-full">
            Get a quote
          </Link>
        </div>
      </div>
    </header>
  );
}
