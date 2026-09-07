import Image from 'next/image';
import Link from 'next/link';
import Section, { SectionHeading } from '@/components/Section';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import ServiceBand from '@/components/ServiceBand';
import Masthead from '@/components/Masthead';
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
import WorkSpotlight from '@/components/WorkSpotlight';
import TeamCard from '@/components/TeamCard';
import ProcessTimeline from '@/components/ProcessTimeline';
import Testimonials from '@/components/Testimonials';
import PricingInteractive from '@/components/PricingInteractive';
import AppPricing from '@/components/AppPricing';
import Faq from '@/components/Faq';
import ContactForm from '@/components/ContactForm';
import JsonLd from '@/components/JsonLd';
import {
  SERVICES,
  TERMS,
  PROCESS,
  TIERS,
  STATS,
  FAQS,
  WORK,
  CLIENTS,
  TEAM,
  BRAND,
} from '@/lib/content';
import { faqSchema, alternates } from '@/lib/seo';

export const metadata = {
  alternates: alternates('/'),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />

      {/* -------------------------------------------------- 01 · The Masthead */}
      {/* The word is the aperture: MANDER knocked out of a cream stencil over
          full-bleed film, scaling out of frame on scroll. Preserving exact MANDER font. */}
      <Masthead tagline="VANCOUVER CONTEMPORARY // DIGITAL PRACTICE" mono={BRAND.region} />

      {/* ------------------------------------------- 02 · Colophon / The Sheet */}
      <Colophon
        headline="Websites that grow real businesses."
        body="Premium design and bespoke engineering for ambitious small and mid-sized businesses across Canada and the U.S. — priced to deliver measurable ROI."
        clients={CLIENTS}
      />

      {/* ------------------------------------------- 03 · Vancouver Studio Environment (Moment 02) */}
      <section className="relative border-y border-line bg-paper py-16 sm:py-24 overflow-hidden">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Editorial Statement & Metadata */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <Reveal>
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse"></span>
                  <span className="font-mono text-label-caps text-accent">
                    FIELD NOTE 01 // THE VANCOUVER ENVIRONMENT
                  </span>
                </div>
                <h2 className="font-display text-headline-lg text-ink leading-[0.98] tracking-tight mb-6">
                  "A website is not a brochure. It is the <span className="italic underline decoration-accent/40 underline-offset-8">first employee</span> your business hires that never sleeps."
                </h2>
                <p className="font-sans text-body-md text-ink-soft leading-relaxed font-light mb-6">
                  Conceived and engineered between the rain on Water Street and cold Pacific harbor light. We blend Scandinavian restraint with Swiss functionalism to build websites that command immediate market authority.
                </p>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute border-t border-line pt-4 flex items-center justify-between">
                  <span>VANCOUVER STUDIO AXIS</span>
                  <span className="text-ink font-semibold">49°17'N 123°07'W</span>
                </div>
              </Reveal>
            </div>

            {/* Right: Authentic $50k Camera Environmental Studio Shot */}
            <div className="lg:col-span-7">
              <Reveal delay={120}>
                <div className="relative border border-line bg-black shadow-2xl overflow-hidden aspect-[16/10] group">
                  <Image
                    src="/editorial/studio-set.jpg"
                    alt="MANDER creative production studio in Vancouver with cinema camera and broadcast microphone overlooking rain on window"
                    fill
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute top-4 left-4 bg-ink/90 backdrop-blur-md text-white px-3 py-1 font-mono text-[9.5px] uppercase tracking-widest border border-white/10">
                    STUDIO 01 // AUDIO & CINEMA PRODUCTION
                  </div>
                  <div className="absolute bottom-4 right-4 hidden sm:block bg-ink/90 backdrop-blur-md text-white/70 px-3 py-1 font-mono text-[9.5px] uppercase tracking-widest border border-white/10">
                    NATURAL LIGHT · PACIFIC RAIN
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------ 04 · Stats as Constellation */}
      <StatsConstellation stats={STATS} />

      {/* ------------------------------------------ 05 · THE PACIFIC RED EVENT (Moment 03) */}
      {/* A high-contrast, rare editorial interruption in deep oxblood/brick red,
          then returns immediately to quiet cream. */}
      <section className="relative bg-[#8a1c22] text-white py-20 sm:py-28 px-6 sm:px-12 border-y border-[#6e1418] overflow-hidden">
        <div className="container-max relative z-10">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-10 border-b border-white/20 gap-6">
              <div>
                <span className="font-mono text-label-caps text-white/70 block mb-2">
                  03 // THE PACIFIC STANDARD
                </span>
                <h2 className="font-display text-4xl sm:text-6xl text-white leading-[0.95] tracking-tight max-w-2xl">
                  We don't build templates. We build flagships that pull revenue.
                </h2>
              </div>
              <p className="font-mono text-xs text-white/80 uppercase tracking-widest max-w-sm font-light">
                BUILT IN VANCOUVER · SERVING AMBITIOUS ENTERPRISES ACROSS NORTH AMERICA
              </p>
            </div>

            {/* Three Standing Clauses in Red */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="border-l border-white/30 pl-6">
                <div className="font-mono text-xs font-bold text-white mb-2">01 // FIXED SCOPE</div>
                <h3 className="font-display text-2xl text-white mb-2">Every line quoted in writing.</h3>
                <p className="font-sans text-xs text-white/80 leading-relaxed font-light">
                  The scope you approve is the scope delivered. No open-ended hourly billing meters or surprise line items.
                </p>
              </div>

              <div className="border-l border-white/30 pl-6">
                <div className="font-mono text-xs font-bold text-white mb-2">02 // TOTAL OWNERSHIP</div>
                <h3 className="font-display text-2xl text-white mb-2">You own 100% of the code.</h3>
                <p className="font-sans text-xs text-white/80 leading-relaxed font-light">
                  Domains, repositories, assets, and accounts are registered in your name from day one. Never held hostage.
                </p>
              </div>

              <div className="border-l border-white/30 pl-6">
                <div className="font-mono text-xs font-bold text-white mb-2">03 // MONTH-TO-MONTH</div>
                <h3 className="font-display text-2xl text-white mb-2">Zero retainer lock-in.</h3>
                <p className="font-sans text-xs text-white/80 leading-relaxed font-light">
                  Our hosting and care support runs on simple trust. Leave whenever you wish; the flagship remains yours.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------------- 06 · Curated Work Spotlight (Moment 04) */}
      {/* Less is more on the homepage: ONE unboxed flagship box + full link to dedicated /work landing page */}
      <Section id="work" tone="paper" className="!py-stack-md">
        <Reveal>
          <div className="flex flex-col gap-5 border-b border-line pb-7 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10 mb-8">
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <span className="label-caps shrink-0 text-accent">04 // Curated Work</span>
              <h2 className="text-headline-md font-semibold tracking-tight text-ink">
                Selected Commercial Build.
              </h2>
            </div>
            <Link
              href="/work"
              className="link-underline label-caps shrink-0 text-ink flex items-center gap-1.5"
            >
              <span>Explore Dedicated Work Page (7 Sites)</span>
              <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
        </Reveal>

        {/* Unboxed Spotlight Box */}
        <Reveal delay={80}>
          <WorkSpotlight items={WORK} />
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------ 07 · Services (Moment 05) */}
      <section id="services" className="relative border-y border-line bg-paper">
        <ShaderBackground className="opacity-90" />

        <div className="relative container-max grid grid-cols-1 gap-y-8 py-stack-md md:grid-cols-12 md:gap-gutter">
          <div className="md:col-span-3">
            <Reveal>
              <span className="label-caps text-accent">05 // Capabilities</span>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-5 md:self-end">
            <Reveal delay={100}>
              <h2 className="max-w-[14ch] font-display text-headline-lg-mobile font-normal text-ink md:text-display-lg">
                Everything an ambitious brand needs online.
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-3 md:col-start-10 md:self-end">
            <Reveal delay={180}>
              <p className="text-body-md text-ink-soft font-light">
                Six focused disciplines, one commercial outcome: more qualified customers discovering your business and booking with confidence.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Typographic rows with numbered indices */}
        <div className="relative container-max pb-stack-md">
          <div className="divide-y divide-line border-t border-line">
            {SERVICES.map((service, index) => (
              <ServiceBand key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>

        {/* Production Studio & Creator Ecosystem Spread */}
        <div className="relative container-max pb-stack-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-line pt-12">
            <Reveal>
              <div className="border border-line bg-white p-4 shadow-lg group">
                <div className="relative aspect-[16/10] overflow-hidden bg-black mb-4">
                  <Image
                    src="/editorial/interview-set.jpg"
                    alt="Creative director podcast and interview setup in Vancouver"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-ink/90 text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1">
                    PRODUCTION STUDIO // CREATOR AUDIO
                  </div>
                </div>
                <h4 className="font-display text-2xl text-ink mb-1">High-Production Broadcast Craft</h4>
                <p className="font-sans text-xs text-ink-soft leading-relaxed font-light">
                  From commercial podcasts to cinematic founder interviews, we engineer digital environments that command serious cultural authority.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="border border-line bg-white p-4 shadow-lg group">
                <div className="relative aspect-[16/10] overflow-hidden bg-black mb-4">
                  <Image
                    src="/editorial/designer-table.jpg"
                    alt="Architectural brand guidelines, Leica camera, and typography proofs in Vancouver studio"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-ink/90 text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1">
                    BRAND MATERIALS // TACTILE PROOFS
                  </div>
                </div>
                <h4 className="font-display text-2xl text-ink mb-1">Physical Typographic Discipline</h4>
                <p className="font-sans text-xs text-ink-soft leading-relaxed font-light">
                  Every letterform, grid coordinate, and baseline ratio is tested on paper before committing to production code.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- 08 · Process (Moment 06) */}
      <section id="process" className="relative border-b border-line bg-paper py-stack-lg">
        <div className="container-max">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-line gap-6 mb-12">
            <div>
              <span className="font-mono text-label-caps text-accent block mb-2">
                06 // Sequence
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-ink">
                A straight line from call to launch.
              </h2>
            </div>
            <p className="font-mono text-xs text-ink-mute uppercase tracking-widest">
              3–4 WEEKS TYPICAL ENGAGEMENT
            </p>
          </div>

          <ProcessTimeline steps={PROCESS} />
        </div>
      </section>

      {/* -------------------------------------------------- 09 · Vancouver Dusk Field Note */}
      <section className="relative border-b border-line bg-white py-16 sm:py-24">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] border border-line overflow-hidden shadow-2xl group">
                <Image
                  src="/editorial/rain-street.jpg"
                  alt="Vancouver evening street with rain, coffee bar, and warm reflections"
                  fill
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute bottom-4 left-4 bg-ink/90 text-white font-mono text-[9.5px] uppercase tracking-widest px-3 py-1">
                  VANCOUVER // WATER STREET DUSK
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <span className="font-mono text-label-caps text-accent block mb-3">
                07 // Pacific Philosophy
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-ink leading-tight mb-4">
                "Quiet luxury is knowing you don't have to shout."
              </h3>
              <p className="font-sans text-body-md text-ink-soft leading-relaxed font-light mb-6">
                The most authoritative brands don't rely on screaming neon buttons or aggressive marketing popups. They win through pristine visual taste, disciplined restraint, and flawless technical execution.
              </p>
              <div className="font-mono text-xs uppercase tracking-widest text-ink font-semibold">
                — MANDER CREATIVE DIRECTIVE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- 10 · Bespoke Scoping & Quote (Moment 07 - NO FIXED RATES) */}
      <section id="quote" className="relative border-b border-line bg-paper py-stack-lg">
        <div className="container-max">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-line gap-6 mb-12">
            <div>
              <span className="font-mono text-label-caps text-accent block mb-2">
                08 // Bespoke Scoping
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-ink">
                Tailored Scope. Ask For A Quote.
              </h2>
            </div>
            <p className="font-sans text-sm text-ink-soft font-light max-w-md">
              No generic fixed rates. Every project is scoped against your exact business targets, technical requirements, and timeline.
            </p>
          </div>

          {/* Interactive Pricing Cards */}
          <PricingInteractive tiers={TIERS} />

          {/* Community Rate Callout */}
          <div className="mt-12">
            <CommunityRateNote />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- 11 · Proof & Social Ground */}
      <Testimonials items={CLIENTS} />

      {/* -------------------------------------------------- 12 · Direct Engagement & Contact Form */}
      <Section id="contact" tone="alt" className="!py-stack-lg">
        <div className="container-max">
          <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-gutter">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="label-caps text-accent block mb-3">09 // Direct Engagement</span>
                <h2 className="font-display text-4xl sm:text-6xl text-ink leading-[0.95] tracking-tight mb-6">
                  Let’s build something that commands authority.
                </h2>
                <p className="font-sans text-body-lg text-ink-soft leading-relaxed font-light mb-8">
                  Tell us about your project. We reply within one business day with plain advice and a transparent, written bespoke quote.
                </p>
                <div className="border-t border-line pt-6 font-mono text-xs text-ink-mute space-y-2 uppercase tracking-wider">
                  <div>DIRECT INBOX: <a href="mailto:herman@mander.tech" className="text-ink font-bold hover:underline">HERMAN@MANDER.TECH</a></div>
                  <div>OFFICES: VANCOUVER, BC × BOSTON, MA</div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={100}>
                <div className="border border-line bg-white p-8 sm:p-12 shadow-xl">
                  <ContactForm />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------- 13 · FAQs */}
      <Faq items={FAQS} />
    </>
  );
}

