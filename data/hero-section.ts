export const heroData = {
  profile: {
    name: "Leonardo Burbano",
    title: "Senior AI and Machine Learning Engineer",
    description: "Helping companies build AI-powered products and services.",
    avatar: {
      image: "/foto_white.png",
      alt: "Leonardo Burbano",
      fallback: "LB"
    }
  },
  techStack: [
    "Python",
    "FastAPI", 
    "PyTorch",
    "LangChain",
    "LangGraph",
    "CrewAI",
    "LlamaIndex",
    "AutoGen",
    "MLFlow",
    "Databricks",
    "React",
    "Next.js",
    "TypeScript"
  ],
  buttons: [
    {
      text: "Explore ML & AI Projects", 
      variant: "primary" as const,
      url: "#projects",
      icon: "Sparkles"
    }
  ],
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com",
      ariaLabel: "GitHub"
    },
    {
      platform: "LinkedIn", 
      url: "https://linkedin.com",
      ariaLabel: "LinkedIn"
    },
    {
      platform: "Instagram",
      url: "https://instagram.com",
      ariaLabel: "Instagram"
    }
  ],
  tools: [
    { name: "Webflow", icon: "/file.svg", url: "https://webflow.com" },
    { name: "Framer", icon: "/window.svg", url: "https://framer.com" },
    { name: "Figma", icon: "/globe.svg", url: "https://figma.com" },
    { name: "Notion", icon: "/next.svg", url: "https://notion.so" },
    { name: "SupaBase", icon: "/vercel.svg", url: "https://supabase.com" },
    { name: "Linear", icon: "/file.svg", url: "https://linear.app" },
    { name: "Vercel", icon: "/vercel.svg", url: "https://vercel.com" },
    { name: "Next.js", icon: "/next.svg", url: "https://nextjs.org" }
  ]
} as const; 