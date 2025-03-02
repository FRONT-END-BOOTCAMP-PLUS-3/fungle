import { DfGetPostWithRecruitmentsUsecase } from "@/application/usecases/community/DfGetPostWithRecruitmentsUsecase";
import { PrCommunityPostRepository } from "@/infrastructure/repositories/PrCommunityPostRepository";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;

  if (!id) return "ID가 없습니다.";

  try {
    const communityPostRepository = new PrCommunityPostRepository();
    const getPostWithRecruitmentsUsecase = new DfGetPostWithRecruitmentsUsecase(
      communityPostRepository
    );
    const postWithRecruitments = await getPostWithRecruitmentsUsecase.execute(
      id
    );

    return NextResponse.json(postWithRecruitments);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "게시글 불러오기 실패" },
        { status: 500 }
      );
    }
  }
};
