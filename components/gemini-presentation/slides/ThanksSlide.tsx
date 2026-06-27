'use client';

import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import { useTranslations } from 'next-intl';
import SlideFrame from '../SlideFrame';

const TITLE_LINKS = [
  {
    key: 'frontend',
    href: 'https://nextjs-agent-client-363304624491.us-central1.run.app',
    icon: ExternalLink,
  },
  {
    key: 'backendRepo',
    href: 'https://github.com/leonardoburbanov/gemini-enterprise-agent-platform-workshop',
    icon: Github,
  },
] as const;

const PRESENTER_LINKS = [
  {
    key: 'linkedin',
    href: 'https://www.linkedin.com/in/leoburbano/',
    kind: 'linkedin',
  },
  {
    key: 'github',
    href: 'https://github.com/leonardoburbanov',
    kind: 'github',
  },
] as const;

const EXTRA_RESOURCES = [
  {
    key: 'platformDiagram',
    href: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/images/gemini-enterprise-agent-platform.svg',
  },
  {
    key: 'adkIntegrations',
    href: 'https://adk.dev/integrations/',
  },
] as const;

/** Slide 9: thank you, demo links, and extra resources. */
export default function ThanksSlide() {
  const t = useTranslations('GeminiPresentation.slides.thanks');
  const tTitle = useTranslations('GeminiPresentation.slides.title');

  return (
    <SlideFrame className="justify-center gap-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">{t('heading')}</h2>
        <p className="mt-1 text-sm text-neutral-600 sm:text-base">{t('subtitle')}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            {t('demoLinks')}
          </p>
          <div className="flex flex-wrap gap-2">
            {TITLE_LINKS.map(({ key, href, icon: Icon }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-100 sm:text-sm sm:px-4 sm:py-2"
              >
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {tTitle(`links.${key}`)}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            {t('extraResources')}
          </p>
          <div className="flex flex-col gap-1.5">
            {EXTRA_RESOURCES.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-blue-600 hover:underline sm:text-sm"
              >
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                {t(`resources.${key}`)}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">
          {t('presenter')}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/foto_white.png"
              alt={tTitle('presenterName')}
              width={56}
              height={56}
              className="h-12 w-12 shrink-0 rounded-full border-2 border-neutral-900 object-cover sm:h-14 sm:w-14"
            />
            <div>
              <p className="font-semibold text-neutral-900">{tTitle('presenterName')}</p>
              <p className="text-xs text-neutral-600 sm:text-sm">{tTitle('presenterTitle')}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
            {PRESENTER_LINKS.map(({ key, href, kind }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-800 transition-colors hover:bg-neutral-100 sm:text-sm"
              >
                {kind === 'linkedin' ? (
                  <Image
                    src="/logos/linkedin.png"
                    alt=""
                    width={14}
                    height={14}
                    className="h-3.5 w-3.5 shrink-0 opacity-70"
                    aria-hidden
                  />
                ) : (
                  <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                )}
                {t(`presenterLinks.${key}`)}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-neutral-200 pt-3 sm:gap-4">
          <Image
            src="/logos/mercately.png"
            alt="Mercately"
            width={80}
            height={20}
            className="h-4 w-auto max-w-[5rem] object-contain object-left opacity-50 sm:h-[1.125rem]"
          />
          <Image
            src="/logos/thoughtworks.png"
            alt="Thoughtworks"
            width={90}
            height={20}
            className="h-3.5 w-auto max-w-[5.5rem] object-contain object-left opacity-50 sm:h-4"
          />
          <Image
            src="/logos/latam.svg"
            alt="LATAM Airlines"
            width={64}
            height={20}
            className="h-4 w-auto max-w-[3.5rem] object-contain object-left opacity-50 sm:h-[1.125rem]"
          />
        </div>
      </div>
    </SlideFrame>
  );
}
