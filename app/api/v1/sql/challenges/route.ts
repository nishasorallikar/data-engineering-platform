import { withApiRoute, successResponse } from '@/lib/api-response';
import { SqlChallengeService } from '@/lib/services/sqlChallengeService';
import { SqlChallengeQuerySchema } from '@/lib/validators/sqlChallenge';
import { ValidationError } from '@/lib/errors';

export const GET = withApiRoute(async (req, requestId) => {
  const url = new URL(req.url);
  const queryParams = Object.fromEntries(url.searchParams.entries());
  
  const validationResult = SqlChallengeQuerySchema.safeParse(queryParams);
  if (!validationResult.success) {
    throw new ValidationError('Invalid query parameters', validationResult.error.format());
  }
  
  const { page = 1, pageSize = 20, topic, difficulty } = validationResult.data;
  
  const service = new SqlChallengeService();
  const result = await service.getChallenges(page, pageSize, { topic, difficulty });
  
  return successResponse(result.data, {
    requestId,
    pagination: {
      page,
      pageSize,
      total: result.total,
      totalPages: Math.ceil(result.total / pageSize)
    }
  });
});
