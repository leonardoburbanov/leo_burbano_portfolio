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
    <div className="inline-flex items-center rounded-md border border-border p-0.5 text-xs font-semibold" role="group" aria-label="Language">
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
            className={`px-2 py-1 rounded transition-colors ${
              isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
