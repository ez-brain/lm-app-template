import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const start = Date.now();
  
  // Clone the response so we can read it
  const response = NextResponse.next();
  
  // Get request information
  const timestamp = new Date().toISOString();
  const method = request.method;
  const url = request.url;
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;
  
  // Get client IP - handling various proxy headers
  const ip = request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-client-ip') ||
    'unknown';
  
  // Get user agent
  const userAgent = request.headers.get('user-agent') || '-';
  
  // Get referer
  const referer = request.headers.get('referer') || '-';
  
  // Calculate response time after response is ready
  response.headers.set('x-response-time', `${Date.now() - start}ms`);
  
  // Log in Common Log Format (CLF) with extensions
  const logEntry = {
    timestamp,
    ip,
    method,
    path: pathname + search,
    url,
    status: response.status,
    responseTime: `${Date.now() - start}ms`,
    userAgent,
    referer,
  };
  
  // Log to console in production (will appear in container logs)
  if (process.env.NODE_ENV === 'production') {
    // Format as JSON for better parsing in log aggregators
    console.log(JSON.stringify(logEntry));
  } else {
    // Pretty format for development
    console.log(`[${timestamp}] ${ip} ${method} ${pathname}${search} ${response.status} ${Date.now() - start}ms`);
  }
  
  return response;
}

// Configure which routes to apply middleware to
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
