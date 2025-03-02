import { NextRequest, NextResponse } from "next/server";
import { novelDi } from "@/infrastructure/config/novelDi"; 

export async function GET(req: NextRequest, context: { params: { novelId: string } }) {
  try {
    const { novelId } = context.params;
    const parsedNovelId = parseInt(novelId, 10);

    if (isNaN(parsedNovelId)) {
      return NextResponse.json({ error: "잘못된 소설 ID입니다." }, { status: 400 });
    }

    // ✅ 소설 정보 조회
    const novel = await novelDi.getNovelByIdUseCase.execute(parsedNovelId);
    if (!novel) {
      return NextResponse.json({ error: "소설을 찾을 수 없습니다." }, { status: 404 });
    }

    // ✅ `episodes`가 항상 배열로 반환되도록 보장
    const episodes = await novelDi.getEpisodesByNovelIdUseCase.execute(parsedNovelId) || [];

    return NextResponse.json({ ...novel, episodes }, { status: 200 });
  } catch (error) {
    console.error("소설 조회 오류:", error);
    return NextResponse.json({ error: "서버 내부 오류" }, { status: 500 });
  }
}
