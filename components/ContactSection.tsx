import Image from 'next/image';
import { ChevronRight, LinkedinIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { heroData } from '@/data/hero-section';
import Reveal from '@/components/motion/Reveal';
import { socialLinks } from '@/lib/site';

export default function ContactSection() {
  const t = useTranslations('Contact');

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-36 scroll-mt-12">
      <div aria-hidden="true" className="stage-light absolute inset-0 -z-10 rotate-180" />
      <Reveal className="mx-auto flex max-w-[1080px] flex-col items-center px-5 text-center">
        <Image src={heroData.avatar} alt="" width={96} height={96} className="h-24 w-24 rounded-full object-cover" />
        <h2 className="display mt-10 text-[clamp(3rem,9vw,6rem)]">{t('title')}</h2>
        <p className="lead mt-6 max-w-[36ch]">{t('description')}</p>
        <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <LinkedinIcon className="h-[18px] w-[18px]" aria-hidden="true" />
            {t('cta')}
          </a>
          <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="link-chevron text-[17px]">
            {t('youtube')}
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
