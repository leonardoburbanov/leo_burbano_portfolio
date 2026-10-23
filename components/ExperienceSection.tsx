import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import CompanyLogo from '@/components/CompanyLogo';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import { experience } from '@/data/experience';
import { socialLinks } from '@/lib/site';

export default function ExperienceSection() {
  const t = useTranslations('Experience');

  return (
    <section id="experience" className="relative bg-surface py-20 sm:py-28 scroll-mt-12">
      <div className="mx-auto max-w-[1080px] px-5">
        <SectionHeading title={t('title')} />

        <ol>
          {experience.map((job, index) => (
            <Reveal as="li" key={job.id} delay={index * 90}>
              <div className="grid gap-4 border-t border-border py-10 md:grid-cols-[180px_minmax(0,1fr)_auto] md:gap-10">
                <p className="tabular text-[15px] text-muted-foreground md:pt-1.5">{t(`roles.${job.id}.period`)}</p>
                <div>
                  <h3 className="text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.025em] leading-tight">{job.company}</h3>
                  <p className="mt-1 text-[17px] text-muted-foreground">{t(`roles.${job.id}.role`)}</p>
                  <p className="mt-5 max-w-[60ch] text-[19px] leading-relaxed text-foreground/85">{t(`roles.${job.id}.impact`)}</p>
                </div>
                <div className="order-first md:order-none md:pt-2">
                  <CompanyLogo id={job.id} height={22} />
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal as="li" delay={300}>
            <div className="grid gap-4 border-t border-border py-10 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10">
              <p className="text-[15px] text-muted-foreground md:pt-1">{t('earlierTitle')}</p>
              <p className="max-w-[60ch] text-[17px] leading-relaxed text-muted-foreground">{t('earlier')}</p>
            </div>
          </Reveal>
        </ol>

        <Reveal className="mt-6">
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="link-chevron text-[17px]">
            {t('fullProfile')}
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
