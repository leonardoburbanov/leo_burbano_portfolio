'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import FeaturedEventSpotlight from '@/components/FeaturedEventSpotlight';
import EventFreeBadge from '@/components/EventFreeBadge';
import { events, getFeaturedEvent } from '@/data/events';

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

  const tabClass = (active: boolean) =>
    `pb-2 text-[17px] transition-colors border-b ${
      active ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
    }`;

  return (
    <main className="min-h-screen pt-32 pb-28">
      <div className="mx-auto max-w-[1080px] px-5">
        <h1 className="display text-[clamp(3rem,8vw,5.5rem)]">{t('title')}</h1>
        <div className="mt-10 flex gap-8" role="tablist">
          <button type="button" role="tab" aria-selected={filter === 'upcoming'} onClick={() => setFilter('upcoming')} className={tabClass(filter === 'upcoming')}>
            {t('upcoming')}
          </button>
          <button type="button" role="tab" aria-selected={filter === 'past'} onClick={() => setFilter('past')} className={tabClass(filter === 'past')}>
            {t('past')}
          </button>
        </div>

        <div className="mt-12">
          {filter === 'upcoming' && <FeaturedEventSpotlight />}

          {filteredEvents.length === 0 ? (
            filter === 'past' || !getFeaturedEvent() ? (
              <p className="border-t border-border py-12 text-[17px] text-muted-foreground">
                {filter === 'past' ? t('emptyPast') : t('emptyUpcoming')}
              </p>
            ) : null
          ) : (
            <ul>
              {filteredEvents.map((event) => {
                const { dayMonth, weekday } = formatDateLabel(event.datetime);
                return (
                  <li key={event.id}>
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group grid grid-cols-[minmax(0,1fr)_auto] gap-6 border-t border-border py-8 md:grid-cols-[160px_minmax(0,1fr)_auto] md:gap-10"
                    >
                      <div className="col-span-2 md:col-span-1">
                        <p className="tabular text-[17px] font-semibold">{dayMonth}</p>
                        <p className="text-[15px] capitalize text-muted-foreground">
                          {weekday} · {formatTime(event.datetime)}
                        </p>
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-[clamp(1.35rem,2.4vw,1.75rem)] font-semibold tracking-[-0.02em] leading-snug transition-colors group-hover:text-blue-400">
                          {event.title}
                        </h2>
                        <p className="mt-1 text-[15px] text-muted-foreground">
                          {event.location} · {t('hostedBy')} {event.hosts}
                          {event.free && (
                            <>
                              {'  ·  '}
                              <EventFreeBadge />
                            </>
                          )}
                        </p>
                      </div>
                      <Image
                        src={event.image}
                        alt=""
                        width={96}
                        height={96}
                        className="h-16 w-16 rounded-xl object-cover md:h-20 md:w-20"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
