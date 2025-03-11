import { DfTogglePostLikeUsecase } from "@/application/usecases/community/DfTogglePostLikeUsecase";
import { userDi } from "@/infrastructure/config/userDi";
import { PrCommunityPostLikeRepository } from "@/infrastructure/repositories/PrCommunityPostLikeRepository";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { postId: id } = await body;

    const userId = await userDi.getUserIdUsecase.execute();
    if (!userId) {
      return NextResponse.json(
        { error: "유효하지 않은 사용자" },
        { status: 401 }
      );
    }

    const communityPostLikeRepository = new PrCommunityPostLikeRepository();
    const postLikeUsecase = new DfTogglePostLikeUsecase(
      communityPostLikeRepository
    );
    const result = await postLikeUsecase.execute(id, userId);

    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Route error" }, { status: 500 });
  }
};
