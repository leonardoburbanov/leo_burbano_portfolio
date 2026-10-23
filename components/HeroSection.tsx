import { ArrowDown, LinkedinIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { heroData } from '@/data/hero-section';

export default function HeroSection() {
  const t = useTranslations('HeroSection');

  return (
    <section id="home" className="min-h-[90vh] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 pt-28 pb-16 scroll-mt-28">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <div className="relative">
              <Image
                src={heroData.avatar}
                alt={t('avatarAlt')}
                width={144}
                height={144}
                priority
                sizes="(min-width: 640px) 144px, 112px"
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-background shadow-2xl object-cover"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-background animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-5">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              {t('name')}
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-foreground/90">
              {t('title')}
            </p>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('valueProp')}
            </p>

            {/* Proof line */}
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 pt-2 text-sm sm:text-base text-muted-foreground">
              <span className="uppercase tracking-wider text-xs w-full sm:w-auto">{t('proofLabel')}</span>
              {heroData.proofCompanies.map((company, index) => (
                <span key={company} className="inline-flex items-center gap-2 whitespace-nowrap">
                  {index > 0 && <span aria-hidden="true">·</span>}
                  <span className="font-medium text-foreground/80">{company}</span>
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href={heroData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg bg-primary text-primary-foreground shadow-xl hover:shadow-primary/30 hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
              <LinkedinIcon className="w-5 h-5" aria-hidden="true" />
              {t('ctaLinkedIn')}
            </a>
            <a
              href={heroData.caseStudyAnchor}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg bg-secondary text-secondary-foreground border-2 border-border hover:bg-accent hover:border-accent transition-all duration-300 hover:scale-105"
            >
              {t('ctaCaseStudy')}
              <ArrowDown className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
