import { DfLogoutUsecase } from "@/application/usecases/auth/DfLogoutUsecase";
import { AuthRepository } from "@/domain/repositories/AuthRepository";
import { PrAuthRepository } from "@/infrastructure/repositories/PrAuthRepository";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const authRepository: AuthRepository = new PrAuthRepository();
  const logoutUsecase = new DfLogoutUsecase(authRepository);

  if (refreshToken) {
    await logoutUsecase.execute(refreshToken);
  }

  const response = NextResponse.json(
    { message: "성공적으로 로그아웃 되었습니다." },
    { status: 200 }
  );

  cookieStore.set("accessToken", "", { maxAge: 0, path: "/" });
  cookieStore.set("refreshToken", "", { maxAge: 0, path: "/" });

  return response;
};
