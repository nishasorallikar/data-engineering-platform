import { successResponse, withApiRoute } from '@/lib/api-response';

export const GET = withApiRoute(async (req, requestId) => {
  return successResponse({
    status: 'ok',
    version: '1.0.0',
    service: 'data-engineering-platform'
  }, { requestId });
});
