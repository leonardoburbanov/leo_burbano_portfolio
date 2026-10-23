// Featured LinkedIn posts. `url` is required (short lnkd.in links work).
// Optional, to enrich the card:
//   excerpt  - first lines of the post, shown on the card
//   embedUrl - src of LinkedIn's "Embed this post" iframe, renders the live post instead of a card
// (A full /posts/...-activity-<id> or /feed/update/urn:li:... URL also embeds automatically.)
export type LinkedInPost = { url: string; excerpt?: string; embedUrl?: string };

export const linkedinPosts: LinkedInPost[] = [
  { url: 'https://lnkd.in/p/ed3mEvrW' },
  { url: 'https://lnkd.in/p/eYRjKiXk' },
];
