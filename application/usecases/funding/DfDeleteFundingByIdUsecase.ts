import { FundingStageRepository } from "@/domain/repositories/FundingStageRepository";

export class DfDeleteFundingByIdUsecase {
  constructor(private fundingStage: FundingStageRepository) {}

  async execute(id: number) {
    try {
      await this.fundingStage.deleteFunding(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error("펀딩을 삭제하는 중에 문제가 발생했습니다.");
      }
    }
  }
}
