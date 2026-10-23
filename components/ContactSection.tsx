import { LinkedinIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { socialLinks } from '@/lib/site';

export default function ContactSection() {
  const t = useTranslations('Contact');

  return (
    <section id="contact" className="py-20 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4 leading-tight">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">{t('description')}</p>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg bg-primary text-primary-foreground shadow-xl hover:shadow-primary/30 hover:bg-primary/90 transition-all duration-300 hover:scale-105"
          >
            <LinkedinIcon className="w-5 h-5" aria-hidden="true" />
            {t('cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
