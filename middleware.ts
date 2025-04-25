import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const isAuthenticated = !!req.nextauth.token
    // Don't redirect if it's a callback URL
    if (pathname.includes('/api/auth')) {
      return NextResponse.next()
    }

    // Auth pages that should not be accessible when logged in
    if (isAuthenticated && (pathname.startsWith('/login') || pathname.startsWith('/reg'))) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    // Protected pages that require authentication
    if (!isAuthenticated && (pathname.startsWith('/profile') || pathname.startsWith('/admin'))) {
      return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, req.url))
    }

    // Role-based redirects
    if (isAuthenticated) {
     
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true // Let the middleware handle the auth logic
    }
  }
)

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};