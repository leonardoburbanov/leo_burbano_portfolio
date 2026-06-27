'use client';

import Image from 'next/image';
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
  slideNumber?: number;
  image?: { src: string; alt: string };
}

/** Numbered workshop steps with optional command blocks and links. */
export default function StepSlide({ heading, subtitle, steps, slideNumber, image }: StepSlideProps) {
  const stepsList = (
    <ol className={`flex min-h-0 flex-col justify-center gap-2 ${image ? 'shrink-0 lg:max-w-[38%]' : 'flex-1'}`}>
        {steps.map((step) => (
          <li
            key={step.number}
            className={`flex items-start gap-3 px-4 py-2.5 sm:py-3 ${
              step.highlight ? 'gdg-card-highlight' : 'gdg-card'
            }`}
          >
            <span
              className={`gdg-step-badge gdg-step-badge-${(step.number - 1) % 4}`}
            >
              {step.number}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h3 className="gdg-headline text-sm">{step.title}</h3>
                {step.href && step.linkLabel && (
                  <a
                    href={step.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gdg-link inline-flex items-center gap-1 text-xs"
                  >
                    {step.linkLabel}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
              {step.description && (
                <p className="gdg-subhead mt-0.5 text-xs leading-snug">{step.description}</p>
              )}
              {step.command && (
                <pre className="gdg-code mt-1.5 overflow-x-auto px-2.5 py-1.5 text-[10px] leading-relaxed sm:text-xs">
                  <code>{step.command}</code>
                </pre>
              )}
            </div>
          </li>
        ))}
    </ol>
  );

  return (
    <SlideFrame className="gap-3" slideNumber={slideNumber}>
      <div className="shrink-0">
        <h2 className="gdg-headline text-2xl leading-tight sm:text-3xl">{heading}</h2>
        {subtitle && <p className="gdg-subhead mt-1 text-sm">{subtitle}</p>}
      </div>

      {image ? (
        <div className="flex min-h-0 flex-1 flex-col gap-3 lg:flex-row lg:items-stretch">
          {stepsList}
          <div className="gdg-diagram-frame relative min-h-0 flex-1 overflow-hidden p-2">
            <Image
              src={image.src}
              alt={image.alt}
              width={1600}
              height={900}
              className="h-full w-full object-contain object-center"
            />
          </div>
        </div>
      ) : (
        stepsList
      )}
    </SlideFrame>
  );
}
