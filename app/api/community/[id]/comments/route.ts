import { DfPostDetailCommentUsecase } from "@/application/usecases/community/DfPostDetailCommentUsecase";
import { userDi } from "@/infrastructure/config/userDi";
import { PrCommunityCommentRepository } from "@/infrastructure/repositories/PrCommunityCommentRepository";
import { getParamsFromRequest } from "@/utils/params/requestParams";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { id } = getParamsFromRequest(request, ["id"]);

  if (!id) {
    return NextResponse.json(
      { error: "요청에 id를 포함해야 합니다." },
      { status: 400 },
    );
  }

  try {
    const commentPostRepository = new PrCommunityCommentRepository();
    const postCommentUsecase = new DfPostDetailCommentUsecase(
      commentPostRepository,
    );

    const userId = await userDi.getUserIdUsecase.execute();
    if (!userId) {
      return NextResponse.json(
        { error: "유효하지 않은 사용자" },
        { status: 401 },
      );
    }

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
