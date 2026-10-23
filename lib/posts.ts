import { allPosts } from 'content-collections';

type Post = (typeof allPosts)[number];

export type LocalizedPost = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  author?: string;
  tags: string[];
};

// One post per slug in the given locale, falling back to English, newest first.
export function getLocalizedPosts(locale: string): LocalizedPost[] {
  const bySlug = new Map<string, Post>();
  for (const post of allPosts) {
    if (post.locale === locale) bySlug.set(post.slug, post);
  }
  if (locale !== 'en') {
    for (const post of allPosts) {
      if (post.locale === 'en' && !bySlug.has(post.slug)) bySlug.set(post.slug, post);
    }
  }

  const useEs = locale === 'es';
  return Array.from(bySlug.values())
    .map((post) => ({
      slug: post.slug,
      title: (useEs && post.title_es) || post.title,
      summary: (useEs && post.summary_es) || post.summary,
      date: post.date,
      author: post.author,
      tags: (useEs && post.tags_es) || post.tags || [],
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
