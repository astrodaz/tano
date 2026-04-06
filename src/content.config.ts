import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 1. Blog Posts Collection
const posts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    readTime: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});


export const collections = { posts };