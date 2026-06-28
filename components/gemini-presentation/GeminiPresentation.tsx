'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { ChevronLeft, ChevronRight, PanelTop, PanelTopClose, RotateCcw } from 'lucide-react';
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

// Fixed design canvas dimensions (16:10)
const CANVAS_W = 1024;
const CANVAS_H = 640;

const SLIDES = [
  TitleSlide,
  PrerequisitesSlide,
  RepoSetupSlide,
  PlaygroundSlide,
  GoogleCloudSlide,
  ProductionArchitectureSlide,
  LiveDemoSlide,
  GeminiPlatformSlide,
  CloudProductionSlide,
  ThanksSlide,
];

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
  const [hintDismissed, setHintDismissed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  // Combine refs: keen-slider needs sliderRef, we also need containerRef for ResizeObserver
  const setRefs = useCallback(
    (el: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      (sliderRef as unknown as (el: HTMLDivElement | null) => void)(el);
    },
    [sliderRef],
  );

  // Compute uniform scale factor and apply as CSS custom property — no re-render on resize
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const applyScale = () => {
      const s = Math.min(el.clientWidth / CANVAS_W, el.clientHeight / CANVAS_H);
      el.style.setProperty('--fit-scale', String(s));
      wrapperRef.current?.classList.toggle('is-compact', s < 0.65);
      instanceRef.current?.update();
    };

    applyScale();
    const ro = new ResizeObserver(applyScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, [instanceRef]);

  const goPrev = useCallback(() => instanceRef.current?.prev(), [instanceRef]);
  const goNext = useCallback(() => instanceRef.current?.next(), [instanceRef]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goPrev, goNext]);

  // Reserve space for navbar/back-link/dots depending on chrome visibility
  const deckChrome = chromeHidden ? '5rem' : '13rem';

  return (
    <div ref={wrapperRef} className="w-full">
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
          <div
            ref={setRefs}
            className="keen-slider select-text"
            style={{ height: `min(${CANVAS_H}px, calc(100svh - ${deckChrome}))` }}
          >
            {SLIDES.map((Slide, i) => (
              <div key={i} className="keen-slider__slide gdg-fit-outer select-text">
                <div
                  className="gdg-fit-canvas"
                  style={{
                    width: CANVAS_W,
                    height: CANVAS_H,
                    transform: 'scale(var(--fit-scale, 1))',
                  }}
                >
                  <Slide />
                </div>
              </div>
            ))}
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

      {/* Rotate hint — CSS media query (orientation:portrait + max-width:639px) controls visibility */}
      <div className={`gdg-rotate-hint${hintDismissed ? ' is-dismissed' : ''}`}>
        <RotateCcw className="h-3.5 w-3.5 shrink-0" />
        <span>{t('rotateHint')}</span>
        <button
          type="button"
          aria-label={t('dismissHint')}
          onClick={() => setHintDismissed(true)}
          className="ml-1 font-semibold opacity-60 hover:opacity-100"
        >
          ×
        </button>
      </div>
    </div>
  );
}
