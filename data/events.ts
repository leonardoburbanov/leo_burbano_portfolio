export interface Event {
  id: string;
  title: string;
  datetime: string;
  location: string;
  hosts: string;
  image: string;
  url: string;
  featured?: boolean;
  free?: boolean;
}

export const events: Event[] = [
  {
    id: "n8n-quito",
    title: "n8n Quito: Crea y vende tu primer agente IA",
    datetime: "2026-09-09T17:00:00-05:00",
    location: "Presencial",
    hosts: "José Álvarez",
    image: "/event_images/n8n.jpg",
    url: "https://luma.com/n8n-vf3i",
    free: true,
  },
  {
    id: "cursor-supabase",
    title: "Cursor Quito x Supabase",
    datetime: "2026-09-18T08:30:00-05:00",
    location: "USFQ",
    hosts: "Kevin Morales & Kevin Pérez",
    image: "/event_images/cursor.png",
    url: "https://luma.com/cursorsupabasequito?tk=IDy9qP",
    free: true,
  },
  {
    id: "devfest-quito",
    title: "Google DevFest Quito 2026",
    datetime: "2026-09-26T09:58:00-05:00",
    location: "Campus USFQ, Cumbayá",
    hosts: "GDG Quito",
    image: "/event_images/devfest.png",
    url: "https://discover.multiticketing.com/gdg-quito/events/google-quito-devfest?ref=WTWE32Y0",
    featured: true,
    free: true,
  },
] as const;

export function getFeaturedEvent(): Event | undefined {
  return events.find((event) => event.featured);
}
