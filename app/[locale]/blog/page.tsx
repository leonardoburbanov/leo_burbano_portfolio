import { allPosts } from "content-collections";
import { Calendar, User, Tag } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from '@/i18n/routing';
import NavBar from "@/components/NavBar";

export default async function BlogPage() {
  const t = await getTranslations('Blog');
  const locale = await getLocale();
  
  // Helper function to extract slug from post
  const getPostSlug = (post: any): string => {
    // First try to use the slug from frontmatter
    if (post.slug) {
      return post.slug;
    }
    // Otherwise extract from path
    const path = post._meta.path || '';
    // Remove .es or .en suffix (path doesn't include .mdx)
    return path.replace(/\.(en|es)$/, '');
  };
  
  // Filter posts by locale and get unique posts by slug
  // Prefer posts in current locale, fallback to English
  const postsBySlug = new Map<string, any>();
  
  // First pass: add posts in current locale
  allPosts.forEach((post: any) => {
    // Ensure we have a valid locale (default to 'en' if not set)
    const postLocale = (post.locale && (post.locale === 'en' || post.locale === 'es')) 
      ? post.locale 
      : 'en';
    const postSlug = getPostSlug(post);
    
    // Only add if it matches current locale exactly
    if (postLocale === locale) {
      postsBySlug.set(postSlug, post);
    }
  });
  
  // Second pass: add English posts as fallback for missing slugs (only if locale is not 'en')
  if (locale !== 'en') {
    allPosts.forEach((post: any) => {
      const postLocale = post.locale || 'en';
      const postSlug = getPostSlug(post);
      
      // Only add English posts if we don't already have this slug
      if (postLocale === 'en' && !postsBySlug.has(postSlug)) {
        postsBySlug.set(postSlug, post);
      }
    });
  }
  
  // Helper function to get localized field
  const getLocalizedField = (post: any, field: string) => {
    if (locale === 'es' && post[`${field}_es`]) {
      return post[`${field}_es`];
    }
    return post[field];
  };
  
  // Convert map to array and sort by date (newest first)
  const sortedPosts = Array.from(postsBySlug.values()).sort((a: any, b: any) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-20 pb-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('description')}
            </p>
          </div>

          <div className="space-y-8">
            {sortedPosts.map((post) => {
              const postSlug = getPostSlug(post);
              return (
              <article
                key={postSlug}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <Link href={`/blog/${postSlug}`}>
                  <h2 className="text-2xl font-semibold text-foreground mb-3 hover:text-primary transition-colors">
                    {getLocalizedField(post, 'title')}
                  </h2>
                </Link>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {getLocalizedField(post, 'summary')}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
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
                    const tags = getLocalizedField(post, 'tags') || post.tags || [];
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

                <Link
                  href={`/blog/${postSlug}`}
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  {t('readMore')} →
                </Link>
              </article>
              );
            })}
          </div>

          {sortedPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t('noPosts')}</p>
            </div>
          )}
        </div>
        </div>
      </div>
    </>
  );
}

