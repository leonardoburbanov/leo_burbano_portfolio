'use client';

import { useCallback, useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { ChevronLeft, ChevronRight, PanelTop, PanelTopClose } from 'lucide-react';
import { useTranslations } from 'next-intl';
import 'keen-slider/keen-slider.min.css';
import TitleSlide from './slides/TitleSlide';
import ArchitectureSlide from './slides/ArchitectureSlide';
import WorkshopSlide from './slides/WorkshopSlide';

const SLIDE_COUNT = 3;

interface GeminiPresentationProps {
  chromeHidden?: boolean;
  onToggleChrome?: () => void;
}

/** Interactive 3-slide deck with arrows, dots, counter, and keyboard nav. */
export default function GeminiPresentation({
  chromeHidden = false,
  onToggleChrome,
}: GeminiPresentationProps) {
  const t = useTranslations('GeminiPresentation');
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrent(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const goPrev = useCallback(() => {
    instanceRef.current?.prev();
  }, [instanceRef]);

  const goNext = useCallback(() => {
    instanceRef.current?.next();
  }, [instanceRef]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goPrev, goNext]);

  return (
    <div className="w-full">
      {onToggleChrome && (
        <div className="mx-auto mb-2 flex max-w-5xl justify-end">
          <button
            type="button"
            onClick={onToggleChrome}
            aria-label={chromeHidden ? t('showHeader') : t('hideHeader')}
            className="inline-flex items-center justify-center rounded-md border border-neutral-200 bg-white/80 p-1 text-neutral-500 shadow-sm transition-colors hover:bg-white hover:text-neutral-700"
          >
            {chromeHidden ? (
              <PanelTop className="h-3.5 w-3.5" />
            ) : (
              <PanelTopClose className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      )}

      <div className="relative mx-auto w-full max-w-5xl">
        <div className="relative">
          <div ref={sliderRef} className="keen-slider aspect-[16/10]">
            <div className="keen-slider__slide">
              <TitleSlide />
            </div>
            <div className="keen-slider__slide">
              <ArchitectureSlide />
            </div>
            <div className="keen-slider__slide">
              <WorkshopSlide />
            </div>
          </div>

          {loaded && (
            <>
              <button
                type="button"
                onClick={goPrev}
                disabled={current === 0}
                aria-label={t('prev')}
                className="absolute left-0 top-1/2 z-10 -translate-x-3 -translate-y-1/2 rounded-full border border-neutral-300 bg-white p-2 text-neutral-700 shadow-md transition-opacity hover:bg-neutral-50 disabled:opacity-30 sm:-translate-x-5"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={current === SLIDE_COUNT - 1}
                aria-label={t('next')}
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-3 rounded-full border border-neutral-300 bg-white p-2 text-neutral-700 shadow-md transition-opacity hover:bg-neutral-50 disabled:opacity-30 sm:translate-x-5"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="flex gap-2">
            {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${t('slide')} ${i + 1}`}
                onClick={() => instanceRef.current?.moveToIdx(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? 'w-6 bg-neutral-900' : 'w-2 bg-neutral-300'
                }`}
              />
            ))}
          </div>
          <p className="text-sm font-medium text-neutral-600">
            {current + 1} / {SLIDE_COUNT}
          </p>
        </div>
      </div>
    </div>
  );
}
