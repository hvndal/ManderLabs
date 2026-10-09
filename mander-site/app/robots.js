import { SITE_URL } from '@/lib/seo';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'anthropic-ai',
          'PerplexityBot',
          'Google-Extended',
          'Applebot',
          'Applebot-Extended',
          'cohere-ai',
          'CCBot',
          'Bingbot',
        ],
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: 'www.mander.tech',
  };
}
