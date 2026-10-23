import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

// Generated 1200×630 share card. To use a custom design instead, delete this
// file (and twitter-image.tsx) and add app/[locale]/opengraph-image.png.
export const alt = 'Leonardo Burbano, Senior AI Engineer & Tech Lead';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'OgImage' });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #171717 60%, #262626 100%)',
          color: '#fafafa',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>Leonardo Burbano</div>
          <div style={{ fontSize: 40, color: '#a3a3a3' }}>{t('title')}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ display: 'flex', fontSize: 34, lineHeight: 1.3, maxWidth: 1000 }}>
            {t('metric')}
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: '#737373' }}>
            Mercately (Techstars) · Taxflow (San Francisco) · Thoughtworks
          </div>
        </div>
      </div>
    ),
    size
  );
}
