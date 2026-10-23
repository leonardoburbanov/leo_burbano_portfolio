import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import { projects } from '@/data/projects';
import { socialLinks } from '@/lib/site';

export default function ProjectsSection() {
  const t = useTranslations('ProjectsSection');

  return (
    <section id="projects" className="relative py-20 sm:py-28 scroll-mt-12">
      <div className="mx-auto max-w-[1080px] px-5">
        <SectionHeading title={t('title')} description={t('description')} />

        <ul>
          {projects.map((project, index) => {
            const links = [
              project.liveUrl && { href: project.liveUrl, label: t('buttons.liveDemo') },
              project.presentationPath && { href: project.presentationPath, label: t('buttons.presentation'), internal: true },
              project.githubUrl && {
                href: project.githubUrl,
                label: project.frontendGithubUrl ? t('buttons.backend') : t('buttons.code'),
              },
              project.frontendGithubUrl && { href: project.frontendGithubUrl, label: t('buttons.frontend') },
            ].filter(Boolean) as { href: string; label: string; internal?: boolean }[];

            return (
              <Reveal as="li" key={project.id} delay={index * 90}>
                <article className="grid gap-6 border-t border-border py-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
                  <div>
                    <h3 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold tracking-[-0.03em] leading-[1.05]">
                      {t(`projects.${project.id}.title`)}
                    </h3>
                    {project.comingSoon && <p className="mt-3 text-[15px] text-muted-foreground">{t('buttons.comingSoon')}</p>}
                  </div>
                  <div>
                    <p className="max-w-[58ch] text-[19px] leading-relaxed text-foreground/85">
                      {t(`projects.${project.id}.description`)}
                    </p>
                    <p className="mt-5 text-[15px] text-muted-foreground">{project.technologies.join('  ·  ')}</p>
                    {links.length > 0 && (
                      <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
                        {links.map(({ href, label, internal }) => {
                          const content = (
                            <>
                              {label}
                              <ChevronRight className="h-4 w-4" aria-hidden="true" />
                            </>
                          );
                          return internal ? (
                            <Link key={href} href={href} className="link-chevron text-[17px]">
                              {content}
                            </Link>
                          ) : (
                            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="link-chevron text-[17px]">
                              {content}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="border-t border-border pt-8">
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="link-chevron text-[17px]">
            {t('buttons.viewMore')}
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
