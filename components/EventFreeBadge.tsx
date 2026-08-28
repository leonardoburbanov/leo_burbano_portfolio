'use client';

import { useTranslations } from 'next-intl';

export default function EventFreeBadge() {
  const t = useTranslations('EventsPage');

  return (
    <span className="inline-block rounded-full bg-green-500/15 px-2.5 py-0.5 text-xs font-semibold text-green-400">
      {t('free')}
    </span>
  );
}
