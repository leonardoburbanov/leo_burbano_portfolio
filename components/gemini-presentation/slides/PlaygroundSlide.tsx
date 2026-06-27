'use client';

import { useTranslations } from 'next-intl';
import StepSlide from '../StepSlide';

/** Step 11: open the ADK playground. */
export default function PlaygroundSlide() {
  const t = useTranslations('GeminiPresentation.slides.playground');

  return (
    <StepSlide
      heading={t('heading')}
      subtitle={t('subtitle')}
      steps={[
        {
          number: 11,
          title: t('steps.open.title'),
          description: t('steps.open.description'),
          command: t('steps.open.command'),
          highlight: true,
        },
      ]}
    />
  );
}
