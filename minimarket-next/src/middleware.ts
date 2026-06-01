import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";

/** Cabeceras de seguridad en todas las rutas coincidentes. */
export function applySecurityHeaders(request: NextRequest) {
  void request.nextUrl;
  const res = NextResponse.next();
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  return res;
}

export default withAuth(
  function middleware(request: NextRequest) {
    return applySecurityHeaders(request);
  },
  {
    pages: {
      signIn: "/login",
    },
  }
);



export const config = {
  matcher: ["/dashboard/:path*", "/publicar/:path*"],
};
