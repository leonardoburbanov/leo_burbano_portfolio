import Reveal from '@/components/motion/Reveal';

type SectionHeadingProps = {
  title: string;
  description?: string;
};

export default function SectionHeading({ title, description }: SectionHeadingProps) {
  const words = title.split(' ');
  return (
    <Reveal className="reveal-words mb-14 sm:mb-20 max-w-3xl">
      <h2 className="headline">
        {words.map((word, i) => (
          <span key={i}>
            <span className="word" style={{ '--w': i } as React.CSSProperties}>
              {word}
            </span>
            {i < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </h2>
      {description && (
        <p className="lead word-block mt-5 max-w-2xl" style={{ '--w': words.length } as React.CSSProperties}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
