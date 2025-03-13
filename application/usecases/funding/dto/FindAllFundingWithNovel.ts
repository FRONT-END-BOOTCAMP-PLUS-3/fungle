export interface FindAllFundingWithNovelDto {
  id: string;
  userId: string;
  novelId: number;
  status: string;
  introduce: string | null;
  novelTitle: string;
  fundingStage: number;
  isActive: boolean;
}
