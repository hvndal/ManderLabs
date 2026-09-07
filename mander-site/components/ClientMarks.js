import Reveal from './Reveal';

/**
 * The client marks — small, low-contrast, unlabelled beyond one word.
 *
 * This is what is left of the old Colophon section, whose headline and
 * paragraph moved up into the cover where they belong. The marks themselves
 * are worth keeping and worth keeping quiet: they are evidence, read in a
 * second, and a logo wall that demands attention is a logo wall that reads as
 * compensation.
 */
export default function ClientMarks({ clients }) {
  return (
    <div className="container-max flex flex-wrap items-center gap-x-10 gap-y-5 border-b border-line py-7">
      <span className="rail text-ink-mute">Selected clients</span>
      <ul className="flex flex-wrap items-center gap-x-10 gap-y-5">
        {clients.map((c) => (
          <li key={c.name}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.logo}
              alt={`${c.name} logo`}
              width={130}
              height={20}
              className="h-5 w-auto max-w-[130px] object-contain opacity-40 transition-opacity duration-300 ease-premium hover:opacity-100"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
