import { NextRequest, NextResponse } from "next/server";
import { novelDi } from "@/infrastructure/config/novelDi";

export const GET = async (req: NextRequest) => {
  try {
    const banners = await novelDi.getBannerNovelsUsecase.execute();
    return NextResponse.json({ banners }, { status: 200 });
  } catch (error) {
    console.error("배너 데이터 불러오기 오류:", error);
    return NextResponse.json({ error: "서버 내부 오류" }, { status: 500 });
  }
};
