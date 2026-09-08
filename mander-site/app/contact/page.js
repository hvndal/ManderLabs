import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import ContactForm from '@/components/ContactForm';
import WhatsAppCta from '@/components/WhatsAppCta';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import { Spread } from '@/components/Editorial';
import { IndexList, IndexRow, SpecRow } from '@/components/Swiss';
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

      <PageHeader
        meta={['Contact', market.region, 'Mon–Fri, 9–5 PT']}
        eyebrow="Contact"
        title="Talk to a person."
        trail={trail}
        lede={
          <p>
            No account managers, no ticket queue. Whoever answers is whoever
            would build the thing — which is also why we reply within one
            business day rather than instantly.
          </p>
        }
        actions={
          <>
            <WhatsAppCta location="contact-page" />
            {market.phone && (
              <a href={market.phone.href} className="btn-primary">
                <Icon name="phone" className="h-4 w-4" strokeWidth={2} />
                {market.phone.display}
              </a>
            )}
            <Link href="/quote" className="btn-outline">
              Get a quote
            </Link>
          </>
        }
      />

      {/* --------------------------------------------------------- Channels */}
      {/* Three bordered cards became three rows. Same information, and it now
          reads as a directory rather than as an interface — which is what a
          contact page is. */}
      <Spread index="01" folio="Direct">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="h-display max-w-[10ch]">Ways through.</h2>
          <span className="rail text-ink-mute">{channels.length} routes</span>
        </div>

        <IndexList className="mt-14">
          {channels.map((channel, i) => (
            <IndexRow
              key={channel.label}
              index={String(i + 1).padStart(2, '0')}
              title={channel.value}
              body={channel.note}
              meta={channel.label}
              href={channel.href}
              external={channel.external}
              action="Open"
              delay={i * 60}
            />
          ))}
        </IndexList>

        <div className="mt-stack-md">
          <SpecRow label="Hours">
            <p className="max-w-text text-body-md text-ink-soft">
              Monday to Friday, 9am–5pm Pacific. Messages outside those hours
              are answered the next business day.
            </p>
          </SpecRow>
          <SpecRow label="Where we work" delay={60}>
            <p className="max-w-text text-body-md text-ink-soft">
              {market.region}. MANDER is a remote studio with no public office
              or walk-in premises — every project runs over call, video and
              email.
            </p>
          </SpecRow>
          <SpecRow label="Billing & policies" delay={120}>
            <p className="max-w-text text-body-md text-ink-soft">
              Billing, refund and privacy questions go to the same address and
              reach the same people. See{' '}
              <Link href="/legal/refunds" className="link-underline text-ink">
                refunds
              </Link>{' '}
              and{' '}
              <Link href="/legal/terms" className="link-underline text-ink">
                terms
              </Link>
              .
            </p>
          </SpecRow>
        </div>
      </Spread>

      {/* ------------------------------------------------------------- Form */}
      <section className="border-t border-line bg-white">
        <Spread index="02" folio="Or send it in writing">
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="h-display max-w-[13ch]">Tell us about the project.</h2>
              <p className="mt-6 max-w-text text-body-md text-ink-soft">
                A few lines is enough to start. We reply within one business
                day — no obligation, and no sales sequence afterwards.
              </p>
            </div>
            <div className="lg:col-span-8">
              <Reveal>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </Spread>
      </section>
    </>
  );
}
