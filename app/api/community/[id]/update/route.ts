import { DfPostUpdateUsecase } from "@/application/usecases/community/DfPostUpdateUsecase";
import { userDi } from "@/infrastructure/config/userDi";
import { PrCommunityPostRepository } from "@/infrastructure/repositories/PrCommunityPostRepository";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = await params;
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
    const postCreateUsecase = new DfPostUpdateUsecase(communityPostRepository);
    const postId = await postCreateUsecase.execute(
      userId,
      id,
      title,
      content,
      fields
    );

    return NextResponse.json(postId);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "게시글 수정 실패" },
        { status: 500 }
      );
    }
  }
};
