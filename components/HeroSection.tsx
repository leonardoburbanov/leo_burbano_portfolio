import Image from 'next/image';
import { ArrowDown, ChevronDown, LinkedinIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import CompanyLogo from '@/components/CompanyLogo';
import { heroData } from '@/data/hero-section';

export default function HeroSection() {
  const t = useTranslations('HeroSection');

  return (
    <section id="home" className="relative min-h-[94vh] flex items-center justify-center overflow-hidden pt-32 pb-24 scroll-mt-28">
      {/* Animated background */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid" />
        <div className="blob top-12 left-[6%] h-72 w-72" />
        <div className="blob bottom-0 right-[4%] h-96 w-96" style={{ animationDelay: '-7s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center flex flex-col items-center gap-8">
          <p className="fade-up inline-flex items-center gap-2.5 rounded-full border border-border bg-background/70 px-4 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground backdrop-blur" style={{ animationDelay: '80ms' }}>
            <span aria-hidden="true" className="status-dot h-2 w-2 rounded-full bg-green-500" />
            {t('badge')}
          </p>

          <div className="relative">
            <span aria-hidden="true" className="avatar-ring absolute -inset-[5px] rounded-full opacity-60" />
            <Image
              src={heroData.avatar}
              alt={t('avatarAlt')}
              width={152}
              height={152}
              priority
              sizes="(min-width: 640px) 152px, 120px"
              className="relative h-[120px] w-[120px] sm:h-[152px] sm:w-[152px] rounded-full border-4 border-background object-cover shadow-2xl"
            />
          </div>

          <div className="space-y-5">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-shimmer pb-2">
              {t('name')}
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-foreground/90">{t('title')}</p>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('valueProp')}
            </p>
          </div>

          <div className="fade-up flex flex-wrap items-center justify-center gap-x-4 gap-y-3" style={{ animationDelay: '320ms' }}>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground w-full sm:w-auto">{t('proofLabel')}</span>
            {heroData.proofCompanies.map((id) => (
              <CompanyLogo key={id} id={id} height={22} />
            ))}
          </div>

          <div className="fade-up flex flex-col sm:flex-row gap-4 justify-center pt-2 w-full sm:w-auto" style={{ animationDelay: '440ms' }}>
            <a
              href={heroData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-lg bg-primary text-primary-foreground shadow-xl shadow-foreground/10 transition-transform duration-300 hover:scale-105"
            >
              <LinkedinIcon className="w-5 h-5" aria-hidden="true" />
              {t('ctaLinkedIn')}
            </a>
            <a
              href={heroData.caseStudyAnchor}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-lg border border-border bg-background/70 text-foreground backdrop-blur transition-all duration-300 hover:border-foreground/40 hover:bg-accent"
            >
              {t('ctaCaseStudy')}
              <ArrowDown className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <a href={heroData.caseStudyAnchor} aria-label={t('scroll')} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs uppercase tracking-[0.2em] text-muted-foreground sm:flex">
        {t('scroll')}
        <ChevronDown className="scroll-hint h-4 w-4" aria-hidden="true" />
      </a>
    </section>
  );
}
