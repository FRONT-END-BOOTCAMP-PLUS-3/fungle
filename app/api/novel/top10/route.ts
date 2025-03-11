import { NextRequest, NextResponse } from "next/server";
import { novelDi } from "@/infrastructure/config/novelDi";

export const GET = async (req: NextRequest) => {
  try {
    const topNovels = await novelDi.getTopNovelsUseCase.execute(10);

    return NextResponse.json(topNovels, { status: 200 });
  } catch (error) {
    console.error("Top 10 소설 조회 오류:", error);
    return NextResponse.json({ error: "서버 내부 오류" }, { status: 500 });
  }
};
