import { NextRequest, NextResponse } from "next/server";
import { DfLikedCommunityPostsUsecase } from "@/application/usecases/community/DfLikedCommunityPostsUsecase";
import { PrCommunityPostLikeRepository } from "@/infrastructure/repositories/PrCommunityPostLikeRepository";
import { userDi } from "@/infrastructure/config/userDi";

export const GET = async (req: NextRequest) => {
  try {
    const userId = await userDi.getUserIdUsecase.execute();
    if (!userId) {
      return NextResponse.json({ error: "로그인이 되어 있지 않습니다." });
    }

    const communityPostLikeRepository = new PrCommunityPostLikeRepository();
    const likedCommunityPostsUsecase = new DfLikedCommunityPostsUsecase(
      communityPostLikeRepository
    );

    const likedPosts = await likedCommunityPostsUsecase.execute(userId);

    return NextResponse.json({ likedPosts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "좋아요를 누른 커뮤니티 목록을 가져오는 데 실패했습니다." },
      { status: 500 }
    );
  }
};
