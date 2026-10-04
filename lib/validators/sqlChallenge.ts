import { z } from 'zod';
import { PaginationSchema } from './index';

export const SqlChallengeQuerySchema = z.object({
  topic: z.coerce.number().int().positive().optional(),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
  ...PaginationSchema.shape
});

export type SqlChallengeQuery = z.infer<typeof SqlChallengeQuerySchema>;

export const DayParamSchema = z.object({
  day: z.coerce.number().int().positive().max(210, 'Day must be between 1 and 210')
});
