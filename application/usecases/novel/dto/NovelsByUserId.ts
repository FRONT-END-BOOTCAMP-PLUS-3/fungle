export interface NovelsByUserIdDto {
  id: number;
  title: string;
  image: string | null;
  createdAt: Date;
  serialStatus: string;
  episodes: {
    id: number;
    title: string;
    status: string;
    statusLabel: string;
  }[];
  hasActiveFunding: boolean;
}
