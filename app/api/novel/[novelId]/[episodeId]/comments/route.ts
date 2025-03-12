import { novelDi } from "@/infrastructure/config/novelDi";
import { userDi } from "@/infrastructure/config/userDi";
import { getParamsFromRequest } from "@/utils/params/requestParams";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { novelId, episodeId } = getParamsFromRequest(request, [
    "novelId",
    "episodeId",
  ]);

  const novelIdNumber = Number(novelId);

  if (!episodeId || isNaN(novelIdNumber)) {
    return NextResponse.json(
      { error: "유효하지 않은 novelId 또는 episodeId 값입니다." },
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

    const comments = await novelDi.getCommentsUsecase.execute(
      episodeId,
      userId
    );
    const count = await novelDi.getCommentCountUsecase.execute(episodeId);
    const episode = await novelDi.getEpisodeByIdUseCase.execute(
      Number(episodeId)
    );

    if (!episode) {
      return NextResponse.json(
        { error: "해당 에피소드를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      count,
      comments,
      episodeAuthorId: episode.userId,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "서버 오류" },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  const { novelId, episodeId } = getParamsFromRequest(request, [
    "novelId",
    "episodeId",
  ]);

  const novelIdNumber = Number(novelId);

  if (!episodeId || isNaN(novelIdNumber)) {
    return NextResponse.json(
      { error: "유효하지 않은 novelId 또는 episodeId 값입니다." },
      { status: 400 }
    );
  }
  const body = await request.json();
  const { comment, parentId } = body;

  try {
    const userId = await userDi.getUserIdUsecase.execute();
    if (!userId) {
      return NextResponse.json(
        { error: "유효하지 않은 사용자" },
        { status: 401 }
      );
    }

    const result = await novelDi.createCommentUsecase.execute(
      episodeId,
      userId,
      comment,
      parentId,
      novelIdNumber
    );

    return NextResponse.json({ result });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "서버 오류" },
      { status: 500 }
    );
  }
};
