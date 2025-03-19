import { LikedNovelDto } from "@/application/usecases/novel/dto/LikedNovel";
import { userDi } from "@/infrastructure/config/userDi";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const userId = await userDi.getUserIdUsecase.execute();

    if (!userId) {
      return NextResponse.json(
        { novels: null, error: "로그인 되어 있지 않습니다." },
        { status: 401 }
      );
    }

    const likedNovels: LikedNovelDto[] =
      await userDi.getLikedNovelsUsecase.execute(userId);

    return NextResponse.json({ novels: likedNovels }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "좋아요를 누른 소설 목록을 가져오는 데 실패했습니다.",
      },
      { status: 500 }
    );
  }
};
