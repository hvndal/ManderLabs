import Link from 'next/link';
import Section, { SectionHeading } from '@/components/Section';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import ServiceBand from '@/components/ServiceBand';
import Triptych from '@/components/Triptych';
import Colophon from '@/components/Colophon';
import StatsConstellation from '@/components/StatsConstellation';
import AperturedType from '@/components/AperturedType';
import ShaderBackground from '@/components/ShaderBackground';
import GridField from '@/components/GridField';
import {
  CommunityRateSection,
  CommunityRateNote,
  CommunityRateFooterLink,
} from '@/components/CommunityRate';
import Statement from '@/components/Statement';
import WorkCompact from '@/components/WorkCompact';
import TeamCard from '@/components/TeamCard';
import ProcessTimeline from '@/components/ProcessTimeline';
import Testimonials from '@/components/Testimonials';
import Faq from '@/components/Faq';
import ContactForm from '@/components/ContactForm';
import JsonLd from '@/components/JsonLd';
import WhatsAppCta from '@/components/WhatsAppCta';
import {
  SERVICES,
  TERMS,
  PROCESS,
  STATS,
  WORK,
  CLIENTS,
  TEAM,
  BRAND,
} from '@/lib/content';
import { getServerMarket } from '@/lib/market-server';
import { faqSchema, alternates } from '@/lib/seo';

export const metadata = {
  alternates: alternates('/'),
};

export default function HomePage() {
  // Prices, positioning line and FAQ all come from the visitor's market; the
  // layout, sections and components below are identical for every market.
  const market = getServerMarket();

  return (
    <>
      <JsonLd data={faqSchema(market.faqs)} />

      {/* ------------------------------------------------- 01 · The triptych */}
      {/* WEB / SOCIAL / BRAND standing side by side at full height, read as
          one spread rather than three cards. See Triptych.js. */}
      <Triptych tagline={market.tagline} region={market.region} />

      {/* ------------------------------------------- 02 · Colophon / the sheet */}
      <Colophon
        headline={market.colophon.headline}
        body={market.colophon.body}
        clients={CLIENTS}
      />

      {/* -------------------------------------------------- Statement · breathe */}
      <Statement
        eyebrow="Our take"
        text="A website is not a brochure. It is the first employee your business hires that never sleeps."
        tone="warm"
        align="editorial"
      />

      {/* ------------------------------------------ 03 · Stats as constellation */}
      <StatsConstellation stats={STATS} />

      {/* ----------------------------------------------------------------- Work */}
      <Section id="work" tone="paper" className="!py-stack-md">
        {/* The running head, in the same grammar as every other section: index
            and label in the margin, statement in the field, one link hung off
            the right edge. */}
        <Reveal>
          <div className="border-t border-line pt-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-gutter">
              <div className="md:col-span-3">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
                    04
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                    Selected work
                  </span>
                </div>
              </div>
              <div className="md:col-span-6">
                <h2 className="font-display text-headline-lg-mobile font-normal leading-[1.02] text-ink md:text-headline-lg">
                  A few recent builds.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <a
                  href={`mailto:${BRAND.email}?subject=${encodeURIComponent(
                    'New project enquiry'
                  )}`}
                  className="link-underline label-caps text-ink"
                >
                  Start your project
                  <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-12">
          <WorkCompact items={WORK} />
        </div>
      </Section>

      {/* ------------------------------------------------------------ Services */}
      {/* The one section with a living ground: a very low-contrast shader
          drifting terracotta and rose through the paper colour. It is not
          decoration sitting behind content — it is the surface itself moving,
          which is why the contrast is kept near-invisible and the top and
          bottom edges are feathered away. */}
      <section id="services" className="relative border-y border-line bg-paper">
        <ShaderBackground className="opacity-90" />

        <div className="relative container-max grid grid-cols-1 gap-y-8 py-stack-md md:grid-cols-12 md:gap-gutter">
          <div className="md:col-span-3">
            <Reveal>
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
                  05
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  What we do
                </span>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-5 md:self-end">
            <Reveal delay={100}>
              <h2 className="max-w-[14ch] font-display text-headline-lg-mobile font-normal text-ink md:text-display-lg">
                Everything a small business needs online.
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-3 md:col-start-10 md:self-end">
            <Reveal delay={180}>
              <p className="text-body-md text-ink-soft">
                Six disciplines, one outcome: more of the right customers
                finding you and getting in touch.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Typographic rows — no photography, see ServiceBand.js */}
        <div className="relative container-max pb-stack-md">
          <div className="divide-y divide-line border-t border-line">
            {SERVICES.map((service, index) => (
              <ServiceBand key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- Statement · breathe */}
      <Statement
        eyebrow="No surprises"
        text="Fixed price. Fixed scope. You see it before you approve it."
        tone="alt"
      />

      {/* --------------------------------------------------------------- Terms */}
      {/* Was a stock photograph beside a tick-list — the last generic block on
          the route and the only remaining stock image outside Work. These are
          commitments, so they're set as clauses: numbered, ruled, each one a
          line of display serif with its qualification hung out in the right
          margin. Same grammar as the services index, so the page stops
          switching languages halfway down. */}
      <section className="relative overflow-hidden bg-paper py-stack-lg">
        <GridField />

        <div className="relative container-max">
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-12 md:gap-gutter">
          <div className="md:col-span-3">
            <Reveal>
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
                  03
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  Why MANDER
                </span>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-8 md:col-start-4">
            <Reveal delay={80}>
              <h2 className="h-display max-w-[15ch]">
                Big-firm quality, without the big-firm invoice.
              </h2>
              <p className="mt-8 max-w-text text-body-lg text-ink-soft md:mt-10">
                Most agencies price small businesses out, or hand them a
                template and disappear. We do neither — and these three hold
                whatever you spend.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 border-t border-line md:mt-24">
          {TERMS.map((term, index) => (
            <Reveal key={term.index} delay={index * 70}>
              <div className="group grid grid-cols-1 gap-y-3 border-b border-line py-9 md:grid-cols-12 md:items-baseline md:gap-gutter md:py-12">
                {/* Apertured, like the service indices — the numerals carry
                    film instead of sitting flat in mono, so the same motif
                    recurs on both of the page's numbered lists rather than
                    appearing once. */}
                <div className="md:col-span-2">
                  <AperturedType
                    text={term.index}
                    viewBox="0 0 200 120"
                    fontSize={116}
                    baselineY={96}
                    maskId={`term-${term.index}`}
                    offset={0.15 + index * 0.35}
                    className="w-[86px] opacity-80 transition-opacity duration-500 group-hover:opacity-100 md:w-[104px]"
                    mediaClassName="brightness-[0.8] saturate-[1.2]"
                  />
                </div>
                <h3 className="font-display text-headline-lg-mobile font-normal text-ink md:col-span-6 md:text-headline-lg">
                  {term.title}
                </h3>
                <p className="max-w-text text-body-md text-ink-soft md:col-span-4">
                  {term.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- Process */}
      {/* The heading is pinned hard left and the steps descend away from it
          diagonally (see ProcessTimeline) — the section's own shape states
          the sequence before the copy does. */}
      <Section id="process" tone="alt">
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-12 md:gap-gutter">
          <div className="md:col-span-4">
            <Reveal>
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
                  06
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  How it works
                </span>
              </div>
              <h2 className="mt-6 max-w-[12ch] font-display text-headline-lg-mobile font-normal text-ink md:text-headline-lg">
                A straight line from call to launch.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-12">
            <ProcessTimeline steps={PROCESS} />
          </div>
        </div>
      </Section>

      {/* ----------------------------------------------------------------- Team */}
      <Section id="team" tone="paper">
        {/* Title left, supporting line dropped to the right margin and set
            small — the asymmetry keeps it from reading as another centred
            title card, and the gap between them is the composition. */}
        <div className="grid grid-cols-1 gap-y-6 md:grid-cols-12 md:gap-gutter">
          <div className="md:col-span-6">
            <Reveal>
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
                  07
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  The team
                </span>
              </div>
              <h2 className="mt-6 max-w-[14ch] font-display text-headline-lg-mobile font-normal text-ink md:text-headline-lg">
                Small, senior, and reachable.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:self-end">
            <Reveal delay={120}>
              <p className="text-body-md text-ink-soft">
                No account-manager relay. The people who scope your project are
                the people who build it.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Five across three columns reads as a small, concentrated studio —
            and the empty sixth cell is left empty on purpose. Stretching the
            grid to close the gap would make a five-person team look like it
            was arranged to fill space. */}
        {/* `items-stretch` plus `h-full` on both the Reveal wrapper and the
            card is what actually makes the row share a baseline — without it
            each card sizes to its own content and the portraits step up and
            down across the row. */}
        <div className="mt-14 grid grid-cols-2 items-stretch gap-x-6 gap-y-12 sm:grid-cols-3 lg:max-w-4xl">
          {TEAM.map((member, index) => (
            <Reveal key={member.name} delay={index * 60} className="flex h-full">
              <TeamCard member={member} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------ Engagements */}
      {/* Was "In their words" — the quotes it ran on were invented, so this
          now shows the verifiable side of the same engagements instead. */}
      {/* Set as a running head on a rule, matching Selected Work above rather
          than the centred title card it used to use — a centred heading in the
          middle of a page built on asymmetry is the thing that made this
          section read as bolted on. */}
      <Section tone="warm">
        <Reveal>
          <div className="flex flex-col gap-5 border-b border-line pb-7 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10">
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <span className="label-caps shrink-0 text-accent">Engagements</span>
              <h2 className="font-display text-headline-lg-mobile font-normal text-ink md:text-headline-lg">
                What we actually delivered.
              </h2>
            </div>
            <p className="max-w-[34ch] shrink-0 text-body-md text-ink-soft sm:text-right">
              Scope and outcome for three recent builds — no paraphrasing, no
              invented praise.
            </p>
          </div>
        </Reveal>
        <div className="mt-14">
          <Testimonials items={CLIENTS} />
        </div>
      </Section>

      {/* ------------------------------------------------------- Quiz CTA (red) */}
      <section className="bg-accent text-on-accent">
        <div className="container-max py-stack-lg">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <span className="label-caps text-white/70">Not sure where to start?</span>
              {/* Pushed up to display scale. On a full-bleed accent field a
                  headline set at the same size as the ones on paper looks
                  timid — the block needs the type to fill it. */}
              <h2 className="mt-5 font-display text-headline-lg-mobile font-normal md:text-display-lg">
                Take the 60-second fit quiz.
              </h2>
              <p className="mt-5 max-w-text text-body-lg text-white/85">
                Six quick questions. We recommend a plan and a starting price
                based on your answers — or route you straight to a person if
                that is the better call.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link href="/quote" className="btn-on-dark">
                Start the quiz
                <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
              </Link>
              <p className="mt-4 text-label-sm text-white/70">
                Prefer to talk?{' '}
                <a href={`mailto:${BRAND.email}`} className="underline underline-offset-4">
                  Email us
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Plans */}
      {/* Was a pricing block: four cards, an app panel, a note. All of it was
          furniture for numbers that are no longer published, and a card row
          is the single most SaaS-shaped thing a page can contain. What is
          actually useful here is the shape of the offer — three or four named
          plans — and one door into a quote. The full scope lives one click
          away on /pricing. */}
      <Section id="pricing" tone="paper">
        <SectionHeading
          index="08"
          eyebrow="Plans"
          title="Fixed scope, fixed price, agreed before we start."
          body="Every project is quoted in writing against a written scope. The number you approve is the number you pay — there is no hourly meter running behind it."
          meta={`${market.tiers.length} plans`}
        />

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border-y border-line bg-line md:grid-cols-2">
          {market.tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 60} className="bg-paper">
              <Link
                href="/quote"
                className="group flex h-full items-baseline justify-between gap-6 px-2 py-7 transition-colors hover:bg-paper-2 md:px-6"
              >
                <span className="flex items-baseline gap-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-headline-lg-mobile leading-none text-ink transition-colors group-hover:text-accent">
                    {tier.name}
                  </span>
                </span>
                <span className="label-caps shrink-0 text-ink-mute transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent">
                  Quote
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between md:gap-8">
            <p className="text-label-sm text-ink-mute">
              Android builds are quoted the same way.{' '}
              <Link href="/pricing" className="link-underline text-ink">
                What each plan includes
              </Link>
              .
            </p>
            {/* Quiet second door into the Community Rate — text, not a button. */}
            <CommunityRateNote />
          </div>
        </Reveal>
      </Section>

      {/* ------------------------------------------------ Community Rate · 20% */}
      <CommunityRateSection />

      {/* ------------------------------------------------------------------ FAQ */}
      {/* The heading column runs mostly empty below the title on desktop — an
          accordion is tall and a two-line heading is not. The column rules
          give that gutter something to be rather than nothing. */}
      <section id="faq" className="relative overflow-hidden bg-paper py-stack-lg">
        <GridField />
        <div className="relative container-max">
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading
                index="09"
                eyebrow="Questions"
                title="Before you ask."
              />
            </div>
            <div className="lg:col-span-8">
              <Reveal>
                <Faq items={market.faqs} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- Contact */}
      {/* The site had no working contact form at all — every route out was a
          mailto, which loses anyone reading on a phone without a mail client
          configured. Same column split as the FAQ above it. */}
      <Section id="contact" tone="paper">
        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              index="10"
              eyebrow="Get in touch"
              title="Tell us about the project."
              body="A few lines is enough to start. We reply within one business day — no obligation."
            />
            <Reveal delay={80}>
              <WhatsAppCta className="mt-8" location="home-contact" />
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------ Final CTA */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <GridField tone="paper" />
        <div className="relative container-max py-stack-lg text-center">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="font-display text-headline-lg-mobile font-normal md:text-display-lg">
              Let&apos;s build something that pulls its weight.
            </h2>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={`mailto:${BRAND.email}?subject=${encodeURIComponent(
                  'New project enquiry'
                )}`}
                className="btn-on-dark"
              >
                Contact sales
              </a>
              {/* India only — returns null in every other market, so the
                  number is not in the US page at all. */}
              <WhatsAppCta tone="on-dark" location="home-final-cta" />
              <Link
                href="/quote"
                className="label-caps inline-flex items-center justify-center gap-2 border border-paper/40 px-8 py-4 text-paper transition-colors duration-300 hover:border-paper"
              >
                Take the fit quiz
              </Link>
            </div>
            <p className="mt-6 text-label-sm text-paper/50">
              <CommunityRateFooterLink className="underline decoration-paper/25 underline-offset-4 transition-colors hover:text-paper/80 hover:decoration-paper/60" />
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
