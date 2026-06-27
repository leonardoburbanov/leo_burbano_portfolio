'use client';

import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import SlideFrame from '../SlideFrame';

const ITEMS = ['python', 'nodejs', 'uv', 'ide', 'aiStudio'] as const;

const ITEM_META: Record<
  (typeof ITEMS)[number],
  { href: string; src: string }
> = {
  python: {
    href: 'https://www.python.org/downloads/',
    src: '/logos/prerequisites/python.svg',
  },
  nodejs: {
    href: 'https://nodejs.org/en/download',
    src: '/logos/prerequisites/nodejs.svg',
  },
  uv: {
    href: 'https://docs.astral.sh/uv/getting-started/installation/',
    src: '/logos/prerequisites/uv.svg',
  },
  ide: {
    href: 'https://antigravity.google/',
    src: '/logos/prerequisites/antigravity.svg',
  },
  aiStudio: {
    href: 'https://aistudio.google.com/',
    src: '/logos/prerequisites/ai-studio.svg',
  },
};

const AGENTS_CLI_DOCS = 'https://google.github.io/agents-cli/';

/** Prerequisites and Agents CLI setup before the workshop. */
export default function PrerequisitesSlide() {
  const t = useTranslations('GeminiPresentation.slides.prerequisites');

  return (
    <SlideFrame className="gap-4">
      <div className="shrink-0">
        <h2 className="text-2xl font-bold leading-tight sm:text-3xl">{t('heading')}</h2>
        <p className="mt-1 text-sm text-neutral-600">{t('subtitle')}</p>
      </div>

      <ol className="flex min-h-0 flex-1 flex-col justify-center gap-2.5">
        {ITEMS.map((key, index) => (
          <li
            key={key}
            className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white">
              {index + 1}
            </span>
            <Image
              src={ITEM_META[key].src}
              alt=""
              width={24}
              height={24}
              className="mt-0.5 h-6 w-6 shrink-0 object-contain"
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h3 className="text-sm font-bold text-neutral-900">{t(`items.${key}.title`)}</h3>
                <a
                  href={ITEM_META[key].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
                >
                  {t('installLink')}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <p className="mt-0.5 text-xs leading-snug text-neutral-600">
                {t(`items.${key}.description`)}
              </p>
            </div>
          </li>
        ))}

        <li className="flex items-start gap-3 rounded-xl border-2 border-neutral-900 bg-neutral-50 px-4 py-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white">
            6
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-neutral-900">{t('agentsCli.title')}</h3>
            <p className="mt-0.5 text-xs leading-snug text-neutral-600">{t('agentsCli.description')}</p>
            <code className="mt-2 block overflow-x-auto whitespace-nowrap rounded bg-neutral-900 px-2.5 py-1 font-mono text-xs text-neutral-100">
              {t('agentsCli.command')}
            </code>
            <a
              href={AGENTS_CLI_DOCS}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
            >
              {t('agentsCli.docsLink')}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </li>
      </ol>
    </SlideFrame>
  );
}
