import { novelDi } from "@/infrastructure/config/novelDi";
import { userDi } from "@/infrastructure/config/userDi";
import { getParamsFromRequest } from "@/utils/params/requestParams";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { id } = getParamsFromRequest(request, ["id"]);

  if (!id) {
    return NextResponse.json(
      { error: "요청에 id를 포함해야 합니다." },
      { status: 400 }
    );
  }

  try {
    const userId = await userDi.getUserIdUsecase.execute();
    if (!userId) {
      return NextResponse.json(
        { error: "유효하지 않은 사용자" },
        { status: 401 }
      );
    }

    const isLiked = await novelDi.toggleCommentLikeUsecase.execute(id, userId);

    return NextResponse.json({ isLiked });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Failed to like comment" },
      { status: 500 }
    );
  }
};
