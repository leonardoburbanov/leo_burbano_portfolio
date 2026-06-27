'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import SlideFrame from '../SlideFrame';

/** Slide 7: explore the local playground against the production agent. */
export default function LiveDemoSlide() {
  const t = useTranslations('GeminiPresentation.slides.liveDemo');

  return (
    <SlideFrame className="gap-3" slideNumber={7}>
      <h2 className="gdg-headline shrink-0 text-2xl leading-tight sm:text-3xl">{t('heading')}</h2>

      <div className="flex min-h-0 flex-1 flex-col gap-3 lg:flex-row lg:items-stretch">
        <div className="flex shrink-0 flex-col justify-center gap-2 lg:max-w-[34%]">
          <p className="gdg-body text-sm leading-relaxed sm:text-base">{t('paragraph1')}</p>
          <p className="gdg-body text-sm leading-relaxed sm:text-base">{t('paragraph2')}</p>
        </div>

        <div className="gdg-diagram-frame relative min-h-0 flex-1 overflow-hidden p-2">
          <Image
            src="/ge_agent_platform.png"
            alt={t('imageAlt')}
            width={1600}
            height={900}
            className="h-full w-full object-contain object-center"
          />
        </div>
      </div>
    </SlideFrame>
  );
}
