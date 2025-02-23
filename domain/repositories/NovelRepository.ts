import { Novel } from "@/domain/entities/novel";

export interface NovelRepository {
  getNovelById(novelId: number): Promise<Novel | null>;
}
