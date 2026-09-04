import Link from 'next/link';
import Section, { SectionHeading } from '@/components/Section';
import Reveal from '@/components/Reveal';
import GridField from '@/components/GridField';
import Breadcrumbs from '@/components/Breadcrumbs';
import Icon from '@/components/Icon';
import ContactForm from '@/components/ContactForm';
import WhatsAppCta from '@/components/WhatsAppCta';
import JsonLd from '@/components/JsonLd';
import { BRAND } from '@/lib/content';
import { getServerMarket } from '@/lib/market-server';
import { breadcrumbSchema, OG_IMAGE, alternates, SITE_URL } from '@/lib/seo';

/**
 * Contact Us — a real page at a real URL.
 *
 * The site already had contact *sections* on the homepage and the pricing
 * page, which serve a reader fine and satisfy nobody who is checking. A
 * payment processor reviewing a merchant, and a customer deciding whether a
 * remote studio is real, both look for the same thing: one page, easy to
 * find, that names a way to reach a person and does not hide behind a form.
 * So this page leads with the address and the number, and puts the form
 * underneath rather than in place of them.
 */
export async function generateMetadata() {
  const market = getServerMarket();
  const TITLE = 'Contact Us';
  const description = market.whatsapp
    ? `Talk to MANDER — WhatsApp ${market.whatsapp.display}, or email ${BRAND.email}. Fixed-price websites for growing businesses in India.`
    : `Talk to MANDER — call ${market.phone.display}, or email ${BRAND.email}. Fixed-price website design across the U.S. and Canada.`;

  return {
    title: TITLE,
    description,
    alternates: alternates('/contact'),
    openGraph: {
      title: `${TITLE} | MANDER`,
      description,
      url: '/contact',
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${TITLE} | MANDER`,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

const trail = [{ name: 'MANDER', href: '/' }, { name: 'Contact' }];

export default function ContactPage() {
  const market = getServerMarket();

  // The channels this market actually has, in the order it should use them.
  // Never a placeholder: a contact page listing a route nobody answers is
  // worse than one route that works.
  const channels = [
    ...(market.whatsapp
      ? [
          {
            label: 'WhatsApp',
            value: market.whatsapp.display,
            href: market.whatsapp.url,
            note: 'The fastest route. A person, not a form.',
            external: true,
          },
        ]
      : []),
    ...(market.phone
      ? [
          {
            label: 'Phone',
            value: market.phone.display,
            href: market.phone.href,
            note: 'Monday to Friday, 9am–5pm Pacific.',
          },
        ]
      : []),
    {
      label: 'Email',
      value: BRAND.email,
      href: `mailto:${BRAND.email}?subject=${encodeURIComponent('New project enquiry')}`,
      note: 'Answered within one business day, including billing and policy questions.',
    },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          trail.map((t) => ({ name: t.name, path: t.href || '/contact' }))
        )}
      />
      {/* ContactPage schema pointing back at the one organization entity
          rather than declaring a second business. */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          '@id': `${SITE_URL}/contact#page`,
          url: `${SITE_URL}/contact`,
          name: 'Contact MANDER',
          mainEntity: { '@id': `${SITE_URL}/#organization` },
        }}
      />

      <section className="relative overflow-hidden border-b border-line">
        <GridField />
        <div className="relative container-max py-stack-md">
          <Breadcrumbs trail={trail} />
          <Reveal>
            <span className="eyebrow">Contact</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="h-display max-w-[15ch]">Talk to a person.</h1>
          </Reveal>
          <Reveal delay={160} className="mt-8 max-w-text text-body-lg text-ink-soft">
            <p>
              No account managers, no ticket queue. Whoever answers is whoever
              would build the thing — which is also why we reply within one
              business day rather than instantly.
            </p>
          </Reveal>
          <Reveal delay={220} className="mt-9 flex flex-wrap gap-3">
            <WhatsAppCta location="contact-page" />
            {market.phone && (
              <a href={market.phone.href} className="btn-primary">
                <Icon name="phone" className="h-4 w-4" strokeWidth={2} />
                {market.phone.display}
              </a>
            )}
            <Link href="/pricing" className="btn-outline">
              See pricing
            </Link>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- Channels */}
      <section className="bg-paper-2 py-stack-md">
        <div className="container-max">
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {channels.map((channel) => (
              <Reveal key={channel.label} className="bg-paper">
                <div className="flex h-full flex-col p-8">
                  <span className="label-caps text-accent">{channel.label}</span>
                  <a
                    href={channel.href}
                    {...(channel.external
                      ? { target: '_blank', rel: 'noreferrer noopener' }
                      : {})}
                    className="link-underline mt-4 text-headline-md text-ink"
                  >
                    {channel.value}
                  </a>
                  <p className="mt-4 text-body-md text-ink-soft">{channel.note}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80}>
            <div className="mt-8 grid grid-cols-1 gap-8 border-t border-line pt-8 sm:grid-cols-3">
              <div>
                <span className="label-caps text-ink-mute">Hours</span>
                <p className="mt-3 text-body-md text-ink-soft">
                  Monday to Friday, 9am–5pm Pacific. Messages outside those
                  hours are answered the next business day.
                </p>
              </div>
              <div>
                <span className="label-caps text-ink-mute">Where we work</span>
                <p className="mt-3 text-body-md text-ink-soft">
                  {market.region}. MANDER is a remote studio with no public
                  office or walk-in premises — every project runs over call,
                  video and email.
                </p>
              </div>
              <div>
                <span className="label-caps text-ink-mute">Billing & policies</span>
                <p className="mt-3 text-body-md text-ink-soft">
                  Billing, refund and privacy questions go to the same address
                  and reach the same people. See{' '}
                  <Link href="/legal/refunds" className="link-underline text-ink">
                    refunds
                  </Link>{' '}
                  and{' '}
                  <Link href="/legal/terms" className="link-underline text-ink">
                    terms
                  </Link>
                  .
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- Form */}
      <Section tone="white">
        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Or send it in writing"
              title="Tell us about the project."
              body="A few lines is enough to start. We reply within one business day — no obligation, and no sales sequence afterwards."
            />
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
