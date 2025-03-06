import { DfVerifyRefreshToken } from "@/application/usecases/auth/DfVerifyRefreshToken";
import { DfToggleCommentUsecase } from "@/application/usecases/comment/DfToggleCommentUsecase";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { PrCommunityCommentLikeRepository } from "@/infrastructure/repositories/PrCommunityCommentLikeRepository";

import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;

  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }

    const userRepository: UserRepository = new PrUserRepository();
    const verifyRefreshTokenUsecase = new DfVerifyRefreshToken(userRepository);
    const verifiedUser = await verifyRefreshTokenUsecase.execute(refreshToken);

    if (!verifiedUser) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const { id: userId } = verifiedUser;

    const communityCommentLikeRepository =
      new PrCommunityCommentLikeRepository();
    const toggleCommentLikeUsecase = new DfToggleCommentUsecase(
      communityCommentLikeRepository
    );
    const isLiked = await toggleCommentLikeUsecase.execute(id, userId);

    return NextResponse.json(isLiked);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Failed to like comment" },
      { status: 500 }
    );
  }
};
