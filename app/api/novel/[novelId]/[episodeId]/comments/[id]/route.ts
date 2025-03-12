import { novelDi } from "@/infrastructure/config/novelDi";
import { userDi } from "@/infrastructure/config/userDi";
import { getParamsFromRequest } from "@/utils/params/requestParams";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (request: NextRequest) => {
  const { novelId, episodeId, id } = getParamsFromRequest(request, [
    "novelId",
    "episodeId",
    "id",
  ]);

  if (!id || !novelId || !episodeId) {
    return NextResponse.json(
      { error: "요청에 id를 포함해야 합니다." },
      { status: 400 }
    );
  }

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

    const result = await novelDi.updateCommentUsecase.execute(
      id,
      userId,
      comment
    );

    return NextResponse.json({ result });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Route : episodeId가 없습니다." },
      { status: 500 }
    );
  }
};

export const DELETE = async (request: NextRequest) => {
  const { novelId, episodeId, id } = getParamsFromRequest(request, [
    "novelId",
    "episodeId",
    "id",
  ]);

  if (!id || !novelId || !episodeId) {
    return NextResponse.json(
      { error: "요청에 id를 포함해야 합니다." },
      { status: 400 }
    );
  }

  try {
    const userId = await userDi.getUserIdUsecase.execute();
    if (!userId) {
      return NextResponse.json(
        { error: "유효하지 않은 사용자" },
        { status: 401 }
      );
    }

    const isDeleted = await novelDi.deleteCommentUsecase.execute(id, userId);

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
