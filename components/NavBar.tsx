'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Github, Instagram, LinkedinIcon, Menu, X, Youtube } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { localizedPath, socialLinks } from '@/lib/site';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

// Home sections; links resolve to the localized home page so they work from any route.
const sections = ['case-study', 'experience', 'projects', 'speaking', 'contact'] as const;
const sectionLabelKeys = {
  'case-study': 'caseStudy',
  experience: 'experience',
  projects: 'projects',
  speaking: 'speaking',
  contact: 'contact',
} as const;

const socials = [
  { href: socialLinks.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
  { href: socialLinks.github, label: 'GitHub', Icon: Github },
  { href: socialLinks.youtube, label: 'YouTube', Icon: Youtube },
  { href: socialLinks.instagram, label: 'Instagram', Icon: Instagram },
];

export default function NavBar() {
  const t = useTranslations('NavBar');
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState<string>('');
  const home = localizedPath(locale, '/');
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Highlight the link of the section currently in view (home page only).
  useEffect(() => {
    if (!isHome) {
      setActive('');
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -60% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  const linkClass = (isActive: boolean) =>
    `rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
      isActive ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-accent/60'
    }`;

  const navLinks = (
    <>
      {sections.map((id) => (
        <a key={id} href={`${home}#${id}`} className={linkClass(active === id)} onClick={() => setIsMenuOpen(false)}>
          {t(sectionLabelKeys[id])}
        </a>
      ))}
      <Link href="/blog" className={linkClass(pathname.startsWith('/blog'))} onClick={() => setIsMenuOpen(false)}>
        {t('blog')}
      </Link>
    </>
  );

  return (
    <nav className="fixed inset-x-0 top-3 z-40 px-3">
      <div
        className={`mx-auto max-w-6xl rounded-3xl border px-3 sm:px-4 transition-all duration-300 ${
          isScrolled || isMenuOpen
            ? 'border-border bg-background/80 backdrop-blur-xl shadow-lg shadow-foreground/5'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 rounded-full pr-2 hover:opacity-80 transition-opacity">
            <Image src="/foto_white.png" alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover" />
            <span className="hidden min-[400px]:inline whitespace-nowrap font-semibold text-lg">Leonardo Burbano</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">{navLinks}</div>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden xl:flex items-center">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-accent"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <LanguageToggle />
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={t('menu')}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-accent"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div id="mobile-menu" className="lg:hidden flex flex-col items-start gap-1 pb-4 pt-1">
            {navLinks}
            <div className="mt-2 flex items-center gap-1">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-accent"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
