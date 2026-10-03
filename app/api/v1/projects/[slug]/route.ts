import { successResponse, withApiRoute } from '@/lib/api-response';
import { ProjectService } from '@/lib/services/projectService';
import { NotFoundError, ValidationError } from '@/lib/errors';
import { SlugParamSchema } from '@/lib/validators';

export const GET = withApiRoute(async (req, requestId, context: { params: Promise<{ slug: string }> }) => {
  const { slug } = await context.params;

  const validationResult = SlugParamSchema.safeParse({ slug });
  if (!validationResult.success) {
    throw new ValidationError('Invalid project slug', validationResult.error.format());
  }

  const service = new ProjectService();
  const project = await service.getProjectBySlug(validationResult.data.slug);

  if (!project) {
    throw new NotFoundError(`Project not found: ${validationResult.data.slug}`);
  }

  return successResponse(project, { requestId });
});
