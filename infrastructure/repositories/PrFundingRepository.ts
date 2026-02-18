import { FundingRepository } from "@/domain/repositories/FundingRepository";
import { Funding } from "@prisma/client";
import { prisma } from "../config/prisma";

export class PrFundingRepository implements FundingRepository {
  async getFundingByNovelId(novelId: number): Promise<Funding | null> {
    try {
      const funding = await prisma.funding.findUnique({
        where: { novelId: novelId },
      });
      return funding ?? null;
    } catch {
      return null;
    }
  }

  async getFundingStatus(): Promise<string[]> {
    try {
      const ongoingFundings = await prisma.funding.findMany({
        where: { status: "ongoing" },
        select: { userId: true },
      });
      return ongoingFundings.map((funding) => funding.userId);
    } catch {
      return [];
    }
  }
}
