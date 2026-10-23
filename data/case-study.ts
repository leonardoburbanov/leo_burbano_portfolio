export const caseStudy = {
  // Drop the diagram in /public (e.g. /case-study/mercately-architecture.svg) and set its path here.
  architectureDiagram: null as string | null,
  metrics: [
    { value: '1M+', labelKey: 'requests' },
    { value: '1,500+', labelKey: 'businesses' },
    { value: '20+', labelKey: 'countries' },
    { value: '50%', labelKey: 'cost' },
  ],
  stack: ['Python', 'TypeScript', 'LangGraph', 'RAG', 'MCP', 'Google Cloud', 'FastAPI', 'NestJS', 'Next.js'],
} as const;
