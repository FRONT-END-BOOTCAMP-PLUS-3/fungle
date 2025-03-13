import { FundingStage } from "@prisma/client";

export interface FundingStageRepository {
  getFundingStageByFundingId(
    fundingId: string
  ): Promise<Omit<FundingStage, "id" | "fundingId">[]>;
}
