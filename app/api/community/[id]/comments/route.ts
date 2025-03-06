import { DfVerifyRefreshToken } from "@/application/usecases/auth/DfVerifyRefreshToken";
import { DfPostDetailCommentUsecase } from "@/application/usecases/community/DfPostDetailCommentUsecase";
import { PrCommunityCommentRepository } from "@/infrastructure/repositories/PrCommunityCommentRepository";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  requets: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;
  if (!id) return "ID가 없습니다.";
  try {
    const commentPostRepository = new PrCommunityCommentRepository();
    const postCommentUsecase = new DfPostDetailCommentUsecase(
      commentPostRepository
    );

    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }

    const userRepository = new PrUserRepository();
    const verifyRefreshTokenUsecase = new DfVerifyRefreshToken(userRepository);
    const verifiedUser = await verifyRefreshTokenUsecase.execute(refreshToken);

    if (!verifiedUser) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const { id: userId } = verifiedUser;

    const comments = await postCommentUsecase.execute(id, userId);

    return NextResponse.json(comments);
  } catch (error: unknown) {
    let message = "Unknown error";
    let status = 500;
    if (error instanceof Error) {
      message = error.message;
      const typedError = error as { status?: number };
      if (typedError.status) {
        status = typedError.status;
      }
    }
    return NextResponse.json({ error: message }, { status });
  }
};
