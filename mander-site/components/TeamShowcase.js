import TeamCard from './TeamCard';
import Reveal from './Reveal';

/**
 * The team, given a real place to be seen — not the plain uniform grid this
 * replaced. Same `TeamCard`, same `TEAM` data, no new bios or fabricated
 * detail: just a bigger stage, real color (see TeamCard's own note on why
 * the grayscale-until-hover treatment is gone), and a background dark enough
 * that five portraits read as photography rather than five thumbnails.
 *
 * Desktop: a wider grid than the card was originally sized for — `sizes` is
 * passed through so next/image serves the right resolution for the wider
 * column instead of the narrower hint TeamCard defaults to.
 *
 * Mobile: a horizontal scroll-snap strip instead of stacking five full cards
 * vertically. This is the one genuinely new interaction pattern here — nothing
 * else on the site scrolls horizontally — chosen because a long vertical
 * stack of portrait-plus-bio is the thing that actually buries a team section
 * on a phone; a strip keeps every portrait visible in a thumb-width scroll
 * instead of a five-screen scroll.
 */
export default function TeamShowcase({ members, tone = 'dark' }) {
  return (
    <div className="mt-4">
      {/* Mobile: bleeds past the page margin so the strip's edge doesn't
          align with the container, which is what makes a scroll strip read
          as "more to see" rather than "the row got cut off." */}
      <div className="-mx-margin-mobile flex snap-x snap-mandatory gap-5 overflow-x-auto px-margin-mobile pb-2 md:hidden">
        {members.map((member, i) => (
          <div key={member.name} className="w-[68vw] shrink-0 snap-start">
            <Reveal delay={i * 60}>
              <TeamCard
                member={member}
                tone={tone}
                sizes="68vw"
              />
            </Reveal>
          </div>
        ))}
      </div>

      <div className="hidden gap-x-10 gap-y-12 md:grid md:grid-cols-3 lg:grid-cols-5">
        {members.map((member, i) => (
          <Reveal key={member.name} delay={i * 70}>
            <TeamCard
              member={member}
              tone={tone}
              sizes="(max-width: 1024px) 30vw, 18vw"
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
