import { z } from 'zod';

export const PaginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

// Example generic ID validator
export const IdParamSchema = z.object({
  id: z.string().min(1)
});

// Example slug validator
export const SlugParamSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/)
});
