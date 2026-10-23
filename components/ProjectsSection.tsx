import { Github, ExternalLink, ArrowRight, Presentation, Hourglass } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import SpotlightCard from '@/components/motion/SpotlightCard';
import { projects } from '@/data/projects';
import { socialLinks } from '@/lib/site';

const secondaryButton =
  'inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full hover:bg-accent transition-colors border border-border text-sm font-medium';
const primaryButton =
  'inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors text-sm font-medium';

export default function ProjectsSection() {
  const t = useTranslations('ProjectsSection');

  return (
    <section id="projects" className="relative py-24 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal key={project.id} delay={index * 100}>
                <SpotlightCard className="flex h-full flex-col p-6">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold text-foreground">{t(`projects.${project.id}.title`)}</h3>
                    {project.comingSoon && (
                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        <Hourglass className="h-3 w-3" aria-hidden="true" />
                        {t('buttons.comingSoon')}
                      </span>
                    )}
                  </div>
                  <p className="mb-5 text-muted-foreground leading-relaxed">{t(`projects.${project.id}.description`)}</p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border/60 bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
                        <Github className="w-4 h-4" />
                        {project.frontendGithubUrl ? t('buttons.backend') : t('buttons.code')}
                      </a>
                    )}
                    {project.frontendGithubUrl && (
                      <a href={project.frontendGithubUrl} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
                        <Github className="w-4 h-4" />
                        {t('buttons.frontend')}
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={primaryButton}>
                        <ExternalLink className="w-4 h-4" />
                        {t('buttons.liveDemo')}
                      </a>
                    )}
                    {project.presentationPath && (
                      <Link href={project.presentationPath} className={secondaryButton}>
                        <Presentation className="w-4 h-4" />
                        {t('buttons.presentation')}
                      </Link>
                    )}
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-medium text-foreground"
            >
              {t('buttons.viewMore')}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
