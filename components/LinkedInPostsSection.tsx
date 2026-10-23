import { ArrowUpRight, LinkedinIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
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
  const posts = linkedinPosts
    .map((post) => ({ post, embed: toEmbedUrl(post) }))
    .filter((entry): entry is { post: LinkedInPost; embed: string } => entry.embed !== null);

  if (posts.length === 0) return null;

  return (
    <section id="linkedin" className="relative py-24 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />

          <div className="grid gap-6 md:grid-cols-2">
            {posts.map(({ post, embed }, index) => (
              <Reveal key={post.url} delay={index * 120}>
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
              </Reveal>
            ))}
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
