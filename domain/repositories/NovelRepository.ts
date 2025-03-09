import { Novel, Prisma } from "@prisma/client";

export interface NovelRepository {
  createNovel(data: {
    title: string;
    novelIntroduce: string;
    serialDay: string;
    image: string | null;
    userId: string;
    serialStatus: string;
  }): Promise<Novel>;

  getNovelById(novelId: number): Promise<Novel | null>;

  addGenres(novelId: number, genres: number[]): Promise<Prisma.BatchPayload>;
  getNovelsByUserId(userId: string): Promise<Novel[] | null>;
  getNovelsBySerialDay(serialDay: string): Promise<Novel[] | null>;
  getNovelsWithBanners(): Promise<
    { id: number; title: string; bannerImage: string }[]
  >;
  deleteNovelById(novelId: number): Promise<boolean>;
  updateNovelSerialStatus(novelId: number, status: string): Promise<boolean>;
  getAllNovels(): Promise<Novel[]>;
  getNovelCountByUserId(userId: string): Promise<number>;
}
