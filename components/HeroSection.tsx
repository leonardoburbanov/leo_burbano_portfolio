import { ChevronRight, LinkedinIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import CompanyLogo from '@/components/CompanyLogo';
import DiffusionPortrait from '@/components/motion/DiffusionPortrait';
import { heroData } from '@/data/hero-section';

export default function HeroSection() {
  const t = useTranslations('HeroSection');

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24 pb-12 scroll-mt-12">
      <div aria-hidden="true" className="stage-light absolute inset-0 -z-10" />

      <div className="mx-auto grid w-full max-w-[1080px] flex-1 items-center gap-6 px-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-4">
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <h1 className="display resolve text-[clamp(3.25rem,8vw,6rem)]">{t('name')}</h1>
          <p
            className="display resolve mt-3 text-[clamp(1.6rem,3.4vw,2.6rem)] text-blue-gradient pb-1"
            style={{ animationDelay: '120ms' }}
          >
            {t('title')}
          </p>
          <p className="lead resolve mx-auto mt-6 max-w-[34ch] lg:mx-0" style={{ animationDelay: '240ms' }}>
            {t('valueProp')}
          </p>
          <div
            className="resolve mt-9 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-8 lg:justify-start"
            style={{ animationDelay: '360ms' }}
          >
            <a href={heroData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <LinkedinIcon className="h-[18px] w-[18px]" aria-hidden="true" />
              {t('ctaLinkedIn')}
            </a>
            <a href={heroData.caseStudyAnchor} className="link-chevron text-[17px]">
              {t('ctaCaseStudy')}
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* The portrait is rendered as a diffusion process: noise resolves into the image and back. */}
        <div className="resolve order-1 mx-auto w-full max-w-[520px] lg:order-2" style={{ animationDelay: '200ms' }}>
          <DiffusionPortrait
            src={heroData.avatar}
            alt={t('portraitAlt')}
            labels={{ denoising: t('denoising'), noising: t('noising'), settled: t('settled') }}
          />
        </div>
      </div>

      <div className="resolve mx-auto mt-10 w-full max-w-[1080px] px-5" style={{ animationDelay: '520ms' }}>
        <div className="flex flex-col items-center gap-6 border-t border-border pt-8">
          <p className="text-sm text-muted-foreground">{t('proofLabel')}</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {heroData.proofCompanies.map((id) => (
              <li key={id}>
                <CompanyLogo id={id} height={22} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
