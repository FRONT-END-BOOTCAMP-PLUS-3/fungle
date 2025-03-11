import { NextResponse } from "next/server";
import { novelDi } from "@/infrastructure/config/novelDi";

export const GET = async () => {
  try {
    const banners = await novelDi.getBannerNovelsUsecase.execute();
    return NextResponse.json({ banners }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "서버 내부 오류" }, { status: 500 });
  }
};
