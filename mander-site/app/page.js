import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import Cover from '@/components/Cover';
import ClientMarks from '@/components/ClientMarks';
import PillarSequence from '@/components/PillarSequence';
import { Spread, PullQuote, Standfirst } from '@/components/Editorial';
import {
  CommunityRateSection,
  CommunityRateNote,
  CommunityRateFooterLink,
} from '@/components/CommunityRate';
import WorkFeatures from '@/components/WorkFeatures';
import ContactForm from '@/components/ContactForm';
import WhatsAppCta from '@/components/WhatsAppCta';
import { TERMS, WORK, CLIENTS, BRAND } from '@/lib/content';
import { getServerMarket } from '@/lib/market-server';
import { alternates } from '@/lib/seo';

export const metadata = {
  alternates: alternates('/'),
};

// Three on the homepage, the rest on /work. Eight full features was most of
// the page's length and asked a first-time visitor to read a portfolio before
// finding out what any of it costs.
const HOME_WORK = 3;

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
      {/* ------------------------------------------------------------ Cover */}
      <Cover
        tagline={market.tagline}
        region={market.region}
        headline={market.colophon.headline}
        standfirst={market.colophon.body}
      />

      <ClientMarks clients={CLIENTS} />

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

      {/* -------------------------------------------------- 02 · The work */}
      <Spread id="work" index="02" folio="Selected work" className="!pt-0">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="h-display max-w-[12ch]">A few recent builds.</h2>
          <Link href="/work" className="btn-outline">
            All work
            <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
        <div className="mt-12">
          <WorkFeatures items={WORK} limit={HOME_WORK} compact />
        </div>
      </Spread>

      {/* -------------------------------------------------- 03 · The terms */}
      <section className="border-y border-line bg-paper-2">
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

      {/* -------------------------------------------------- 04 · The plans */}
      {/* Was four plan names in a row of links, with everything that makes a
          plan a plan — how many pages, how long, how many rounds, who it is
          for — buried on /pricing. Prices are quoted rather than published,
          which makes it doubly important that the shape of the offer is
          legible without clicking anything. */}
      <Spread id="pricing" index="04" folio="Plans">
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

      {/* ----------------------------------------------------- 07 · Contact */}
      <section className="border-t border-line bg-paper">
        <Spread id="contact" index="05" folio="Get in touch">
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="h-display max-w-[12ch]">Tell us about the project.</h2>
              <Standfirst className="mt-8">
                A few lines is enough to start. We reply within one business day,
                and there is no obligation attached to asking.
              </Standfirst>
              {/* The team page is one click away rather than five portraits
                  on the homepage — see /about. */}
              <Reveal delay={80} className="mt-8 flex flex-wrap items-center gap-x-9 gap-y-4">
                <Link href="/about" className="btn-outline">
                  Who you would be working with
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
