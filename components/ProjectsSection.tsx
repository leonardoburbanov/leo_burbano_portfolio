import { Github, ExternalLink, ArrowRight, Presentation } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { projects } from '@/data/projects';

export default function ProjectsSection() {
  const t = useTranslations('ProjectsSection');

  return (
    <section id="projects" className="py-20 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4 leading-tight">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              {/* Project header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {t(`projects.${project.id}.title`)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`projects.${project.id}.description`)}
                  </p>
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium border border-border/50 hover:bg-accent transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Project links */}
              <div className="flex flex-wrap gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-accent transition-colors border border-border"
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {project.frontendGithubUrl ? t('buttons.backend') : t('buttons.code')}
                    </span>
                  </a>
                )}
                {project.frontendGithubUrl && (
                  <a
                    href={project.frontendGithubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-accent transition-colors border border-border"
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-sm font-medium">{t('buttons.frontend')}</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {project.frontendLiveUrl ? t('buttons.backend') : t('buttons.liveDemo')}
                    </span>
                  </a>
                )}
                {project.frontendLiveUrl && (
                  <a
                    href={project.frontendLiveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">{t('buttons.frontend')}</span>
                  </a>
                )}
                {project.presentationPath && (
                  <Link
                    href={project.presentationPath}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-accent transition-colors border border-border"
                  >
                    <Presentation className="w-4 h-4" />
                    <span className="text-sm font-medium">{t('buttons.presentation')}</span>
                  </Link>
                )}
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* View more projects CTA */}
        <div className="max-w-5xl mx-auto mt-8">
          <a
            href="https://github.com/leonardoburbanov"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-accent transition-colors border border-border"
          >
            <span className="font-medium">{t('buttons.viewMore')}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
} 