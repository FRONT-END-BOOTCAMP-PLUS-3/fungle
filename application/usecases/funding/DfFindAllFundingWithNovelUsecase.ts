import { FundingRepository } from "@/domain/repositories/FundingRepository";
import { NovelRepository } from "@/domain/repositories/NovelRepository";
import { FindAllFundingWithNovelDto } from "./dto/FindAllFundingWithNovel";
import { FundingStageRepository } from "@/domain/repositories/FundingStageRepository";

export class DfFindAllFundingWithNovelUsecase {
  constructor(
    private readonly novelRepository: NovelRepository,
    private readonly fundingRepository: FundingRepository,
    private readonly fundingStageRepository: FundingStageRepository
  ) {}

  async execute(): Promise<FindAllFundingWithNovelDto[] | null> {
    const fundings = await this.fundingRepository.findAllFunding();

    if (!fundings) return null;

    const fundingWithNovels = (
      await Promise.all(
        fundings.map(async (funding) => {
          const novel = await this.novelRepository.getNovelById(
            funding.novelId
          );
          const fundingStages =
            await this.fundingStageRepository.getFundingStageByFundingId(
              String(funding.id)
            );

          return fundingStages.map((stage) => ({
            id: funding.id,
            userId: funding.userId,
            novelId: funding.novelId,
            status: funding.status,
            introduce: funding.introduce,
            novelTitle: novel ? novel.title : "제목 없음",
            fundingStage: stage.stageNumber,
            isActive: stage.isActive,
          }));
        })
      )
    ).flat();

    return fundingWithNovels;
  }
}
