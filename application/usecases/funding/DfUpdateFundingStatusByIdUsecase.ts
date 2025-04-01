import { FundingStageRepository } from "@/domain/repositories/FundingStageRepository";

export class DfActiveFundingStageById {
  constructor(private fundingStage: FundingStageRepository) {}

  async execute(id: number) {
    try {
      await this.fundingStage.activeFundingStageById(id);
    } catch (error: unknown) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "펀딩의 active 상태를 변경하는 중 오류가 발생했습니다."
      );
    }
  }
}
