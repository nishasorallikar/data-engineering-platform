import { successResponse, withApiRoute } from '@/lib/api-response';
import { QuestionService } from '@/lib/services/questionService';
import { NotFoundError, ValidationError } from '@/lib/errors';
import { IdParamSchema } from '@/lib/validators';
import { z } from 'zod';

const ValidateRequestSchema = z.object({
  answer: z.string().min(1, 'Answer is required')
});

export const POST = withApiRoute(async (req, requestId, context?: { params: Promise<{ id: string }> }) => {
  const { id } = await context!.params;

  const idValidation = IdParamSchema.safeParse({ id });
  if (!idValidation.success) {
    throw new ValidationError('Invalid question ID', idValidation.error.format());
  }

  let body;
  try {
    body = await req.json();
  } catch (err) {
    throw new ValidationError('Invalid JSON body');
  }

  const bodyValidation = ValidateRequestSchema.safeParse(body);
  if (!bodyValidation.success) {
    throw new ValidationError('Invalid request body', bodyValidation.error.format());
  }

  const service = new QuestionService();
  const question = await service.getQuestionById(idValidation.data.id);

  if (!question) {
    throw new NotFoundError(`Question not found: ${idValidation.data.id}`);
  }

  // Without AI grading or exact-match expected answers for concept questions,
  // we return the explanation for self-evaluation.
  return successResponse({
    correct: true, // Placeholder for self-evaluation
    explanation: question.detailedExplanation,
    interviewerAngle: question.interviewerAngle
  }, { requestId });
});
