'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import SlideFrame from '../SlideFrame';

/** Slide 9: cloud playground and deployment traces before the closing slide. */
export default function CloudProductionSlide() {
  const t = useTranslations('GeminiPresentation.slides.cloudProduction');

  const panels = [
    { key: 'deployments', src: '/deployments.png', alt: t('deploymentsAlt'), label: t('deploymentsLabel') },
    { key: 'playground', src: '/playground_cloud.png', alt: t('playgroundAlt'), label: t('playgroundLabel') },
  ] as const;

  return (
    <SlideFrame className="gap-3" slideNumber={9}>
      <h2 className="gdg-headline shrink-0 text-2xl leading-tight sm:text-3xl">{t('heading')}</h2>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
        {panels.map(({ key, src, alt, label }) => (
          <div key={key} className="flex min-h-0 flex-col gap-1.5">
            <p className="gdg-section-label">{label}</p>
            <div className="gdg-diagram-frame relative min-h-0 flex-1 overflow-hidden p-1.5 sm:p-2">
              <Image
                src={src}
                alt={alt}
                width={1600}
                height={900}
                className="h-full w-full object-contain object-center"
              />
            </div>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
}
