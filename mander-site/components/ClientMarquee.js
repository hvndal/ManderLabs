'use client';

const BRANDS = [
  { name: 'Fitway Gym', logo: '/logos/fitway.svg', type: 'svg' },
  { name: 'Nouvelle Côte', logo: '/logos/nouvelle-cote.svg', type: 'svg' },
  { name: 'Waste Universe', logo: '/logos/waste-universe.svg', type: 'svg' },
  { name: 'RentCan', label: 'RENTCAN', sub: 'PROPTECH', type: 'text' },
  { name: 'Kinetic Roast', label: 'KINETIC ROAST', sub: 'THERMAL LAB', type: 'text' },
  { name: 'Kitsilano Sound', label: 'KITSILANO SOUND', sub: 'AUDIO STUDIO', type: 'text' },
  { name: 'Arc & Timber', label: 'ARC & TIMBER', sub: 'ARCHITECTURE', type: 'text' },
  { name: 'Pacific Foundry', label: 'PACIFIC FOUNDRY', sub: 'MATERIALS', type: 'text' },
  { name: 'Lumière Nord', label: 'LUMIÈRE NORD', sub: 'EDITIONS', type: 'text' },
  { name: 'KERN', label: 'KERN', sub: 'SYSTEMS', type: 'text' },
];

export default function ClientMarquee() {
  // Duplicate array for seamless infinite looping
  const track = [...BRANDS, ...BRANDS];

  return (
    <div className="w-full border-y border-line bg-paper py-6 overflow-hidden select-none">
      <div className="container-max mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute">
        <span>CLIENTS & COLLABORATIONS // TEAMS WE'VE WORKED WITH</span>
        <span className="hidden sm:inline">2020 — 2026</span>
      </div>

      {/* Marquee with subtle gradient feathering at edges like Stripe */}
      <div 
        className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        <div className="flex items-center gap-12 sm:gap-16 w-max animate-marquee hover:[animation-play-state:paused] py-2">
          {track.map((b, idx) => (
            <div
              key={`${b.name || b.label}-${idx}`}
              className="flex items-center gap-3 shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-default"
            >
              {b.type === 'svg' ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={b.logo}
                  alt={b.name}
                  className="h-6 sm:h-7 w-auto max-w-[140px] object-contain grayscale"
                />
              ) : (
                <div className="flex items-baseline gap-2 font-mono">
                  <span className="text-xs sm:text-sm font-bold tracking-wider text-ink">
                    {b.label}
                  </span>
                  <span className="text-[9px] tracking-widest text-ink-mute uppercase">
                    {b.sub}
                  </span>
                </div>
              )}
              <span className="text-ink-mute/30 ml-8 text-xs select-none">·</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
