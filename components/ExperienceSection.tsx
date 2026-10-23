import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import CompanyLogo from '@/components/CompanyLogo';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import SpotlightCard from '@/components/motion/SpotlightCard';
import { experience } from '@/data/experience';
import { socialLinks } from '@/lib/site';

export default function ExperienceSection() {
  const t = useTranslations('Experience');

  return (
    <section id="experience" className="relative py-24 bg-muted/40 border-y border-border/60 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />

          <div className="relative max-w-4xl">
            <Reveal className="timeline-line absolute left-[11px] top-3 bottom-3 w-px bg-border">{null}</Reveal>

            <ol className="space-y-6">
              {experience.map((job, index) => (
                <li key={job.id} className="relative pl-12">
                  <span aria-hidden="true" className="absolute left-0 top-7 flex h-6 w-6 items-center justify-center rounded-full bg-background ring-1 ring-border">
                    <span className="h-2.5 w-2.5 rounded-full bg-foreground" />
                  </span>
                  <Reveal delay={index * 100}>
                    <SpotlightCard className="p-6">
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{job.company}</h3>
                          <p className="text-sm text-muted-foreground">
                            {t(`roles.${job.id}.role`)} · {t(`roles.${job.id}.period`)}
                          </p>
                        </div>
                        <CompanyLogo id={job.id} height={24} />
                      </div>
                      <p className="text-foreground/85 leading-relaxed">{t(`roles.${job.id}.impact`)}</p>
                    </SpotlightCard>
                  </Reveal>
                </li>
              ))}
              <li className="relative pl-12">
                <span aria-hidden="true" className="absolute left-[7px] top-6 h-3.5 w-3.5 rounded-full bg-background ring-1 ring-border" />
                <Reveal delay={300}>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{t('earlierTitle')}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t('earlier')}</p>
                </Reveal>
              </li>
            </ol>
          </div>

          <Reveal className="mt-10">
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-medium text-foreground"
            >
              {t('fullProfile')}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
