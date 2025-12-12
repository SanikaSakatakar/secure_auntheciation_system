import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  // Check if user has authentication token
  const token = request.cookies.get("token")?.value || localStorage.getItem("token")

  const { pathname } = request.nextUrl

  // Protected routes
  const protectedRoutes = ["/dashboard", "/profile"]
  const publicRoutes = ["/", "/login", "/register"]

  // If trying to access protected route without token, redirect to login
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  // If logged in and trying to access public auth routes, redirect to dashboard
  if (publicRoutes.includes(pathname) && token) {
    if (pathname === "/login" || pathname === "/register") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/login", "/register"],
}
