import { NextRequest, NextResponse } from "next/server";
import { novelDi } from "@/infrastructure/config/novelDi";

export const GET = async (req: NextRequest, context: { params?: { novelId?: string } }) => {
  try {
    const params = await context.params; 

    if (!params?.novelId) {
      return NextResponse.json({ error: "잘못된 소설 ID입니다." }, { status: 400 });
    }

    const parsedNovelId = parseInt(params.novelId, 10);
    if (isNaN(parsedNovelId)) {
      return NextResponse.json({ error: "잘못된 소설 ID입니다." }, { status: 400 });
    }

    const novel = await novelDi.getNovelByIdUseCase.execute(parsedNovelId);
    if (!novel) {
      return NextResponse.json({ error: "소설을 찾을 수 없습니다." }, { status: 404 });
    }

    const episodes = await novelDi.getEpisodesByNovelIdUseCase.execute(parsedNovelId);
    return NextResponse.json({ ...novel, episodes }, { status: 200 });
  } catch (error) {
    console.error("소설 조회 오류:", error);
    return NextResponse.json({ error: "서버 내부 오류" }, { status: 500 });
  }
};
