'use client';

import { useTranslations } from 'next-intl';
import SlideFrame from '../SlideFrame';

const PLATFORM_DIAGRAM =
  'https://docs.cloud.google.com/gemini-enterprise-agent-platform/images/gemini-enterprise-agent-platform.svg';

/** Slide 8: Gemini Enterprise Agent Platform overview diagram. */
export default function GeminiPlatformSlide() {
  const t = useTranslations('GeminiPresentation.slides.geminiPlatform');

  return (
    <SlideFrame className="gap-4">
      <h2 className="shrink-0 text-2xl font-bold leading-tight sm:text-3xl">{t('heading')}</h2>
      <div className="relative min-h-0 flex-1">
        {/* ponytail: plain img — Next/Image blocks remote SVG without extra config */}
        <img
          src={PLATFORM_DIAGRAM}
          alt={t('imageAlt')}
          className="h-full w-full object-contain object-center"
        />
      </div>
    </SlideFrame>
  );
}
