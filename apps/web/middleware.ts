import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
  },
});

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedPaths = [
    "/dashboard",
    "/users",
    "/clients",
    "/tour-packages",
    "/reservations",
    "/sales",
    "/payments",
  ];

  const isProtectedRoute = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  const sessionCookie = request.cookies.get("sb-session")?.value;
  let user = null;

  if (sessionCookie) {
    try {
      const sessionData = JSON.parse(decodeURIComponent(sessionCookie));
      const accessToken = sessionData?.access_token;
      if (accessToken) {
        const { data, error } = await supabase.auth.getUser(accessToken);
        if (!error && data?.user) {
          user = data.user;
        }
      }
    } catch (e) {
      console.error("Error parsing session cookie in middleware:", e);
    }
  }

  // Redirect to /login if trying to access a protected route without session
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Restrict access to /users and /tour-packages for Vendedores
  const isRestrictedRouteForSeller =
    pathname === "/users" ||
    pathname.startsWith("/users/") ||
    pathname === "/tour-packages" ||
    pathname.startsWith("/tour-packages/");
  if (isRestrictedRouteForSeller && user) {
    const role = user.app_metadata?.role;
    if (role === "Vendedor") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Redirect to /dashboard if trying to access /login with an active session
  if (pathname === "/login" && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
