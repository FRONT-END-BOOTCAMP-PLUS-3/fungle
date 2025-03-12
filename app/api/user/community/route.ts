import { DfPostDetailByUserIdUsecase } from "@/application/usecases/community/DfPostDetailByUserIdUsecase";
import { DfPostStatusUpdateUsecase } from "@/application/usecases/community/DfPostStatusUpdateUsecase";
import { CommunityPostRepository } from "@/domain/repositories/CommunityPostRepository";
import { userDi } from "@/infrastructure/config/userDi";
import { PrCommunityPostRepository } from "@/infrastructure/repositories/PrCommunityPostRepository";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const userId = await userDi.getUserIdUsecase.execute();

    if (!userId) {
      return NextResponse.json({ posts: [] }, { status: 400 });
    }

    const communityPostRepository = new PrCommunityPostRepository();
    const postDetailByUserIdUsecase = new DfPostDetailByUserIdUsecase(
      communityPostRepository
    );

    const posts = await postDetailByUserIdUsecase.execute(userId);

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

    const communityPostRepository: CommunityPostRepository =
      new PrCommunityPostRepository();
    const postStatusUpdateUsecase = new DfPostStatusUpdateUsecase(
      communityPostRepository
    );

    await postStatusUpdateUsecase.execute(userId, postId);
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
