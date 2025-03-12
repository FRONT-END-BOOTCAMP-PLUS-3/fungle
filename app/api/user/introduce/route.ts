import { UserRepository } from "@/domain/repositories/UserRepository";
import { userDi } from "@/infrastructure/config/userDi";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  try {
    const userId = await userDi.getUserIdUsecase.execute();
    if (!userId) {
      return NextResponse.json(
        { error: "로그인 되어 있지 않습니다." },
        { status: 401 }
      );
    }

    const userRepository: UserRepository = new PrUserRepository();

    const { introduce } = await req.json();

    await userRepository.updateIntroduce(userId, introduce);
    return NextResponse.json(
      {
        message: "작가 소개가 정상적으로 수정되었습니다!",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "서버 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
};
