'use client';

import { useState } from 'react';
import { LinkedinIcon, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { socialLinks } from '@/lib/site';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactSection() {
  const t = useTranslations('Contact');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring';

  return (
    <section id="contact" className="py-20 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4 leading-tight">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-3xl">{t('description')}</p>

          <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">{t('name')}</label>
                <input id="contact-name" name="name" type="text" required maxLength={100} autoComplete="name" className={inputClass} />
              </div>
              <div>
                <label htmlFor="contact-company" className="block text-sm font-medium text-foreground mb-2">{t('company')}</label>
                <input id="contact-company" name="company" type="text" maxLength={120} autoComplete="organization" className={inputClass} />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">{t('message')}</label>
              <textarea id="contact-message" name="message" required maxLength={5000} rows={5} className={inputClass} />
            </div>

            {/* Honeypot: hidden from people and assistive tech, filled by bots */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="contact-website">{t('honeypot')}</label>
              <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                {status === 'sending' ? t('sending') : t('send')}
              </button>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold bg-secondary text-secondary-foreground border border-border hover:bg-accent transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" aria-hidden="true" />
                LinkedIn
              </a>
            </div>

            <p role="status" aria-live="polite" className="text-sm min-h-5">
              {status === 'success' && <span className="text-green-500">{t('success')}</span>}
              {status === 'error' && <span className="text-destructive">{t('error')}</span>}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
