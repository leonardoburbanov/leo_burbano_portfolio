'use client';

import { useTranslations } from 'next-intl';

export default function EventFreeBadge() {
  const t = useTranslations('EventsPage');

  return <span className="text-[13px] font-medium text-blue-400">{t('free')}</span>;
}
