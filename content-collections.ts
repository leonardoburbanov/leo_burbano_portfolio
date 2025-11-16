import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

const posts = defineCollection({
  name: "posts",
  directory: "content/blog",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    title_es: z.string().optional(),
    summary: z.string(),
    summary_es: z.string().optional(),
    date: z.string(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    tags_es: z.array(z.string()).optional(),
    locale: z.string().optional(),
    slug: z.string().optional(),
  }),
  transform: async (document, context) => {
    // Extract locale and slug from filename BEFORE compiling MDX
    // Note: _meta.path doesn't include .mdx extension
    // e.g., "hello-world" -> locale: "en", slug: "hello-world"
    // e.g., "hello-world.es" -> locale: "es", slug: "hello-world"
    const filename = document._meta.path;
    // Check if filename ends with .es or .en (without .mdx extension)
    const localeMatch = filename.match(/\.(en|es)$/);
    const locale = localeMatch ? localeMatch[1] : 'en';
    // Extract slug: remove .en or .es suffix
    let slug = filename.replace(/\.(en|es)$/, '');
    // Use slug from frontmatter if available, otherwise use extracted slug
    slug = document.slug || slug;
    
    const mdx = await compileMDX(context, document);
    
    return {
      ...document,
      mdx,
      locale: locale as string,
      slug: slug as string,
    };
  },
});

export default defineConfig({
  collections: [posts],
});
