import { userDi } from "@/infrastructure/config/userDi";
import { getParamsFromRequest } from "@/utils/params/requestParams";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  const { userId } = getParamsFromRequest(req, ["userId"]);
  if (!userId) {
    return NextResponse.json(
      { error: "요청에 id를 포함해야 합니다." },
      { status: 400 }
    );
  }

  try {
    const isSuccess = await userDi.deleteUserUsecase.execute(userId);
    if (!isSuccess)
      return NextResponse.json(
        {
          error: "진행 중인 펀딩이 있는 경우 회원 삭제가 불가능합니다.",
        },
        { status: 400 }
      );

    return NextResponse.json(
      { message: "회원 탈퇴가 완료되었습니다." },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "서버 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
};
