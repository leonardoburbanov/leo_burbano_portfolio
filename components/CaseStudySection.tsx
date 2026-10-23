import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { caseStudy } from '@/data/case-study';

export default function CaseStudySection() {
  const t = useTranslations('CaseStudy');
  const architecture = t.raw('architecture') as string[];

  return (
    <section id="case-study" className="py-20 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {t('eyebrow')}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-12 leading-tight">
            {t('title')}
          </h2>

          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">{t('problemTitle')}</h3>
              <p className="text-muted-foreground leading-relaxed">{t('problem')}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">{t('roleTitle')}</h3>
              <p className="text-muted-foreground leading-relaxed">{t('role')}</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t('architectureTitle')}</h3>
            <ul className="space-y-2 mb-6">
              {architecture.map((item) => (
                <li key={item} className="flex gap-3 text-muted-foreground leading-relaxed">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60" />
                  {item}
                </li>
              ))}
            </ul>
            {caseStudy.architectureDiagram ? (
              <Image
                src={caseStudy.architectureDiagram}
                alt={t('diagramAlt')}
                width={1600}
                height={900}
                className="w-full h-auto rounded-lg border border-border bg-background"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 aspect-[16/7] rounded-lg border-2 border-dashed border-border text-muted-foreground">
                <ImageIcon className="w-8 h-8" aria-hidden="true" />
                <span className="text-sm">{t('diagramPlaceholder')}</span>
              </div>
            )}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-4">{t('resultsTitle')}</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {caseStudy.metrics.map((metric) => (
              <div key={metric.labelKey} className="bg-card border border-border rounded-xl p-5 text-center">
                <p className="text-3xl sm:text-4xl font-bold text-foreground">{metric.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{t(`metrics.${metric.labelKey}`)}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3">{t('stackTitle')}</h3>
          <div className="flex flex-wrap gap-2">
            {caseStudy.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium border border-border/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
