'use client';

import { useTranslations } from 'next-intl';
import { GDG } from '../gdg-tokens';
import SlideFrame from '../SlideFrame';

type NodeVariant = 'start' | 'process' | 'accent' | 'secondary' | 'end';

const NODE_VARIANTS: Record<
  NodeVariant,
  { fill: string; stroke: string; title: string; subtitle: string }
> = {
  start: {
    fill: GDG.pastelGreen,
    stroke: GDG.green,
    title: GDG.black,
    subtitle: GDG.subheadGray,
  },
  process: {
    fill: GDG.pastelBlue,
    stroke: GDG.blue,
    title: GDG.black,
    subtitle: GDG.subheadGray,
  },
  accent: {
    fill: GDG.halftoneBlue,
    stroke: GDG.blue,
    title: GDG.black,
    subtitle: GDG.subheadGray,
  },
  secondary: {
    fill: GDG.pastelRed,
    stroke: GDG.red,
    title: GDG.black,
    subtitle: GDG.subheadGray,
  },
  end: {
    fill: GDG.pastelYellow,
    stroke: GDG.yellow,
    title: GDG.black,
    subtitle: GDG.subheadGray,
  },
};

interface FlowNodeProps {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  subtitle: string;
  variant: NodeVariant;
}

function FlowNode({ x, y, w, h, title, subtitle, variant }: FlowNodeProps) {
  const style = NODE_VARIANTS[variant];

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={14}
        ry={14}
        fill={style.fill}
        stroke={style.stroke}
        strokeWidth={1.5}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 - 4}
        textAnchor="middle"
        fill={style.title}
        fontSize={11}
        fontWeight={700}
      >
        {title}
      </text>
      <text
        x={x + w / 2}
        y={y + h / 2 + 12}
        textAnchor="middle"
        fill={style.subtitle}
        fontSize={9}
      >
        {subtitle}
      </text>
    </g>
  );
}

function FlowPill({ x, y, text }: { x: number; y: number; text: string }) {
  const paddingX = 8;
  const charW = 5.4;
  const w = Math.max(text.length * charW + paddingX * 2, 72);
  const h = 18;

  return (
    <g>
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        rx={9}
        ry={9}
        fill="#FFFFFF"
        stroke={GDG.black}
        strokeWidth={1}
      />
      <text x={x} y={y + 4} textAnchor="middle" fill={GDG.subheadGray} fontSize={8} fontWeight={600}>
        {text}
      </text>
    </g>
  );
}

function FlowConnector({
  d,
  color,
  label,
  labelX,
  labelY,
}: {
  d: string;
  color: string;
  label?: string;
  labelX?: number;
  labelY?: number;
}) {
  const markerId = `arrow-${color.replace('#', '')}`;

  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth={2} markerEnd={`url(#${markerId})`} />
      {label && labelX != null && labelY != null && <FlowPill x={labelX} y={labelY} text={label} />}
    </g>
  );
}

/** Production architecture flow diagram (GDG flow-chart style). */
function ArchitectureFlowDiagram({
  labels,
}: {
  labels: {
    ui: { title: string; subtitle: string };
    api: { title: string; subtitle: string };
    runtime: { title: string; subtitle: string };
    adk: { title: string; subtitle: string };
    db: { title: string; subtitle: string };
    chat: string;
    sessions: string;
    stream: string;
    dbEdge: string;
  };
}) {
  const markers = [
    { id: GDG.green.replace('#', ''), color: GDG.green },
    { id: GDG.blue.replace('#', ''), color: GDG.blue },
    { id: GDG.yellow.replace('#', ''), color: GDG.yellow },
    { id: GDG.red.replace('#', ''), color: GDG.red },
  ];

  return (
    <svg viewBox="0 0 760 290" className="h-full w-full" aria-hidden>
      <defs>
        {markers.map(({ id, color }) => (
          <marker
            key={id}
            id={`arrow-${id}`}
            markerWidth={8}
            markerHeight={8}
            refX={7}
            refY={4}
            orient="auto"
          >
            <polygon points="0 0, 8 4, 0 8" fill={color} />
          </marker>
        ))}
      </defs>

      <FlowNode x={24} y={108} w={128} h={58} variant="start" title={labels.ui.title} subtitle={labels.ui.subtitle} />
      <FlowNode x={196} y={108} w={136} h={58} variant="process" title={labels.api.title} subtitle={labels.api.subtitle} />
      <FlowNode x={388} y={108} w={128} h={58} variant="accent" title={labels.runtime.title} subtitle={labels.runtime.subtitle} />
      <FlowNode x={572} y={108} w={128} h={58} variant="end" title={labels.adk.title} subtitle={labels.adk.subtitle} />
      <FlowNode x={214} y={214} w={100} h={52} variant="secondary" title={labels.db.title} subtitle={labels.db.subtitle} />

      <FlowConnector
        d="M 152 137 L 196 137"
        color={GDG.green}
        label={labels.chat}
        labelX={174}
        labelY={118}
      />
      <FlowPill x={174} y={152} text={labels.sessions} />

      <FlowConnector
        d="M 332 137 L 388 137"
        color={GDG.blue}
        label={labels.stream}
        labelX={360}
        labelY={118}
      />

      <FlowConnector d="M 516 137 L 572 137" color={GDG.yellow} />

      <path
        d="M 264 166 L 264 188 L 264 214"
        fill="none"
        stroke={GDG.red}
        strokeWidth={2}
        markerEnd={`url(#arrow-${GDG.red.replace('#', '')})`}
      />
      <FlowPill x={264} y={200} text={labels.dbEdge} />
    </svg>
  );
}

/** Production architecture we deploy and demo in the workshop. */
export default function ProductionArchitectureSlide() {
  const t = useTranslations('GeminiPresentation.slides.productionArchitecture');

  return (
    <SlideFrame className="gap-3" slideNumber={6}>
      <div className="shrink-0">
        <h2 className="gdg-headline text-2xl leading-tight sm:text-3xl">{t('heading')}</h2>
        <p className="gdg-subhead mt-1 text-sm">{t('subtitle')}</p>
      </div>

      <div className="gdg-diagram-frame min-h-0 flex-1 p-3 sm:p-4">
        <ArchitectureFlowDiagram
          labels={{
            ui: { title: t('nodes.ui.title'), subtitle: t('nodes.ui.subtitle') },
            api: { title: t('nodes.api.title'), subtitle: t('nodes.api.subtitle') },
            runtime: { title: t('nodes.runtime.title'), subtitle: t('nodes.runtime.subtitle') },
            adk: { title: t('nodes.adk.title'), subtitle: t('nodes.adk.subtitle') },
            db: { title: t('nodes.db.title'), subtitle: t('nodes.db.subtitle') },
            chat: t('edges.chat'),
            sessions: t('edges.sessions'),
            stream: t('edges.stream'),
            dbEdge: t('edges.db'),
          }}
        />
      </div>
    </SlideFrame>
  );
}
