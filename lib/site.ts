import { routing } from '@/i18n/routing';

export const SITE_URL = 'https://leonardoburbano.com';

export const socialLinks = {
  linkedin: 'https://www.linkedin.com/in/leoburbano',
  github: 'https://github.com/leonardoburbanov',
  instagram: 'https://www.instagram.com/leo.burbano.ai/',
  // Set the channel URL once it is live; the link stays hidden while empty.
  youtube: '',
} as const;

// Path for a locale under `localePrefix: 'as-needed'` (English has no prefix).
export function localizedPath(locale: string, path: string = '/'): string {
  const clean = path === '/' ? '' : path;
  return locale === routing.defaultLocale ? clean || '/' : `/${locale}${clean}`;
}

export function localizedUrl(locale: string, path: string = '/'): string {
  const localized = localizedPath(locale, path);
  return `${SITE_URL}${localized === '/' ? '' : localized}`;
}

// Canonical + hreflang alternates for a path that exists in every locale.
export function alternatesFor(locale: string, path: string = '/') {
  return {
    canonical: localizedUrl(locale, path),
    languages: {
      ...Object.fromEntries(routing.locales.map((l) => [l, localizedUrl(l, path)])),
      'x-default': localizedUrl(routing.defaultLocale, path),
    },
  };
}
