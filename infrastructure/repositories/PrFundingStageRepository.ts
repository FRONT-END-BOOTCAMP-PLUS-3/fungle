import { FundingStageRepository } from "@/domain/repositories/FundingStageRepository";
import { prisma } from "../config/prisma";
import { FundingStage } from "@prisma/client";

export class PrFundingStageRepository implements FundingStageRepository {
  async getFundingStageByFundingId(fundingId: string): Promise<FundingStage[]> {
    const fundingStage = await prisma.fundingStage.findMany({
      where: { fundingId: fundingId },
    });

    return fundingStage;
  }

  async deleteFunding(id: number): Promise<void> {
    await prisma.fundingStage.delete({
      where: { id: id },
    });
  }
}
