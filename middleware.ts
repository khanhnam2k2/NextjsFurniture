import { log } from "console";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePath = ["/cart"];
const authPath = ["/login", "/register"];
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token");

  if (privatePath.some((path) => pathname.startsWith(path)) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (authPath.some((path) => pathname.startsWith(path)) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/register", "/cart"],
};
