import { Funding } from "@prisma/client";

export interface FundingRepository {
  getFundingByNovelId(novelId: number): Promise<Funding | null>;
}
