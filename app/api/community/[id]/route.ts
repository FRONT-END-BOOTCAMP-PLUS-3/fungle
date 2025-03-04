import { DfVerifyRefreshToken } from "@/application/usecases/auth/DfVerifyRefreshToken";
import { DfPostDeleteUsecase } from "@/application/usecases/community/DfPostDeleteUsecase";
import { DfPostDetailUsecase } from "@/application/usecases/community/DfPostDetailUsecase";

import { PrCommunityPostRepository } from "@/infrastructure/repositories/PrCommunityPostRepository";
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
    const communityPostRepository = new PrCommunityPostRepository();
    const userRepository = new PrUserRepository();

    const postDetailUsecase = new DfPostDetailUsecase(
      communityPostRepository,
      userRepository
    );

    const postDetail = await postDetailUsecase.execute(id);

    return NextResponse.json(postDetail);
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

export const DELETE = async (
  requets: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = await params;

    if (!id) return "ID가 없습니다.";

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

    const communityPostRepository = new PrCommunityPostRepository();
    const postDeleteUsecase = new DfPostDeleteUsecase(communityPostRepository);

    const isDelete = await postDeleteUsecase.execute(id, userId);

    if (!isDelete) {
      return NextResponse.json(
        { error: "게시글 삭제에 실패했습니다." },
        { status: 400 }
      );
    }

    return NextResponse.json({ isDelete }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
  }
};
