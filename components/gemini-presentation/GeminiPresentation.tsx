'use client';

import { useCallback, useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { ChevronLeft, ChevronRight, PanelTop, PanelTopClose } from 'lucide-react';
import { useTranslations } from 'next-intl';
import 'keen-slider/keen-slider.min.css';
import TitleSlide from './slides/TitleSlide';
import PrerequisitesSlide from './slides/PrerequisitesSlide';
import RepoSetupSlide from './slides/RepoSetupSlide';
import PlaygroundSlide from './slides/PlaygroundSlide';
import GoogleCloudSlide from './slides/GoogleCloudSlide';
import ProductionArchitectureSlide from './slides/ProductionArchitectureSlide';
import LiveDemoSlide from './slides/LiveDemoSlide';
import GeminiPlatformSlide from './slides/GeminiPlatformSlide';
import CloudProductionSlide from './slides/CloudProductionSlide';
import ThanksSlide from './slides/ThanksSlide';
import { SLIDE_TOTAL } from './SlideFrame';

interface GeminiPresentationProps {
  chromeHidden?: boolean;
  onToggleChrome?: () => void;
}

/** Interactive 10-slide deck with arrows, dots, and keyboard nav. */
export default function GeminiPresentation({
  chromeHidden = false,
  onToggleChrome,
}: GeminiPresentationProps) {
  const t = useTranslations('GeminiPresentation');
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    drag: false,
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
            className="gdg-nav-btn inline-flex items-center justify-center p-1 shadow-sm"
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
          <div ref={sliderRef} className="keen-slider aspect-[16/10] select-text">
            <div className="keen-slider__slide select-text">
              <TitleSlide />
            </div>
            <div className="keen-slider__slide select-text">
              <PrerequisitesSlide />
            </div>
            <div className="keen-slider__slide select-text">
              <RepoSetupSlide />
            </div>
            <div className="keen-slider__slide select-text">
              <PlaygroundSlide />
            </div>
            <div className="keen-slider__slide select-text">
              <GoogleCloudSlide />
            </div>
            <div className="keen-slider__slide select-text">
              <ProductionArchitectureSlide />
            </div>
            <div className="keen-slider__slide select-text">
              <LiveDemoSlide />
            </div>
            <div className="keen-slider__slide select-text">
              <GeminiPlatformSlide />
            </div>
            <div className="keen-slider__slide select-text">
              <CloudProductionSlide />
            </div>
            <div className="keen-slider__slide select-text">
              <ThanksSlide />
            </div>
          </div>

          {loaded && (
            <>
              <button
                type="button"
                onClick={goPrev}
                disabled={current === 0}
                aria-label={t('prev')}
                className="gdg-nav-btn absolute left-0 top-1/2 z-10 -translate-x-3 -translate-y-1/2 p-2 shadow-md disabled:opacity-30 sm:-translate-x-5"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={current === SLIDE_TOTAL - 1}
                aria-label={t('next')}
                className="gdg-nav-btn absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-3 p-2 shadow-md disabled:opacity-30 sm:translate-x-5"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="flex gap-2">
            {Array.from({ length: SLIDE_TOTAL }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${t('slide')} ${i + 1}`}
                onClick={() => instanceRef.current?.moveToIdx(i)}
                className={`gdg-dot ${i === current ? 'gdg-dot-active' : 'gdg-dot-inactive'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
