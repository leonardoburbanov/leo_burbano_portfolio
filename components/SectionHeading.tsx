import Reveal from '@/components/motion/Reveal';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 max-w-3xl">
      <p className="mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        <span aria-hidden="true" className="h-px w-10 bg-foreground/40" />
        {eyebrow}
      </p>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent leading-tight pb-1">
        {title}
      </h2>
      {description && <p className="mt-4 text-lg text-muted-foreground">{description}</p>}
    </Reveal>
  );
}
