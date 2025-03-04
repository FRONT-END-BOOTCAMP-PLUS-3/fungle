import { DfVerifyRefreshToken } from "@/application/usecases/auth/DfVerifyRefreshToken";
import { DfTogglePostLikeUsecase } from "@/application/usecases/community/DfTogglePostLikeUsecase";
import { PrCommunityPostLikeRepository } from "@/infrastructure/repositories/PrCommunityPostLikeRepository";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { postId: id } = await body;

    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }
    const userRepository = new PrUserRepository();
    const verifyRefreshTokenUsecase = new DfVerifyRefreshToken(userRepository);
    const verifiedUser = await verifyRefreshTokenUsecase.execute(refreshToken);

    if (!verifiedUser) {
      return NextResponse.json(
        { error: "유효하지 않은 사용자" },
        { status: 401 }
      );
    }

    const { id: userId } = verifiedUser;

    const communityPostLikeRepository = new PrCommunityPostLikeRepository();
    const postLikeUsecase = new DfTogglePostLikeUsecase(
      communityPostLikeRepository
    );
    const likeCount = await postLikeUsecase.execute(id, userId);

    return NextResponse.json(likeCount);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Route error" }, { status: 500 });
  }
};
