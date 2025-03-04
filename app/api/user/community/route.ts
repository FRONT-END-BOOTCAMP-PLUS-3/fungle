import { DfVerifyRefreshToken } from "@/application/usecases/auth/DfVerifyRefreshToken";
import { DfPostDetailByUserIdUsecase } from "@/application/usecases/community/DfPostDetailByUserIdUsecase";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { PrCommunityPostRepository } from "@/infrastructure/repositories/PrCommunityPostRepository";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
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

    if (!userId) {
      return NextResponse.json({ posts: [] }, { status: 400 });
    }

    const communityPostRepository = new PrCommunityPostRepository();
    const postDetailByUserIdUsecase = new DfPostDetailByUserIdUsecase(
      communityPostRepository
    );

    const posts = await postDetailByUserIdUsecase.execute(userId);

    if (!posts) {
      return NextResponse.json({ posts: [] }, { status: 400 });
    }

    return NextResponse.json({ posts: posts }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "서버에서 오류가 발생했습니다." },
      { status: 500 }
    );
  }
};
