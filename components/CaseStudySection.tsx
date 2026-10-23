import { useLocale, useTranslations } from 'next-intl';
import { Network, UserRound } from 'lucide-react';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import CompanyLogo from '@/components/CompanyLogo';
import SectionHeading from '@/components/SectionHeading';
import CountUp from '@/components/motion/CountUp';
import Reveal from '@/components/motion/Reveal';
import SpotlightCard from '@/components/motion/SpotlightCard';
import { caseStudy } from '@/data/case-study';

export default function CaseStudySection() {
  const t = useTranslations('CaseStudy');
  const locale = useLocale();
  const architecture = t.raw('architecture') as string[];

  return (
    <section id="case-study" className="relative py-24 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />

          <div className="grid gap-4 lg:grid-cols-2">
            <Reveal>
              <SpotlightCard className="h-full p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-xl bg-secondary p-2.5 text-secondary-foreground">
                    <Network className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">{t('problemTitle')}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{t('problem')}</p>
              </SpotlightCard>
            </Reveal>
            <Reveal delay={100}>
              <SpotlightCard className="h-full p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-xl bg-secondary p-2.5 text-secondary-foreground">
                    <UserRound className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">{t('roleTitle')}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{t('role')}</p>
              </SpotlightCard>
            </Reveal>
          </div>

          <Reveal className="mt-4">
            <SpotlightCard className="p-6 sm:p-8">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-foreground">{t('architectureTitle')}</h3>
                <CompanyLogo id="mercately" height={20} />
              </div>
              <div className="grid gap-8 lg:grid-cols-5 lg:items-center">
                <ul className="space-y-3 lg:col-span-2">
                  {architecture.map((item) => (
                    <li key={item} className="flex gap-3 text-muted-foreground leading-relaxed">
                      <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="lg:col-span-3 rounded-xl border border-border bg-background p-3 sm:p-5">
                  <ArchitectureDiagram />
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          <h3 className="mt-12 mb-4 text-lg font-semibold text-foreground">{t('resultsTitle')}</h3>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {caseStudy.metrics.map((metric, index) => (
              <Reveal key={metric.labelKey} delay={index * 90}>
                <SpotlightCard className="h-full p-5 sm:p-6 text-center">
                  <p className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground tabular-nums">
                    <CountUp to={metric.to} suffix={metric.suffix} locale={locale} />
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{t(`metrics.${metric.labelKey}`)}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <h3 className="mb-3 text-lg font-semibold text-foreground">{t('stackTitle')}</h3>
            <div className="flex flex-wrap gap-2">
              {caseStudy.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border bg-secondary px-3.5 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
