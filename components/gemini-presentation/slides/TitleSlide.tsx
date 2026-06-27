'use client';

import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import { useTranslations } from 'next-intl';
import SlideFrame from '../SlideFrame';

const BUILD_WITH_AI_BANNER =
  'https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_DJM1ZKX';

const TITLE_LINKS = [
  {
    key: 'frontend',
    href: 'https://nextjs-agent-client-363304624491.us-central1.run.app',
    icon: ExternalLink,
  },
  {
    key: 'backendRepo',
    href: 'https://github.com/leonardoburbanov/gemini-enterprise-agent-platform-workshop',
    icon: Github,
  },
] as const;

const QR_CODES = [
  {
    key: 'presentation',
    src: '/qrcode_leonardoburbano_gemini_enterprise.png',
  },
  {
    key: 'github',
    src: '/qrcode_github.com.png',
  },
] as const;

const PREREQUISITES = [
  {
    key: 'python',
    href: 'https://www.python.org/downloads/',
    src: '/logos/prerequisites/python.svg',
  },
  {
    key: 'nodejs',
    href: 'https://nodejs.org/en/download',
    src: '/logos/prerequisites/nodejs.svg',
  },
  {
    key: 'uv',
    href: 'https://docs.astral.sh/uv/getting-started/installation/',
    src: '/logos/prerequisites/uv.svg',
  },
  {
    key: 'ide',
    href: 'https://antigravity.google/',
    src: '/logos/prerequisites/antigravity.svg',
  },
  {
    key: 'aiStudio',
    href: 'https://aistudio.google.com/',
    src: '/logos/prerequisites/ai-studio.svg',
  },
] as const;

/** GDG-style title slide matching the workshop reference layout. */
export default function TitleSlide() {
  const t = useTranslations('GeminiPresentation.slides.title');

  return (
    <SlideFrame className="justify-between gap-3" slideNumber={1}>
      {/* GDG header */}
      <div className="flex shrink-0 items-center gap-3">
        <Image
          src="/gdg_logo.png"
          alt={t('gdg')}
          width={40}
          height={40}
          className="h-10 w-10 object-contain"
        />
        <div>
          <p className="gdg-headline text-sm leading-tight sm:text-base">{t('gdg')}</p>
          <p className="gdg-subhead text-xs sm:text-sm">{t('gdgChapter')}</p>
        </div>
      </div>

      {/* Title + Build with AI banner */}
      <div className="flex min-h-0 flex-1 flex-col items-stretch gap-4 py-1 md:flex-row md:items-center md:gap-6">
        <div className="flex flex-1 flex-col justify-center">
          <h1 className="gdg-headline text-3xl leading-tight tracking-tight sm:text-4xl md:text-[2.75rem]">
            {t('heading')}
          </h1>
          <p className="gdg-body mt-3 text-lg sm:text-xl">
            {t('subtitle')}{' '}
            <span className="gdg-headline">{t('platform')}</span>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {TITLE_LINKS.map(({ key, href, icon: Icon }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="gdg-btn text-xs sm:text-sm"
              >
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {t(`links.${key}`)}
              </a>
            ))}
          </div>
        </div>

        <div className="relative w-full shrink-0 md:w-[52%] lg:w-[48%]">
          <div className="flex flex-col items-center gap-3 md:items-end">
            <div className="relative aspect-[4/1] w-full min-h-[4.5rem] sm:min-h-[5.5rem] md:min-h-[6rem]">
              {/* ponytail: plain img — external Cloudinary URL, no next/image host config needed */}
              <img
                src={BUILD_WITH_AI_BANNER}
                alt={t('badge')}
                className="absolute inset-0 h-full w-full object-contain object-center md:object-right"
              />
            </div>
            <div className="flex flex-wrap items-end justify-center gap-3 sm:gap-4 md:justify-end">
              {QR_CODES.map(({ key, src }) => (
                <div key={key} className="flex flex-col items-center gap-1.5">
                  <span className="gdg-tag sm:text-xs">
                    {t(`qrTags.${key}`)}
                  </span>
                  <Image
                    src={src}
                    alt={t(`qrAlt.${key}`)}
                    width={224}
                    height={224}
                    className="h-28 w-28 object-contain sm:h-32 sm:w-32 md:h-36 md:w-36"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Presenter + prerequisites footer */}
      <div className="grid shrink-0 grid-cols-1 gap-3 md:grid-cols-2 md:items-end md:gap-6">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-3">
            <Image
              src="/foto_white.png"
              alt={t('presenterName')}
              width={56}
              height={56}
              className="h-12 w-12 rounded-full border-2 border-[#1e1e1e] object-cover sm:h-14 sm:w-14"
            />
            <div>
              <p className="gdg-headline">{t('presenterName')}</p>
              <p className="gdg-subhead text-xs sm:text-sm">{t('presenterTitle')}</p>
              <a
                href="https://www.linkedin.com/in/leoburbano/"
                target="_blank"
                rel="noopener noreferrer"
                className="gdg-link inline-flex items-center gap-1 text-[11px] sm:text-xs"
              >
                <Image
                  src="/logos/linkedin.png"
                  alt=""
                  width={12}
                  height={12}
                  className="h-3 w-3 shrink-0 opacity-70"
                  aria-hidden
                />
                linkedin.com/in/leoburbano
              </a>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Image
              src="/logos/mercately.png"
              alt="Mercately"
              width={80}
              height={20}
              className="h-4 w-auto max-w-[5rem] object-contain object-left opacity-50 sm:h-[1.125rem] sm:max-w-[5.5rem]"
            />
            <Image
              src="/logos/thoughtworks.png"
              alt="Thoughtworks"
              width={90}
              height={20}
              className="h-3.5 w-auto max-w-[5.5rem] object-contain object-left opacity-50 sm:h-4 sm:max-w-[6rem]"
            />
            <Image
              src="/logos/latam.svg"
              alt="LATAM Airlines"
              width={64}
              height={20}
              className="h-4 w-auto max-w-[3.5rem] object-contain object-left opacity-50 sm:h-[1.125rem] sm:max-w-[4rem]"
            />
          </div>
        </div>

        <div className="gdg-card px-3 py-2.5 sm:px-4 sm:py-3">
          <p className="gdg-section-label mb-2 text-center md:text-right">
            {t('prerequisites.title')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 md:justify-end">
            {PREREQUISITES.map(({ key, href, src }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={t(`prerequisites.hints.${key}`)}
                className="gdg-pill text-[10px] sm:text-xs"
              >
                <Image
                  src={src}
                  alt=""
                  width={16}
                  height={16}
                  className="h-3.5 w-3.5 shrink-0 object-contain sm:h-4 sm:w-4"
                  aria-hidden
                />
                {t(`prerequisites.${key}`)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
