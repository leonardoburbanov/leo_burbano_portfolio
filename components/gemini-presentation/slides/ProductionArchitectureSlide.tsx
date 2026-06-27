'use client';

import { useTranslations } from 'next-intl';
import SlideFrame from '../SlideFrame';

type NodeVariant = 'start' | 'process' | 'accent' | 'secondary' | 'end';

const NODE_VARIANTS: Record<
  NodeVariant,
  { fill: string; stroke: string; title: string; subtitle: string }
> = {
  start: {
    fill: '#86EFAC',
    stroke: '#15803D',
    title: '#14532D',
    subtitle: '#166534',
  },
  process: {
    fill: '#DBEAFE',
    stroke: '#1D4ED8',
    title: '#1E3A8A',
    subtitle: '#1E40AF',
  },
  accent: {
    fill: '#93C5FD',
    stroke: '#1D4ED8',
    title: '#1E3A8A',
    subtitle: '#1E40AF',
  },
  secondary: {
    fill: '#FECDD3',
    stroke: '#BE123C',
    title: '#881337',
    subtitle: '#9F1239',
  },
  end: {
    fill: '#FDE68A',
    stroke: '#D97706',
    title: '#92400E',
    subtitle: '#B45309',
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
        stroke="#171717"
        strokeWidth={1}
      />
      <text x={x} y={y + 4} textAnchor="middle" fill="#404040" fontSize={8} fontWeight={600}>
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
  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth={2} markerEnd={`url(#arrow-${color.replace('#', '')})`} />
      {label && labelX != null && labelY != null && <FlowPill x={labelX} y={labelY} text={label} />}
    </g>
  );
}

/** Production architecture flow diagram (flow-chart style). */
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
    { id: '22c55e', color: '#22C55E' },
    { id: '3b82f6', color: '#3B82F6' },
    { id: 'f59e0b', color: '#F59E0B' },
    { id: 'f472b6', color: '#F472B6' },
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

      {/* Main row nodes */}
      <FlowNode x={24} y={108} w={128} h={58} variant="start" title={labels.ui.title} subtitle={labels.ui.subtitle} />
      <FlowNode x={196} y={108} w={136} h={58} variant="process" title={labels.api.title} subtitle={labels.api.subtitle} />
      <FlowNode x={388} y={108} w={128} h={58} variant="accent" title={labels.runtime.title} subtitle={labels.runtime.subtitle} />
      <FlowNode x={572} y={108} w={128} h={58} variant="end" title={labels.adk.title} subtitle={labels.adk.subtitle} />
      <FlowNode x={214} y={214} w={100} h={52} variant="secondary" title={labels.db.title} subtitle={labels.db.subtitle} />

      {/* Connectors */}
      <FlowConnector
        d="M 152 137 L 196 137"
        color="#22C55E"
        label={labels.chat}
        labelX={174}
        labelY={118}
      />
      <FlowPill x={174} y={152} text={labels.sessions} />

      <FlowConnector
        d="M 332 137 L 388 137"
        color="#3B82F6"
        label={labels.stream}
        labelX={360}
        labelY={118}
      />

      <FlowConnector d="M 516 137 L 572 137" color="#F59E0B" />

      {/* API → DB (orthogonal) */}
      <path
        d="M 264 166 L 264 188 L 264 214"
        fill="none"
        stroke="#F472B6"
        strokeWidth={2}
        markerEnd="url(#arrow-f472b6)"
      />
      <FlowPill x={264} y={200} text={labels.dbEdge} />
    </svg>
  );
}

/** Production architecture we deploy and demo in the workshop. */
export default function ProductionArchitectureSlide() {
  const t = useTranslations('GeminiPresentation.slides.productionArchitecture');

  return (
    <SlideFrame className="gap-3">
      <div className="shrink-0">
        <h2 className="text-2xl font-bold leading-tight sm:text-3xl">{t('heading')}</h2>
        <p className="mt-1 text-sm text-neutral-600">{t('subtitle')}</p>
      </div>

      <div className="min-h-0 flex-1 rounded-3xl border border-neutral-300 bg-neutral-50/80 p-3 sm:p-4">
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
