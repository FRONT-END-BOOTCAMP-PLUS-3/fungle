export interface FundingDto {
  id: string;
  userId: string;
  novelId: number;
  goalAmount: number;
  currentAmount: number;
  createdAt: Date;
  endDate: Date;
  rewardType: string | null;
  status: string;
  hasActiveFunding: boolean;
}
