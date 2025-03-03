import { DfVerifyRefreshToken } from "@/application/usecases/auth/DfVerifyRefreshToken";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  try {
    // 로그인 된 사용자인지 검증
    const refreshToken = req.cookies.get("refreshToken")?.value;
    if (!refreshToken) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const userRepository: UserRepository = new PrUserRepository();
    const verifyRefreshTokenUsecase = new DfVerifyRefreshToken(userRepository);
    const verifiedUser = await verifyRefreshTokenUsecase.execute(refreshToken);

    const userId = verifiedUser?.id;
    const { introduce } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "로그인이 되어 있지 않습니다." });
    }

    await userRepository.updateIntroduce(userId, introduce);
    return NextResponse.json(
      {
        message: "작가 소개가 정상적으로 수정되었습니다!",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." });
  }
};
