import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ChevronRight } from 'lucide-react';

/** Promotional banner for the GDG Build with AI EPN 2026 workshop. */
export default function GdgEventBanner() {
  return (
    <div className="pt-16">
      <Link
        href="/projects/gemini-enterprise-sales-agent"
        className="group block border-b border-border/60 bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-800 px-4 py-3 transition-colors hover:from-neutral-800 hover:via-neutral-900 hover:to-neutral-800 sm:px-6"
      >
        <div className="container mx-auto flex items-center gap-3 sm:gap-4">
          <Image
            src="/gdg_logo.png"
            alt="Google Developer Groups"
            width={36}
            height={36}
            className="h-8 w-8 shrink-0 object-contain sm:h-9 sm:w-9"
          />
          <p className="min-w-0 flex-1 text-xs font-medium leading-snug text-neutral-100 sm:text-sm">
            <span className="font-semibold text-white">Build with AI - EPN 2026:</span>{' '}
            Construye un Vendedor con IA, Usando Gemini Enterprise Agent Platform
          </p>
          <ChevronRight className="h-4 w-4 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-white sm:h-5 sm:w-5" />
        </div>
      </Link>
    </div>
  );
}
