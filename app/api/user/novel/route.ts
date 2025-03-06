import { DfDeleteNovelUsecase } from "@/application/usecases/novel/DfDeleteNovelUsecase";
import { DfEpisodeByUserIdUsecase } from "@/application/usecases/novel/DfEpisodeByUserIdUsecase";
import { DfNovelByUserIdUsecase } from "@/application/usecases/novel/DfNovelByUserIdUsecase";
import { NovelEpisodeRepository } from "@/domain/repositories/NovelEpisodeRepository";
import { NovelRepository } from "@/domain/repositories/NovelRepository";
import { userDi } from "@/infrastructure/config/userDi";
import { PrNovelEpisodeRepository } from "@/infrastructure/repositories/PrNovelEpisodeRepository";
import { PrNovelRepository } from "@/infrastructure/repositories/PrNovelRepostiory";
import { FileService } from "@/infrastructure/services/FileService";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const userId = await userDi.getUserIdUsecase.execute();

    if (!userId) {
      return NextResponse.json({ novels: null }, { status: 400 });
    }

    const novelRepository: NovelRepository = new PrNovelRepository();
    const episodeRepository: NovelEpisodeRepository =
      new PrNovelEpisodeRepository();
    const novelEpisodeByUserIdUsecase = new DfEpisodeByUserIdUsecase(
      episodeRepository
    );
    const novelByUserIdUsecase = new DfNovelByUserIdUsecase(
      novelRepository,
      novelEpisodeByUserIdUsecase
    );

    const novels = await novelByUserIdUsecase.execute(userId);

    if (!novels) {
      return NextResponse.json({ novels: null }, { status: 400 });
    }

    return NextResponse.json({ novels: novels }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "소설 데이터를 가져오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const userId = await userDi.getUserIdUsecase.execute();
    if (!userId) {
      return NextResponse.json(
        { error: "유효하지 않은 사용자" },
        { status: 401 }
      );
    }

    const { novelId } = await req.json();
    if (!novelId) {
      return NextResponse.json(
        { error: "소설 ID가 제공되지 않았습니다." },
        { status: 400 }
      );
    }

    const novelRepository: NovelRepository = new PrNovelRepository();
    const fileService = new FileService();
    const deleteNovelUsecase = new DfDeleteNovelUsecase(
      novelRepository,
      fileService
    );

    const result = await deleteNovelUsecase.execute(novelId);

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    return NextResponse.json({ message: result.message }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "소설 삭제 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }
  }
};
