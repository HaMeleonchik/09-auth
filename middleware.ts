import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";
import { checkServerSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPrivateRoutes = pathname.startsWith("/profile/") || pathname.startsWith("/notes/") || privateRoutes.includes(pathname);

  const isPublicRoutes = publicRoutes.includes(pathname);

  if (isPrivateRoutes) {
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    const res = await checkServerSession();
    const setCookie = res.headers["set-cookie"];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      const response = NextResponse.next();

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        if (parsed.accessToken) {
          response.cookies.set("accessToken", parsed.accessToken);
        }
        if (parsed.refreshToken) {
          response.cookies.set("refreshToken", parsed.refreshToken);
        }
      }
      return response;
    }

    return NextResponse.next();
  }

  if (isPublicRoutes) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }

    if (refreshToken) {
      const res = await checkServerSession();
      const setCookie = res.headers["set-cookie"];
      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        
        const response = NextResponse.redirect(new URL("/profile", request.url));

        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);

          if (parsed.accessToken) {
            response.cookies.set("accessToken", parsed.accessToken);
          }
          if (parsed.refreshToken) {
            response.cookies.set("refreshToken", parsed.refreshToken);
          }
        }
        return response;
      }
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};


