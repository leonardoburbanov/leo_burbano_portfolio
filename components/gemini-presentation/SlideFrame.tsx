import type { ReactNode } from 'react';

interface SlideFrameProps {
  children: ReactNode;
  className?: string;
}

/** Shared white slide shell with 16:10 aspect ratio. */
export default function SlideFrame({ children, className = '' }: SlideFrameProps) {
  return (
    <div
      className={`relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-neutral-900 bg-white p-6 sm:p-8 md:p-10 text-neutral-900 ${className}`}
    >
      {children}
    </div>
  );
}
