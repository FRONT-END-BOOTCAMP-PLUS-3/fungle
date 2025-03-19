import { userDi } from "@/infrastructure/config/userDi";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const userId = await userDi.getUserIdUsecase.execute();

    if (!userId) {
      return NextResponse.json({ posts: [] }, { status: 400 });
    }

    const posts = await userDi.postDetailByUserIdUsecase.execute(userId);

    if (!posts) {
      return NextResponse.json({ posts: [] }, { status: 400 });
    }

    return NextResponse.json({ posts: posts }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "서버에서 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const userId = await userDi.getUserIdUsecase.execute();

    if (!userId) {
      return NextResponse.json({ posts: [] }, { status: 400 });
    }

    const { postId } = await req.json();

    await userDi.postStatusUpdateUsecase.execute(userId, postId);
    return NextResponse.json(
      { message: "모집 상태가 성공적으로 변경되었습니다!" },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "모집 상태 변경 실패" },
      { status: 500 }
    );
  }
};
