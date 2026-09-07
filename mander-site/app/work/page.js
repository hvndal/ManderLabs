import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { WORK } from '@/lib/content';
import { alternates } from '@/lib/seo';

export const metadata = {
  title: 'Selected Work & Digital Portfolio | MANDER',
  description:
    'Dedicated exhibition of real websites and digital platforms built by MANDER. Unboxed, high-resolution captures of live client deployments and in-house studio products.',
  alternates: alternates('/work'),
};

export default function WorkPage() {
  return (
    <main className="bg-paper text-ink min-h-screen">
      {/* Running Head */}
      <div className="border-b border-line bg-paper px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-accent rounded-full"></span>
          <span>MANDER LABS // SELECTED WORK ARCHIVE</span>
        </div>
        <div className="flex items-center gap-6">
          <span>VANCOUVER × BOSTON</span>
          <Link href="/#quote" className="text-ink font-semibold hover:text-accent transition-colors">
            Ask For Quote ↗
          </Link>
        </div>
      </div>

      {/* Header Lead */}
      <section className="px-6 py-16 sm:py-24 max-w-7xl mx-auto border-b border-line">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="font-mono text-label-caps text-accent block mb-3">
                01 // Curated Exhibition
              </span>
              <h1 className="font-display text-display-xl text-ink leading-[0.92] tracking-tight">
                Websites built to <span className="italic text-ink-soft">command authority.</span>
              </h1>
            </div>
            <div className="lg:col-span-4 font-sans text-body-md text-ink-soft font-light leading-relaxed">
              No generic mockups. No fictional concept templates. Below are unboxed, edge-to-edge captures of real commercial flagships and digital products designed and shipped by MANDER.
            </div>
          </div>
        </Reveal>
      </section>

      {/* Portfolio Plates */}
      <section className="px-6 sm:px-12 py-16 sm:py-24 max-w-7xl mx-auto space-y-24 sm:space-y-32">
        {WORK.map((project, index) => (
          <Reveal key={project.name} delay={index * 50}>
            <article className="border border-line bg-white shadow-xl group">
              {/* Plate Header */}
              <div className="p-6 sm:p-8 border-b border-line flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 bg-paper/50">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm font-bold text-accent">
                    CASE 00{index + 1} //
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl text-ink">
                    {project.name}
                  </h2>
                  <span className="hidden md:inline-block font-mono text-[10px] uppercase tracking-widest text-ink-mute border border-line px-2 py-0.5">
                    {project.sector}
                  </span>
                </div>
                <div className="flex items-center gap-4 font-mono text-xs text-ink-mute uppercase tracking-wider">
                  <span className="text-ink font-semibold">{project.result}</span>
                  <span>·</span>
                  <span>{project.location}</span>
                </div>
              </div>

              {/* UNBOXED CRISP SCREENSHOT CONTAINER */}
              <div className="relative w-full bg-black overflow-hidden border-b border-line group-hover:border-ink transition-colors">
                {project.image ? (
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.imageAlt || project.name}
                      fill
                      sizes="(max-width: 1280px) 100vw, 1200px"
                      priority={index === 0}
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/10] flex items-center justify-center bg-ink p-12 text-center text-paper">
                    <div>
                      <div className="font-display text-4xl mb-3">{project.name}</div>
                      <p className="font-mono text-xs uppercase tracking-widest text-ink-mute">{project.sector} — {project.result}</p>
                    </div>
                  </div>
                )}

                {/* Direct Corner Status Tag */}
                <div className="absolute top-4 left-4 bg-ink/90 backdrop-blur-md text-white px-3 py-1 font-mono text-[10px] uppercase tracking-widest border border-white/10">
                  {project.kind === 'studio' ? 'STUDIO BUILD' : 'CLIENT FLAGSHIP'} — VERIFIED DEPLOYMENT
                </div>
              </div>

              {/* Plate Metadata & Action Footer */}
              <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white">
                <div className="md:col-span-8">
                  <p className="font-sans text-body-md text-ink-soft leading-relaxed font-light mb-4">
                    {project.body}
                  </p>
                  <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider text-ink-mute">
                    {project.services?.map((svc) => (
                      <span key={svc} className="border border-line bg-paper px-2.5 py-1 text-ink">
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-end">
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-ink hover:bg-accent text-white font-mono text-xs uppercase tracking-[0.18em] px-6 py-3.5 transition-colors font-semibold shadow-md text-center"
                    >
                      <span>Launch Live Site</span>
                      <span>↗</span>
                    </a>
                  ) : (
                    <span className="font-mono text-xs uppercase tracking-widest text-ink-mute text-center py-2">
                      Regional Deployment
                    </span>
                  )}
                  <Link
                    href="/#quote"
                    className="inline-flex items-center justify-center border border-line hover:border-ink text-ink font-mono text-xs uppercase tracking-[0.18em] px-6 py-3 transition-colors text-center"
                  >
                    Ask For Similar Scope
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      {/* Bottom Callout */}
      <section className="bg-ink text-paper py-20 px-6 sm:px-12 border-t border-line text-center">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-label-caps text-accent block mb-3">
            02 // Next Commission
          </span>
          <h2 className="font-display text-4xl sm:text-5xl mb-6">
            Ready to build a site that stands apart?
          </h2>
          <p className="font-sans text-body-lg text-ink-mute mb-8 font-light">
            Every engagement is custom-scoped against your business targets with zero generic fixed rates. Tell us what you need.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#quote"
              className="bg-white hover:bg-paper text-ink font-mono text-xs uppercase tracking-[0.2em] px-8 py-4 font-bold transition-all shadow-xl"
            >
              Ask For A Quote ↗
            </Link>
            <Link
              href="/"
              className="border border-line/40 hover:border-line text-paper font-mono text-xs uppercase tracking-[0.2em] px-8 py-4 transition-colors"
            >
              Return To Studio Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
