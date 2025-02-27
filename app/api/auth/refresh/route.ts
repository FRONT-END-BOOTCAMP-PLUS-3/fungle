import { DfRefreshTokenUsecase } from "@/application/usecases/auth/DfRefreshTokenUsecase";
import { DfSetAuthCookieUsecase } from "@/application/usecases/auth/DfSetAuthCookieUsecase";
import { PrAuthRepository } from "@/infrastructure/repositories/PrAuthRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refreshToken")?.value;
    if (!refreshToken) {
      throw new Error("토큰을 포함해서 요청해야 합니다.");
    }

    const authRepository = new PrAuthRepository();
    const refreshTokenUsecase = new DfRefreshTokenUsecase(authRepository);
    const { accessToken, newRefreshToken } = await refreshTokenUsecase.execute(
      refreshToken
    );

    const response = NextResponse.json({ accessToken }, { status: 200 });
    const setAuthCookieUsecase = new DfSetAuthCookieUsecase();
    setAuthCookieUsecase.execute(response, newRefreshToken);

    return response;
  } catch (error) {
    return NextResponse.json({ error: "토큰 갱신 실패" }, { status: 401 });
  }
}
