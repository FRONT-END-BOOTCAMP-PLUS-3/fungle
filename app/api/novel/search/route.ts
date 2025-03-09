import { NextRequest, NextResponse } from "next/server";
import { novelDi } from "@/infrastructure/config/novelDi";

export const GET = async (req: NextRequest) => {
  try {
    const { search, filter } = Object.fromEntries(req.nextUrl.searchParams);
    
    if (!search || !filter) {
      return NextResponse.json({ message: "검색어와 필터가 필요합니다." }, { status: 400 });
    }

    const searchUsecase = novelDi.searchNovelsUsecase;
    const novels = await searchUsecase.execute(search, filter);

    return NextResponse.json({ novels }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "검색 중 오류 발생" }, { status: 500 });
  }
};
