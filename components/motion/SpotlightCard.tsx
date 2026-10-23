'use client';

import { useRef } from 'react';

// Card whose hover glow follows the cursor (see .spotlight in globals.css).
export default function SpotlightCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={`spotlight rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-foreground/30 hover:shadow-xl hover:shadow-foreground/5 ${className}`}
    >
      {children}
    </div>
  );
}
