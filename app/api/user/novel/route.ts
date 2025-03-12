import { DfFundingUsecase } from "@/application/usecases/funding/DfFundingUsecase";
import { DfDeleteNovelUsecase } from "@/application/usecases/novel/DfDeleteNovelUsecase";
import { DfEpisodeByUserIdUsecase } from "@/application/usecases/novel/DfEpisodeByUserIdUsecase";
import { DfNovelByUserIdUsecase } from "@/application/usecases/novel/DfNovelByUserIdUsecase";
import { DfUpdateNovelSerialStatusUsecase } from "@/application/usecases/novel/DfUpdateNovelSerialStatusUsecase";
import { NovelsByUserIdDto } from "@/application/usecases/novel/dto/NovelsByUserId";
import { FundingRepository } from "@/domain/repositories/FundingRepository";
import { NovelEpisodeRepository } from "@/domain/repositories/NovelEpisodeRepository";
import { NovelRepository } from "@/domain/repositories/NovelRepository";
import { userDi } from "@/infrastructure/config/userDi";
import { PrFundingRepository } from "@/infrastructure/repositories/PrFundingRepository";
import { PrNovelEpisodeRepository } from "@/infrastructure/repositories/PrNovelEpisodeRepository";
import { PrNovelRepository } from "@/infrastructure/repositories/PrNovelRepostiory";
import { FileService } from "@/infrastructure/services/FileService";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const userId = await userDi.getUserIdUsecase.execute();

    if (!userId) {
      return NextResponse.json(
        { novels: null, error: "로그인 되어 있지 않습니다." },
        { status: 401 }
      );
    }

    const novelRepository: NovelRepository = new PrNovelRepository();
    const episodeRepository: NovelEpisodeRepository =
      new PrNovelEpisodeRepository();
    const fundingRepository: FundingRepository = new PrFundingRepository();

    const novelEpisodeByUserIdUsecase = new DfEpisodeByUserIdUsecase(
      episodeRepository
    );
    const novelByUserIdUsecase = new DfNovelByUserIdUsecase(
      novelRepository,
      novelEpisodeByUserIdUsecase
    );
    const fundingUsecase = new DfFundingUsecase(fundingRepository);

    const novels: NovelsByUserIdDto[] | null =
      await novelByUserIdUsecase.execute(userId);

    if (!novels) {
      return NextResponse.json({ novels: null }, { status: 400 });
    }

    const novelsWithFunding = await Promise.all(
      novels.map(async (novel) => {
        const funding = await fundingUsecase.execute(novel.id);
        return {
          ...novel,
          hasActiveFunding: funding?.hasActiveFunding ?? false,
        };
      })
    );

    return NextResponse.json({ novels: novelsWithFunding }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "소설 데이터를 가져오는 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const userId = await userDi.getUserIdUsecase.execute();
    if (!userId) {
      return NextResponse.json(
        { error: "로그인 되어 있지 않습니다." },
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
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "소설 삭제 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const userId = await userDi.getUserIdUsecase.execute();
    if (!userId) {
      return NextResponse.json(
        { error: "로그인 되어 있지 않습니다." },
        { status: 401 }
      );
    }

    const { novelId, status } = await req.json();
    if (!novelId || !status) {
      return NextResponse.json(
        {
          error:
            !novelId && !status
              ? "소설 ID와 연재 상태 값이 제공되지 않았습니다."
              : !novelId
              ? "소설 ID가 제공되지 않았습니다."
              : "연재 상태 값이 제공되지 않았습니다.",
        },
        { status: 400 }
      );
    }

    const novelRepository: NovelRepository = new PrNovelRepository();
    const updateNovelSerialStatusUsecase = new DfUpdateNovelSerialStatusUsecase(
      novelRepository
    );

    const result = await updateNovelSerialStatusUsecase.execute(
      novelId,
      status
    );

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    return NextResponse.json({ message: result.message }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "소설 연재 상태 변경 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
};
