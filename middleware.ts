import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add default security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Check for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow login page
    if (request.nextUrl.pathname === '/admin/login') {
      return response
    }

    // Check for session
    const session = request.cookies.get('__session')
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Cache static assets
  if (
    request.nextUrl.pathname.match(/\.(jpg|jpeg|gif|png|svg|ico|webp|mp4)$/)
  ) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    )
    return response
  }

  // Cache fonts
  if (request.nextUrl.pathname.startsWith('/assets/fonts/')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    )
    return response
  }

  // Don't cache API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store')
    return response
  }

  // Default caching for other routes
  response.headers.set(
    'Cache-Control',
    'public, max-age=3600, stale-while-revalidate=86400'
  )

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
