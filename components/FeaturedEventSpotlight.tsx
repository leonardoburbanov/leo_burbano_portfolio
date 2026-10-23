'use client';

import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import EventFreeBadge from '@/components/EventFreeBadge';
import { getFeaturedEvent } from '@/data/events';

export default function FeaturedEventSpotlight() {
  const t = useTranslations('FeaturedEvent');
  const locale = useLocale();
  const event = getFeaturedEvent();

  if (!event) return null;

  const when = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(event.datetime));

  return (
    <a
      href={event.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid gap-8 border-t border-border py-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center md:gap-14"
    >
      <Image
        src={event.image}
        alt={event.title}
        width={640}
        height={640}
        className="aspect-square w-36 rounded-[4px] object-cover md:w-full md:max-w-sm"
      />
      <div>
        <h2 className="headline">{event.title}</h2>
        <p className="lead mt-5">{when}</p>
        <p className="mt-2 text-[17px] text-muted-foreground">
          {event.location} · {t('hostedBy')} {event.hosts}
          {event.free && (
            <>
              {'  ·  '}
              <EventFreeBadge />
            </>
          )}
        </p>
        <span className="btn-primary mt-8">
          {t('getTickets')}
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}
