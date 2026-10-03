import { successResponse, withApiRoute } from '@/lib/api-response';
import { QuestionService } from '@/lib/services/questionService';
import { z } from 'zod';
import { ValidationError } from '@/lib/errors';
import { PaginationSchema } from '@/lib/validators';

const QuestionsQuerySchema = z.object({
  section: z.string().optional(),
  difficulty: z.string().optional(),
}).merge(PaginationSchema);

export const GET = withApiRoute(async (req, requestId) => {
  const url = new URL(req.url);
  
  const queryObj = {
    section: url.searchParams.get('section') || undefined,
    difficulty: url.searchParams.get('difficulty') || undefined,
    page: url.searchParams.get('page') || undefined,
    pageSize: url.searchParams.get('pageSize') || undefined,
  };

  const validationResult = QuestionsQuerySchema.safeParse(queryObj);
  if (!validationResult.success) {
    throw new ValidationError('Invalid query parameters', validationResult.error.format());
  }

  const { page, pageSize, section, difficulty } = validationResult.data;

  // Ideally QuestionService would handle pagination directly from DB,
  // but for simplicity with our current setup, we fetch all and slice,
  // since the dataset is only 50 questions anyway.
  const service = new QuestionService();
  let questions = await service.getAllQuestions();

  if (section) {
    questions = questions.filter(q => q.section === section);
  }
  if (difficulty) {
    questions = questions.filter(q => q.difficulty === difficulty);
  }

  const total = questions.length;
  const totalPages = Math.ceil(total / pageSize);
  
  const startIndex = (page - 1) * pageSize;
  const paginatedQuestions = questions.slice(startIndex, startIndex + pageSize);

  return successResponse(paginatedQuestions, {
    requestId,
    pagination: {
      page,
      pageSize,
      total,
      totalPages
    }
  });
});
