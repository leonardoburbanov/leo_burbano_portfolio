'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link, usePathname } from '@/i18n/routing';
import { ChevronRight, X } from 'lucide-react';

const STORAGE_KEY = 'gdg-banner-dismissed';

export default function GdgEventBanner() {
  const pathname = usePathname();
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
        <Link
          href="/projects/gemini-enterprise-sales-agent"
          className="group block border-b border-border/60 bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-800 px-4 py-3 pr-12 transition-colors hover:from-neutral-800 hover:via-neutral-900 hover:to-neutral-800 sm:px-6 sm:pr-14"
        >
          <div className="container mx-auto flex items-center gap-3 sm:gap-4">
            <Image
              src="/gdg_logo.png"
              alt="Google Developer Groups"
              width={36}
              height={36}
              className="h-8 w-8 shrink-0 object-contain sm:h-9 sm:w-9"
            />
            <p className="min-w-0 flex-1 text-xs font-medium leading-snug text-neutral-100 sm:text-sm">
              <span className="font-semibold text-white">Build with AI - EPN 2026:</span>{' '}
              Construye un Vendedor con IA, Usando Gemini Enterprise Agent Platform
            </p>
            <ChevronRight className="h-4 w-4 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-white sm:h-5 sm:w-5" />
          </div>
        </Link>

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
