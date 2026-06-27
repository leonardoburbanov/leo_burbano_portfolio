'use client';

import { useTranslations } from 'next-intl';
import StepSlide from '../StepSlide';

/** Optional Google Cloud path: login, create agent, deploy. */
export default function GoogleCloudSlide() {
  const t = useTranslations('GeminiPresentation.slides.googleCloud');

  return (
    <StepSlide
      heading={t('heading')}
      subtitle={t('subtitle')}
      steps={[
        {
          number: 1,
          title: t('steps.login.title'),
          description: t('steps.login.description'),
          command: t('steps.login.command'),
        },
        {
          number: 2,
          title: t('steps.create.title'),
          description: t('steps.create.description'),
          command: t('steps.create.command'),
        },
        {
          number: 3,
          title: t('steps.deploy.title'),
          description: t('steps.deploy.description'),
          command: t('steps.deploy.command'),
          highlight: true,
        },
      ]}
    />
  );
}
