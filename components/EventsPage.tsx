'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import FeaturedEventSpotlight from '@/components/FeaturedEventSpotlight';
import { events } from '@/data/events';

type Filter = 'upcoming' | 'past';

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export default function EventsPage() {
  const t = useTranslations('EventsPage');
  const locale = useLocale();
  const [filter, setFilter] = useState<Filter>('upcoming');

  const filteredEvents = useMemo(() => {
    const today = startOfToday();
    const list = events.filter((event) => {
      const eventDate = new Date(event.datetime);
      const matchesFilter = filter === 'upcoming' ? eventDate >= today : eventDate < today;
      const excludeFeatured = filter === 'upcoming' && event.featured;
      return matchesFilter && !excludeFeatured;
    });
    return filter === 'upcoming'
      ? list.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
      : list.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
  }, [filter]);

  const formatDateLabel = (datetime: string) => {
    const date = new Date(datetime);
    const dayMonth = new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'short',
    }).format(date);
    const weekday = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
    return { dayMonth, weekday };
  };

  const formatTime = (datetime: string) =>
    new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date(datetime));

  return (
    <div className="min-h-screen pt-20 pb-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{t('title')}</h1>
            <div className="inline-flex rounded-lg border border-border bg-muted/40 p-1">
              <button
                type="button"
                onClick={() => setFilter('upcoming')}
                className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                  filter === 'upcoming'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t('upcoming')}
              </button>
              <button
                type="button"
                onClick={() => setFilter('past')}
                className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                  filter === 'past'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t('past')}
              </button>
            </div>
          </div>
        </div>

        {filter === 'upcoming' && <FeaturedEventSpotlight />}

        <div className="max-w-3xl mx-auto">
          {filteredEvents.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              {filter === 'past' ? t('emptyPast') : t('emptyUpcoming')}
            </p>
          ) : (
            <div className="space-y-0">
              {filteredEvents.map((event, index) => {
                const { dayMonth, weekday } = formatDateLabel(event.datetime);
                const isLast = index === filteredEvents.length - 1;

                return (
                  <div key={event.id} className="flex gap-4 sm:gap-6">
                    <div className="w-16 sm:w-20 shrink-0 pt-4 text-right">
                      <p className="text-sm sm:text-base font-semibold text-foreground leading-tight">
                        {dayMonth}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize mt-0.5">{weekday}</p>
                    </div>

                    <div className="relative flex flex-col items-center">
                      <div className="mt-5 h-2.5 w-2.5 rounded-full bg-border ring-4 ring-background" />
                      {!isLast && <div className="w-px flex-1 bg-border min-h-8" />}
                    </div>

                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex-1 min-w-0 mb-6 bg-card border border-border rounded-xl p-4 sm:p-5 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                    >
                      <div className="flex gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-muted-foreground mb-1">
                            {formatTime(event.datetime)}
                          </p>
                          <h2 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
                            {event.title}
                          </h2>
                          <p className="text-sm text-muted-foreground mb-2">
                            {t('hostedBy')} {event.hosts}
                          </p>
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 shrink-0" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <div className="shrink-0">
                          <Image
                            src={event.image}
                            alt={event.title}
                            width={80}
                            height={80}
                            className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg object-cover"
                          />
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
