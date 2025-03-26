import { userDi } from "@/infrastructure/config/userDi";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (refreshToken) {
    await userDi.logoutUsecase.execute(refreshToken);
  }

  const response = NextResponse.json(
    { message: "성공적으로 로그아웃 되었습니다." },
    { status: 200 }
  );

  cookieStore.set("accessToken", "", { maxAge: 0, path: "/" });
  cookieStore.set("refreshToken", "", { maxAge: 0, path: "/" });
  cookieStore.set("lastUserId", "", { maxAge: 0, path: "/" });

  return response;
};
