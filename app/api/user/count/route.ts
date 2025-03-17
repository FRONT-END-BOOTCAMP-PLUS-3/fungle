import { userDi } from "@/infrastructure/config/userDi";
import { NextResponse } from "next/server";

export const GET = async () => {
  const userId = await userDi.getUserIdUsecase.execute();

  if (!userId) {
    return NextResponse.json(
      { error: "로그인 되어 있지 않습니다." },
      { status: 401 }
    );
  }

  try {
    const counts = await userDi.getUserStatsByUserIdUsecase.execute(userId);

    return NextResponse.json({ counts }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "사용자가 작성한 글 개수를 가져오는 데 실패했습니다.",
      },
      { status: 500 }
    );
  }
};
