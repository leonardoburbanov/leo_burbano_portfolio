import { ArrowUpRight, LinkedinIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import SpotlightCard from '@/components/motion/SpotlightCard';
import { linkedinPosts, type LinkedInPost } from '@/data/linkedin-posts';
import { socialLinks } from '@/lib/site';

function toEmbedUrl(post: LinkedInPost): string | null {
  if (post.embedUrl) return post.embedUrl;
  const urn = post.url.match(/urn:li:(share|ugcPost|activity):(\d+)/);
  if (urn) return `https://www.linkedin.com/embed/feed/update/urn:li:${urn[1]}:${urn[2]}`;
  const activity = post.url.match(/activity-(\d+)/);
  if (activity) return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activity[1]}`;
  return null;
}

export default function LinkedInPostsSection() {
  const t = useTranslations('LinkedInPosts');

  if (linkedinPosts.length === 0) return null;

  return (
    <section id="linkedin" className="relative py-24 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />

          <div className="grid gap-6 md:grid-cols-2">
            {linkedinPosts.map((post, index) => {
              const embed = toEmbedUrl(post);
              return (
                <Reveal key={post.url} delay={index * 120}>
                  {embed ? (
                    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                      <iframe
                        src={embed}
                        title={`${t('title')} ${index + 1}`}
                        loading="lazy"
                        className="block h-[560px] w-full"
                        allowFullScreen
                      />
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between border-t border-border px-5 py-3 text-sm font-medium text-foreground hover:bg-accent transition-colors"
                      >
                        {t('viewPost')}
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                  ) : (
                    <a href={post.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
                      <SpotlightCard className="flex h-full min-h-56 flex-col justify-between gap-8 p-6 sm:p-8">
                        <div>
                          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#0a66c2] px-3 py-1 text-xs font-semibold text-white">
                            <LinkedinIcon className="h-3.5 w-3.5" aria-hidden="true" />
                            LinkedIn
                          </span>
                          <h3 className="text-xl font-semibold text-foreground">
                            {post.excerpt ?? t('cardTitle')}
                          </h3>
                        </div>
                        <span className="inline-flex items-center gap-2 font-medium text-foreground">
                          {t('cardCta')}
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                        </span>
                      </SpotlightCard>
                    </a>
                  )}
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-8">
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              <LinkedinIcon className="h-4 w-4" aria-hidden="true" />
              {t('follow')}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
