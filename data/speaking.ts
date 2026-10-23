// Name and detail copy lives in messages under Speaking.items.<id>.
// `slides` and `url` are optional; both open in a new tab (or in-site when they start with "/").
export const speaking = [
  {
    id: 'devfest',
    url: 'https://discover.multiticketing.com/gdg-quito/events/google-quito-devfest?ref=WTWE32Y0',
    slides: 'https://drive.google.com/file/d/1sSf6DEovXX8MpT_selT3WclKhbI4VE-j/view?usp=drivesdk',
  },
  { id: 'buildWithAiQuito' },
  { id: 'buildWithAiCuenca', slides: '/projects/gemini-enterprise-sales-agent' },
  { id: 'techWeek' },
] as const;
