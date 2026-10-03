import { successResponse, errorResponse, withApiRoute } from '@/lib/api-response';
import { InternalError } from '@/lib/errors';
import fs from 'fs/promises';
import path from 'path';

export const GET = withApiRoute(async (req, requestId) => {
  try {
    // Basic readiness check: ensure we can read a critical dataset
    const datasetPath = path.join(process.cwd(), 'data', 'verified-projects', 'voltgrid-au.json');
    await fs.access(datasetPath);

    return successResponse({
      status: 'ready',
      checks: {
        datasets: 'ok'
      }
    }, { requestId });
  } catch (error) {
    throw new InternalError('Application not ready: Missing critical datasets');
  }
});
