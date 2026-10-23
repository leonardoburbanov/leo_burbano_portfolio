// Stack section: grouped lists (copy) plus the logos that orbit (public/tech/<logo>.svg).
export type Tech = { name: string; logo?: string };

export const stackGroups: { id: 'ai' | 'backend' | 'data' | 'cloud'; items: Tech[] }[] = [
  {
    id: 'ai',
    items: [
      { name: 'LangGraph', logo: 'langgraph' },
      { name: 'LangChain', logo: 'langchain' },
      { name: 'PyTorch', logo: 'pytorch' },
      { name: 'Hugging Face', logo: 'huggingface' },
      { name: 'Gemini', logo: 'gemini' },
      { name: 'LlamaIndex' },
      { name: 'CrewAI' },
      { name: 'RAG' },
      { name: 'MCP' },
    ],
  },
  {
    id: 'backend',
    items: [
      { name: 'Python', logo: 'python' },
      { name: 'TypeScript', logo: 'typescript' },
      { name: 'FastAPI', logo: 'fastapi' },
      { name: 'NestJS', logo: 'nestjs' },
      { name: 'Next.js', logo: 'nextjs' },
      { name: 'React', logo: 'react' },
    ],
  },
  {
    id: 'data',
    items: [
      { name: 'BigQuery', logo: 'bigquery' },
      { name: 'MongoDB', logo: 'mongodb' },
      { name: 'Databricks', logo: 'databricks' },
      { name: 'MLflow', logo: 'mlflow' },
      { name: 'Supabase', logo: 'supabase' },
      { name: 'DuckDB', logo: 'duckdb' },
    ],
  },
  {
    id: 'cloud',
    items: [
      { name: 'Google Cloud', logo: 'googlecloud' },
      { name: 'AWS', logo: 'aws' },
      { name: 'Azure', logo: 'azure' },
    ],
  },
];

// Nodes of the stack graph: every technology that has a logo, tagged with its group.
export type StackNode = { name: string; logo: string; group: (typeof stackGroups)[number]['id'] };
export const stackNodes: StackNode[] = stackGroups.flatMap((g) =>
  g.items.filter((t): t is Tech & { logo: string } => !!t.logo).map((t) => ({ name: t.name, logo: t.logo, group: g.id })),
);

// A few fixed links across groups so the graph reads as one system.
export const crossLinks: [string, string][] = [
  ['LangGraph', 'Python'],
  ['PyTorch', 'Python'],
  ['FastAPI', 'Google Cloud'],
  ['MongoDB', 'NestJS'],
  ['BigQuery', 'Google Cloud'],
  ['Gemini', 'Google Cloud'],
  ['MLflow', 'PyTorch'],
  ['Next.js', 'TypeScript'],
];
