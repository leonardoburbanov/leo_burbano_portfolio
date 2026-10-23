// Paste the URL of each LinkedIn post to feature (open the post, then "..." > "Copy link to post").
// Accepted: https://www.linkedin.com/posts/...-activity-<id>-... or https://www.linkedin.com/feed/update/urn:li:<type>:<id>
// For an exact embed, set `embedUrl` to the src of LinkedIn's "Embed this post" iframe.
export type LinkedInPost = { url: string; embedUrl?: string };

export const linkedinPosts: LinkedInPost[] = [];
