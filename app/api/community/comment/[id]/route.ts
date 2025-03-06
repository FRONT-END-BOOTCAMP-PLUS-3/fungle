import { DfCommentCountUsecase } from "@/application/usecases/comment/DfCommentCountUsecase";
import { DfCommentCreateUsecase } from "@/application/usecases/comment/DfCommentCreateUsecase";
import { DfCommentDeleteUseccase } from "@/application/usecases/comment/DfCommentDeleteUseccase";
import { DfCommentUpdateUsecase } from "@/application/usecases/comment/DfCommentUpdateUsecase";
import { userDi } from "@/infrastructure/config/userDi";
import { PrCommunityCommentRepository } from "@/infrastructure/repositories/PrCommunityCommentRepository";
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
    const userId = await userDi.getUserIdUsecase.execute();
    if (!userId) {
      return NextResponse.json(
        { error: "유효하지 않은 사용자" },
        { status: 401 }
      );
    }

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
    const userId = await userDi.getUserIdUsecase.execute();
    if (!userId) {
      return NextResponse.json(
        { error: "유효하지 않은 사용자" },
        { status: 401 }
      );
    }

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

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;

  try {
    const userId = await userDi.getUserIdUsecase.execute();
    if (!userId) {
      return NextResponse.json(
        { error: "유효하지 않은 사용자" },
        { status: 401 }
      );
    }

    const communityCommentRepository = new PrCommunityCommentRepository();
    const commentDeleteUsecase = new DfCommentDeleteUseccase(
      communityCommentRepository
    );

    const isDeleted = await commentDeleteUsecase.execute(id, userId);

    return NextResponse.json({ isDeleted });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Route : Id가 없습니다." },
      { status: 500 }
    );
  }
};
