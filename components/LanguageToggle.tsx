'use client';

import { Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useState } from 'react';

export default function LanguageToggle() {
  const locale = useLocale();
  const [isChanging, setIsChanging] = useState(false);

  const toggleLanguage = () => {
    if (isChanging) return;
    
    const newLocale = locale === 'en' ? 'es' : 'en';
    
    setIsChanging(true);
    
    // Set cookie
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Reload the page to apply the new locale
    window.location.reload();
  };

  return (
    <button
      onClick={toggleLanguage}
      disabled={isChanging}
      className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent disabled:opacity-50"
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

