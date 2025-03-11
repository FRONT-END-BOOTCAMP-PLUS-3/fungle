import { NextRequest, NextResponse } from "next/server";
import { novelDi } from "@/infrastructure/config/novelDi";
import { getParamsFromRequest } from "@/utils/params/requestParams";

export const GET = async (req: NextRequest) => {
  const { novelId, episodeId } = getParamsFromRequest(req, [
    "novelId",
    "episodeId",
  ]);

  if (!novelId || !episodeId) {
    return NextResponse.json(
      { error: "요청에 id를 포함해야 합니다." },
      { status: 400 }
    );
  }

  const parsedNovelId = parseInt(novelId, 10);
  const parsedEpisodeId = parseInt(episodeId, 10);

  if (isNaN(parsedNovelId) || isNaN(parsedEpisodeId)) {
    return NextResponse.json(
      { error: "Invalid novel or episode ID" },
      { status: 400 }
    );
  }

  try {
    await novelDi.increaseViewCountUseCase.execute(parsedEpisodeId);

    const episode = await novelDi.getEpisodeByIdUseCase.execute(
      parsedEpisodeId
    );
    const novel = await novelDi.getNovelByIdUseCase.execute(parsedNovelId);
    const allEpisodes = await novelDi.getEpisodesByNovelIdUseCase.execute(
      parsedNovelId
    );

    if (!episode) {
      return NextResponse.json({ error: "Episode not found" }, { status: 404 });
    }
    if (!novel) {
      return NextResponse.json({ error: "Novel not found" }, { status: 404 });
    }
    if (!allEpisodes || allEpisodes.length === 0) {
      return NextResponse.json({ error: "No episodes found" }, { status: 404 });
    }

    const lastEpisode = allEpisodes[allEpisodes.length - 1];
    const isLastEpisode = parsedEpisodeId === lastEpisode.id;

    return NextResponse.json(
      {
        novel,
        episode,
        isLastEpisode,
        isCompleted: novel.serialStatus === "완결",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching episode:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
