'use client';

import Image from 'next/image';
import { Calendar, MapPin } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import EventFreeBadge from '@/components/EventFreeBadge';
import { getFeaturedEvent } from '@/data/events';

export default function FeaturedEventSpotlight() {
  const t = useTranslations('FeaturedEvent');
  const locale = useLocale();
  const event = getFeaturedEvent();

  if (!event) return null;

  const dateLabel = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
  }).format(new Date(event.datetime));

  const timeLabel = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(event.datetime));

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-muted/10 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="relative h-40 sm:h-auto sm:w-48 shrink-0 bg-muted">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:p-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                      {t('badge')}
                    </span>
                    {event.free && <EventFreeBadge />}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
                    {event.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 shrink-0" />
                      {dateLabel}, {timeLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      {event.location}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t('hostedBy')} {event.hosts}
                  </p>
                </div>
                <span className="inline-flex w-fit items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground group-hover:bg-primary/90 transition-colors">
                  {t('getTickets')}
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
