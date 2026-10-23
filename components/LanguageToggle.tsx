'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

const locales = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Español' },
] as const;

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="inline-flex items-center gap-1.5 text-[13px]" role="group" aria-label="Language">
      {locales.map(({ code, label, name }) => {
        const isActive = locale === code;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            onClick={() => !isActive && router.replace(pathname, { locale: code })}
            aria-pressed={isActive}
            title={name}
            className={`transition-colors ${
              isActive ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
