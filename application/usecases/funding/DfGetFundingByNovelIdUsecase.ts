import { FundingRepository } from "@/domain/repositories/FundingRepository";
import { FundingDto } from "./dto/Funding";

export class DfGetFundingByUserIdUsecase {
  constructor(private readonly fundingRepository: FundingRepository) {}

  async execute(novelId: number): Promise<FundingDto | null> {
    const funding = await this.fundingRepository.getFundingByNovelId(novelId);
    if (!funding) {
      return null;
    }

    const hasActiveFunding = funding.status === "ongoing";
    return { ...funding, hasActiveFunding };
  }
}
