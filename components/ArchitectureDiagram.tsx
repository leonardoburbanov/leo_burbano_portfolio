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

function Box({ x, y, w, h, label, strong = false, size = 15 }: BoxProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={3}
        className={strong ? '' : 'fill-transparent stroke-foreground/25'}
        fill={strong ? 'url(#dg-blue)' : undefined}
        stroke={strong ? 'none' : undefined}
        strokeWidth={1}
      />
      <text
        x={x + w / 2}
        y={y + h / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={size}
        fontWeight={strong ? 600 : 500}
        className={strong ? '' : 'fill-foreground'}
        fill={strong ? '#fff' : undefined}
      >
        {label}
      </text>
    </g>
  );
}

function Flow({ d }: { d: string }) {
  return <path d={d} fill="none" strokeWidth={1.25} className="stroke-blue-400/60 dg-flow" />;
}

export default function ArchitectureDiagram() {
  const t = useTranslations('Diagram');

  const channels = ['WhatsApp', 'Instagram', 'Messenger', 'TikTok'];
  const connectors = [t('catalog'), t('calendar'), t('payments')];
  
  return (
    <svg
      viewBox="0 0 960 520"
      role="img"
      aria-labelledby="arch-title arch-desc"
      className="w-full h-auto font-sans"
    >
      <defs>
        <linearGradient id="dg-blue" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#3d6ef5" />
          <stop offset="1" stopColor="#5ccbe6" />
        </linearGradient>
      </defs>
      <title id="arch-title">{t('title')}</title>
      <desc id="arch-desc">{t('desc')}</desc>

      {/* Channels -> harness */}
      <text x={24} y={138} fontSize={13} fontWeight={600} letterSpacing={1.4} className="fill-muted-foreground">
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
      <rect x={250} y={100} width={470} height={360} rx={4} className="fill-transparent stroke-blue-400/70" strokeWidth={1} />
      <text x={273} y={130} fontSize={14} fontWeight={700} letterSpacing={1.4} className="fill-foreground">
        {t('harness').toUpperCase()}
      </text>

      <Box x={340} y={150} w={290} h={52} label={t('orchestrator')} strong />
      {[270, 420, 570].map((x) => (
        <Flow key={x} d={`M485 202 C 485 222, ${x + 65} 218, ${x + 65} 240`} />
      ))}
      <Box x={270} y={240} w={130} h={48} label={t('sales')} size={14} />
      <Box x={420} y={240} w={130} h={48} label={t('scheduling')} size={14} />
      <Box x={570} y={240} w={130} h={48} label={t('support')} size={14} />

      <Box x={270} y={318} w={130} h={48} label={t('llm')} size={14} />
      <Box x={420} y={318} w={130} h={48} label={t('memory')} size={14} />
      <Box x={570} y={318} w={130} h={48} label={t('tools')} size={14} />

      <Box x={270} y={392} w={210} h={44} label={t('guardrails')} size={14} />
      <Box x={490} y={392} w={210} h={44} label={t('observability')} size={14} />

      {/* Harness -> connectors */}
      <text x={760} y={166} fontSize={13} fontWeight={600} letterSpacing={1.4} className="fill-muted-foreground">
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
