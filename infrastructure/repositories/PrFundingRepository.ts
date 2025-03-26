import { FundingRepository } from "@/domain/repositories/FundingRepository";
import { Funding } from "@prisma/client";
import { prisma } from "../config/prisma";

export class PrFundingRepository implements FundingRepository {
  async getFundingByNovelId(novelId: number): Promise<Funding | null> {
    const funding = await prisma.funding.findUnique({
      where: { novelId: novelId },
    });

    if (!funding) {
      return null;
    }

    return funding;
  }

  async getFundingStatus(): Promise<string[]> {
    const ongoingFundings = await prisma.funding.findMany({
      where: { status: "ongoing" },
      select: { userId: true },
    });

    return ongoingFundings.map((funding) => funding.userId);
  }

  async findAllFunding(): Promise<
    | Omit<
        Funding,
        "createdAt" | "endDate" | "goalAmount" | "currentAmount" | "rewardType"
      >[]
    | null
  > {
    const fundings = await prisma.funding.findMany({
      select: {
        id: true,
        userId: true,
        novelId: true,
        status: true,
        introduce: true,
      },
    });

    if (!fundings) return null;

    return fundings;
  }
}
