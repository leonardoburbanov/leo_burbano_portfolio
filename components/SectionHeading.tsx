import Reveal from '@/components/motion/Reveal';

type SectionHeadingProps = {
  title: string;
  description?: string;
};

export default function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-14 sm:mb-20 max-w-3xl">
      <h2 className="headline">{title}</h2>
      {description && <p className="lead mt-5 max-w-2xl">{description}</p>}
    </Reveal>
  );
}
