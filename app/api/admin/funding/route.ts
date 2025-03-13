import { DfFindAllFundingWithNovelUsecase } from "@/application/usecases/funding/DfFindAllFundingWithNovelUsecase";
import { FundingRepository } from "@/domain/repositories/FundingRepository";
import { FundingStageRepository } from "@/domain/repositories/FundingStageRepository";
import { NovelRepository } from "@/domain/repositories/NovelRepository";
import { PrFundingRepository } from "@/infrastructure/repositories/PrFundingRepository";
import { PrFundingStage } from "@/infrastructure/repositories/PrFundingStageRepository";
import { PrNovelRepository } from "@/infrastructure/repositories/PrNovelRepostiory";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const novelRepository: NovelRepository = new PrNovelRepository();
    const fundingRepository: FundingRepository = new PrFundingRepository();
    const fundingStageRepository: FundingStageRepository = new PrFundingStage();
    const findAllFundingWithNovelUsecase = new DfFindAllFundingWithNovelUsecase(
      novelRepository,
      fundingRepository,
      fundingStageRepository
    );

    const fundings = await findAllFundingWithNovelUsecase.execute();
    console.log(fundings);
    if (!fundings || fundings.length === 0) {
      return NextResponse.json(
        { message: "시작된 펀딩이 없습니다." },
        { status: 204 }
      );
    }

    return NextResponse.json({ fundings }, { status: 200 });
  } catch (error) {}
};
