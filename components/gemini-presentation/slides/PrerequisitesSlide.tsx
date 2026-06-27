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
    <SlideFrame className="gap-4" slideNumber={2}>
      <div className="shrink-0">
        <h2 className="gdg-headline text-2xl leading-tight sm:text-3xl">{t('heading')}</h2>
        <p className="gdg-subhead mt-1 text-sm">{t('subtitle')}</p>
      </div>

      <ol className="flex min-h-0 flex-1 flex-col justify-center gap-2.5">
        {ITEMS.map((key, index) => (
          <li key={key} className="gdg-card flex items-start gap-3 px-4 py-3">
            <span className={`gdg-step-badge gdg-step-badge-${index % 4}`}>{index + 1}</span>
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
                <h3 className="gdg-headline text-sm">{t(`items.${key}.title`)}</h3>
                <a
                  href={ITEM_META[key].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gdg-link inline-flex items-center gap-1 text-xs"
                >
                  {t('installLink')}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <p className="gdg-subhead mt-0.5 text-xs leading-snug">
                {t(`items.${key}.description`)}
              </p>
            </div>
          </li>
        ))}

        <li className="gdg-card-highlight flex items-start gap-3 px-4 py-3">
          <span className="gdg-step-badge gdg-step-badge-0">6</span>
          <div className="min-w-0 flex-1">
            <h3 className="gdg-headline text-sm">{t('agentsCli.title')}</h3>
            <p className="gdg-subhead mt-0.5 text-xs leading-snug">{t('agentsCli.description')}</p>
            <code className="gdg-code mt-2 block overflow-x-auto whitespace-nowrap px-2.5 py-1 text-xs">
              {t('agentsCli.command')}
            </code>
            <a
              href={AGENTS_CLI_DOCS}
              target="_blank"
              rel="noopener noreferrer"
              className="gdg-link mt-2 inline-flex items-center gap-1 text-xs"
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
