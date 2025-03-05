import { DfVerifyRefreshToken } from "@/application/usecases/auth/DfVerifyRefreshToken";
import { DfPostDetailByUserIdUsecase } from "@/application/usecases/community/DfPostDetailByUserIdUsecase";
import { DfPostStatusUpdateUsecase } from "@/application/usecases/community/DfPostStatusUpdateUsecase";
import { CommunityPostRepository } from "@/domain/repositories/CommunityPostRepository";
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

export const PATCH = async (req: NextRequest) => {
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

    const { postId } = await req.json();

    const communityPostRepository: CommunityPostRepository =
      new PrCommunityPostRepository();
    const postStatusUpdateUsecase = new DfPostStatusUpdateUsecase(
      communityPostRepository
    );

    await postStatusUpdateUsecase.execute(userId, postId);
    return NextResponse.json(
      { message: "모집 상태가 성공적으로 변경되었습니다!" },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "모집 상태 변경 실패" },
        { status: 500 }
      );
    }
  }
};
