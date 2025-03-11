import { NextRequest, NextResponse } from "next/server";
import { novelDi } from "@/infrastructure/config/novelDi";


export const GET = async (req: NextRequest, { params }: { params: { day: string } } ) => {
  try {
    const day = await params.day; 

    if (!day) {
      return NextResponse.json(
        { error: "요일이 지정되지 않았습니다." },
        { status: 400 }
      );
    }

    const novels = await novelDi.getNovelsBySerialDayUseCase.execute(day);
    return NextResponse.json({ novels }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: "서버 내부 오류" },
      { status: 500 }
    );
  }
};
