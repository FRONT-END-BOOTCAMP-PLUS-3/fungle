import { DfUpdateNicknameUsecase } from "@/application/usecases/user/DfUpdateNicknameUsecase";
import { NicknameError } from "@/application/usecases/user/error/NicknameError";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { userDi } from "@/infrastructure/config/userDi";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const userId = await userDi.getUserIdUsecase.execute();
  if (!userId) {
    return NextResponse.json(
      { message: "사용자를 찾을 수 없습니다." },
      { status: 400 }
    );
  }

  const userRepository: UserRepository = new PrUserRepository();

  const { newNickname } = await req.json();
  const updateNicknameUsecase = new DfUpdateNicknameUsecase(userRepository);

  try {
    const updatedNickname = await updateNicknameUsecase.execute(
      userId,
      newNickname
    );
    return NextResponse.json({ nickname: updatedNickname }, { status: 200 });
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
