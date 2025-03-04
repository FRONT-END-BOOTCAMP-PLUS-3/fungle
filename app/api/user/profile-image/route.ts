import { DfVerifyRefreshToken } from "@/application/usecases/auth/DfVerifyRefreshToken";
import { DfUpdateProfileImage } from "@/application/usecases/user/DfUpdateProfileImageUsecase";
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
    const userId = verifiedUser?.id ?? "";

    const formData = await req.formData();
    const profileImage = formData.get("profileImage") as File;

    const updateProfileImageUsecase = new DfUpdateProfileImage(userRepository);
    await updateProfileImageUsecase.execute({ userId, profileImage });

    return NextResponse.json(
      { message: "프로필 사진이 성공적으로 수정되었습니다!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("프로필 사진 수정 오류: ", error);
    return NextResponse.json(
      { error: "서버에 오류가 발생했습니다." },
      { status: 500 }
    );
  }
};
