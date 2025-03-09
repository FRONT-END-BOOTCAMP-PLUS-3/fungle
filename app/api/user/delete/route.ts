import { userDi } from "@/infrastructure/config/userDi";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  const userId = await userDi.getUserIdUsecase.execute();

  if (!userId) {
    return NextResponse.json(
      { error: "로그인 되어 있지 않습니다." },
      { status: 401 }
    );
  }

  const isSuccess = await userDi.deleteUserUsecase.execute(userId);

  if (!isSuccess)
    return NextResponse.json(
      {
        error: "진행 중인 펀딩이 있는 경우 회원 탈퇴가 불가능합니다.",
      },
      { status: 400 }
    );

  const cookieStore = await cookies();

  cookieStore.set("accessToken", "", { maxAge: 0, path: "/" });
  cookieStore.set("refreshToken", "", { maxAge: 0, path: "/" });

  return NextResponse.json(
    { message: "회원 탈퇴가 완료되었습니다." },
    { status: 200 }
  );
};
