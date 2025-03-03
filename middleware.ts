import { NextRequest, NextResponse } from "next/server";

const middleware = (req: NextRequest) => {
  const publicRoutes = ["/login", "/signup", "/novel", "/community"];
  const token = req.cookies.get("refreshToken")?.value;

  // publicRoute에서는 다음 동작으로 넘어감
  if (publicRoutes.some((route) => req.nextUrl.pathname === route)) {
    return NextResponse.next();
  }

  // 토큰이 없을 경우 로그인 페이지로 리다이렉트
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
};

export default middleware;

// 실행될 경로 설정
export const config = {
  matcher: ["/user/:path*"],
};
