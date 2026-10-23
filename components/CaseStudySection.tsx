import { useLocale, useTranslations } from 'next-intl';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import CompanyLogo from '@/components/CompanyLogo';
import CountUp from '@/components/motion/CountUp';
import Reveal from '@/components/motion/Reveal';
import { caseStudy } from '@/data/case-study';

export default function CaseStudySection() {
  const t = useTranslations('CaseStudy');
  const locale = useLocale();
  const architecture = t.raw('architecture') as string[];

  return (
    <section id="case-study" className="relative py-20 sm:py-28 scroll-mt-12">
      <div className="mx-auto max-w-[1080px] px-5">
        <Reveal className="max-w-3xl">
          <CompanyLogo id="mercately" height={26} />
          <h2 className="headline mt-8">
            {t.rich('title', { g: (chunks) => <span className="text-blue-gradient">{chunks}</span> })}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:mt-20 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="lead">
              <strong>{t('problemTitle')}.</strong> {t('problem')}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="lead">
              <strong>{t('roleTitle')}.</strong> {t('role')}
            </p>
          </Reveal>
        </div>

        <h3 className="sr-only">{t('resultsTitle')}</h3>
        <dl className="mt-20 grid grid-cols-2 gap-x-8 border-t border-border lg:grid-cols-4 sm:mt-28">
          {caseStudy.metrics.map((metric, index) => (
            <Reveal key={metric.labelKey} delay={index * 80} className="border-b border-border py-8 lg:border-b-0">
              <dd className="display tabular text-[clamp(2.5rem,5vw,4rem)]">
                <CountUp to={metric.to} suffix={metric.suffix} locale={locale} />
              </dd>
              <dt className="mt-2 text-[17px] text-muted-foreground">{t(`metrics.${metric.labelKey}`)}</dt>
            </Reveal>
          ))}
        </dl>

        <div className="mt-24 sm:mt-32">
          <Reveal>
            <h3 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold tracking-[-0.025em] leading-tight">
              {t('architectureTitle')}
            </h3>
          </Reveal>
          <Reveal delay={100} className="mt-10 sm:mt-14">
            <ArchitectureDiagram />
          </Reveal>
          <ul className="mt-14 grid gap-x-12 md:grid-cols-2">
            {architecture.map((item, index) => (
              <Reveal as="li" key={item} delay={index * 60}>
                <p className="border-t border-border py-5 text-[17px] leading-relaxed text-muted-foreground">{item}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
