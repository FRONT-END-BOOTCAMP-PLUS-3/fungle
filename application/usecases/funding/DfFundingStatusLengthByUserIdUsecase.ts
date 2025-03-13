import { FundingRepository } from "@/domain/repositories/FundingRepository";

export class DfFundingStatusLengthByUserIdUsecase {
  constructor(private readonly fundingRepository: FundingRepository) {}

  async execute(userId: string): Promise<number> {
    return await this.fundingRepository.getFundingStatusByUserId(userId);
  }
}
