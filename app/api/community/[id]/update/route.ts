import { DfVerifyRefreshToken } from "@/application/usecases/auth/DfVerifyRefreshToken";
import { DfPostUpdateUsecase } from "@/application/usecases/community/DfPostUpdateUsecase";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { PrCommunityPostRepository } from "@/infrastructure/repositories/PrCommunityPostRepository";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = await params;
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

    const { id: userId } = verifiedUser;

    const communityPostRepository = new PrCommunityPostRepository();
    const postCreateUsecase = new DfPostUpdateUsecase(communityPostRepository);
    const postId = await postCreateUsecase.execute(
      userId,
      id,
      title,
      content,
      fields
    );

    return NextResponse.json(postId);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "게시글 수정 실패" },
        { status: 500 }
      );
    }
  }
};
