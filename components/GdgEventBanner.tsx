'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';

const STORAGE_KEY = 'devfest-banner-dismissed';
const DEVFEST_URL =
  'https://discover.multiticketing.com/gdg-quito/events/google-quito-devfest?ref=WTWE32Y0';

export default function GdgEventBanner() {
  const pathname = usePathname();
  const t = useTranslations('FeaturedEvent');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) !== 'true') {
      setVisible(true);
    }
  }, []);

  if (pathname !== '/' || !visible) return null;

  const dismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    localStorage.setItem(STORAGE_KEY, 'true');
    window.dispatchEvent(new Event('gdg-banner-dismissed'));
    setVisible(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="relative">
        <a
          href={DEVFEST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group block border-b border-border/60 bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-800 px-4 py-3.5 pr-12 transition-colors hover:from-neutral-800 hover:via-neutral-900 hover:to-neutral-800 sm:px-6 sm:py-4 sm:pr-14"
        >
          <div className="container mx-auto flex items-center gap-3 sm:gap-4">
            <Image
              src="/event_images/devfest.png"
              alt="Google DevFest Quito 2026"
              width={36}
              height={36}
              className="h-8 w-8 shrink-0 rounded object-cover sm:h-9 sm:w-9"
            />
            <p className="min-w-0 flex-1 text-xs font-medium leading-snug text-neutral-100 sm:text-sm">
              <span className="font-semibold text-white">Google DevFest Quito 2026:</span>{' '}
              26 sept, 9:58 · Campus USFQ, Cumbayá · Por GDG Quito
            </p>
            <span className="hidden shrink-0 rounded-md bg-white/10 px-3 py-1.5 text-xs font-semibold text-white group-hover:bg-white/20 transition-colors sm:inline-block">
              {t('getTickets')}
            </span>
          </div>
        </a>

        <button
          onClick={dismiss}
          aria-label="Cerrar banner"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
