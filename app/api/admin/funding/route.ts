import { adminDi } from "@/infrastructure/config/adminDi";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const fundings = await adminDi.findAllFundingWithNovelUsecase.execute();
    if (!fundings || fundings.length === 0) {
      return NextResponse.json(
        { message: "시작된 펀딩이 없습니다." },
        { status: 204 }
      );
    }

    return NextResponse.json({ fundings }, { status: 200 });
  } catch (error) {}
};
