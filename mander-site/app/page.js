import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import ServiceBand from '@/components/ServiceBand';
import Hero from '@/components/Hero';
import Colophon from '@/components/Colophon';
import ClientMarquee from '@/components/ClientMarquee';
import StatsConstellation from '@/components/StatsConstellation';
import ShaderBackground from '@/components/ShaderBackground';
import GridField from '@/components/GridField';
import WorkSpotlight from '@/components/WorkSpotlight';
import ProcessTimeline from '@/components/ProcessTimeline';
import Testimonials from '@/components/Testimonials';
import PricingInteractive from '@/components/PricingInteractive';
import Faq from '@/components/Faq';
import ContactForm from '@/components/ContactForm';
import JsonLd from '@/components/JsonLd';
import CursorImage from '@/components/CursorImage';
import MagneticButton from '@/components/MagneticButton';
import { CommunityRateNote } from '@/components/CommunityRate';
import {
  SERVICES,
  PROCESS,
  TIERS,
  STATS,
  FAQS,
  WORK,
  CLIENTS,
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

      {/* -------------------------------------------------- 01 · The Hero Broadside */}
      <Hero />

      {/* ------------------------------------------- 02 · Colophon / Studio Dispatch */}
      <Colophon
        headline="Form Follows Commerce. Built To Outlast Trends."
        body="Digital systems should carry the structural permanence of timeless architecture. We engineer custom Next.js platforms, restrained typography, and disciplined conversion pathways that perform for years, not quarters."
      />

      {/* ------------------------------------------- 03 · Stripe-Style Client Marquee */}
      <ClientMarquee />

      {/* ------------------------------------------- 04 · MAJOR FULL-BLEED MANIFESTO */}
      {/* 80% photography, cinematic atmospheric night street with wet reflections.
          Negative space carrying bold editorial typography. */}
      <section className="relative w-full border-b border-line bg-ink overflow-hidden min-h-[620px] sm:min-h-[720px] lg:min-h-[820px] flex items-center">
        <CursorImage strength={5} className="absolute inset-0 w-full h-full">
          <Image
            src="/editorial/manifesto-desktop.jpg"
            alt="Night street in Vancouver with sidewalk reflections, illuminated storefronts, and city motion"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.78] contrast-[1.15]"
          />
        </CursorImage>

        {/* Cinematic Scrim — multi-stop gradient ensuring crystalline contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/75 to-black/35 sm:to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />

        {/* Manifesto Content */}
        <div className="relative z-10 container-max py-24 sm:py-32 w-full">
          <Reveal variant="mask">
            <div className="max-w-3xl">
              {/* Eyebrow badge with signature Pacific red accent */}
              <div className="flex items-center gap-3 mb-6">
                <span className="h-1.5 w-1.5 bg-accent inline-block" />
                <span className="font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.22em] text-white/90 font-semibold drop-shadow">
                  03 // PACIFIC MANIFESTO
                </span>
                <span className="h-px w-12 bg-white/40 hidden sm:inline-block" />
              </div>

              {/* Bold Manifesto Headline */}
              <h2 className="font-display text-[2.8rem] sm:text-[4rem] lg:text-[5.4rem] text-white leading-[0.92] tracking-tight mb-8 text-balance drop-shadow-lg">
                BUILT FOR THE CITY.<br />
                <span className="italic font-light text-white/95">MADE FOR GROWTH.</span>
              </h2>

              {/* Minimal Supporting Copy */}
              <p className="font-sans text-body-lg text-white/90 leading-relaxed font-light mb-10 max-w-xl drop-shadow-md">
                Mander is an independent digital studio creating distinctive websites, identities and digital experiences for ambitious businesses in Vancouver and beyond.
              </p>

              {/* Micro Technical Metadata Stamp */}
              <div className="border-t border-white/30 pt-5 flex flex-wrap items-center justify-between gap-4 max-w-xl font-mono text-[10px] uppercase tracking-[0.25em] text-white/80 drop-shadow">
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">49°16&apos;59&quot;N</span>
                  <span>123°07&apos;15&quot;W</span>
                </div>
                <span>ELEVATION 4M // PACIFIC BASIN</span>
                <span className="text-accent font-semibold">VERIFIED PRACTICE</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------ 04 · Stats as Constellation */}
      {/* High-contrast monochrome background with 100k+ ScrollVelocity display & Fitway Gym flagship showcase */}
      <StatsConstellation stats={STATS} featuredProject={WORK[0]} />

      {/* ------------------------------------------ 05 · Curated Work Showcase */}
      {/* Architectural box with Framer Motion AnimatePresence cross-fades */}
      <Section id="work" tone="paper" className="!py-stack-lg">
        <Reveal>
          <div className="flex flex-col gap-5 border-b border-line pb-7 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10 mb-8">
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <span className="font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.22em] text-accent font-semibold shrink-0 flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-accent inline-block" />
                05 // SELECTED ARCHIVE
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] text-ink leading-[1.05] tracking-tight">
                Selected Commercial <span className="italic font-light text-accent">Deployments.</span>
              </h2>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink-mute flex items-center gap-2 shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>LIVE VERIFIED FLAGSHIPS</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <WorkSpotlight items={WORK} />
        </Reveal>
      </Section>

      {/* ------------------------------------------ 06 · ASYMMETRICAL ARCHITECTURAL INTERLUDE */}
      {/* 80% photography, edge-to-edge bleed breaking completely out of card containers */}
      <section className="relative w-full border-y border-line bg-paper-2 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[660px]">
          {/* Left: Bleed-to-edge drafting and design monograph photography */}
          <div className="lg:col-span-6 relative bg-ink min-h-[380px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-line overflow-hidden group">
            <CursorImage strength={4} className="w-full h-full absolute inset-0">
              <Image
                src="/editorial/interview-set.jpg"
                alt="Black drafting pencils, typography rulers, and design monograph layout proofs"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
              />
            </CursorImage>

            {/* Edge Stamp */}
            <div className="absolute top-6 left-6 bg-ink/90 backdrop-blur-md text-white px-3 py-1 font-mono text-[9.5px] uppercase tracking-widest border border-white/10">
              PHYSICAL PROOFING // 01
            </div>

            <div className="absolute bottom-6 left-6 hidden sm:block bg-ink/90 backdrop-blur-md text-white/70 px-3 py-1 font-mono text-[9.5px] uppercase tracking-widest border border-white/10">
              LAYOUT RIGOR: DRAFTING × REACT COMPONENTS
            </div>
          </div>

          {/* Right: Asymmetrical High-Impact Editorial Statement */}
          <div className="lg:col-span-6 p-8 sm:p-14 lg:p-20 flex flex-col justify-between bg-paper">
            <Reveal variant="mask">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-1.5 w-1.5 bg-accent inline-block" />
                <span className="font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.22em] text-accent font-semibold">
                  06 // ARCHITECTURAL RIGOR
                </span>
                <span className="h-px w-10 bg-accent/40" />
              </div>

              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-[1.05] tracking-tight mb-8">
                &ldquo;We do not build templates. We architect digital flagships that command immediate market authority.&rdquo;
              </h3>

              <p className="font-sans text-body-lg text-ink-soft leading-relaxed font-light mb-8 max-w-lg">
                Every viewport is engineered on a disciplined 12-column grid, tuned for sub-second latency, and art-directed with the typographic rigor of an independent architecture publication.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <span className="text-ink font-semibold block mb-2 text-[10.5px]">FOUNDATIONAL CRITERIA</span>
                  <div className="space-y-1.5 text-ink-soft">
                    <div className="flex items-baseline gap-2">
                      <span className="text-accent font-semibold">01 /</span>
                      <span>Zero Runtime Bloat</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-accent font-semibold">02 /</span>
                      <span>Lighthouse 99+ Audited SLA</span>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="text-ink font-semibold block mb-2 text-[10.5px]">ENGINEERING BASIS</span>
                  <div className="space-y-1.5 text-ink-soft">
                    <div className="flex items-baseline gap-2">
                      <span className="text-accent font-semibold">03 /</span>
                      <span>Apparel & Hospitality Rigor</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-accent font-semibold">04 /</span>
                      <span>Sub-Second TTFB Performance</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------ 07 · Capabilities / Services */}
      {/* WebGL Shader Background + Typographic Rows + Dual Edge-to-Edge Spread */}
      <section id="services" className="relative border-b border-line bg-paper">
        <ShaderBackground className="opacity-90" />

        <div className="relative container-max grid grid-cols-1 gap-y-8 py-stack-md md:grid-cols-12 md:gap-gutter">
          <div className="md:col-span-3">
            <Reveal>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-1.5 w-1.5 bg-accent" />
                <span className="font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.22em] text-accent font-semibold">
                  07 // STUDIO CAPABILITIES
                </span>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-5 md:self-end">
            <Reveal delay={100}>
              <h2 className="max-w-[14ch] font-display text-headline-lg-mobile font-normal text-ink md:text-display-lg leading-[0.96] tracking-tight text-balance">
                Everything an ambitious brand needs <span className="italic font-light text-accent">online.</span>
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-3 md:col-start-10 md:self-end">
            <Reveal delay={180}>
              <p className="text-body-md text-ink-soft font-light max-w-[44ch] leading-relaxed">
                Six focused disciplines, one commercial outcome: more qualified customers discovering your business and booking with confidence.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Typographic rows with apertured numerals */}
        <div className="relative container-max pb-stack-md">
          <div className="divide-y divide-line border-t border-line">
            {SERVICES.map((service, index) => (
              <ServiceBand key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>

        {/* Architectural Dual Spread: Physical Proofs & Pacific Glass */}
        <Reveal variant="scale">
          <div className="relative border-t border-line bg-paper-2 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Panel 1: Tactile Hands / Paper Layout Proofs */}
            <div className="relative aspect-[16/10] border-b md:border-b-0 md:border-r border-line overflow-hidden group">
              <CursorImage strength={3} className="w-full h-full absolute inset-0">
                <Image
                  src="/editorial/studio-craft.jpg"
                  alt="Creative director hands examining tactile typography proofs and paper swatches"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </CursorImage>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="font-mono text-[9px] uppercase tracking-widest text-accent font-semibold block mb-1">
                  TACTILE CRAFT // 01
                </span>
                <h4 className="font-display text-2xl text-white mb-1">Testing Every Layout On Paper</h4>
                <p className="font-sans text-xs text-white/75 font-light max-w-md">
                  We proof letterforms, leading, and grid ratios physically before translating them into production React components.
                </p>
              </div>
            </div>

            {/* Panel 2: Glass Architecture Reflections */}
            <div className="relative aspect-[16/10] overflow-hidden group">
              <CursorImage strength={3} className="w-full h-full absolute inset-0">
                <Image
                  src="/editorial/glass-facade.jpg"
                  alt="Editorial stack of pristine printed design systems and physical brand collateral"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </CursorImage>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="font-mono text-[9px] uppercase tracking-widest text-accent font-semibold block mb-1">
                  PACIFIC REFLECTION // 02
                </span>
                <h4 className="font-display text-2xl text-white mb-1">Digital Products With Urban Gravitas</h4>
                <p className="font-sans text-xs text-white/75 font-light max-w-md">
                  Clean lines, architectural depth, and restrained palettes engineered to stand out against noisy SaaS templates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>

      {/* ------------------------------------------ 08 · Delivery Protocol */}
      <section id="process" className="relative border-b border-line bg-paper py-stack-lg">
        <div className="container-max">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-line gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="h-1.5 w-1.5 bg-accent" />
                <span className="font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.22em] text-accent font-semibold">
                  08 // DELIVERY PROTOCOL
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] text-ink leading-[1.02] tracking-tight text-balance">
                The Delivery Sequence. <span className="italic font-light text-accent">Architectural Scoping</span> to Deployment.
              </h2>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs text-ink-mute uppercase tracking-widest shrink-0">
              <span className="h-1.5 w-1.5 bg-accent" />
              <span>3–4 WEEKS TYPICAL ENGAGEMENT</span>
            </div>
          </div>

          <ProcessTimeline steps={PROCESS} />
        </div>
      </section>

      {/* ------------------------------------------ 09 · Pacific Philosophy */}
      {/* Magazine double-spread: rain on glass window + offset dark card */}
      <section className="relative border-b border-line bg-paper-2 py-16 sm:py-24 overflow-hidden">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Cinematic Rain Photo */}
            <div className="lg:col-span-7">
              <Reveal variant="scale">
                <div className="relative aspect-[16/10] border border-line bg-ink overflow-hidden group">
                  <CursorImage strength={4} className="w-full h-full absolute inset-0">
                    <Image
                      src="/editorial/pacific-rain.jpg"
                      alt="Vancouver evening rain on glass window with glowing street reflections"
                      fill
                      sizes="(max-width: 1024px) 100vw, 700px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </CursorImage>
                  <div className="absolute top-3 left-3 pointer-events-none font-mono text-[10px] text-white/50 select-none">+</div>
                  <div className="absolute top-3 right-3 pointer-events-none font-mono text-[10px] text-white/50 select-none">+</div>
                  <div className="absolute bottom-4 left-4 bg-ink/90 text-white font-mono text-[9.5px] uppercase tracking-widest px-3 py-1 border border-white/10">
                    FIELD NOTE 02 // PACIFIC RAIN
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Editorial Card overlapping visually */}
            <div className="lg:col-span-5">
              <Reveal variant="slide-left" delay={80}>
                <div className="bg-ink text-paper p-8 sm:p-12 border border-white/15">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="h-1.5 w-1.5 bg-accent" />
                    <span className="font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.22em] text-accent font-semibold">
                      09 // PACIFIC PHILOSOPHY
                    </span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl text-white leading-[1.05] mb-5">
                    &ldquo;Quiet luxury is knowing you don&apos;t have to shout.&rdquo;
                  </h3>
                  <p className="font-sans text-body-md text-white/80 leading-relaxed font-light mb-8 max-w-[46ch]">
                    The most authoritative brands don&apos;t rely on screaming neon buttons or aggressive marketing popups. They win through pristine visual taste, disciplined restraint, and flawless technical execution.
                  </p>
                  <div className="border-t border-white/20 pt-4 font-mono text-xs uppercase tracking-widest text-white/70 flex items-center justify-between">
                    <span>VANCOUVER, BC</span>
                    <span className="text-accent font-semibold">— MANDER DIRECTIVE</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------ 10 · Bespoke Scoping & Quote */}
      <section id="quote" className="relative border-b border-line bg-paper py-stack-lg">
        <div className="container-max">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-line gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="h-1.5 w-1.5 bg-accent" />
                <span className="font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.22em] text-accent font-semibold">
                  10 // BESPOKE SCOPING
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl text-ink leading-tight">
                Tailored Scope. <span className="italic font-light text-accent">Ask For A Quote.</span>
              </h2>
            </div>
            <p className="font-sans text-sm text-ink-soft font-light max-w-md leading-relaxed">
              No generic fixed rates. Every project is scoped against your exact business targets, technical requirements, and timeline.
            </p>
          </div>

          <PricingInteractive tiers={TIERS} />

          <div className="mt-12">
            <CommunityRateNote />
          </div>
        </div>
      </section>

      {/* ------------------------------------------ 11 · Audited Deliverables */}
      <Section id="proof" tone="paper" className="!py-stack-lg border-b border-line">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-line gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="h-1.5 w-1.5 bg-accent" />
              <span className="font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.22em] text-accent font-semibold">
                11 // AUDITED DELIVERABLES
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-ink leading-tight">
              Documented Commercial <span className="italic font-light text-accent">Outcomes.</span>
            </h2>
          </div>
          <p className="font-sans text-sm text-ink-soft font-light max-w-md leading-relaxed">
            Verifiable records of production deployments, commercial scope, and measured revenue impacts across client engagements.
          </p>
        </div>
        <Testimonials items={CLIENTS} />
      </Section>

      {/* ------------------------------------------ 12 · Direct Engagement & Contact */}
      <Section id="contact" tone="ink" className="!py-stack-lg border-b border-line relative overflow-hidden">
        {/* Subtle abstract architectural background at low opacity */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <Image
            src="/editorial/abstract-shadows.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-gutter items-center">
            <div className="lg:col-span-5 text-white">
              <Reveal variant="mask">
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-1.5 w-1.5 bg-accent" />
                  <span className="font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.22em] text-accent font-semibold">
                    12 // DIRECT ENGAGEMENT
                  </span>
                </div>

                <h2 className="font-display text-4xl sm:text-6xl text-white leading-[0.95] tracking-tight mb-6 text-balance">
                  Let’s build something that <span className="italic font-light text-accent">commands authority.</span>
                </h2>
                <p className="font-sans text-body-lg text-white/80 leading-relaxed font-light mb-8 max-w-[44ch]">
                  Tell us about your project. We reply within one business day with plain advice and a transparent, written bespoke quote.
                </p>
                <div className="border-t border-white/20 pt-6 font-mono text-xs text-white/60 space-y-2 uppercase tracking-wider">
                  <div>
                    DIRECT INBOX:{' '}
                    <a
                      href="mailto:herman@mander.tech"
                      className="text-white font-bold hover:underline"
                    >
                      HERMAN@MANDER.TECH
                    </a>
                  </div>
                  <div>OFFICES: VANCOUVER, BC × BOSTON, MA</div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={100}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------ 13 · Common Inquiries */}
      <Section id="faq" tone="paper" className="!py-stack-lg border-b border-line">
        <div className="container-max">
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-1.5 w-1.5 bg-accent" />
                  <span className="font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.22em] text-accent font-semibold">
                    13 // COMMON INQUIRIES
                  </span>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl text-ink leading-tight">
                  Clear Answers. <span className="italic font-light text-accent">Zero Ambiguity.</span>
                </h2>
                <p className="font-sans text-sm text-ink-soft font-light mt-4 leading-relaxed max-w-[40ch]">
                  Clear answers regarding our bespoke scoping model, design rigor, delivery timeline, and technical guarantees.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal delay={80}>
                <Faq items={FAQS} />
              </Reveal>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
