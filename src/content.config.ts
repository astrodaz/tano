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

// 2. Gallery / Logbook Collection
const gallery = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/gallery" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    mainPhoto: image(),
    
    // Global Sensor Settings
    gain: z.number().default(76),
    offset: z.number().default(50),
    temperature: z.number().default(-10),
    
    // Group 1: The Hardware
    gear: z.object({
      scope: z.enum(["Esprit 100ED", "GSO RC8"]), 
      camera: z.string(),
      mount: z.string(),
    }),

    // Group 2: The Acquisition Data
    acquisition: z.object({
      filters: z.array(z.object({
        type: z.enum(["L", "R", "G", "B", "Ha", "OIII", "SII", "OSC", "Dark", "Flat"]),
        count: z.number(),
        duration: z.number(),
      })).default([]),
      totalIntegration: z.number().optional(), 
    }),

    // Group 3: The Target
    target: z.object({
      name: z.string(), 
      type: z.enum([
        "Reflection Nebula", 
        "Dark Nebula", 
        "Emission Nebula",
        "Galaxy", 
        "Globular Cluster", 
        "Open Cluster", 
        "Planetary Nebula", 
        "Planet", 
        "Comet", 
        "Moon"
      ]),
      moonIllumination: z.number().min(0).max(100),	
    }),
  }),
});

// 3. Export both so Astro can see them
export const collections = { posts, gallery };