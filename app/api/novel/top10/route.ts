import { NextResponse } from "next/server";
import { novelDi } from "@/infrastructure/config/novelDi";

export const GET = async () => {
  try {
    console.log("[Top10 API] 요청 시작");
    const topNovels = await novelDi.getTopNovelsUseCase.execute(10);
    console.log(`[Top10 API] 반환할 소설 수: ${topNovels?.length ?? 0}`);

    return NextResponse.json(topNovels ?? [], { status: 200 });
  } catch (error: unknown) {
    console.error("[Top10 API] 오류:", error);
    if (error instanceof Error) {
      console.error("[Top10 API] 오류 상세:", error.message, error.stack);
      return NextResponse.json([], { status: 200 });
    }
    return NextResponse.json([], { status: 200 });
  }
};
