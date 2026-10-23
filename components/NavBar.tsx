'use client';

import { useState, useEffect } from 'react';
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
    `text-[13px] tracking-[-0.005em] transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`;

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
    <nav
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        isScrolled || isMenuOpen
          ? 'border-b border-border bg-background/75 backdrop-blur-xl backdrop-saturate-150'
          : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-12 max-w-[1080px] items-center justify-between px-5">
        <Link href="/" className="text-[15px] font-semibold tracking-[-0.02em] hover:opacity-70 transition-opacity">
          Leonardo Burbano
        </Link>

        <div className="hidden lg:flex items-center gap-7">{navLinks}</div>

        <div className="flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
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
            className="lg:hidden -mr-1 p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className="lg:hidden mx-auto max-w-[1080px] px-5 pb-8 pt-2">
          <div className="flex flex-col gap-4 [&>a]:text-2xl [&>a]:font-semibold [&>a]:tracking-[-0.02em] [&>a]:text-foreground">
            {navLinks}
          </div>
          <div className="mt-8 flex items-center gap-5">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
