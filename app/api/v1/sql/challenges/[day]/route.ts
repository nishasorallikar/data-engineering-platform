import { withApiRoute, successResponse } from '@/lib/api-response';
import { SqlChallengeService } from '@/lib/services/sqlChallengeService';
import { DayParamSchema } from '@/lib/validators/sqlChallenge';
import { ValidationError } from '@/lib/errors';

export const GET = withApiRoute(async (req, requestId, context?: { params: Promise<{ day: string }> }) => {
  const { day } = await context!.params;

  const validationResult = DayParamSchema.safeParse({ day });
  if (!validationResult.success) {
    throw new ValidationError('Invalid day parameter', validationResult.error.format());
  }

  const service = new SqlChallengeService();
  const challenge = await service.getChallengeByDay(validationResult.data.day);
  
  return successResponse(challenge, { requestId });
});
