import { z } from 'zod';

export const eventCreateSchema = z.object({
  title: z.string().min(3).max(180),
  description: z.string().max(5000).optional().nullable(),
  start_at: z.string().datetime(),                // ISO string
  end_at: z.string().datetime().optional().nullable(),
  location: z.string().max(300).optional().nullable(),
  cover_url: z.string().url().optional().nullable(),
  category_id: z.string().uuid().optional().nullable(),
  is_published: z.boolean().optional(),           // default false di DB
});

export const eventUpdateSchema = eventCreateSchema.partial();
