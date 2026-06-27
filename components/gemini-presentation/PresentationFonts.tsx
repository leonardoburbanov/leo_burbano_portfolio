'use client';

import { Roboto, Roboto_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import './gdg-theme.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-gdg-sans-loaded',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['300'],
  variable: '--font-gdg-mono-loaded',
});

interface PresentationFontsProps {
  children: ReactNode;
}

/** Loads Roboto + Roboto Mono scoped to the presentation subtree. */
export default function PresentationFonts({ children }: PresentationFontsProps) {
  return (
    <div className={`gemini-presentation ${roboto.variable} ${robotoMono.variable}`}>
      {children}
    </div>
  );
}
