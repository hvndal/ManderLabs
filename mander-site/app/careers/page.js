import Link from 'next/link';
import Section, { SectionHeading } from '@/components/Section';
import Reveal from '@/components/Reveal';
import Statement from '@/components/Statement';
import Icon from '@/components/Icon';
import GridField from '@/components/GridField';
import PageHeader from '@/components/PageHeader';
import Faq from '@/components/Faq';
import ProcessTimeline from '@/components/ProcessTimeline';
import { CAREERS, BRAND } from '@/lib/content';
import { OG_IMAGE, alternates } from '@/lib/seo';

const TITLE = 'Careers — Design & Development Roles at MANDER';
const DESCRIPTION =
  'Design, front-end, Android and SEO roles at a small remote studio building for small business in Canada and the U.S.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: alternates('/careers'),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/careers',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

// Every route into the inbox goes through here, so a subject line is never
// left to chance — an application for a named discipline arrives already
// filed as one.
const applyMailto = (role) =>
  `mailto:${BRAND.email}?subject=${encodeURIComponent(
    role ? `Application — ${role}` : 'Application — MANDER'
  )}`;

// 'open' is a live vacancy; 'rolling' means we take applications for the
// discipline without promising a seat. 'closed' never reaches the page.
const STATUS = {
  open: { label: 'Now hiring', className: 'bg-accent text-on-accent' },
  rolling: { label: 'Applications open', className: 'border border-line-strong text-ink-mute' },
};

function RoleCard({ role }) {
  const status = STATUS[role.status] || STATUS.rolling;

  return (
    <Reveal className="flex h-full flex-col bg-white p-7 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="label-caps text-ink-mute">{role.discipline}</span>
          <h3 className="mt-2.5 text-headline-md text-ink">{role.title}</h3>
        </div>
        <span className={`label-caps shrink-0 px-2 py-1 text-[10px] ${status.className}`}>
          {status.label}
        </span>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3 border-y border-line py-4">
        <div>
          <dt className="label-caps text-[10px] text-ink-mute">Type</dt>
          <dd className="mt-1.5 text-label-sm font-medium text-ink">{role.type}</dd>
        </div>
        <div>
          <dt className="label-caps text-[10px] text-ink-mute">Location</dt>
          <dd className="mt-1.5 text-label-sm font-medium text-ink">{role.location}</dd>
        </div>
      </dl>

      <p className="mt-5 text-body-md text-ink-soft">{role.blurb}</p>

      <div className="mt-7 grid grid-cols-1 gap-7 sm:grid-cols-2">
        <div>
          <span className="label-caps mb-3 block text-ink-mute">What you&apos;d do</span>
          <ul className="flex flex-col gap-2.5">
            {role.doing.map((d) => (
              <li key={d} className="flex items-start gap-2.5">
                <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink" strokeWidth={2} />
                <span className="text-body-md text-ink-soft">{d}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="label-caps mb-3 block text-ink-mute">What we look for</span>
          <ul className="flex flex-col gap-2.5">
            {role.looking.map((l) => (
              <li key={l} className="flex items-start gap-2.5">
                <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink" strokeWidth={2} />
                <span className="text-body-md text-ink-soft">{l}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <a href={applyMailto(role.title)} className="group/apply mt-8 flex items-center gap-3 self-start">
        <span
          aria-hidden="true"
          className="h-px w-6 origin-left bg-accent transition-transform duration-500 ease-premium group-hover/apply:scale-x-150"
        />
        <span className="label-caps text-ink transition-colors duration-300 group-hover/apply:text-accent">
          Email us about {role.title}
        </span>
      </a>
    </Reveal>
  );
}

export default function CareersPage() {
  const roles = CAREERS.roles.filter((r) => r.status !== 'closed');
  const openings = roles.filter((r) => r.status === 'open').length;

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <PageHeader
        meta={['Careers', 'Remote studio', openings > 0 ? 'Open roles' : 'Rolling applications']}
        eyebrow={CAREERS.intro.eyebrow}
        title={CAREERS.intro.title}
        lede={
          <>
            <p>{CAREERS.intro.body}</p>
            {/* Says plainly whether there is a seat today. A careers page that
                implies vacancies it doesn't have wastes the candidate's
                evening and costs more goodwill than the application was
                worth. */}
            <p className="text-label-sm text-ink-mute">
              {openings > 0
                ? `${openings} role${openings > 1 ? 's' : ''} actively hiring. `
                : 'No specific vacancy open this minute. '}
              We hire in bursts rather than continuously — applications for every
              discipline below are read and kept on file.
            </p>
          </>
        }
        actions={
          <a href="#apply" className="btn-primary">
            Apply now
            <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
          </a>
        }
      />

      {/* ------------------------------------------------------ What it's like */}
      <Section tone="alt">
        <SectionHeading
          eyebrow="How we work"
          title="A small studio, run deliberately."
          body="Four things that are true of the work here, all of them downstream of how the studio sells rather than how it likes to describe itself."
        />

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
          {CAREERS.culture.map((item) => (
            <Reveal key={item.title} className="bg-paper-2">
              <div className="flex h-full flex-col p-7 md:p-8">
                <h3 className="text-headline-md text-ink">{item.title}</h3>
                <p className="mt-3 text-body-md text-ink-soft">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Statement
        eyebrow="On hiring"
        text="We pay for the test project. Asking people to work for free filters for who can afford it, not who is good."
        tone="paper"
      />

      {/* --------------------------------------------------------------- Roles */}
      <Section id="roles" tone="white">
        <SectionHeading
          eyebrow="Disciplines"
          title="What we hire for."
          body="These are the four disciplines the studio is built on. Apply against one of them, or send an open application if you do something adjacent and think we should know about it."
        />

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line lg:grid-cols-2">
          {roles.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------- Process */}
      <Section tone="alt">
        <SectionHeading
          eyebrow="What happens next"
          title="The hiring process, in four steps."
          body="No take-home marathons, no rounds of panel interviews, and no silence at the end of it."
        />
        <div className="mt-16">
          <ProcessTimeline steps={CAREERS.process} />
        </div>
      </Section>

      {/* --------------------------------------------------------------- Apply */}
      {/* No form. One address, and a list of what to put in the email — which
          is the only thing a form was doing better than a mailto anyway. */}
      <Section id="apply" tone="paper">
        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Apply"
              title="Send us an email."
              body="That is the whole process. No form, no portal, no account to create — just a message to a person who reads it."
            />
            <Reveal delay={120}>
              <p className="mt-8 border-l-2 border-accent/40 pl-4 text-body-md text-ink-soft">
                <span className="label-caps mb-1.5 block text-ink-mute">One promise</span>
                A person reads every application and replies within a week —
                including when the answer is no.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="border border-line bg-white p-7 md:p-10">
                <span className="label-caps text-ink-mute">Applications to</span>

                {/* The address set as the largest thing in the block. It is the
                    call to action, so it should not be a line of body copy with
                    a link in it. */}
                <a
                  href={applyMailto()}
                  className="group/mail mt-3 flex flex-wrap items-baseline gap-x-3 text-ink"
                >
                  <span className="text-stat-md break-all transition-colors duration-300 group-hover/mail:text-accent">
                    {BRAND.email}
                  </span>
                  <Icon
                    name="arrow"
                    className="h-4 w-4 shrink-0 translate-y-[-2px] opacity-0 transition-all duration-300 group-hover/mail:translate-x-1 group-hover/mail:opacity-100"
                    strokeWidth={2}
                  />
                </a>
                <span
                  aria-hidden="true"
                  className="mt-4 block h-px w-full origin-left bg-line"
                />

                <span className="label-caps mt-8 block text-ink-mute">
                  What to put in it
                </span>
                <ul className="mt-4 flex flex-col gap-3">
                  {CAREERS.applyWith.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Icon
                        name="check"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink"
                        strokeWidth={2}
                      />
                      <span className="text-body-md text-ink-soft">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <a href={applyMailto()} className="btn-primary">
                    Email your application
                    <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />
                  </a>
                  <span className="text-label-sm text-ink-mute">
                    Attach a CV, or just send links.
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ----------------------------------------------------------------- FAQ */}
      <Section tone="white">
        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Questions" title="Before you apply." />
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <Faq items={CAREERS.faqs} />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------ Final CTA */}
      <section className="bg-ink text-paper">
        <div className="container-max py-stack-lg text-center">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="font-display text-headline-lg-mobile font-normal md:text-display-lg">
              Not sure you fit? Apply anyway.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-body-lg text-paper/70">
              Most of the team arrived through an application that did not match
              an opening at the time.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="#apply" className="btn-on-dark">
                Send an application
              </a>
              <a
                href={`mailto:${BRAND.email}?subject=${encodeURIComponent('Careers question')}`}
                className="label-caps inline-flex items-center justify-center gap-2 border border-paper/40 px-8 py-4 text-paper transition-colors duration-300 hover:border-paper"
              >
                Ask a question first
              </a>
            </div>
            <p className="mt-10 text-label-sm text-paper/45">
              Looking for a website instead?{' '}
              <Link href="/pricing" className="underline underline-offset-4 hover:text-paper">
                See pricing
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
