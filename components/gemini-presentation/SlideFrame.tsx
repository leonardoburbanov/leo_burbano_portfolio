'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

export const SLIDE_TOTAL = 10;

const BUILD_WITH_AI_LOGO =
  'https://h2svision.github.io/publicAssets/buildWithAi/heroBgMobile.png';

interface SlideFrameProps {
  children: ReactNode;
  className?: string;
  slideNumber?: number;
}

/** Shared white slide shell with 16:10 aspect ratio. */
export default function SlideFrame({ children, className = '', slideNumber }: SlideFrameProps) {
  const t = useTranslations('GeminiPresentation');
  const showBuildWithAiLogo = slideNumber != null && slideNumber !== 1;
  const showSlideFooter =
    slideNumber != null && slideNumber !== 1 && slideNumber !== SLIDE_TOTAL;

  return (
    <div
      className={`gdg-body relative flex h-full w-full select-text flex-col overflow-hidden rounded-3xl border border-[#1e1e1e] bg-white p-6 sm:p-8 md:p-10 ${className}`}
    >
      {showBuildWithAiLogo && (
        // ponytail: plain img — external host not in next/image remotePatterns
        <img
          src={BUILD_WITH_AI_LOGO}
          alt="Build with AI"
          className="gdg-buildwithai-logo pointer-events-none absolute right-4 top-4 z-10 sm:right-6 sm:top-5 md:right-8 md:top-6"
        />
      )}
      {children}
      {showSlideFooter && (
        <span className="gdg-slide-chrome gdg-slide-footer pointer-events-none absolute bottom-4 left-4 sm:bottom-5 sm:left-5 md:bottom-6 md:left-6">
          {t('slideFooter')}
        </span>
      )}
      {slideNumber != null && (
        <span className="gdg-slide-chrome gdg-slide-number pointer-events-none absolute bottom-4 right-4 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6">
          {slideNumber} / {SLIDE_TOTAL}
        </span>
      )}
    </div>
  );
}
