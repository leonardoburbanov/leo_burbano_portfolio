import { ChevronRight, Download } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import Image from 'next/image';
import { speaking, speakingOrgs } from '@/data/speaking';

export default function SpeakingSection() {
  const t = useTranslations('Speaking');

  return (
    <section id="speaking" className="relative bg-surface py-20 sm:py-28 scroll-mt-12">
      <div className="mx-auto max-w-[1080px] px-5">
        <SectionHeading title={t('title')} description={t('description')} />

        <ul>
          {speaking.map((item, index) => {
            const slides = item.slides;
            const org = speakingOrgs[item.org];
            const isPdf = slides?.endsWith('.pdf');

            return (
              <Reveal as="li" key={item.id} delay={index * 80}>
                <div className="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-x-6 gap-y-3 border-t border-border py-8 md:grid-cols-[96px_minmax(0,1fr)_auto] md:gap-x-10">
                  <Image
                    src={org.src}
                    alt={org.name}
                    width={org.width}
                    height={org.height}
                    className={`h-auto w-full max-h-12 object-contain object-left ${org.mono ? 'logo-mono' : ''}`}
                  />
                  <div>
                    <h3 className="text-[clamp(1.35rem,2.4vw,1.75rem)] font-semibold tracking-[-0.02em] leading-snug">
                      {t(`items.${item.id}.name`)}
                    </h3>
                    <p className="mt-1 text-[17px] text-muted-foreground">{t(`items.${item.id}.detail`)}</p>
                  </div>
                  {slides && (
                    <div className="col-start-2 md:col-start-auto">
                      {isPdf ? (
                        <a href={slides} download target="_blank" rel="noopener noreferrer" className="link-chevron text-[17px]">
                          <Download className="h-4 w-4" aria-hidden="true" />
                          {t('slidesPdf')}
                        </a>
                      ) : (
                        <Link href={slides} className="link-chevron text-[17px]">
                          {t('slides')}
                          <ChevronRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="border-t border-border pt-8">
          <Link href="/events" className="link-chevron text-[17px]">
            {t('allEvents')}
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
