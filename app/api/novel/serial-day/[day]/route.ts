import { NextRequest, NextResponse } from "next/server";
import { novelDi } from "@/infrastructure/config/novelDi";

export const GET = async (req: NextRequest) => {
  try {
    const urlParts = req.nextUrl.pathname.split("/").filter(Boolean);
    const dayIndex = urlParts.indexOf("serial-day") + 1;
    const day =
      dayIndex > 0 && dayIndex < urlParts.length ? urlParts[dayIndex] : null;

    if (!day) {
      return NextResponse.json(
        { error: "요일이 지정되지 않았습니다." },
        { status: 400 }
      );
    }

    const novels = await novelDi.getNovelsBySerialDayUseCase.execute(day);
    return NextResponse.json({ novels: novels ?? [] }, { status: 200 });
  } catch (error: unknown) {
    console.error("요일별 소설 API 오류:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { novels: [], message: `오류 발생 ${error.message}` },
        { status: 200 }
      );
    }
    return NextResponse.json({ novels: [] }, { status: 200 });
  }
};
