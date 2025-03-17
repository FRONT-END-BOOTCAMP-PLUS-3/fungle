import { NovelEpisodeWithUserInfo } from "@/application/usecases/novel/dto/NovelEpisodeWithUserInfo";
import { adminDi } from "@/infrastructure/config/adminDi";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const data: NovelEpisodeWithUserInfo[] =
      await adminDi.novelEpisodeWithUserInfoUsecase.execute();

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
