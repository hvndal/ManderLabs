import Image from 'next/image';

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

/**
 * Editorial team entry: portrait, name, role, location, short bio.
 *
 * Framing note — the portrait is a 4:5 crop anchored to the TOP of the image
 * (`object-top`), not the centre. Real headshots put the face in the upper
 * third, so a centre-anchored crop decapitates people; anchoring high keeps
 * the face in frame whether the source is a tight studio shot or a casual
 * phone photo. photo: null renders a tonal initials block at the same size.
 */
export default function TeamCard({ member }) {
  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-3">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
            className="object-cover object-top grayscale transition-all duration-700 ease-premium group-hover:scale-[1.03] group-hover:grayscale-0"
          />
        ) : (
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center bg-paper-2 font-mono text-stat-md font-medium tracking-[0.06em] text-line-strong"
          >
            {initials(member.name)}
          </span>
        )}
      </div>

      <h3 className="mt-4 text-body-lg font-medium text-ink">{member.name}</h3>
      <p className="label-caps mt-1.5 text-ink-mute">
        {member.role}
        {member.location ? ` · ${member.location}` : ''}
      </p>
      <p className="mt-2.5 text-label-sm leading-relaxed text-ink-soft">{member.bio}</p>

      {member.link && (
        <a
          href={member.link.href}
          target="_blank"
          rel="noreferrer noopener"
          className="link-underline label-caps mt-3 inline-flex w-fit items-center gap-1.5 text-accent"
        >
          {member.link.label}
          <span aria-hidden="true">↗</span>
        </a>
      )}
    </article>
  );
}
