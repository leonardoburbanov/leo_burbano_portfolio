// Name and detail copy lives in messages under Speaking.items.<id>.
// `slides` is optional; opens in a new tab (or in-site when it starts with "/").
// `org` picks the organizer mark shown beside the talk.
export const speakingOrgs = {
  gdg: { name: 'Google Developer Groups', src: '/gdg_logo.png', width: 369, height: 226, mono: false },
  etw: { name: 'Ecuador Tech Week', src: '/logos/etw.png', width: 400, height: 200, mono: true },
} as const;

export const speaking: { id: string; org: keyof typeof speakingOrgs; slides?: string }[] = [
  { id: 'devfest', org: 'gdg', slides: '/talks/devfest-quito-2026-mercately-gemini.pdf' },
  { id: 'buildWithAiQuito', org: 'gdg' },
  { id: 'buildWithAiCuenca', org: 'gdg', slides: '/projects/gemini-enterprise-sales-agent' },
  { id: 'techWeek', org: 'etw' },
];
