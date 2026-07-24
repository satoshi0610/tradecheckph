import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['Regulation & Legality', 'Scam Awareness', 'Broker Basics', 'Prop Firms']),
    lastVerified: z.date(),
    sources: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { guides };
