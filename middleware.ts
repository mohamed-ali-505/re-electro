import { NextRequest, NextResponse } from "next/server"

export default
  function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const id = req.cookies.get('id')
  const role = req.cookies.get('role')
  // Don't redirect if it's a callback URL
  if (pathname.includes('/api/auth')) {
    return NextResponse.next()
  }

  // Auth pages that should not be accessible when logged in
  if (id?.value && (pathname.startsWith('/login') || pathname.startsWith('/reg'))) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Protected pages that require authentication
  if (!id?.value && (pathname.startsWith('/profile') || pathname.startsWith('/admin'))) {
    return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, req.url))
  }

  // Role-based redirects
  if (id?.value) {
    if (pathname.startsWith('/admin') && role?.value !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next()
}


export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};