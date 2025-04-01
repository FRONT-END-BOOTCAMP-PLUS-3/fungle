import { adminDi } from "@/infrastructure/config/adminDi";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "id가 유효하지 않습니다." },
        { status: 400 }
      );
    }

    await adminDi.deleteFundingByIdUsecase.execute(id);

    return NextResponse.json(
      { message: "펀딩 신청을 거절했습니다. 펀딩이 삭제됩니다." },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "펀딩 거절 중 오류가 발생했습니다.",
      },
      { status: 400 }
    );
  }
};
