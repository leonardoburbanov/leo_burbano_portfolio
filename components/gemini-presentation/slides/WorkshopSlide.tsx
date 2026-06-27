'use client';

import { ExternalLink, Github } from 'lucide-react';
import { useTranslations } from 'next-intl';
import SlideFrame from '../SlideFrame';

const BULLETS = ['learn', 'deploy', 'pattern'] as const;

const LINKS = [
  { key: 'github', href: 'https://github.com/leonardoburbanov/gemini-enterprise-agent-platform-workshop', icon: Github },
  { key: 'backend', href: 'https://fastapi-agent-client-363304624491.us-central1.run.app', icon: ExternalLink },
  { key: 'frontend', href: 'https://nextjs-agent-client-363304624491.us-central1.run.app', icon: ExternalLink },
] as const;

/** Workshop outcomes and live demo links. */
export default function WorkshopSlide() {
  const t = useTranslations('GeminiPresentation.slides.workshop');

  return (
    <SlideFrame>
      <h2 className="mb-6 text-2xl font-bold sm:text-3xl md:text-4xl">{t('heading')}</h2>

      <ul className="mb-8 flex flex-col gap-3">
        {BULLETS.map((bullet) => (
          <li key={bullet} className="flex items-start gap-3 text-sm sm:text-base">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
            <span className="text-neutral-700">{t(`bullets.${bullet}`)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-3">
        {LINKS.map(({ key, href, icon: Icon }) => (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100"
          >
            <Icon className="h-4 w-4" />
            {t(`links.${key}`)}
          </a>
        ))}
      </div>
    </SlideFrame>
  );
}
