import Quiz from '@/components/Quiz';
import Reveal from '@/components/Reveal';
import { QUIZ } from '@/lib/content';
import { OG_IMAGE, alternates } from '@/lib/seo';

const TITLE = 'Get a Quote — Fast Website Design, Custom Priced';
const DESCRIPTION =
  'Answer six quick questions and get a recommended plan and starting price for a custom, budget-friendly website — or route straight to a person.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: alternates('/quote'),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/quote',
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

export default function QuotePage() {
  return (
    <section className="min-h-[80vh] overflow-x-hidden border-b border-line bg-paper">
      <div className="container-max py-stack-md">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <span className="eyebrow justify-center">{QUIZ.intro.eyebrow}</span>
          <h1 className="h-section">{QUIZ.intro.title}</h1>
          <p className="mt-5 text-body-lg text-ink-soft">{QUIZ.intro.body}</p>
        </Reveal>

        <Quiz />
      </div>
    </section>
  );
}
