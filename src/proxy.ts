import { NextResponse, type NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  console.log("proxy runs");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
