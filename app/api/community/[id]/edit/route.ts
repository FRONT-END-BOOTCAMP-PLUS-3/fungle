import { DfGetPostWithRecruitmentsUsecase } from "@/application/usecases/community/DfGetPostWithRecruitmentsUsecase";
import { PrCommunityPostRepository } from "@/infrastructure/repositories/PrCommunityPostRepository";
import { getParamsFromRequest } from "@/utils/params/requestParams";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { id } = getParamsFromRequest(request, ["id"]);

  if (!id) {
    return NextResponse.json(
      { error: "요청에 id를 포함해야 합니다." },
      { status: 400 }
    );
  }

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
