import { allPosts } from "content-collections";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import Link from "next/link";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import NavBar from "@/components/NavBar";

export async function generateStaticParams() {
  // Get unique slugs from all posts
  const slugs = new Set<string>();
  allPosts.forEach((post: any) => {
    const slug = post.slug || post._meta.path.replace(/\.(en|es)?\.mdx$/, '');
    slugs.add(slug);
  });
  
  return Array.from(slugs).map((slug) => ({
    slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTranslations('Blog');
  const locale = await getLocale();

  // Helper function to extract slug from post
  const getPostSlug = (p: any): string => {
    if (p.slug) return p.slug;
    const path = p._meta.path || '';
    return path.replace(/\.(en|es)?\.mdx$/, '').replace(/\.mdx$/, '');
  };

  // Find post matching slug and locale
  // First, try to find post in current locale
  let post = allPosts.find((p: any) => {
    const postSlug = getPostSlug(p);
    // Get locale from post - it should be set by content-collections transform
    const postLocale = p.locale || 'en';
    
    // Match both slug and locale exactly
    return postSlug === slug && postLocale === locale;
  });

  // If not found in current locale and we're not in English, fallback to English
  if (!post && locale !== 'en') {
    post = allPosts.find((p: any) => {
      const postSlug = getPostSlug(p);
      const postLocale = p.locale || 'en';
      return postSlug === slug && postLocale === 'en';
    });
  }
  
  // If still not found and we're in English, try to find any post with this slug (shouldn't happen)
  if (!post && locale === 'en') {
    post = allPosts.find((p: any) => {
      const postSlug = getPostSlug(p);
      const postLocale = p.locale || 'en';
      // Only get English posts
      return postSlug === slug && postLocale === 'en';
    });
  }

  if (!post) {
    notFound();
  }

  // Helper function to get localized field
  const getLocalizedField = (field: string) => {
    const postAny = post as any;
    if (locale === 'es' && postAny[`${field}_es`]) {
      return postAny[`${field}_es`];
    }
    return postAny[field];
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-20 pb-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('backToBlog')}</span>
          </Link>

          {/* Article header */}
          <article className="bg-card border border-border rounded-xl p-8 lg:p-12">
            <header className="mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4">
                {getLocalizedField('title')}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(locale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                
                {post.author && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                )}

                {(() => {
                  const tags = getLocalizedField('tags') || post.tags || [];
                  return tags.length > 0 ? (
                    <div className="flex items-center gap-2 flex-wrap">
                      <Tag className="w-4 h-4" />
                      <div className="flex gap-2 flex-wrap">
                        {tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium border border-border/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>

              {getLocalizedField('summary') && (
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {getLocalizedField('summary')}
                </p>
              )}
            </header>

            {/* Article content */}
            <div className="prose prose-invert max-w-none">
              <MDXContent code={post.mdx} />
            </div>
          </article>

          {/* Navigation */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-accent transition-colors border border-border"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('backToBlog')}</span>
            </Link>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

