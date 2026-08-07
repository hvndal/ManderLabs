import Link from 'next/link';
import Image from 'next/image';
import Section, { SectionHeading } from '@/components/Section';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import ServiceBand from '@/components/ServiceBand';
import HeroVideo from '@/components/HeroVideo';
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

      {/* ---------------------------------------------------------------- Hero */}
      <section>
        <div className="container-max pt-14 md:pt-20">
          <Reveal>
            <p className="eyebrow">{BRAND.region}</p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="max-w-[15ch] font-semibold tracking-tight text-ink text-headline-lg-mobile md:text-display-xl">
              Websites that grow small business.
            </h1>
          </Reveal>

          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal delay={160} className="max-w-text">
              <p className="text-body-lg text-ink-soft">
                Premium design and build for small and mid-sized businesses in
                Canada and the U.S. — at a rate that makes sense for you.
              </p>
            </Reveal>

            <Reveal delay={240} className="flex flex-wrap items-center gap-6">
              <Link href="/quote" className="btn-primary">
                Get a quote
                <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
              </Link>
              <Link href="#work" className="link-underline label-caps text-ink">
                See the work
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Cinematic cover — looping showcase video, framed like a print */}
        <Reveal delay={200} className="mt-14 md:mt-20">
          <HeroVideo poster={IMAGES.heroWorkspace.src} posterAlt={IMAGES.heroWorkspace.alt} />
        </Reveal>
      </section>

      {/* ---------------------------------------------------- Trusted by strip */}
      <section className="border-b border-t border-line bg-paper">
        <div className="container-max flex flex-col items-center gap-6 py-9 md:flex-row md:justify-between">
          <Reveal>
            <span className="label-caps shrink-0 text-ink-mute">Trusted by</span>
          </Reveal>
          <Reveal delay={80}>
            <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
              {WORK.map((project) => (
                <li key={project.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.logo}
                    alt={`${project.name} logo`}
                    className="h-6 w-auto max-w-[140px] object-contain opacity-45 transition-opacity duration-300 hover:opacity-90"
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------- Statement · breathe */}
      <Statement
        eyebrow="Our take"
        text="A website is not a brochure. It is the first employee your business hires that never sleeps."
        tone="warm"
      />

      {/* ---------------------------------------------------- Stats / rationale */}
      <section className="border-b border-line bg-paper">
        <div className="container-max grid grid-cols-1 gap-10 pb-stack-md md:grid-cols-3 md:gap-gutter">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div className="flex flex-col">
                <span className="text-stat-xl text-ink">{stat.value}</span>
                <span className="mt-3 max-w-[22ch] text-body-md text-ink-soft">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------------- Work */}
      <Section id="work" tone="paper" className="!py-stack-md">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow mb-3">Selected work</span>
            <h2 className="text-headline-md text-ink">A few recent builds.</h2>
          </div>
          <Reveal>
            <Link href="/quote" className="link-underline label-caps text-ink">
              Start your project
              <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10">
          <WorkCompact items={WORK} />
        </div>
      </Section>

      {/* ------------------------------------------------------------ Services */}
      <section id="services" className="border-y border-line bg-white">
        <div className="container-max py-stack-md">
          <SectionHeading
            eyebrow="What we do"
            title="Everything a small business needs online."
            body="Six disciplines, one outcome: more of the right customers finding you and getting in touch."
          />
        </div>

        {/* Full-bleed alternating photo bands */}
        <div className="divide-y divide-line border-t border-line">
          {SERVICES.map((service, index) => (
            <ServiceBand
              key={service.title}
              service={service}
              flip={index % 2 === 1}
            />
          ))}
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
      <Section id="process" tone="alt">
        <SectionHeading eyebrow="How it works" title="A straight line from call to launch." />
        <div className="mt-4">
          <ProcessTimeline steps={PROCESS} />
        </div>
      </Section>

      {/* ----------------------------------------------------------------- Team */}
      <Section id="team" tone="paper">
        <SectionHeading
          eyebrow="The team"
          title="Small, senior, and reachable."
          body="No account-manager relay. The people who scope your project are the people who build it."
        />

        {/* Six across three columns on desktop reads as a small, concentrated
            studio — a wider grid of bigger cards makes the team look padded. */}
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:max-w-4xl">
          {TEAM.map((member, index) => (
            <Reveal key={member.name} delay={index * 60} className="h-full">
              <TeamCard member={member} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------- Testimonials */}
      <Section tone="warm">
        <SectionHeading eyebrow="In their words" title="What it's like to work with us." />
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
          <p className="mt-6 text-label-sm text-ink-mute">
            Tap a plan to see everything it includes.
          </p>
        </Reveal>
      </Section>

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
              <Link href="/quote" className="btn-on-dark">
                Get a quote
              </Link>
              <a href={`mailto:${BRAND.email}`} className="label-caps inline-flex items-center justify-center gap-2 border border-paper/40 px-8 py-4 text-paper transition-colors duration-300 hover:border-paper">
                Email us directly
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
