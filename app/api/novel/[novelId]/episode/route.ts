import { NextRequest, NextResponse } from "next/server";
import { novelDi } from "@/infrastructure/config/novelDi";
import { getParamsFromRequest } from "@/utils/params/requestParams";

export const POST = async (req: NextRequest) => {
  try {
    let body;
    try {
      body = await req.json();
    } catch (error) {
      console.error("JSON 파싱 오류:", error);
      return NextResponse.json(
        { error: "잘못된 JSON 형식입니다." },
        { status: 400 }
      );
    }

    const { userId, episode, title, content, isFinalEpisode } = body;
    const { novelId } = getParamsFromRequest(req, ["novelId"]);

    if (!novelId) {
      return NextResponse.json(
        { error: "요청에 id를 포함해야 합니다." },
        { status: 400 }
      );
    }
    const newEpisode = await novelDi.createEpisodeUseCase.execute(
      Number(novelId),
      String(userId),
      Number(episode),
      String(title),
      String(content),
      Boolean(isFinalEpisode)
    );

    return NextResponse.json(
      { message: "에피소드가 성공적으로 생성되었습니다.", episode: newEpisode },
      { status: 201 }
    );
  } catch (error) {
    console.error("에피소드 생성 오류:", error);

    if (error instanceof Error) {
      const errorMessage = error.message || "알 수 없는 오류 발생";

      if (errorMessage.startsWith("FORBIDDEN")) {
        return NextResponse.json(
          { error: "소설을 연재할 권한이 없습니다" },
          { status: 403 }
        );
      }
      if (errorMessage.startsWith("NOT_FOUND")) {
        return NextResponse.json(
          { error: "소설을 찾을 수 없습니다" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json({ error: "서버 내부 오류" }, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const { novelId } = getParamsFromRequest(req, ["novelId"]);

    if (!novelId) {
      return NextResponse.json(
        { error: "요청에 id를 포함해야 합니다." },
        { status: 400 }
      );
    }
    const parsedNovelId = parseInt(novelId, 10);

    const episodes = await novelDi.getEpisodesByNovelIdUseCase.execute(
      parsedNovelId
    );

    return NextResponse.json(
      {
        episodes: episodes ?? [],
        message: episodes?.length ? undefined : "등록된 에피소드가 없습니다.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("에피소드 조회 오류:", error);
    return NextResponse.json({ error: "서버 내부 오류" }, { status: 500 });
  }
};
