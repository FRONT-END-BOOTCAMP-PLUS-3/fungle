import { FundingRepository } from "@/domain/repositories/FundingRepository";
import { NovelRepository } from "@/domain/repositories/NovelRepository";
import { FindAllFundingWithNovelDto } from "./dto/FindAllFundingWithNovel";
import { FundingStageRepository } from "@/domain/repositories/FundingStageRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";

export class DfFindAllFundingWithNovelUsecase {
  constructor(
    private readonly novelRepository: NovelRepository,
    private readonly fundingRepository: FundingRepository,
    private readonly fundingStageRepository: FundingStageRepository,
    private readonly userRepository: UserRepository
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

          const user = await this.userRepository.getUserById(funding.userId);

          return fundingStages.map((stage) => ({
            id: funding.id,
            stageId: stage.id,
            userId: funding.userId,
            userNickname: user?.nickname || "",
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
