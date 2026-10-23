import Image from 'next/image';
import { ChevronRight, LinkedinIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import { linkedinPosts } from '@/data/linkedin-posts';
import { socialLinks } from '@/lib/site';

export default function LinkedInPostsSection() {
  const t = useTranslations('LinkedInPosts');

  if (linkedinPosts.length === 0) return null;

  return (
    <section id="linkedin" className="relative py-20 sm:py-28 scroll-mt-12">
      <div className="mx-auto max-w-[1080px] px-5">
        <div>
          <SectionHeading title={t('title')} />

          <div className="grid gap-6 md:grid-cols-2">
            {linkedinPosts.map((post, index) => (
              <Reveal key={post.url} delay={index * 120} className="h-full">
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#e0dfdc] bg-white text-[#191919] dark:border-white/10 dark:bg-[#1b1f23] dark:text-white/90 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start gap-3 p-4 pb-2">
                    <Image src="/foto_white.png" alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold leading-tight">Leonardo Burbano</p>
                      <p className="truncate text-xs text-[#666] dark:text-white/60">{t('headline')}</p>
                    </div>
                    <LinkedinIcon className="h-5 w-5 shrink-0 text-[#0a66c2]" aria-hidden="true" />
                  </div>
                  <p className="px-4 text-sm leading-relaxed line-clamp-3">{post.text}</p>
                  <p className="px-4 pb-3 text-sm text-[#666] dark:text-white/60">{t('more')}</p>
                  <Image
                    src={post.images[0]}
                    alt=""
                    width={800}
                    height={800}
                    sizes="(min-width: 768px) 600px, 100vw"
                    className={`w-full object-cover ${post.images.length > 1 ? 'h-72' : 'h-[386px] flex-1'}`}
                  />
                  {post.images.length > 1 && (
                    <div className="mt-0.5 grid grid-cols-3 gap-0.5">
                      {post.images.slice(1, 4).map((src) => (
                        <Image key={src} src={src} alt="" width={400} height={400} sizes="200px" className="h-24 w-full object-cover" />
                      ))}
                    </div>
                  )}
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="link-chevron text-[17px]">
              {t('follow')}
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
