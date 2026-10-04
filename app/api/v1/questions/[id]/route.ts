import { successResponse, withApiRoute } from '@/lib/api-response';
import { QuestionService } from '@/lib/services/questionService';
import { NotFoundError, ValidationError } from '@/lib/errors';
import { IdParamSchema } from '@/lib/validators';

export const GET = withApiRoute(async (req, requestId, context?: { params: Promise<{ id: string }> }) => {
  const { id } = await context!.params;

  const validationResult = IdParamSchema.safeParse({ id });
  if (!validationResult.success) {
    throw new ValidationError('Invalid question ID', validationResult.error.format());
  }

  const service = new QuestionService();
  // Using findById (which queries the stable application ID, e.g. fundamental-q1)
  const question = await service.getQuestionById(validationResult.data.id);

  if (!question) {
    throw new NotFoundError(`Question not found: ${validationResult.data.id}`);
  }

  return successResponse(question, { requestId });
});
