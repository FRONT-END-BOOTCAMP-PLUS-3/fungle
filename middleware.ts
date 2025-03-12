import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const middleware = (req: NextRequest) => {
  const publicRoutes = ["/signup"];
  const currentPath = req.nextUrl.pathname;

  const accessToken = req.cookies.get("accessToken")?.value;

  let verifiedUser: { type: string } | null = null;

  if (accessToken) {
    try {
      const decoded = jwt.decode(accessToken) as {
        type: string;
      } | null;

      if (!decoded || !decoded.type) {
        throw new Error("Failed to decode token");
      }

      verifiedUser = { type: decoded.type };
    } catch (error: unknown) {
      if (currentPath !== "/login") {
        const returnUrl = req.nextUrl.href;
        const response = NextResponse.redirect(new URL("/login", req.url));
        response.cookies.set("returnUrl", returnUrl);
        response.cookies.set("alertMessage", "로그인이 필요합니다.", {
          path: "/",
          maxAge: 5,
        });

        return response;
      }
    }
  } else {
    if (currentPath !== "/login") {
      const returnUrl = req.nextUrl.href;
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.set("returnUrl", returnUrl);
      response.cookies.set("alertMessage", "로그인이 필요합니다.", {
        path: "/",
        maxAge: 5,
      });

      return response;
    }
  }

  if (accessToken && currentPath === "/login") {
    return NextResponse.redirect(new URL("/user/novel", req.url));
  }

  if (publicRoutes.includes(currentPath)) {
    return NextResponse.next();
  }

  if (
    !accessToken &&
    (currentPath.startsWith("/user") || currentPath.startsWith("/admin"))
  ) {
    if (currentPath !== "login") {
      const returnUrl = req.nextUrl.href;
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.set("returnUrl", returnUrl);
      response.cookies.set("alertMessage", "로그인이 필요합니다.", {
        path: "/",
        maxAge: 5,
      });

      return response;
    }
  }

  if (verifiedUser?.type === "user" && currentPath.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  return NextResponse.next();
};

export default middleware;

export const config = {
  matcher: ["/login", "/user/:path*", "/admin/:path*"],
};
