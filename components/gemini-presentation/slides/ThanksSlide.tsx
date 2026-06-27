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

/** Slide 10: thank you, final demo screenshot, links, and presenter. */
export default function ThanksSlide() {
  const t = useTranslations('GeminiPresentation.slides.thanks');
  const tTitle = useTranslations('GeminiPresentation.slides.title');

  return (
    <SlideFrame className="gap-3" slideNumber={10}>
      <div className="shrink-0 text-center">
        <h2 className="gdg-headline text-xl sm:text-2xl">{t('heading')}</h2>
        <p className="gdg-subhead mt-0.5 text-xs sm:text-sm">{t('subtitle')}</p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 lg:flex-row lg:items-stretch">
        <div className="flex min-h-0 flex-1 flex-col gap-1.5">
          <p className="gdg-section-label">{t('finalResult')}</p>
          <div className="gdg-diagram-frame relative min-h-0 flex-1 overflow-hidden p-1.5 sm:p-2">
            <Image
              src="/demo.png"
              alt={t('imageAlt')}
              width={1600}
              height={900}
              className="h-full w-full object-contain object-center"
            />
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-3 lg:w-[36%]">
          <div>
            <p className="gdg-section-label mb-1.5">{t('demoLinks')}</p>
            <div className="flex flex-wrap gap-1.5">
              {TITLE_LINKS.map(({ key, href, icon: Icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gdg-btn px-2.5 py-1.5 text-xs"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tTitle(`links.${key}`)}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="gdg-section-label mb-1.5">{t('extraResources')}</p>
            <div className="flex flex-col gap-1">
              {EXTRA_RESOURCES.map(({ key, href }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gdg-link inline-flex items-center gap-1.5 text-xs"
                >
                  <ExternalLink className="h-3 w-3 shrink-0" />
                  {t(`resources.${key}`)}
                </a>
              ))}
            </div>
          </div>

          <div className="gdg-card px-3 py-2.5">
            <p className="gdg-section-label mb-2">{t('presenter')}</p>
            <div className="flex items-center gap-2.5">
              <Image
                src="/foto_white.png"
                alt={tTitle('presenterName')}
                width={48}
                height={48}
                className="h-10 w-10 shrink-0 rounded-full border-2 border-[#1e1e1e] object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="gdg-headline text-sm leading-tight">{tTitle('presenterName')}</p>
                <p className="gdg-subhead text-[11px] leading-snug">{tTitle('presenterTitle')}</p>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {PRESENTER_LINKS.map(({ key, href, kind }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gdg-pill px-2 py-1 text-[11px]"
                >
                  {kind === 'linkedin' ? (
                    <Image
                      src="/logos/linkedin.png"
                      alt=""
                      width={12}
                      height={12}
                      className="h-3 w-3 shrink-0 opacity-70"
                      aria-hidden
                    />
                  ) : (
                    <Github className="h-3 w-3" />
                  )}
                  {t(`presenterLinks.${key}`)}
                </a>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2.5 border-t border-[#1e1e1e]/20 pt-2">
              <Image
                src="/logos/mercately.png"
                alt="Mercately"
                width={72}
                height={18}
                className="h-3.5 w-auto max-w-[4.5rem] object-contain object-left opacity-50"
              />
              <Image
                src="/logos/thoughtworks.png"
                alt="Thoughtworks"
                width={80}
                height={18}
                className="h-3 w-auto max-w-[5rem] object-contain object-left opacity-50"
              />
              <Image
                src="/logos/latam.svg"
                alt="LATAM Airlines"
                width={56}
                height={18}
                className="h-3.5 w-auto max-w-[3rem] object-contain object-left opacity-50"
              />
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
