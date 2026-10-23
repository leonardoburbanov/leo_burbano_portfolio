// Name and detail copy lives in messages under Speaking.items.<id>.
// `slides` and `url` are optional; both open in a new tab (or in-site when they start with "/").
export const speaking = [
  {
    id: 'devfest',
    url: 'https://discover.multiticketing.com/gdg-quito/events/google-quito-devfest?ref=WTWE32Y0',
    slides: '/talks/devfest-quito-2026-mercately-gemini.pdf',
  },
  { id: 'buildWithAiQuito' },
  { id: 'buildWithAiCuenca', slides: '/projects/gemini-enterprise-sales-agent' },
  { id: 'techWeek' },
] as const;
