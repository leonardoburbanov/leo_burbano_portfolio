import { LinkedinIcon, Youtube } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/motion/Reveal';
import { socialLinks } from '@/lib/site';

export default function ContactSection() {
  const t = useTranslations('Contact');

  return (
    <section id="contact" className="relative py-24 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 sm:px-14 sm:py-20 text-center">
            <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-70" />
            <div aria-hidden="true" className="blob left-1/2 top-0 h-64 w-64 -translate-x-1/2" />
            <div className="relative">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">{t('eyebrow')}</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">{t('title')}</h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">{t('description')}</p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine inline-flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-xl shadow-foreground/10 transition-transform duration-300 hover:scale-105"
                >
                  <LinkedinIcon className="h-5 w-5" aria-hidden="true" />
                  {t('cta')}
                </a>
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-border bg-background/70 px-8 py-4 text-lg font-semibold text-foreground backdrop-blur transition-all duration-300 hover:border-foreground/40 hover:bg-accent"
                >
                  <Youtube className="h-5 w-5" aria-hidden="true" />
                  {t('youtube')}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
