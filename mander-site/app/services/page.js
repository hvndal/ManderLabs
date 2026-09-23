import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import WhatsAppCta from '@/components/WhatsAppCta';
import { Spread } from '@/components/Editorial';
import { BRAND } from '@/lib/content';
import { getServerMarket } from '@/lib/market-server';
import {
  SERVICE_CATALOGUE,
  ASK_MAPS_FAQS,
  TOWNS_LINE,
  PRICE_FALLBACK,
} from '@/lib/services';
import { breadcrumbSchema, faqSchema, serviceSchemas, OG_IMAGE, alternates } from '@/lib/seo';

const TITLE = 'Services: Web Design & SEO, Langley & Coquitlam';
const DESCRIPTION =
  'Website design, ecommerce, local SEO, Google Business Profile, branding and Android apps for Langley, Coquitlam and the Fraser Valley. Fixed prices.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: alternates('/services'),
  openGraph: { title: `${TITLE} | MANDER`, description: DESCRIPTION, url: '/services', type: 'website', images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', title: `${TITLE} | MANDER`, description: DESCRIPTION, images: [OG_IMAGE.url] },
};

const trail = [{ name: 'MANDER', href: '/' }, { name: 'Services' }];

function Row({ label, children }) {
  return (
    <div className="grid grid-cols-1 gap-1 border-t border-line py-4 md:grid-cols-12 md:gap-6">
      <dt className="label-caps text-ink-mute md:col-span-3">{label}</dt>
      <dd className="text-body-md text-ink-soft md:col-span-9">{children}</dd>
    </div>
  );
}

export default function ServicesPage() {
  const market = getServerMarket();

  return (
    <>
      <JsonLd data={faqSchema(ASK_MAPS_FAQS)} />
      {serviceSchemas(market).map((schema) => (
        <JsonLd key={schema.name} data={schema} />
      ))}
      <JsonLd data={breadcrumbSchema([{ name: 'MANDER', path: '/' }, { name: 'Services', path: '/services' }])} />

      <PageHeader
        meta={['Services', 'Langley · Coquitlam · Fraser Valley', 'Fixed price']}
        eyebrow="Services"
        title="Every service, named plainly."
        trail={trail}
        lede={
          <p>
            MANDER is a web design studio serving {TOWNS_LINE} Part of the team
            is based in Langley. Every service below has a fixed price agreed in
            writing before work starts, and every message — WhatsApp, phone or
            email — gets a reply within one business day, Monday to Friday,
            9am–5pm Pacific.
          </p>
        }
        actions={
          <>
            <Link href="/quote" className="btn-primary">Get a quote</Link>
            <WhatsAppCta tone="outline" location="services" />
          </>
        }
      />

      <Spread index="01" folio="Services">
        <div className="flex flex-col gap-16">
          {SERVICE_CATALOGUE.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-28">
              <h2 id={`${s.id}-h`} className="font-display text-headline-lg-mobile md:text-headline-lg">
                {s.name}
              </h2>
              <p className="mt-4 max-w-text text-body-lg text-ink">{s.what}</p>
              <dl className="mt-6">
                <Row label="Who it’s for">{s.whoFor}</Row>
                <Row label="Typical timeline">{s.timeline}</Row>
                <Row label="Price">{s.priceRange || PRICE_FALLBACK}</Row>
                <Row label="Towns served">{TOWNS_LINE}</Row>
              </dl>
              <Link href={s.href} className="link-underline label-caps mt-4 inline-block text-ink">
                More on {s.name.toLowerCase()}
              </Link>
            </section>
          ))}
        </div>
      </Spread>

      <section className="border-t border-line bg-paper-2">
        <Spread index="02" folio="Quick answers">
          <h2 className="h-display max-w-[14ch]">Straight answers.</h2>
          {/* Plain headings and paragraphs rather than an accordion: every
              answer is in the served HTML, first sentence first, so anything
              quoting it — a person or Ask Maps — gets the answer, not a
              collapsed toggle. */}
          <div className="mt-12 flex flex-col">
            {ASK_MAPS_FAQS.map((f) => (
              <div key={f.q} className="border-t border-line py-8">
                <h3 className="text-headline-md text-ink">{f.q}</h3>
                <p className="mt-3 max-w-text text-body-md text-ink-soft">{f.a}</p>
              </div>
            ))}
          </div>
        </Spread>
      </section>

      <section className="border-t border-line">
        <Spread index="03" folio="Contact">
          <h2 className="h-display max-w-[14ch]">Three ways to ask.</h2>
          <dl className="mt-10">
            <Row label="WhatsApp">
              {market.whatsapp ? (
                <a href={market.whatsapp.url} target="_blank" rel="noreferrer noopener" className="link-underline text-ink">
                  {market.whatsapp.display}
                </a>
              ) : '—'}
            </Row>
            {market.phone && (
              <Row label="Phone">
                <a href={market.phone.href} className="link-underline text-ink">{market.phone.display}</a>
              </Row>
            )}
            <Row label="Email">
              <a href={`mailto:${BRAND.email}`} className="link-underline text-ink">{BRAND.email}</a>
            </Row>
            <Row label="Hours">Monday to Friday, 9am–5pm Pacific. Reply within one business day.</Row>
            <Row label="Language">English</Row>
          </dl>
        </Spread>
      </section>
    </>
  );
}
