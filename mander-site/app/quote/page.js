import Quiz from '@/components/Quiz';
import Reveal from '@/components/Reveal';
import WhatsAppCta from '@/components/WhatsAppCta';
import PageHeader from '@/components/PageHeader';
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
  const market = getServerMarket();
  const { quiz } = market;

  return (
    <>
      <PageHeader
        meta={['Quote', market.region, '60 seconds']}
        eyebrow={quiz.intro.eyebrow}
        title={quiz.intro.title}
        lede={<p>{quiz.intro.body}</p>}
        actions={
          /* India only: skipping the quiz and messaging a person is the
             faster route for a lot of visitors, and hiding that behind six
             questions loses them. */
          <WhatsAppCta tone="outline" location="quote-intro" />
        }
      />

      <section className="overflow-x-hidden border-b border-line bg-paper">
        <div className="container-max py-stack-md">
          <Quiz />
        </div>
      </section>
    </>
  );
}
