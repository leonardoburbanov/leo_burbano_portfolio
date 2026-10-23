import { allPosts } from "content-collections";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import { ArrowLeft } from 'lucide-react';
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from '@/i18n/routing';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

type BlogPost = {
  title: string;
  title_es?: string;
  summary: string;
  summary_es?: string;
  date: string;
  author?: string;
  tags?: string[];
  tags_es?: string[];
  locale?: string;
  slug?: string;
  mdx: unknown;
  _meta: {
    path: string;
  };
  [key: string]: unknown;
};

export async function generateStaticParams() {
  // Get unique slugs from all posts
  const slugs = new Set<string>();
  allPosts.forEach((post: BlogPost) => {
    const slug = post.slug || post._meta.path.replace(/\.(en|es)$/, '');
    slugs.add(slug);
  });
  
  // Generate params for each locale and slug combination
  const params: Array<{locale: string; slug: string}> = [];
  ['en', 'es'].forEach((locale) => {
    slugs.forEach((slug) => {
      params.push({locale, slug});
    });
  });
  
  return params;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTranslations('Blog');
  const locale = await getLocale();

  // Helper function to extract slug from post
  const getPostSlug = (p: BlogPost): string => {
    if (p.slug) return p.slug;
    const path = p._meta.path || '';
    return path.replace(/\.(en|es)$/, '');
  };

  // Find post matching slug and locale
  // First, try to find post in current locale
  let post = allPosts.find((p: BlogPost) => {
    const postSlug = getPostSlug(p);
    // Get locale from post - it should be set by content-collections transform
    const postLocale = p.locale || 'en';
    
    // Match both slug and locale exactly
    return postSlug === slug && postLocale === locale;
  });

  // If not found in current locale and we're not in English, fallback to English
  if (!post && locale !== 'en') {
    post = allPosts.find((p: BlogPost) => {
      const postSlug = getPostSlug(p);
      const postLocale = p.locale || 'en';
      return postSlug === slug && postLocale === 'en';
    });
  }
  
  // If still not found and we're in English, try to find any post with this slug
  if (!post && locale === 'en') {
    post = allPosts.find((p: BlogPost) => {
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
  const getLocalizedField = (field: 'title' | 'summary' | 'tags'): string | string[] | undefined => {
    const postWithIndex = post as unknown as BlogPost & { [key: string]: string | string[] | undefined };
    if (locale === 'es' && postWithIndex[`${field}_es`]) {
      return postWithIndex[`${field}_es`];
    }
    return postWithIndex[field];
  };

  return (
    <>
      <NavBar />
      <main className="min-h-screen pt-32 pb-28">
        <div className="mx-auto max-w-[760px] px-5">
          <Link href="/blog" className="link-chevron text-[15px]">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t('backToBlog')}
          </Link>

          <article className="mt-10">
            <header className="mb-12 border-b border-border pb-10">
              <h1 className="display text-[clamp(2.5rem,6vw,4rem)]">{getLocalizedField('title') as string}</h1>
              {getLocalizedField('summary') && (
                <p className="lead mt-6">{getLocalizedField('summary') as string}</p>
              )}
              <p className="mt-6 text-[15px] text-muted-foreground">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                {post.author && <> · {post.author}</>}
                {(() => {
                  const tags = (getLocalizedField('tags') as string[] | undefined) || post.tags || [];
                  return tags.length > 0 ? <> · {tags.join(', ')}</> : null;
                })()}
              </p>
            </header>

            <div className="prose max-w-none">
              <MDXContent code={post.mdx} />
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}

