'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import SlideFrame from '../SlideFrame';

const BUILD_WITH_AI_BANNER =
  'https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_DJM1ZKX';

/** GDG-style title slide matching the workshop reference layout. */
export default function TitleSlide() {
  const t = useTranslations('GeminiPresentation.slides.title');

  return (
    <SlideFrame className="justify-between gap-4">
      {/* GDG header */}
      <div className="flex items-center gap-3">
        <Image
          src="/gdg_logo.png"
          alt={t('gdg')}
          width={40}
          height={40}
          className="h-10 w-10 object-contain"
        />
        <div>
          <p className="text-sm font-semibold leading-tight sm:text-base">{t('gdg')}</p>
          <p className="text-xs text-neutral-600 sm:text-sm">{t('gdgChapter')}</p>
        </div>
      </div>

      {/* Title + Build with AI banner */}
      <div className="flex flex-1 flex-col items-stretch gap-5 py-2 md:flex-row md:items-center md:gap-8">
        <div className="flex flex-1 flex-col justify-center">
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-[2.75rem]">
            {t('heading')}
          </h1>
          <p className="mt-3 text-lg text-neutral-700 sm:text-xl">
            {t('subtitle')}{' '}
            <span className="font-bold text-neutral-900">{t('platform')}</span>
          </p>
        </div>

        <div className="relative w-full shrink-0 md:w-[52%] lg:w-[48%]">
          <div className="relative aspect-[4/1] w-full min-h-[5.5rem] sm:min-h-[6.5rem] md:min-h-[7.5rem]">
            <Image
              src={BUILD_WITH_AI_BANNER}
              alt={t('badge')}
              fill
              className="object-contain object-center md:object-right"
              sizes="(max-width: 768px) 100vw, 480px"
              priority
            />
          </div>
        </div>
      </div>

      {/* Presenter */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Image
            src="/foto_white.png"
            alt={t('presenterName')}
            width={56}
            height={56}
            className="h-12 w-12 rounded-full border-2 border-neutral-900 object-cover sm:h-14 sm:w-14"
          />
          <div>
            <p className="font-semibold text-neutral-900">{t('presenterName')}</p>
            <p className="text-xs text-neutral-600 sm:text-sm">{t('presenterTitle')}</p>
            <a
              href="https://www.linkedin.com/in/leoburbano/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-neutral-500 transition-colors hover:text-blue-600 hover:underline sm:text-xs"
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
    </SlideFrame>
  );
}
