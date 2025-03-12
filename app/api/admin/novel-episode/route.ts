import { DfNovelEpisodeWithUserInfoUsecase } from "@/application/usecases/novel/DfNovelEpisodeWithUserInfoUsecase";
import { NovelEpisodeWithUserInfo } from "@/application/usecases/novel/dto/NovelEpisodeWithUserInfo";
import { PrNovelEpisodeRepository } from "@/infrastructure/repositories/PrNovelEpisodeRepository";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const novelEpisodeRepository = new PrNovelEpisodeRepository();
    const novelEpisodeWithUserInfoUsecase =
      new DfNovelEpisodeWithUserInfoUsecase(novelEpisodeRepository);

    const data: NovelEpisodeWithUserInfo[] =
      await novelEpisodeWithUserInfoUsecase.execute();

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "소설 에피소드를 불러오는 데 실패했습니다.",
      },
      { status: 500 }
    );
  }
};
