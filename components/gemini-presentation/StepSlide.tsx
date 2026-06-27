'use client';

import { ExternalLink } from 'lucide-react';
import SlideFrame from './SlideFrame';

export interface SlideStep {
  number: number;
  title: string;
  description?: string;
  command?: string;
  href?: string;
  linkLabel?: string;
  highlight?: boolean;
}

interface StepSlideProps {
  heading: string;
  subtitle?: string;
  steps: SlideStep[];
}

/** Numbered workshop steps with optional command blocks and links. */
export default function StepSlide({ heading, subtitle, steps }: StepSlideProps) {
  return (
    <SlideFrame className="gap-3">
      <div className="shrink-0">
        <h2 className="text-2xl font-bold leading-tight sm:text-3xl">{heading}</h2>
        {subtitle && <p className="mt-1 text-sm text-neutral-600">{subtitle}</p>}
      </div>

      <ol className="flex min-h-0 flex-1 flex-col justify-center gap-2">
        {steps.map((step) => (
          <li
            key={step.number}
            className={`flex items-start gap-3 rounded-xl px-4 py-2.5 sm:py-3 ${
              step.highlight
                ? 'border-2 border-neutral-900 bg-neutral-50'
                : 'border border-neutral-200 bg-neutral-50'
            }`}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white">
              {step.number}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h3 className="text-sm font-bold text-neutral-900">{step.title}</h3>
                {step.href && step.linkLabel && (
                  <a
                    href={step.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
                  >
                    {step.linkLabel}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
              {step.description && (
                <p className="mt-0.5 text-xs leading-snug text-neutral-600">{step.description}</p>
              )}
              {step.command && (
                <pre className="mt-1.5 overflow-x-auto rounded bg-neutral-900 px-2.5 py-1.5 font-mono text-[10px] leading-relaxed text-neutral-100 sm:text-xs">
                  <code>{step.command}</code>
                </pre>
              )}
            </div>
          </li>
        ))}
      </ol>
    </SlideFrame>
  );
}
