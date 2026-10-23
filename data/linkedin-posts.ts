// Featured LinkedIn posts, rendered as LinkedIn-style preview cards (text clamped, images below).
// Images live in /public/posts. Add a post: url + text + images (1 = hero, 2-4 = grid).
export type LinkedInPost = { url: string; text: string; images: string[] };

export const linkedinPosts: LinkedInPost[] = [
  {
    url: 'https://lnkd.in/p/ed3mEvrW',
    text: 'Explicar el "agent harness" en simples palabras parecería difícil, pero hablando con mi esposa llegué a esta analogía: un modelo como Gemini, Claude o ChatGPT es como un colaborador muy talentoso en su primer día de trabajo. Sabe mucho, pero no conoce tu empresa, tus clientes, tus procesos, ni tus reglas.',
    images: ['/posts/harness-1.jpg', '/posts/harness-2.jpg', '/posts/harness-3.jpg', '/posts/harness-4.jpg'],
  },
  {
    url: 'https://lnkd.in/p/eYRjKiXk',
    text: 'Los rumores sobre GPT Astra: 1. Ha logrado avances en grandes problemas matemáticos: "Empaquetamiento de esferas en altas dimensiones". 2. Va a estar carísimo, GPT Sol está en 4 USD el millón de tokens de input y 20 USD el output. 3. Lo van a bloquear como a Fable. En teoría sale este septiembre; aquí un demo filtrado de sus capacidades de desarrollo.',
    images: ['/posts/astra.jpg'],
  },
];
