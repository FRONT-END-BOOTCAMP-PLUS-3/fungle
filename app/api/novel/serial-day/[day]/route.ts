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
    return NextResponse.json({ novels }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: `오류 발생 ${error.message}` },
        { status: 500 }
      );
    }
  }
};
