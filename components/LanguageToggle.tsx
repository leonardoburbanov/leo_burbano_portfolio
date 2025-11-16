'use client';

import { Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'es' : 'en';
    
    // Navigate to the same path but with the new locale
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
      aria-label={`Switch to ${locale === 'en' ? 'Spanish' : 'English'}`}
      title={`Current: ${locale === 'en' ? 'English' : 'Español'}`}
    >
      <div className="relative w-5 h-5">
        <Globe className="w-5 h-5" />
        <span className="absolute -bottom-1 -right-1 text-[10px] font-bold bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center">
          {locale.toUpperCase()}
        </span>
      </div>
    </button>
  );
}

