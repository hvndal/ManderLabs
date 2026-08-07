import Quiz from '@/components/Quiz';
import Reveal from '@/components/Reveal';
import { QUIZ } from '@/lib/content';

export const metadata = {
  title: 'Get a Quote — Fast Website Design, Custom Priced',
  description:
    'Answer six quick questions and get a recommended plan and starting price for a custom, budget-friendly website — or route straight to a person.',
  alternates: {
    canonical: '/quote',
  },
};

export default function QuotePage() {
  return (
    <section className="min-h-[80vh] border-b border-line bg-paper">
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
