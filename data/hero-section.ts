export const heroData = {
  profile: {
    name: "Leonardo Burbano",
    title: "Tech Lead, Senior AI and Machine Learning Engineer",
    description: "Turning complex AI workflows into simple, reliable and scalable solutions.",
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
      url: "https://github.com/leonardoburbanov",
      ariaLabel: "GitHub"
    },
    {
      platform: "LinkedIn", 
      url: "https://www.linkedin.com/in/leoburbano/",
      ariaLabel: "LinkedIn"
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/leo.data.ai/",
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