import { NextResponse } from "next/server";
import { novelDi } from "@/infrastructure/config/novelDi";

export const GET = async () => {
  try {
    const topNovels = await novelDi.getTopNovelsUseCase.execute(10);

    return NextResponse.json(topNovels, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "서버 내부 오류" }, { status: 500 });
  }
};
