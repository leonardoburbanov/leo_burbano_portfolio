'use client';

import { useLocale, useTranslations } from 'next-intl';
import StepSlide from '../StepSlide';

const REPO_URL = 'https://github.com/leonardoburbanov/gemini-enterprise-agent-platform-workshop';
const AI_STUDIO_URL = 'https://aistudio.google.com/';

const CREATE_AGENT_CMD = {
  es: 'uv run agents-cli create buildaiagent --agent adk --prototype --api-key <aquí-va-tu-api-key>',
  en: 'uv run agents-cli create buildaiagent --agent adk --prototype --api-key <your-api-key-here>',
} as const;

/** Steps 7–10: clone repo, enter directory, API key, create agent. */
export default function RepoSetupSlide() {
  const t = useTranslations('GeminiPresentation.slides.repoSetup');
  const locale = useLocale();
  const createAgentCmd = CREATE_AGENT_CMD[locale as keyof typeof CREATE_AGENT_CMD] ?? CREATE_AGENT_CMD.en;

  return (
    <StepSlide
      heading={t('heading')}
      subtitle={t('subtitle')}
      steps={[
        {
          number: 7,
          title: t('steps.clone.title'),
          description: t('steps.clone.description'),
          href: REPO_URL,
          linkLabel: t('repoLink'),
          command: t('steps.clone.command'),
        },
        {
          number: 8,
          title: t('steps.enter.title'),
          description: t('steps.enter.description'),
          command: t('steps.enter.command'),
        },
        {
          number: 9,
          title: t('steps.apiKey.title'),
          description: t('steps.apiKey.description'),
          href: AI_STUDIO_URL,
          linkLabel: t('aiStudioLink'),
        },
        {
          number: 10,
          title: t('steps.createAgent.title'),
          description: t('steps.createAgent.description'),
          command: createAgentCmd,
          highlight: true,
        },
      ]}
    />
  );
}
