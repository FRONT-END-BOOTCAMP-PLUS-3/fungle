import { DfDeleteNovelEpisodeUsecase } from "@/application/usecases/novel/DfDeleteNovelEpisodeUsecase";
import { DfUpdateNovelEpisodeStatusUsecase } from "@/application/usecases/novel/DfUpdateNovelEpisodeStatusUsecase";
import { NovelEpisodeRepository } from "@/domain/repositories/NovelEpisodeRepository";
import { PrNovelEpisodeRepository } from "@/infrastructure/repositories/PrNovelEpisodeRepository";
import { getParamsFromRequest } from "@/utils/params/requestParams";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest) => {
  const { episodeId } = getParamsFromRequest(request, ["episodeId"]);

  if (!episodeId) {
    return NextResponse.json(
      { success: false, error: "유효하지 않은 episodeId입니다." },
      { status: 400 }
    );
  }

  try {
    const novelEpisodeRepository = new PrNovelEpisodeRepository();
    const deleteNovelEpisodeUsecase = new DfDeleteNovelEpisodeUsecase(
      novelEpisodeRepository
    );

    await deleteNovelEpisodeUsecase.execute(Number(episodeId));
    return NextResponse.json(
      { message: "에피소드가 성공적으로 삭제되었습니다." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "에피소드 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
};

export const PATCH = async (request: NextRequest) => {
  const { episodeId } = getParamsFromRequest(request, ["episodeId"]);

  if (!episodeId) {
    return NextResponse.json(
      { success: false, error: "유효하지 않은 episodeId입니다." },
      { status: 400 }
    );
  }

  try {
    const novelEpisodeRepository: NovelEpisodeRepository =
      new PrNovelEpisodeRepository();
    const updateNovelEpisodeStatus = new DfUpdateNovelEpisodeStatusUsecase(
      novelEpisodeRepository
    );

    await updateNovelEpisodeStatus.execute(Number(episodeId));
    return NextResponse.json(
      { message: "에피소드가 성공적으로 등록되었습니다." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "에피소드 등록에 실패했습니다." },
      { status: 500 }
    );
  }
};
