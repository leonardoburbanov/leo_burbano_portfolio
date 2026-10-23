import { ArrowRight } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getLocalizedPosts } from '@/lib/posts';

export default async function LatestPostsSection() {
  const locale = await getLocale();
  const t = await getTranslations('LatestPosts');
  const posts = getLocalizedPosts(locale).slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="writing" className="py-20 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-10 leading-tight">
            {t('title')}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <time dateTime={post.date} className="text-sm text-muted-foreground">
                  {new Date(post.date).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })}
                </time>
                <h3 className="text-lg font-semibold text-foreground mt-2 mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{post.summary}</p>
              </Link>
            ))}
          </div>
          <Link href="/blog" className="inline-flex items-center gap-2 mt-8 font-medium text-foreground hover:opacity-80 transition-opacity">
            {t('allPosts')}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
