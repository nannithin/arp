import { NextResponse } from "next/server"

export function middleware(request) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("token")?.value

  const authPages = ["/login", "/register"]

  if (!token && !authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (token && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/create-campaign/:path*",
    "/seo-plans/:path*",
    "/create-seo/:path*",
    "/login",
    "/register",
  ],
}
