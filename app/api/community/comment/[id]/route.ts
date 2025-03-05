import { DfCommentCountUsecase } from "@/application/usecases/comment/DfCommentCountUsecase";
import { PrCommunityCommentRepository } from "@/infrastructure/repositories/PrCommunityCommentRepository";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id: postId } = params;

  try {
    const communityCommentRepository = new PrCommunityCommentRepository();
    const commentCountUsecase = new DfCommentCountUsecase(
      communityCommentRepository
    );

    const count = await commentCountUsecase.execute(postId);

    return NextResponse.json({ count });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Route : postId가 없습니다." },
      { status: 500 }
    );
  }
};
