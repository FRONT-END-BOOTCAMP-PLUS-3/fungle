import { NextRequest, NextResponse } from "next/server";
import { novelDi } from "@/infrastructure/config/novelDi";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest, { params }: { params: { day?: string } } ) => {
  try {
    const day = params.day; 

    if (!day) {
      return NextResponse.json(
        { error: "요일이 지정되지 않았습니다." },
        { status: 400 }
      );
    }

    const novels = await novelDi.getNovelsBySerialDayUseCase.execute(day);
    return NextResponse.json({ novels }, { status: 200 });

  } catch (error) {
    console.error("연재 요일별 소설 조회 오류:", error);
    return NextResponse.json(
      { error: "서버 내부 오류" },
      { status: 500 }
    );
  }
};
