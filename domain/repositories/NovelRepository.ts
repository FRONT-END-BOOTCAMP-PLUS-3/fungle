import { Novel } from "@prisma/client";

export interface NovelRepository {
  getNovelById(novelId: number): Promise<Novel | null>;
}
