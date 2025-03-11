import { DfRefreshTokenUsecase } from "@/application/usecases/auth/DfRefreshTokenUsecase";
import { DfVerifyAccessTokenUsecase } from "@/application/usecases/auth/DfVerifyAccessTokenUsecase";
import { AuthRepository } from "@/domain/repositories/AuthRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { PrAuthRepository } from "@/infrastructure/repositories/PrAuthRepository";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const userRepository: UserRepository = new PrUserRepository();
  const authRepository: AuthRepository = new PrAuthRepository();

  const verifyAccessTokenUsecase = new DfVerifyAccessTokenUsecase(
    userRepository
  );
  const refreshTokenUsecase = new DfRefreshTokenUsecase(authRepository);

  let verifiedUser = null;
  let decodedAccessToken = null;

  if (accessToken) {
    const result = await verifyAccessTokenUsecase.execute(accessToken);
    verifiedUser = result?.verifiedUser;
    decodedAccessToken = result?.decodedAccessToken;

    if (
      decodedAccessToken &&
      decodedAccessToken.exp * 1000 > Date.now() + 5 * 60 * 1000
    ) {
      if (verifiedUser) return NextResponse.json({ user: verifiedUser });
    }
  }

  try {
    const { accessToken: newAccessToken } = await refreshTokenUsecase.execute(
      refreshToken
    );

    cookieStore.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 30 * 60, // 30분 유지
    });

    return NextResponse.json({ user: verifiedUser });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json({ user: null }, { status: 401 });
    }
    console.error(error);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
