import { useTranslations } from 'next-intl';

// Generic, multi-tenant agent harness. Labels only name public concepts (no internal details).
// Colors come from theme tokens so the diagram follows light/dark mode.

type BoxProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  strong?: boolean;
  size?: number;
};

function Box({ x, y, w, h, label, strong = false, size = 14 }: BoxProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={12}
        className={strong ? 'fill-primary stroke-primary' : 'fill-card stroke-border'}
        strokeWidth={1.5}
      />
      <text
        x={x + w / 2}
        y={y + h / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={size}
        fontWeight={strong ? 600 : 500}
        className={strong ? 'fill-primary-foreground' : 'fill-foreground'}
      >
        {label}
      </text>
    </g>
  );
}

function Flow({ d }: { d: string }) {
  return <path d={d} fill="none" strokeWidth={2} className="stroke-muted-foreground/70 dg-flow" />;
}

export default function ArchitectureDiagram() {
  const t = useTranslations('Diagram');

  const channels = ['WhatsApp', 'Instagram', 'Messenger', 'TikTok'];
  const connectors = [t('catalog'), t('calendar'), t('payments')];
  const tenants = [t('tenantA'), t('tenantB'), t('tenantN')];

  return (
    <svg
      viewBox="0 0 960 540"
      role="img"
      aria-labelledby="arch-title arch-desc"
      className="w-full h-auto font-sans"
    >
      <title id="arch-title">{t('title')}</title>
      <desc id="arch-desc">{t('desc')}</desc>

      {/* Tenant layers stacked behind the shared harness */}
      <rect x={270} y={80} width={470} height={360} rx={22} className="fill-muted/50 stroke-border" strokeWidth={1.5} />
      <rect x={260} y={90} width={470} height={360} rx={22} className="fill-muted/80 stroke-border" strokeWidth={1.5} />
      {tenants.map((label, i) => (
        <g key={label}>
          <rect x={286 + i * 104} y={46} width={96} height={26} rx={13} className="fill-card stroke-border" strokeWidth={1.5} />
          <text x={334 + i * 104} y={59} textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={500} className="fill-muted-foreground">
            {label}
          </text>
        </g>
      ))}

      {/* Channels -> harness */}
      <text x={24} y={138} fontSize={12} fontWeight={600} letterSpacing={1.4} className="fill-muted-foreground">
        {t('channels').toUpperCase()}
      </text>
      {channels.map((label, i) => {
        const y = 160 + i * 65;
        return (
          <g key={label}>
            <Box x={24} y={y} w={176} h={44} label={label} />
            <Flow d={`M200 ${y + 22} C 230 ${y + 22}, 232 280, 250 280`} />
          </g>
        );
      })}

      {/* Shared harness */}
      <rect x={250} y={100} width={470} height={360} rx={22} className="fill-background stroke-foreground/60" strokeWidth={2} />
      <text x={273} y={130} fontSize={13} fontWeight={700} letterSpacing={1.4} className="fill-foreground">
        {t('harness').toUpperCase()}
      </text>

      <Box x={340} y={150} w={290} h={52} label={t('orchestrator')} strong />
      {[270, 420, 570].map((x) => (
        <Flow key={x} d={`M485 202 C 485 222, ${x + 65} 218, ${x + 65} 240`} />
      ))}
      <Box x={270} y={240} w={130} h={48} label={t('sales')} size={13} />
      <Box x={420} y={240} w={130} h={48} label={t('scheduling')} size={13} />
      <Box x={570} y={240} w={130} h={48} label={t('support')} size={13} />

      <Box x={270} y={318} w={130} h={48} label={t('llm')} size={13} />
      <Box x={420} y={318} w={130} h={48} label={t('memory')} size={13} />
      <Box x={570} y={318} w={130} h={48} label={t('tools')} size={13} />

      <Box x={270} y={392} w={210} h={44} label={t('guardrails')} size={13} />
      <Box x={490} y={392} w={210} h={44} label={t('observability')} size={13} />

      {/* Harness -> connectors */}
      <text x={760} y={166} fontSize={12} fontWeight={600} letterSpacing={1.4} className="fill-muted-foreground">
        {t('connectors').toUpperCase()}
      </text>
      {connectors.map((label, i) => {
        const y = 186 + i * 72;
        return (
          <g key={label}>
            <Flow d={`M720 280 C 740 280, 738 ${y + 22}, 760 ${y + 22}`} />
            <Box x={760} y={y} w={176} h={44} label={label} />
          </g>
        );
      })}

      <text x={480} y={506} textAnchor="middle" fontSize={14} className="fill-muted-foreground">
        {t('caption')}
      </text>
    </svg>
  );
}
