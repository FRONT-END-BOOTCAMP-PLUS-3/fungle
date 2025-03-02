import { NextRequest, NextResponse } from "next/server";
import { novelDi } from "@/infrastructure/config/novelDi";

export const POST = async (req: NextRequest, context: { params: { novelId: string } }) => {
  try {
    if (!req.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json({ error: "Invalid content type. Expected application/json" }, { status: 400 });
    }

    let body;
    try {
      body = await req.json();
    } catch (error) {
      console.error("JSON 파싱 오류:", error);
      return NextResponse.json({ error: "잘못된 JSON 형식입니다." }, { status: 400 });
    }

    const { userId, episode, title, content } = body;
    const { novelId } = context.params;

    const newEpisode = await novelDi.createEpisodeUseCase.execute(
      Number(novelId),
      String(userId),
      Number(episode),
      String(title),
      String(content)
    );

    return NextResponse.json({ message: "에피소드가 성공적으로 생성되었습니다.", episode: newEpisode }, { status: 201 });
  } catch (error) {
    console.error("에피소드 생성 오류:", error);
    return NextResponse.json({ error: "서버 내부 오류" }, { status: 500 });
  }
};

export const GET = async (req: NextRequest, context: { params: Promise<{ novelId: string }> }) => {
  try {
    const params = await context.params;
    const parsedNovelId = parseInt(params.novelId, 10);

    if (isNaN(parsedNovelId)) {
      return NextResponse.json({ error: "잘못된 소설 ID입니다." }, { status: 400 });
    }

    const episodes = await novelDi.getEpisodesByNovelIdUseCase.execute(parsedNovelId);

    return NextResponse.json({ episodes: episodes ?? [], message: episodes?.length ? undefined : "등록된 에피소드가 없습니다." }, { status: 200 });
  } catch (error) {
    console.error("에피소드 조회 오류:", error);
    return NextResponse.json({ error: "서버 내부 오류" }, { status: 500 });
  }
};
