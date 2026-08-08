import Link from 'next/link';
import Image from 'next/image';
import Section, { SectionHeading } from '@/components/Section';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import ServiceBand from '@/components/ServiceBand';
import Masthead from '@/components/Masthead';
import Colophon from '@/components/Colophon';
import StatsConstellation from '@/components/StatsConstellation';
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
import PricingInteractive from '@/components/PricingInteractive';
import Faq from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import {
  SERVICES,
  PROCESS,
  TIERS,
  STATS,
  FAQS,
  WORK,
  TEAM,
  IMAGES,
  BRAND,
} from '@/lib/content';
import { faqSchema } from '@/lib/seo';

export const metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />

      {/* -------------------------------------------------- 01 · The masthead */}
      {/* The word is the aperture: MANDER knocked out of a cream stencil over
          full-bleed film, scaling out of frame on scroll. See Masthead.js. */}
      <Masthead tagline={BRAND.tagline} mono={BRAND.region} />

      {/* ------------------------------------------- 02 · Colophon / the sheet */}
      <Colophon
        headline="Websites that grow small business."
        body="Premium design and build for small and mid-sized businesses in Canada and the U.S. — at a rate that makes sense for you."
        clients={WORK}
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
        {/* Label and title on one baseline rather than stacked, with the link
            hung off the opposite edge — a running head, not a title card. */}
        <Reveal>
          <div className="flex flex-col gap-5 border-b border-line pb-7 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10">
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <span className="label-caps shrink-0 text-accent">Selected work</span>
              <h2 className="text-headline-md font-semibold tracking-tight text-ink">
                A few recent builds.
              </h2>
            </div>
            <a
              href={`mailto:${BRAND.email}?subject=${encodeURIComponent(
                'New project enquiry'
              )}`}
              className="link-underline label-caps shrink-0 text-ink"
            >
              Start your project
              <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
            </a>
          </div>
        </Reveal>

        <div className="mt-12">
          <WorkCompact items={WORK} />
        </div>
      </Section>

      {/* ------------------------------------------------------------ Services */}
      <section id="services" className="border-y border-line bg-white">
        {/* Heading set as a masthead in miniature rather than a stacked
            eyebrow/title/body block: the count hangs enormous in the left
            column, the title runs across the right, and the supporting line
            is dropped to the far right margin so nothing shares a centre. */}
        <div className="container-max grid grid-cols-1 gap-y-8 py-stack-md md:grid-cols-12 md:gap-gutter">
          <div className="md:col-span-3">
            <Reveal>
              <span className="label-caps text-accent">What we do</span>
              <p className="mt-6 font-mono text-[19vw] leading-[0.78] tracking-[-0.04em] text-line-strong md:text-[9vw]">
                06
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-5 md:self-end">
            <Reveal delay={100}>
              <h2 className="max-w-[14ch] text-headline-lg-mobile font-semibold tracking-tight text-ink md:text-display-lg">
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
        <div className="container-max pb-stack-md">
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

      {/* ----------------------------------------------------------- Value prop */}
      <Section tone="paper">
        <div className="grid grid-cols-1 items-center gap-gutter lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden bg-paper-3">
              <Image
                src={IMAGES.growthOwner.src}
                alt={IMAGES.growthOwner.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 620px"
                className="img-zoom object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <span className="eyebrow">Why MANDER</span>
            <h2 className="h-section">
              Big-firm quality, without the big-firm invoice.
            </h2>
            <p className="mt-6 text-body-lg text-ink-soft">
              Most agencies price small businesses out or hand them a template
              and disappear. We do neither. You get considered design, clean
              build, and a team that stays reachable — for a rate a local
              business can actually justify.
            </p>

            <ul className="mt-8 divide-y divide-line border-y border-line">
              {[
                'Fixed scope, fixed price — quoted up front',
                'You own the site, the code, and every account',
                'No retainer lock-in, ever',
              ].map((item) => (
                <li key={item} className="flex items-center gap-4 py-5">
                  <Icon name="check" className="h-4 w-4 shrink-0 text-ink" strokeWidth={2} />
                  <span className="text-body-md text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* -------------------------------------------------------------- Process */}
      {/* The heading is pinned hard left and the steps descend away from it
          diagonally (see ProcessTimeline) — the section's own shape states
          the sequence before the copy does. */}
      <Section id="process" tone="alt">
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-12 md:gap-gutter">
          <div className="md:col-span-4">
            <Reveal>
              <span className="label-caps text-accent">How it works</span>
              <h2 className="mt-6 max-w-[12ch] text-headline-lg-mobile font-semibold tracking-tight text-ink md:text-headline-lg">
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
              <span className="label-caps text-accent">The team</span>
              <h2 className="mt-6 max-w-[14ch] text-headline-lg-mobile font-semibold tracking-tight text-ink md:text-headline-lg">
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
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:max-w-4xl">
          {TEAM.map((member, index) => (
            <Reveal key={member.name} delay={index * 60} className="h-full">
              <TeamCard member={member} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------ Engagements */}
      {/* Was "In their words" — the quotes it ran on were invented, so this
          now shows the verifiable side of the same engagements instead. */}
      <Section tone="warm">
        <SectionHeading
          eyebrow="Engagements"
          title="What we actually delivered."
          body="Scope and outcome for three recent builds — no paraphrasing, no invented praise."
        />
        <div className="mt-14">
          <Testimonials items={WORK} />
        </div>
      </Section>

      {/* ------------------------------------------------------- Quiz CTA (red) */}
      <section className="bg-accent text-on-accent">
        <div className="container-max py-stack-lg">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <span className="label-caps text-white/70">Not sure where to start?</span>
              <h2 className="mt-5 text-headline-lg-mobile font-semibold tracking-tight md:text-headline-lg">
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

      {/* -------------------------------------------------------------- Pricing */}
      <Section id="pricing" tone="warm">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Pricing"
            title="Plain prices. No games."
            body="One-time build cost. Every tier includes a strategy call before a pixel is drawn."
          />
          <Reveal>
            <Link href="/pricing" className="link-underline label-caps text-ink">
              Full breakdown
              <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={80} className="mt-12">
          <PricingInteractive tiers={TIERS} />
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-8 flex flex-col gap-3 border-t border-line pt-8 md:flex-row md:items-baseline md:justify-between md:gap-8">
            <p className="text-label-sm text-ink-mute">
              Tap a plan to see everything it includes.
            </p>
            {/* Quiet second door into the Community Rate — text, not a button,
                so it never competes with the plan CTAs above it. */}
            <CommunityRateNote />
          </div>
        </Reveal>
      </Section>

      {/* ------------------------------------------------ Community Rate · 20% */}
      <CommunityRateSection />

      {/* ------------------------------------------------------------------ FAQ */}
      <Section id="faq" tone="paper">
        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Questions" title="Before you ask." />
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <Faq items={FAQS} />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------ Final CTA */}
      <section className="bg-ink text-paper">
        <div className="container-max py-stack-lg text-center">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="text-headline-lg-mobile font-semibold tracking-tight md:text-display-lg">
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
