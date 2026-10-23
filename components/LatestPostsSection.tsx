import { ArrowRight } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import SpotlightCard from '@/components/motion/SpotlightCard';
import { getLocalizedPosts } from '@/lib/posts';

export default async function LatestPostsSection() {
  const locale = await getLocale();
  const t = await getTranslations('LatestPosts');
  const posts = getLocalizedPosts(locale).slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="writing" className="relative py-24 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />
          <div className="grid gap-5 md:grid-cols-3">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 100}>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <SpotlightCard className="h-full p-6">
                    <time dateTime={post.date} className="text-sm text-muted-foreground">
                      {new Date(post.date).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </time>
                    <h3 className="mt-2 mb-2 text-lg font-semibold text-foreground">{post.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{post.summary}</p>
                  </SpotlightCard>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <Link href="/blog" className="group inline-flex items-center gap-2 font-medium text-foreground">
              {t('allPosts')}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
