import { NextRequest, NextResponse } from "next/server";
import { novelDi } from "@/infrastructure/config/novelDi";
import { getParamsFromRequest } from "@/utils/params/requestParams";

export const GET = async (req: NextRequest) => {
  try {
    const { day } = getParamsFromRequest(req, ["day"]);

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
