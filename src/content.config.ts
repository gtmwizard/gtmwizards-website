// Content collections: long-form content lives in markdown, typed here.
// Same role as hubsell's src/content/ directories.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    /** Set when a post is meaningfully revised, for article:modified_time. */
    updated: z.coerce.date().optional(),
    author: z.string().default('gtmWizards'),
    /** Root-relative or absolute override for the share image. */
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { insights };
