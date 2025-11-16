'use client';

import { useState, useEffect } from 'react';
import { Github, Instagram, LinkedinIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

export default function NavBar() {
  const t = useTranslations('NavBar');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Check if we're on a blog page
  const isBlogPage = pathname?.startsWith('/blog') || false;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <Link href="/">
              <Avatar className="w-8 h-8 cursor-pointer">
                <AvatarImage src="/foto_white.png" alt="Leonardo Burbano" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold text-sm">
                  LB
                </AvatarFallback>
              </Avatar>
            </Link>
            <Link href="/">
              <span className="font-semibold text-lg bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
                Leonardo Burbano
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {isBlogPage ? (
              // Blog navigation
              <>
                <Link 
                  href="/blog" 
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  {t('blog')}
                </Link>
                <Link 
                  href="/" 
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  {t('portfolio')}
                </Link>
              </>
            ) : (
              // Portfolio navigation
              <>
                <a 
                  href="#home" 
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  {t('home')}
                </a>
                <a 
                  href="#projects" 
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  {t('projects')}
                </a>
                <Link 
                  href="/blog" 
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  {t('blog')}
                </Link>
              </>
            )}
          </div>

          {/* Right side - Social links and theme toggle */}
          <div className="flex items-center space-x-4">
            {/* Social Links */}
            <div className="hidden sm:flex items-center space-x-2">
              <a
                href="https://github.com/leonardoburbanov"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/leoburbano/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/leo.data.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            {/* Language Toggle */}
            <LanguageToggle />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 