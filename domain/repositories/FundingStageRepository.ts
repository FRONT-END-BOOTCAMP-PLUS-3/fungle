import { FundingStage } from "@prisma/client";

export interface FundingStageRepository {
  getFundingStageByFundingId(fundingId: string): Promise<FundingStage[]>;
  deleteFunding(id: number): Promise<void>;
  activeFundingStageById(id: number): Promise<void>;
}
