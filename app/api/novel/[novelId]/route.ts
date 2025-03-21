import { NextRequest, NextResponse } from "next/server";
import { novelDi } from "@/infrastructure/config/novelDi";
import { userDi } from "@/infrastructure/config/userDi";
import { getParamsFromRequest } from "@/utils/params/requestParams";

export const GET = async (req: NextRequest) => {
  try {
    const { novelId } = getParamsFromRequest(req, ["novelId"]);

    if (!novelId) {
      return NextResponse.json(
        { error: "요청에 id를 포함해야 합니다." },
        { status: 400 }
      );
    }

    const parsedNovelId = parseInt(novelId, 10);
    if (isNaN(parsedNovelId)) {
      return NextResponse.json(
        { error: "잘못된 소설 ID입니다." },
        { status: 400 }
      );
    }

    const novel = await novelDi.getNovelByIdUseCase.execute(parsedNovelId);
    if (!novel) {
      return NextResponse.json(
        { error: "소설을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const episodes = await novelDi.getEpisodesByNovelIdUseCase.execute(
      parsedNovelId
    );

    const userId = await userDi.getUserIdUsecase.execute();
    let isLiked = false;

    if (userId) {
      isLiked = await novelDi.checkNovelLikeStatusUsecase.execute(parsedNovelId, userId);
    }

    
    return NextResponse.json({ ...novel, episodes, isLiked }, { status: 200 });
  } catch (error) {
    console.error("소설 조회 오류:", error);
    return NextResponse.json({ error: "서버 내부 오류" }, { status: 500 });
  }
};
