import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/server/auth/better-auth";
import { api } from "./lib/eden";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check session using better-auth server instance
  // Note: We pass the request headers to getSession to identify the user
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // 2. If no session, redirect to home page
  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 3. Check if restaurant profile exists for this user in the database
  // const restaurant = await api.restaurent.get_restaurent.get({
  //   query: {
  //     id: session.user.id,
  //   },
  // });

  // if (!restaurant.data?.status) {
  //   return NextResponse.redirect(new URL("/create-restaurent", request.url));
  // }

  // // 4. Flow logic:
  // // - If user DOES NOT have a restaurant profile:
  // //   Redirect them to 'create-restaurent' page if they are not already there.
  // if (!restaurant.data?.status) {
  //   if (pathname !== "/create-restaurent") {
  //     return NextResponse.redirect(new URL("/create-restaurent", request.url));
  //   }
  // } else {
  //   // - If user DOES have a restaurant profile:
  //   //   Redirect them to 'overview' page if they try to access 'create-restaurent'.
  //   if (pathname === "/create-restaurent") {
  //     return NextResponse.redirect(new URL("/overview", request.url));
  //   }
  // }

  // Allow the request to proceed if all conditions are met
  return NextResponse.next();
}

// Configure the routes that should trigger this middleware
export const config = {
  matcher: ["/overview/:path*", "/create-restaurent"],
};
