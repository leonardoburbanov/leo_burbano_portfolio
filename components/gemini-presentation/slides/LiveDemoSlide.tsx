'use client';

import { useTranslations } from 'next-intl';
import SlideFrame from '../SlideFrame';

/** Slide 7: explore the local playground against the production agent. */
export default function LiveDemoSlide() {
  const t = useTranslations('GeminiPresentation.slides.liveDemo');

  return (
    <SlideFrame className="justify-center gap-6">
      <h2 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">{t('heading')}</h2>
      <div className="flex max-w-2xl flex-col gap-4">
        <p className="text-base leading-relaxed text-neutral-700 sm:text-lg">{t('paragraph1')}</p>
        <p className="text-base leading-relaxed text-neutral-700 sm:text-lg">{t('paragraph2')}</p>
      </div>
    </SlideFrame>
  );
}
