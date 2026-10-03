import { successResponse, errorResponse, withApiRoute } from '@/lib/api-response';
import { ProjectService } from '@/lib/services/projectService';
import { InternalError } from '@/lib/errors';

export const GET = withApiRoute(async (req, requestId) => {
  const service = new ProjectService();
  const projects = await service.getAllProjects();
  
  return successResponse(projects, { requestId });
});
