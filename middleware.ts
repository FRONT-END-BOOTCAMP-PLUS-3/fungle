import { NextRequest, NextResponse } from "next/server";

const middleware = (req: NextRequest) => {
  const authRoutes: Record<string, string> = {
    "/login": "/user/novel",
    "/novel": "/user/novel",
    "/community": "/user/community",
  };
  const publicRoutes = ["/signup"];
  const currentPath = req.nextUrl.pathname;

  const accessToken = req.cookies.get("accessToken")?.value;

  // publicRoute에서는 다음 동작으로 넘어감
  if (publicRoutes.includes(currentPath)) {
    return NextResponse.next();
  }

  // 사용자가 로그인된 상태면 `/login` 페이지에서 `/user/novel`으로 리다이렉트
  if (accessToken && authRoutes[currentPath]) {
    return NextResponse.redirect(new URL(authRoutes[currentPath], req.url));
  }

  // 토큰이 없을 경우 로그인 페이지로 리다이렉트
  if (!accessToken && currentPath.startsWith("/user")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
};

export default middleware;

// 실행될 경로 설정
export const config = {
  matcher: ["/login", "/novel", "/community", "/user/:path*"],
};
