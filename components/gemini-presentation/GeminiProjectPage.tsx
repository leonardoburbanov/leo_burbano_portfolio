'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import NavBar from '@/components/NavBar';
import GeminiPresentation from '@/components/gemini-presentation/GeminiPresentation';
import { ArrowLeft } from 'lucide-react';

interface GeminiProjectPageProps {
  backToProjects: string;
}

/** Project page shell with optional chrome (navbar + back link) toggle for small screens. */
export default function GeminiProjectPage({ backToProjects }: GeminiProjectPageProps) {
  const [chromeHidden, setChromeHidden] = useState(false);

  return (
    <>
      {!chromeHidden && <NavBar />}
      <div
        className={`min-h-screen bg-[#F1F3F4] ${chromeHidden ? 'pt-2 pb-4' : 'pt-20 pb-16'}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {!chromeHidden && (
            <Link
              href="/#projects"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-neutral-900"
            >
              <ArrowLeft className="h-4 w-4" />
              {backToProjects}
            </Link>
          )}
          <GeminiPresentation
            chromeHidden={chromeHidden}
            onToggleChrome={() => setChromeHidden((v) => !v)}
          />
        </div>
      </div>
    </>
  );
}
