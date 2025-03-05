import { ToggleNovelLikeDto } from "@/application/usecases/novel/dto/ToggleNovelLike";

export interface NovelLikeRepository {
  toggleLike(novelId: number, userId: string): Promise<ToggleNovelLikeDto>;
  getLikeCountByNovelId(novelId: number): Promise<number>;
}

