export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  frontendGithubUrl?: string;
  liveUrl?: string;
  frontendLiveUrl?: string;
  image?: string;
  featured?: boolean;
  comingSoon?: boolean;
  presentationPath?: string;
}

export const projects: Project[] = [
  {
    id: "navbe-ai",
    title: "Navbe",
    description: "The workflow brain for AI agents and teams — schedule recurring workflows with persistent context via MCP. Built with a FastAPI orchestrator and Next.js dashboard.",
    technologies: ["Python", "FastAPI", "FastMCP", "Next.js", "React", "TypeScript", "DuckDB"],
    githubUrl: "https://github.com/leonardoburbanov/navbe_ai_orchestrator_backend",
    frontendGithubUrl: "https://github.com/leonardoburbanov/navbe_ai_orchestrator_frontend",
    liveUrl: "https://navbeaiorchestratorwebpage.vercel.app/",
    featured: true
  },
  {
    id: "gemini-enterprise-sales-agent",
    title: "Gemini Enterprise Sales Agent",
    description: "Workshop and reference implementation of a sales agent built with Google ADK and the Gemini Enterprise platform, with FastAPI and Next.js clients and cloud deployment.",
    technologies: ["Python", "FastAPI", "Google ADK", "Gemini Enterprise", "Next.js", "TypeScript"],
    githubUrl: "https://github.com/leonardoburbanov/gemini-enterprise-agent-platform-workshop",
    liveUrl: "https://fastapi-agent-client-363304624491.us-central1.run.app",
    frontendLiveUrl: "https://nextjs-agent-client-363304624491.us-central1.run.app",
    presentationPath: "/projects/gemini-enterprise-sales-agent",
    featured: true
  },
  {
    id: "small-llm-finetuning",
    title: "Fine-tuning a Small LLM",
    description: "Custom fine-tuning of small language models for domain-specific tasks with optimized performance and reduced resource requirements",
    technologies: ["Python", "PyTorch", "Transformers", "Hugging Face", "Machine Learning", "NLP"],
    comingSoon: true,
    featured: true
  }
] as const; 