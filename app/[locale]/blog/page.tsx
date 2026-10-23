import { ChevronRight } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from '@/i18n/routing';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { getLocalizedPosts } from "@/lib/posts";

export default async function BlogPage() {
  const t = await getTranslations('Blog');
  const locale = await getLocale();
  
  const sortedPosts = getLocalizedPosts(locale);

  return (
    <>
      <NavBar />
      <main className="min-h-screen pt-32 pb-28">
        <div className="mx-auto max-w-[1080px] px-5">
          <h1 className="display text-[clamp(3rem,8vw,5.5rem)]">{t('title')}</h1>
          <p className="lead mt-6 max-w-2xl">{t('description')}</p>

          <ul className="mt-16">
            {sortedPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-3 border-t border-border py-10 md:grid-cols-[180px_minmax(0,1fr)_auto] md:gap-10"
                >
                  <time dateTime={post.date} className="tabular text-[15px] text-muted-foreground md:pt-1.5">
                    {new Date(post.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                  <div>
                    <h2 className="text-[clamp(1.5rem,2.8vw,2.1rem)] font-semibold tracking-[-0.025em] leading-tight transition-colors group-hover:text-blue-400">
                      {post.title}
                    </h2>
                    <p className="mt-3 max-w-[62ch] text-[17px] leading-relaxed text-muted-foreground">{post.summary}</p>
                    {post.tags.length > 0 && (
                      <p className="mt-4 text-[15px] text-muted-foreground">{post.tags.join('  ·  ')}</p>
                    )}
                  </div>
                  <ChevronRight
                    className="hidden h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 md:mt-2 md:block"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>

          {sortedPosts.length === 0 && <p className="border-t border-border py-12 text-muted-foreground">{t('noPosts')}</p>}
        </div>
      </main>
      <Footer />
    </>
  );
}

