import { Funding } from "@prisma/client";

export interface FundingRepository {
  getFundingByNovelId(novelId: number): Promise<Funding | null>;
  findAllFunding(): Promise<
    | Omit<
        Funding,
        "createdAt" | "endDate" | "goalAmount" | "currentAmount" | "rewardType"
      >[]
    | null
  >;
  getFundingStatus(): Promise<string[]>;
}
