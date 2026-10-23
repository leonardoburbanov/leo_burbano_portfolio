import { ChevronRight } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import { getLocalizedPosts } from '@/lib/posts';

export default async function LatestPostsSection() {
  const locale = await getLocale();
  const t = await getTranslations('LatestPosts');
  const posts = getLocalizedPosts(locale).slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="writing" className="relative py-20 sm:py-28 scroll-mt-12">
      <div className="mx-auto max-w-[1080px] px-5">
        <SectionHeading title={t('title')} />
        <ul>
          {posts.map((post, index) => (
            <Reveal as="li" key={post.slug} delay={index * 90}>
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-3 border-t border-border py-9 md:grid-cols-[180px_minmax(0,1fr)_auto] md:gap-10"
              >
                <time dateTime={post.date} className="tabular text-[15px] text-muted-foreground md:pt-1">
                  {new Date(post.date).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })}
                </time>
                <div>
                  <h3 className="text-[clamp(1.35rem,2.4vw,1.75rem)] font-semibold tracking-[-0.02em] leading-snug transition-colors group-hover:text-blue-400">
                    {post.title}
                  </h3>
                  <p className="mt-2 max-w-[60ch] text-[17px] leading-relaxed text-muted-foreground">{post.summary}</p>
                </div>
                <ChevronRight
                  className="hidden h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 md:block md:mt-2"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          ))}
        </ul>
        <Reveal className="border-t border-border pt-8">
          <Link href="/blog" className="link-chevron text-[17px]">
            {t('allPosts')}
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
