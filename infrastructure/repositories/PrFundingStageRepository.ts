import { FundingStageRepository } from "@/domain/repositories/FundingStageRepository";
import { prisma } from "../config/prisma";
import { FundingStage } from "@prisma/client";

export class PrFundingStageRepository implements FundingStageRepository {
  async getFundingStageByFundingId(
    fundingId: string
  ): Promise<Omit<FundingStage, "id" | "fundingId">[]> {
    const fundingStage = await prisma.fundingStage.findMany({
      where: { fundingId: fundingId },
      select: { stageNumber: true, isActive: true },
    });

    return fundingStage;
  }
}
