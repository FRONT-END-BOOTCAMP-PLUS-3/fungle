import { DfUpdateNicknameUsecase } from "@/application/usecases/user/DfUpdateNicknameUsecase";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { userDi } from "@/infrastructure/config/userDi";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { NextRequest, NextResponse } from "next/server";
import { NicknameError } from "@/application/usecases/user/error/NicknameError";

export const PATCH = async (req: NextRequest) => {
  const userId = await userDi.getUserIdUsecase.execute();
  if (!userId) {
    return NextResponse.json(
      { error: "로그인 되어 있지 않습니다." },
      { status: 401 }
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
    if (error instanceof NicknameError) {
      let statusCode = 400;
      if (error.type === "DUPLICATE_NICKNAME") statusCode = 409;
      return NextResponse.json(
        { error: error.message },
        { status: statusCode }
      );
    }
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
};
