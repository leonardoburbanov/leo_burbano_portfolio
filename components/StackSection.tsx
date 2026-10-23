import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import StackGraph from '@/components/motion/StackGraphLoader';
import { stackGroups } from '@/data/tech-stack';

export default function StackSection() {
  const t = useTranslations('Stack');

  return (
    <section id="stack" className="relative overflow-hidden py-20 sm:py-28 scroll-mt-12">
      <div className="mx-auto grid max-w-[1080px] items-center gap-16 px-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div>
          <SectionHeading title={t('title')} description={t('description')} />
          <dl className="-mt-4 sm:-mt-10">
            {stackGroups.map((group, index) => (
              <Reveal key={group.id} delay={index * 80}>
                <div className="grid gap-1 border-t border-border py-5 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6">
                  <dt className="text-[15px] text-muted-foreground">{t(`groups.${group.id}`)}</dt>
                  <dd className="text-[17px] leading-relaxed">{group.items.map((item) => item.name).join('  ·  ')}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal className="mx-auto w-full max-w-[560px]">
          <div className="aspect-square w-full">
            <StackGraph />
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">{t('hint')}</p>
        </Reveal>
      </div>
    </section>
  );
}
