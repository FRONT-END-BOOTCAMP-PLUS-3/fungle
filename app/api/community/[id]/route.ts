import { DfPostDetailUsecase } from "@/application/usecases/community/DfPostDetailUsecase";

import { PrCommunityPostRepository } from "@/infrastructure/repositories/PrCommunityPostRepository";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  requets: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;

  if (!id) return "ID가 없습니다.";

  try {
    const communityPostRepository = new PrCommunityPostRepository();
    const userRepository = new PrUserRepository();

    const postDetailUsecase = new DfPostDetailUsecase(
      communityPostRepository,
      userRepository
    );

    const postDetail = await postDetailUsecase.execute(id);

    console.log(postDetail);
    return NextResponse.json(postDetail);
  } catch (error: unknown) {
    let message = "Unknown error";
    let status = 500;
    if (error instanceof Error) {
      message = error.message;
      const typedError = error as { status?: number };
      if (typedError.status) {
        status = typedError.status;
      }
    }
    return NextResponse.json({ error: message }, { status });
  }
};
