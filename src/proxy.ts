import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/auth";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token =
    request.cookies.get("better-auth.session_token") ??
    request.cookies.get("__Secure-better-auth.session_token");

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const session = await getSession({
    fetchOptions: {
      headers: request.headers,
    },
  });

  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/overview/:path*"],
};
