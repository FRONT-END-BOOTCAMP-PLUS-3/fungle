import { DfVerifyRefreshToken } from "@/application/usecases/auth/DfVerifyRefreshToken";
import { DfCommentCountUsecase } from "@/application/usecases/comment/DfCommentCountUsecase";
import { DfCommentCreateUsecase } from "@/application/usecases/comment/DfCommentCreateUsecase";
import { DfCommentUpdateUsecase } from "@/application/usecases/comment/DfCommentUpdateUsecase";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { PrCommunityCommentRepository } from "@/infrastructure/repositories/PrCommunityCommentRepository";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id: postId } = await params;

  try {
    const communityCommentRepository = new PrCommunityCommentRepository();
    const commentCountUsecase = new DfCommentCountUsecase(
      communityCommentRepository
    );

    const count = await commentCountUsecase.execute(postId);

    return NextResponse.json({ count });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Route : postId가 없습니다." },
      { status: 500 }
    );
  }
};

export const POST = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;
  const body = await request.json();
  const { comment } = body;

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

    const communityCommentRepository = new PrCommunityCommentRepository();
    const commentCreatetUsecase = new DfCommentCreateUsecase(
      communityCommentRepository
    );
    const result = await commentCreatetUsecase.execute(id, userId, comment);

    return NextResponse.json({ result });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Route : postId가 없습니다." },
      { status: 500 }
    );
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;
  const body = await request.json();
  const { comment } = body;

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

    const communityCommentRepository = new PrCommunityCommentRepository();
    const commentUpdateUsecase = new DfCommentUpdateUsecase(
      communityCommentRepository
    );

    const result = await commentUpdateUsecase.execute(id, userId, comment);

    return NextResponse.json({ result });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Route : postId가 없습니다." },
      { status: 500 }
    );
  }
};
