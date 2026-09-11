import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import Cover from '@/components/Cover';
import ClientMarks from '@/components/ClientMarks';
import PillarSequence from '@/components/PillarSequence';
import TeamShowcase from '@/components/TeamShowcase';
import { Spread, PullQuote, Standfirst } from '@/components/Editorial';
import {
  CommunityRateSection,
  CommunityRateNote,
  CommunityRateFooterLink,
} from '@/components/CommunityRate';
import WorkIndex from '@/components/WorkIndex';
import WorkTicker from '@/components/WorkTicker';
import ContactForm from '@/components/ContactForm';
import WhatsAppCta from '@/components/WhatsAppCta';
import JsonLd from '@/components/JsonLd';
import { TERMS, WORK, CLIENTS, TEAM, BRAND } from '@/lib/content';
import { getServerMarket } from '@/lib/market-server';
import { serviceSchemas, alternates } from '@/lib/seo';

export const metadata = {
  alternates: alternates('/'),
};

// The process and the questions are not on this page any more. Both exist in
// full elsewhere — the stages on /about, every question on /pricing — and a
// homepage that reprints them is the reason a phone had to scroll through
// seventeen screens to reach a contact form. The cover's contents list is
// what a magazine uses instead of printing the whole issue on page one.

export default function HomePage() {
  // Prices, positioning line and FAQ all come from the visitor's market; the
  // layout, sections and components below are identical for every market.
  const market = getServerMarket();

  return (
    <>
      {/* One Service entity per discipline the homepage actually describes —
          these can surface independently of the page itself for "<service>
          for small business" queries. Organization/WebSite stay in the root
          layout; this is the one page (plus the pillar/pricing/work pages)
          where naming every service is genuinely on-topic. */}
      {serviceSchemas(market).map((schema) => (
        <JsonLd key={schema.name} data={schema} />
      ))}

      {/* ------------------------------------------------------------ Cover */}
      <Cover
        tagline={market.tagline}
        region={market.region}
        headline={market.colophon.headline}
        standfirst={market.colophon.body}
      />

      <div className="bg-paper-2">
        <ClientMarks clients={CLIENTS} />
      </div>

      {/* -------------------------------------------------- Who we are */}
      {/* A homepage-exclusive image: most of the recovered photos were only
          ever placed on interior pages, which is how a site ends up with
          real photography and a photo-free homepage at the same time.
          studio-set.jpg over manifesto-desktop.jpg specifically — the latter
          is a genuinely black-and-white photo (not a CSS artifact) of a real
          third-party storefront, wrong on two counts for the one section
          meant to prove this page isn't monochrome. Copy below is adapted
          from the About page's own intro rather than stating anything new —
          same facts, a different first stop. */}
      <section className="border-b border-line bg-paper">
        <div className="container-max grid grid-cols-1 items-center gap-10 stack-y lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
                <Image
                  src="/editorial/studio-set.jpg"
                  alt="A designer's desk with a wireframe sketch, notebook and phone — the studio's working setup"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover contrast-[1.08]"
                />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <span className="eyebrow">Who we are</span>
              <h2 className="h-display max-w-[16ch]">
                A small studio that ships finished work.
              </h2>
              <Standfirst className="mt-8" dropCap>
                MANDER is a remote design and development studio building
                websites, Android apps and local search presence for small
                and growing businesses across {market.region}. We are
                deliberately small — there is no account layer between you
                and the people building the thing, which is most of why the
                prices look the way they do and all of why the work does.
              </Standfirst>
              <Link href="/about" className="link-underline label-caps mt-8 inline-flex items-center gap-2 text-ink">
                More about the studio
                <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- 01 · The offer */}
      {/* Six services in a list became three in a sequence. The list read as
          "we will take any work"; the sequence is an argument — who you are,
          how people experience you, how the right people find you. */}
      <Spread id="services" index="01" folio="What we do">
        <h2 className="h-display max-w-[14ch]">Define. Build. Grow.</h2>
        <Standfirst className="mt-8" dropCap>
          Three pillars, one system. Most clients arrive needing one of them
          and end up using the next, which is the reason the studio is
          organised this way rather than as a menu of services.
        </Standfirst>
        <PillarSequence />
      </Spread>

      {/* ------------------------------------------- Editorial image break */}
      {/* studio-craft.jpg was blurred in an earlier pass — its un-blurred
          original staged a fake client mockup, so it now exists purely as
          abstract texture with nothing legible in it, which is exactly what
          a full-bleed breather section needs. */}
      <section className="relative border-b border-line bg-ink">
        <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] md:aspect-[21/9]">
          <Image
            src="/editorial/studio-craft.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover contrast-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
          <div className="container-max absolute inset-x-0 bottom-0 pb-10 md:pb-16">
            <PullQuote tone="dark">
              Designed and built by the people who answer your email.
            </PullQuote>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- 02 · The work */}
      <Spread id="work" index="02" folio="Selected work" className="!pt-0">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="h-display max-w-[12ch]">A few recent builds.</h2>
          <Link href="/work" className="btn-outline">
            All work
            <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
        {/* The index carries every project as text; the window beside it is
            decoration that happens to be moving. Index first in source order
            so a phone gets the content before the picture without any CSS
            reordering. */}
        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-gutter">
          <Reveal className="md:col-span-7">
            <WorkIndex items={WORK} />
          </Reveal>
          <Reveal delay={80} className="md:col-span-5 md:self-start">
            <WorkTicker items={WORK} />
          </Reveal>
        </div>
      </Spread>

      {/* -------------------------------- 03 · The terms / why choose us */}
      {/* Was flat bg-paper-2 — the same neutral every other section on the
          page already sits on. A warm wash (rose into the yellow, both
          already-established brand colors, both decorative-only per
          tailwind.config.js) makes this the page's first real color block
          rather than another gray card. */}
      <section className="border-y border-line bg-gradient-to-br from-rose/[0.14] via-paper to-accent-soft/[0.14]">
        <div className="container-max grid grid-cols-1 gap-y-10 stack-y md:grid-cols-12 md:gap-gutter">
          <div className="md:col-span-5">
            <PullQuote>Fixed price. Fixed scope. You see it before you approve it.</PullQuote>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <dl className="border-t border-line">
              {TERMS.map((term) => (
                <Reveal key={term.index}>
                  <div className="border-b border-line py-7">
                    <dt className="font-display text-[1.6rem] leading-none text-ink md:text-[2rem]">
                      {term.title}
                    </dt>
                    <dd className="mt-3 max-w-text text-body-md text-ink-soft">{term.body}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Team */}
      {/* Used to be a text link reading "Who you would be working with",
          pointing at section 5-of-5 on /about — genuinely buried. The whole
          studio, on the homepage, in color, on its own dark stage: the last
          credibility beat before the offer. `.h-display` hardcodes text-ink
          (globals.css) and would go invisible on this bg-ink section, so the
          heading below is spelled out manually instead of using that class —
          the same thing every other dark section on this page already does. */}
      <section className="border-b border-line bg-ink bg-gradient-to-b from-ink to-accent-deep text-paper">
        <Spread index="04" folio="Who you'd work with" tone="dark">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-[14ch] font-display text-headline-lg-mobile leading-[0.98] text-paper md:text-display-lg">
              The whole studio.
            </h2>
            <span className="rail text-paper/60">{TEAM.length} people</span>
          </div>
          <TeamShowcase members={TEAM} />
        </Spread>
      </section>

      {/* -------------------------------------------------- 05 · The plans */}
      {/* Was four plan names in a row of links, with everything that makes a
          plan a plan — how many pages, how long, how many rounds, who it is
          for — buried on /pricing. Prices are quoted rather than published,
          which makes it doubly important that the shape of the offer is
          legible without clicking anything. */}
      <Spread id="pricing" index="05" folio="Plans">
        <h2 className="h-display max-w-[13ch]">What you get, and how it is priced.</h2>
        <Standfirst className="mt-8">
          Every project is quoted in writing against a written scope before any
          work starts. The number you approve is the number you pay — no hourly
          meter, no surprise invoice at the end.
        </Standfirst>

        <div className="mt-14 border-t border-line">
          {market.tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={Math.min(i * 60, 120)}>
              <Link
                href="/quote"
                // Two columns on a phone so the action sits on the plan's own
                // line rather than trailing under the specs as a stray label;
                // twelve on a desktop, with the action ordered back to the
                // right-hand edge where the eye finishes the row.
                className="group grid grid-cols-[1fr_auto] gap-x-4 gap-y-3 border-b border-line py-6 md:grid-cols-12 md:items-baseline md:gap-gutter md:py-8"
              >
                <div className="md:order-1 md:col-span-4">
                  <span className="rail text-ink-mute">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-2 block font-display text-[2rem] leading-none text-ink transition-colors group-hover:text-accent md:text-[2.6rem]">
                    {tier.name}
                  </span>
                </div>

                <span className="label-caps flex items-center gap-2 justify-self-end text-ink-mute transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent md:order-4 md:col-span-1">
                  Quote
                  <Icon name="arrow" className="h-3.5 w-3.5 md:hidden" strokeWidth={2} />
                </span>

                <div className="col-span-2 md:order-2 md:col-span-4">
                  <p className="text-body-md text-ink-soft">{tier.bestFor}</p>
                </div>

                {/* The three numbers a buyer actually compares. */}
                <dl className="col-span-2 flex flex-wrap gap-x-8 gap-y-2 md:order-3 md:col-span-3">
                  {[
                    ['Scope', tier.specs.pages, false],
                    ['Timeline', tier.specs.timeline, false],
                    // Three specs stacked under a paragraph is four blocks per
                    // plan on a phone. The third one waits for the room.
                    ['Revisions', tier.specs.revisions, true],
                  ].map(([label, value, desktopOnly]) => (
                    <div key={label} className={desktopOnly ? 'hidden md:block' : undefined}>
                      <dt className="rail text-ink-mute">{label}</dt>
                      <dd className="mt-1 text-label-sm text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>

              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-baseline md:justify-between md:gap-8">
            <p className="max-w-[52ch] text-label-sm text-ink-mute">
              The 60-second quiz returns a real figure for your situation.{' '}
              <Link href="/pricing" className="link-underline text-ink">
                What each plan includes, and every question answered
              </Link>
              .
            </p>
            <CommunityRateNote />
          </div>
        </Reveal>

        <Reveal delay={160} className="mt-10 flex flex-wrap items-center gap-x-9 gap-y-5">
          <Link href="/quote" className="btn-primary">
            Take the fit quiz
            <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
          </Link>
          <a href={`mailto:${BRAND.email}`} className="btn-outline">
            Or talk to sales
          </a>
        </Reveal>
      </Spread>

      {/* ------------------------------------------------ Community Rate · 20% */}
      <CommunityRateSection />

      {/* ----------------------------------------------------- 06 · Contact */}
      <section className="border-t border-line bg-paper">
        <Spread id="contact" index="06" folio="Get in touch">
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="h-display max-w-[12ch]">Tell us about the project.</h2>
              <Standfirst className="mt-8">
                A few lines is enough to start. We reply within one business day,
                and there is no obligation attached to asking.
              </Standfirst>
              {/* The team is on this page now (see the section above), so
                  the old "who you'd be working with → /about" pointer is
                  gone. WhatsAppCta renders nothing outside India, so it
                  can't be the only thing in this row — the work link keeps
                  the row non-empty for every other market too. */}
              <Reveal delay={80} className="mt-8 flex flex-wrap items-center gap-x-9 gap-y-4">
                <Link href="/work" className="btn-outline">
                  See more of our work
                </Link>
                <WhatsAppCta tone="link" location="home-contact" />
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </Spread>
      </section>

      {/* ------------------------------------------------------------ Colophon */}
      <section className="bg-ink text-paper">
        <div className="container-max grid grid-cols-1 gap-y-10 stack-y md:grid-cols-12 md:gap-gutter">
          <div className="md:col-span-7">
            <Reveal>
              <h2 className="font-display text-headline-lg-mobile leading-[1.05] md:text-display-lg">
                Let&apos;s build something that pulls its weight.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:self-end">
            <Reveal delay={80} className="flex flex-col items-start gap-6">
              <a
                href={`mailto:${BRAND.email}?subject=${encodeURIComponent('New project enquiry')}`}
                className="btn-on-dark"
              >
                Contact sales
              </a>
              {/* India only — returns null in every other market, so the
                  number is not in the US page at all. */}
              <WhatsAppCta tone="on-dark" location="home-final-cta" />
              <p className="text-label-sm text-paper/50">
                <CommunityRateFooterLink className="underline decoration-paper/25 underline-offset-4 transition-colors hover:text-paper/80 hover:decoration-paper/60" />
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
