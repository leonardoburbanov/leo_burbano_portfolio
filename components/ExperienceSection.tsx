import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { experience } from '@/data/experience';
import { socialLinks } from '@/lib/site';

export default function ExperienceSection() {
  const t = useTranslations('Experience');

  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-background to-muted/20 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-12 leading-tight">
            {t('title')}
          </h2>

          <ol className="relative border-l border-border ml-3 space-y-10 max-w-3xl">
            {experience.map((job) => (
              <li key={job.id} className="pl-8 relative">
                <span aria-hidden="true" className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full bg-foreground/70 ring-4 ring-background" />
                <h3 className="text-lg font-semibold text-foreground mb-1">{job.company}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {t(`roles.${job.id}.role`)} · {t(`roles.${job.id}.period`)}
                </p>
                <p className="text-foreground/85 leading-relaxed">{t(`roles.${job.id}.impact`)}</p>
              </li>
            ))}
            <li className="pl-8 relative">
              <span aria-hidden="true" className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-border ring-4 ring-background" />
              <h3 className="text-lg font-semibold text-foreground mb-1">{t('earlierTitle')}</h3>
              <p className="text-muted-foreground leading-relaxed">{t('earlier')}</p>
            </li>
          </ol>

          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-10 font-medium text-foreground hover:opacity-80 transition-opacity"
          >
            {t('fullProfile')}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
