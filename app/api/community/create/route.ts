import { NextRequest, NextResponse } from "next/server";
import { PrCommunityPostRepository } from "@/infrastructure/repositories/PrCommunityPostRepository";
import { DfPostCreateUsecase } from "@/application/usecases/community/DfPostCreateUsecase";
import { userDi } from "@/infrastructure/config/userDi";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const userId = await userDi.getUserIdUsecase.execute();
    if (!userId) {
      return NextResponse.json(
        { error: "유효하지 않은 사용자" },
        { status: 401 }
      );
    }
    const { title, content, fields } = body;

    const communityPostRepository = new PrCommunityPostRepository();
    const postCreateUsecase = new DfPostCreateUsecase(communityPostRepository);
    const postId = await postCreateUsecase.execute(
      userId,
      title,
      content,
      fields
    );

    return NextResponse.json(postId);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "게시글 생성 실패" },
        { status: 500 }
      );
    }
  }
};
