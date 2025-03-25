export interface FindAllFundingWithNovelDto {
  id: string;
  stageId: number;
  userId: string;
  userNickname: string;
  novelId: number;
  status: string;
  introduce: string | null;
  novelTitle: string;
  fundingStage: number;
  isActive: boolean;
}
