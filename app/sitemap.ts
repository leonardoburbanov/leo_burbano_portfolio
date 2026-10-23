import type { MetadataRoute } from 'next';
import { allPosts } from 'content-collections';
import { routing } from '@/i18n/routing';
import { localizedUrl } from '@/lib/site';

const staticPaths = ['/', '/blog', '/events', '/projects/gemini-enterprise-sales-agent'];

export default function sitemap(): MetadataRoute.Sitemap {
  const postPaths = Array.from(new Set(allPosts.map((post) => `/blog/${post.slug}`)));

  return [...staticPaths, ...postPaths].map((path) => ({
    url: localizedUrl(routing.defaultLocale, path),
    changeFrequency: path === '/' ? 'monthly' : 'yearly',
    priority: path === '/' ? 1 : 0.6,
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, localizedUrl(l, path)])),
    },
  }));
}
