import { getTranslations } from 'next-intl/server';
import GeminiProjectPage from '@/components/gemini-presentation/GeminiProjectPage';

export default async function GeminiPresentationPage() {
  const t = await getTranslations('GeminiPresentation');

  return <GeminiProjectPage backToProjects={t('backToProjects')} />;
}
