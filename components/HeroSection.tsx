'use client';

import { useState, useEffect } from 'react';
import { Github, LinkedinIcon, Download, Instagram, Sparkles } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { heroData } from '@/data/hero-section';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Show all tech stack badges
  const displayTechStack = heroData.techStack;

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 pt-16">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Profile image placeholder */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Avatar className="w-32 h-32 sm:w-40 sm:h-40 border-4 border-background shadow-2xl">
                <AvatarImage src={heroData.profile.avatar.image} alt={heroData.profile.avatar.alt} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-4xl font-bold">
                  {heroData.profile.avatar.fallback}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-background animate-pulse"></div>
            </div>
          </div>

          {/* Main content */}
          <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                {heroData.profile.name}
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-muted-foreground">
                {heroData.profile.title}
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {heroData.profile.description}
              </p>
            </div>

            {/* Tech stack badges with animation */}
            <div className="w-full max-w-4xl mx-auto pt-2 overflow-hidden">
              <div 
                className="flex gap-2 sm:gap-3 w-full justify-center"
                style={{
                  animation: 'scroll-left 50s linear infinite'
                }}
              >
                {/* Multiple sets of badges for seamless loop */}
                {[...Array(4)].map((_, setIndex) => 
                  displayTechStack.map((tech, index) => (
                    <span
                      key={`${tech}-set-${setIndex}-${index}`}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium border border-border/50 hover:bg-accent transition-colors whitespace-nowrap"
                    >
                      {tech}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              {heroData.buttons.map((button) => (
                <a 
                  key={button.text}
                  href={button.url}
                  onClick={(e) => {
                    if (button.url.startsWith('#')) {
                      e.preventDefault();
                      const element = document.querySelector(button.url);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  target={button.url.startsWith('http') || button.url.startsWith('/') ? '_blank' : undefined}
                  rel={button.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-110 hover:shadow-2xl overflow-hidden ${
                    button.variant === 'primary' 
                      ? 'bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground hover:from-primary/95 hover:via-primary/85 hover:to-primary/75 shadow-xl hover:shadow-primary/30 border-2 border-primary/20 hover:border-primary/40' 
                      : 'bg-secondary text-secondary-foreground hover:bg-accent border-2 border-border hover:border-accent'
                  }`}
                >
                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  
                  {/* Icon with enhanced animation */}
                  {button.icon && (
                    button.icon === 'Sparkles' ? (
                      <Sparkles className="w-6 h-6 group-hover:animate-pulse group-hover:scale-110 transition-all duration-300" />
                    ) : button.icon === 'Download' ? (
                      <Download className="w-5 h-5 group-hover:animate-bounce transition-transform duration-300" />
                    ) : null
                  )}
                  
                  {/* Text with enhanced underline */}
                  <span className="relative z-10">
                    {button.text}
                  </span>
                  
                  {/* Sparkle effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
                    <div className="absolute bottom-2 left-3 w-1 h-1 bg-blue-300 rounded-full animate-ping delay-100"></div>
                    <div className="absolute top-1/2 right-4 w-1.5 h-1.5 bg-pink-300 rounded-full animate-ping delay-200"></div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social links */}
            <div className="flex justify-center gap-4 pt-6">
              {heroData.socialLinks.map((social) => {
                const IconComponent = social.platform === 'GitHub' ? Github : social.platform === 'LinkedIn' ? LinkedinIcon : Instagram;
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-secondary text-secondary-foreground rounded-full hover:bg-accent transition-colors border border-border"
                    aria-label={social.ariaLabel}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 