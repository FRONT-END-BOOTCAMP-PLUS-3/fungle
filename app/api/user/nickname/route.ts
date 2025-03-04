import { DfVerifyRefreshToken } from "@/application/usecases/auth/DfVerifyRefreshToken";
import { DfUpdateNicknameUsecase } from "@/application/usecases/user/DfUpdateNicknameUsecase";
import { NicknameError } from "@/application/usecases/user/error/NicknameError";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  // 로그인 된 사용자인지 검증
  const refreshToken = req.cookies.get("refreshToken")?.value;
  if (!refreshToken) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const userRepository: UserRepository = new PrUserRepository();
  const verifyRefreshTokenUsecase = new DfVerifyRefreshToken(userRepository);
  const verifiedUser = await verifyRefreshTokenUsecase.execute(refreshToken);

  const { newNickname } = await req.json();
  const userId = verifiedUser?.id ?? "";
  const updateNicknameUsecase = new DfUpdateNicknameUsecase(userRepository);

  try {
    const updatedNickname = await updateNicknameUsecase.execute(
      userId,
      newNickname
    );
    return NextResponse.json({ nickname: updatedNickname }, { status: 200 });
  } catch (error) {
    if (error instanceof NicknameError) {
      return NextResponse.json(
        { error: error.message, type: error.type },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
};
