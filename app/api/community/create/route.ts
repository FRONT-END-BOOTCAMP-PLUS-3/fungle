import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { PrCommunityPostRepository } from "@/infrastructure/repositories/PrCommunityPostRepository";
import { DfPostCreateUsecase } from "@/application/usecases/community/DfPostCreateUsecase";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { DfVerifyRefreshToken } from "@/application/usecases/auth/DfVerifyRefreshToken";
export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }

    const { title, content, fields } = body;

    const userRepository: UserRepository = new PrUserRepository();
    const verifyRefreshTokenUsecase = new DfVerifyRefreshToken(userRepository);
    const verifiedUser = await verifyRefreshTokenUsecase.execute(refreshToken);

    if (!verifiedUser) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const { userId } = verifiedUser;

    const communityPostRepository = new PrCommunityPostRepository();
    const postCreateUsecase = new DfPostCreateUsecase(communityPostRepository);
    const postId = await postCreateUsecase.execute(
      userId,
      title,
      content,
      fields
    );

    return NextResponse.json(postId);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "게시글 생성 실패" },
        { status: 500 }
      );
    }
  }
};
