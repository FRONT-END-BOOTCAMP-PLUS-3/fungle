import { DfGetUserStatsUsecase } from "@/application/usecases/user/DfGetUserStatsUsecase";
import { userDi } from "@/infrastructure/config/userDi";
import { PrCommunityPostRepository } from "@/infrastructure/repositories/PrCommunityPostRepository";
import { PrNovelRepository } from "@/infrastructure/repositories/PrNovelRepostiory";
import { NextResponse } from "next/server";

export const GET = async () => {
  const userId = await userDi.getUserIdUsecase.execute();

  if (!userId) {
    return NextResponse.json(
      { error: "로그인 되어 있지 않습니다." },
      { status: 401 }
    );
  }

  try {
    const novelRepository = new PrNovelRepository();
    const communityPostRepository = new PrCommunityPostRepository();

    const getUserStatsUsecase = new DfGetUserStatsUsecase(
      novelRepository,
      communityPostRepository
    );

    const counts = await getUserStatsUsecase.execute(userId);

    return NextResponse.json({ counts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "사용자가 작성한 글 개수를 가져오는 데 실패했습니다.",
      },
      { status: 500 }
    );
  }
};
