import { ArrowUpRight, CalendarDays, Download, Mic, Presentation } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import SpotlightCard from '@/components/motion/SpotlightCard';
import { speaking } from '@/data/speaking';

const chipClass =
  'inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3.5 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent';

function ChipLink({ href, children }: { href: string; children: React.ReactNode }) {
  // PDFs in /public are plain files: no locale prefix, offered as a download.
  if (href.endsWith('.pdf')) {
    return (
      <a href={href} download target="_blank" rel="noopener noreferrer" className={chipClass}>
        {children}
      </a>
    );
  }
  return href.startsWith('/') ? (
    <Link href={href} className={chipClass}>
      {children}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" className={chipClass}>
      {children}
    </a>
  );
}

export default function SpeakingSection() {
  const t = useTranslations('Speaking');
  const locale = useLocale();

  return (
    <section id="speaking" className="relative py-24 bg-muted/40 border-y border-border/60 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />

          <div className="grid gap-4 md:grid-cols-2">
            {speaking.map((item, index) => {
              const slides = 'slides' in item ? item.slides : undefined;
              const url = 'url' in item ? item.url : undefined;
              const slidesInSpanish = item.id === 'devfest' && locale !== 'es';

              return (
                <Reveal key={item.id} delay={index * 90}>
                  <SpotlightCard className="flex h-full flex-col gap-4 p-6">
                    <div className="flex items-start gap-4">
                      <span className="rounded-xl bg-secondary p-2.5 text-secondary-foreground">
                        <Mic className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground">{t(`items.${item.id}.name`)}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{t(`items.${item.id}.detail`)}</p>
                      </div>
                    </div>
                    {(slides || url) && (
                      <div className="mt-auto flex flex-wrap items-center gap-2">
                        {slides && (
                          <ChipLink href={slides}>
                            {slides.endsWith('.pdf') ? (
                              <Download className="h-4 w-4" aria-hidden="true" />
                            ) : (
                              <Presentation className="h-4 w-4" aria-hidden="true" />
                            )}
                            {slides.endsWith('.pdf') ? t('slidesPdf') : t('slides')}
                            {!slides.endsWith('.pdf') && <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />}
                          </ChipLink>
                        )}
                        {url && (
                          <ChipLink href={url}>
                            <CalendarDays className="h-4 w-4" aria-hidden="true" />
                            {t('event')}
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </ChipLink>
                        )}
                        {slides && slidesInSpanish && (
                          <span className="text-xs text-muted-foreground">{t('slidesNote')}</span>
                        )}
                      </div>
                    )}
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-10">
            <Link href="/events" className="group inline-flex items-center gap-2 font-medium text-foreground">
              {t('allEvents')}
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
