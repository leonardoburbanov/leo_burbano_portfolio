'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import SlideFrame from '../SlideFrame';

const STEPS = ['adk', 'fastapi', 'nextjs'] as const;

/** Architecture flow: ADK agent → FastAPI → Next.js. */
export default function ArchitectureSlide() {
  const t = useTranslations('GeminiPresentation.slides.architecture');

  return (
    <SlideFrame>
      <h2 className="mb-6 text-2xl font-bold sm:text-3xl md:text-4xl">{t('heading')}</h2>

      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <div className="flex w-full flex-col items-stretch gap-4 md:flex-row md:items-start md:gap-3">
          {STEPS.map((step, index) => (
            <div key={step} className="flex flex-1 items-center gap-3 md:flex-col md:items-stretch">
              <div className="flex-1 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 sm:p-5">
                <h3 className="mb-2 text-base font-bold text-neutral-900 sm:text-lg">
                  {t(`steps.${step}.title`)}
                </h3>
                <p className="text-sm text-neutral-600">{t(`steps.${step}.description`)}</p>
              </div>
              {index < STEPS.length - 1 && (
                <ArrowRight className="hidden h-6 w-6 shrink-0 self-center text-neutral-400 md:block" />
              )}
            </div>
          ))}
        </div>

        <p className="max-w-2xl text-center text-sm text-neutral-500 sm:text-base">
          {t('footnote')}
        </p>
      </div>
    </SlideFrame>
  );
}
