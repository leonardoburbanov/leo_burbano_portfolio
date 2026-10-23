import { ArrowRight, ArrowUpRight, Mic } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { speaking } from '@/data/speaking';

export default function SpeakingSection() {
  const t = useTranslations('Speaking');

  return (
    <section id="speaking" className="py-20 bg-gradient-to-b from-background to-muted/20 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4 leading-tight">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-3xl">{t('description')}</p>

          <ul className="divide-y divide-border border-y border-border max-w-3xl">
            {speaking.map((item) => {
              const content = (
                <>
                  <Mic className="w-5 h-5 mt-0.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{t(`items.${item.id}.name`)}</p>
                    <p className="text-sm text-muted-foreground">{t(`items.${item.id}.detail`)}</p>
                  </div>
                  {item.url && <ArrowUpRight className="w-4 h-4 mt-1 shrink-0 text-muted-foreground" aria-hidden="true" />}
                </>
              );
              const rowClass = 'flex gap-4 py-4';
              return (
                <li key={item.id}>
                  {!item.url ? (
                    <div className={rowClass}>{content}</div>
                  ) : item.url.startsWith('/') ? (
                    <Link href={item.url} className={`${rowClass} hover:opacity-80 transition-opacity`}>{content}</Link>
                  ) : (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className={`${rowClass} hover:opacity-80 transition-opacity`}>
                      {content}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          <Link href="/events" className="inline-flex items-center gap-2 mt-8 font-medium text-foreground hover:opacity-80 transition-opacity">
            {t('allEvents')}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
