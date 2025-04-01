import { adminDi } from "@/infrastructure/config/adminDi";
import { NextRequest, NextResponse } from "next/server";

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
  } catch (error: unknown) {
    return NextResponse.json({
      message:
        error instanceof Error
          ? error.message
          : "펀딩을 가져오는 중 오류가 발생했습니다.",
    });
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "id가 유효하지 않습니다." },
        { status: 400 }
      );
    }

    await adminDi.activeFundingStageByIdUsecase.execute(id);

    return NextResponse.json(
      { message: "펀딩 상태를 성공적으로 변경했습니다." },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "펀딩 상태 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
};
