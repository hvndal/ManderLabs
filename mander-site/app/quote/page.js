import Quiz from '@/components/Quiz';
import Reveal from '@/components/Reveal';
import WhatsAppCta from '@/components/WhatsAppCta';
import { getServerMarket } from '@/lib/market-server';
import { OG_IMAGE, alternates } from '@/lib/seo';

export async function generateMetadata() {
  const { quote } = getServerMarket().meta;

  return {
    title: quote.title,
    description: quote.description,
    alternates: alternates('/quote'),
    openGraph: {
      title: quote.title,
      description: quote.description,
      url: '/quote',
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: quote.title,
      description: quote.description,
      images: [OG_IMAGE.url],
    },
  };
}

export default function QuotePage() {
  const { quiz } = getServerMarket();

  return (
    <section className="min-h-[80vh] overflow-x-hidden border-b border-line bg-paper">
      <div className="container-max py-stack-md">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <span className="eyebrow justify-center">{quiz.intro.eyebrow}</span>
          <h1 className="h-section">{quiz.intro.title}</h1>
          <p className="mt-5 text-body-lg text-ink-soft">{quiz.intro.body}</p>
          {/* India only: skipping the quiz entirely and messaging a person is
              the faster route for a lot of visitors, and hiding that behind
              six questions loses them. */}
          <WhatsAppCta tone="outline" className="mt-8" location="quote-intro" />
        </Reveal>

        <Quiz />
      </div>
    </section>
  );
}
