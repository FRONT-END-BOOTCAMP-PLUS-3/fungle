import { userDi } from "@/infrastructure/config/userDi";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  try {
    const userId = await userDi.getUserIdUsecase.execute();
    if (!userId) {
      return NextResponse.json(
        { message: "로그인 되어 있지 않습니다." },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const profileImage = formData.get("profileImage") as File;

    await userDi.updateProfileImageByUserIdUsecase.execute({
      userId,
      profileImage,
    });

    return NextResponse.json(
      { message: "프로필 사진이 성공적으로 수정되었습니다!" },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "서버에 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
};
