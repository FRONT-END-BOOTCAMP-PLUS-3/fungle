import { NextResponse } from "next/server";
import { userDi } from "@/infrastructure/config/userDi";
import { PostWithCountAndRecruitmentDto } from "@/application/usecases/community/dto/PostWithCountAndRecruitmentDto";

export const GET = async () => {
  try {
    const userId = await userDi.getUserIdUsecase.execute();
    if (!userId) {
      return NextResponse.json(
        { error: "로그인이 되어 있지 않습니다." },
        { status: 401 }
      );
    }

    const likedPosts: PostWithCountAndRecruitmentDto[] =
      await userDi.likedCommunityPostsUsecase.execute(userId);

    return NextResponse.json({ likedPosts }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "좋아요를 누른 커뮤니티 목록을 가져오는 데 실패했습니다.",
      },
      { status: 500 }
    );
  }
};
