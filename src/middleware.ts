import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // ===== HEADERS DE SÉCURITÉ 2026 =====
  
  // 1. Content Security Policy - Restreint les sources de contenu
  response.headers.set(
    'Content-Security-Policy', 
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://pay.mychariow.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ')
  )

  // 2. X-Frame-Options - Empêche le clickjacking
  response.headers.set('X-Frame-Options', 'DENY')

  // 3. X-Content-Type-Options - Empêche le MIME sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')

  // 4. Referrer-Policy - Contrôle les infos envoyées en referrer
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // 5. Permissions-Policy - Contrôle les features du navigateur (2026)
  response.headers.set(
    'Permissions-Policy',
    [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=()',
      'usb=()',
      'magnetometer=()',
      'gyroscope=()',
      'accelerometer=()',
      'fullscreen=(self)',
      'clipboard-write=(self)'
    ].join(', ')
  )

  // 6. Strict-Transport-Security - Force HTTPS (1 an)
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  )

  // 7. X-XSS-Protection - Protection XSS (legacy mais utile)
  response.headers.set('X-XSS-Protection', '1; mode=block')

  // 8. Cross-Origin Policies
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin')
  response.headers.set('Cross-Origin-Resource-Policy', 'same-site')
  response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp')

  // 9. Cache Control pour les pages sensibles (admin)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    )
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  }

  // 10. Remove server info (sécurité par obscurité)
  response.headers.delete('x-powered-by')

  return response
}

// Appliquer à toutes les routes
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}
