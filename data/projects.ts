export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "navbe-ai",
    title: "Navbe AI",
    description: "Open source testing and monitoring for reliable voice, chat and sales AI Agents",
    technologies: ["Python", "FastAPI", "LangChain", "React", "TypeScript", "Docker"],
    githubUrl: "https://github.com/navbe-ai",
    liveUrl: "https://navbe.ai",
    featured: true
  },
  {
    id: "ai-seo-agents",
    title: "AI Agents for SEO",
    description: "Automated SEO optimization using AI agents powered by n8n workflow automation",
    technologies: ["n8n", "JavaScript", "Node.js", "AI/ML", "SEO", "Automation"],
    githubUrl: "https://github.com/your-username/ai-seo-agents",
    liveUrl: "https://ai-seo-agents.demo.com",
    featured: true
  },
  {
    id: "natural-language-processing",
    title: "Natural Language Processing",
    description: "Natural language processing with AI agents for inventory management, customer support, and sales optimization",
    technologies: ["Python", "FastAPI", "AI/ML", "Ecommerce", "Automation", "PostgreSQL"],
    githubUrl: "https://github.com/your-username/natural-language-processing",
    liveUrl: "https://natural-language-processing.demo.com",
    featured: true
  },
  {
    id: "ai-ecommerce-agents",
    title: "AI Agents for Ecommerce",
    description: "Intelligent ecommerce automation with AI agents for inventory management, customer support, and sales optimization",
    technologies: ["Python", "FastAPI", "AI/ML", "Ecommerce", "Automation", "PostgreSQL"],
    githubUrl: "https://github.com/your-username/ai-ecommerce-agents",
    liveUrl: "https://ai-ecommerce-agents.demo.com",
    featured: true
  },
  {
    id: "small-llm-finetuning",
    title: "Fine-tuning a Small LLM",
    description: "Custom fine-tuning of small language models for domain-specific tasks with optimized performance and reduced resource requirements",
    technologies: ["Python", "PyTorch", "Transformers", "Hugging Face", "Machine Learning", "NLP"],
    githubUrl: "https://github.com/your-username/small-llm-finetuning",
    liveUrl: "https://small-llm-finetuning.demo.com",
    featured: true
  }
] as const; 