import { NextResponse } from 'next/server';
import { ApiError, ErrorCode } from './errors';

export interface SuccessResponse<T> {
  success: true;
  data: T;
  meta: {
    timestamp: string;
    requestId: string;
    pagination?: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface ErrorResponse {
  success: false;
  error: {
    code: ErrorCode;
    message: string;
    requestId: string;
    details?: any;
  };
}

// Simple request ID generator for now
export function generateRequestId(): string {
  return crypto.randomUUID();
}

export function successResponse<T>(
  data: T,
  options?: {
    requestId?: string;
    pagination?: SuccessResponse<T>['meta']['pagination'];
  }
): NextResponse<SuccessResponse<T>> {
  const requestId = options?.requestId || generateRequestId();
  const meta: SuccessResponse<T>['meta'] = {
    timestamp: new Date().toISOString(),
    requestId,
  };

  if (options?.pagination) {
    meta.pagination = options.pagination;
  }

  return NextResponse.json({
    success: true,
    data,
    meta,
  });
}

export function errorResponse(
  error: unknown,
  options?: {
    requestId?: string;
  }
): NextResponse<ErrorResponse> {
  const requestId = options?.requestId || generateRequestId();
  
  let code: ErrorCode = 'INTERNAL_ERROR';
  let message = 'An internal server error occurred';
  let status = 500;
  let details: any = undefined;

  if (error instanceof ApiError) {
    code = error.code;
    message = error.message;
    status = error.status;
    details = error.details;
  } else if (error instanceof Error) {
    // We shouldn't leak raw error messages for non-ApiErrors in production, but for now we log it.
    console.error(`[${requestId}] Unhandled Error:`, error);
  }

  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        requestId,
        ...(details && { details }),
      },
    },
    { status }
  );
}

// Wrapper for route handlers to handle errors and ensure a request ID
export function withApiRoute<T = any>(
  handler: (req: Request, requestId: string, context?: T) => Promise<NextResponse>
) {
  return async (req: Request, context?: T): Promise<NextResponse> => {
    // Ideally request ID would come from a header if we were using middleware,
    // but for simplicity we generate it here per request.
    const requestId = req.headers.get('x-request-id') || generateRequestId();

    try {
      // Basic logging
      console.log(`[${requestId}] ${req.method} ${req.url}`);
      
      const startTime = performance.now();
      const response = await handler(req, requestId, context);
      const duration = (performance.now() - startTime).toFixed(2);
      
      console.log(`[${requestId}] Completed ${response.status} in ${duration}ms`);
      return response;
    } catch (error) {
      console.error(`[${requestId}] Request failed:`, error);
      return errorResponse(error, { requestId });
    }
  };
}
