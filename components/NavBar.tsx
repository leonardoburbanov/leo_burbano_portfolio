'use client';

import { useState, useEffect } from 'react';
import { Github, Instagram, LinkedinIcon, Menu, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { localizedPath, socialLinks } from '@/lib/site';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import Image from 'next/image';

// Home sections; links resolve to the localized home page so they work from any route.
const sections = ['case-study', 'experience', 'projects', 'speaking', 'contact'] as const;
const sectionLabelKeys = {
  'case-study': 'caseStudy',
  experience: 'experience',
  projects: 'projects',
  speaking: 'speaking',
  contact: 'contact',
} as const;

export default function NavBar() {
  const t = useTranslations('NavBar');
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const home = localizedPath(locale, '/');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass = 'text-muted-foreground hover:text-foreground transition-colors font-medium';
  const navLinks = (
    <>
      {sections.map((id) => (
        <a key={id} href={`${home}#${id}`} className={linkClass} onClick={() => setIsMenuOpen(false)}>
          {t(sectionLabelKeys[id])}
        </a>
      ))}
      <Link href="/blog" className={linkClass} onClick={() => setIsMenuOpen(false)}>
        {t('blog')}
      </Link>
    </>
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled || isMenuOpen
        ? 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm'
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Image src="/foto_white.png" alt="" width={32} height={32} className="w-8 h-8 rounded-full object-cover" />
            <span className="hidden min-[400px]:inline whitespace-nowrap font-semibold text-lg bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Leonardo Burbano
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">{navLinks}</div>

          {/* Right side - Social links and toggles */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden sm:flex items-center space-x-1">
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
                aria-label="Instagram (content)"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <LanguageToggle />
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={t('menu')}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div id="mobile-menu" className="lg:hidden flex flex-col gap-4 pb-6 pt-2">
            {navLinks}
          </div>
        )}
      </div>
    </nav>
  );
}
