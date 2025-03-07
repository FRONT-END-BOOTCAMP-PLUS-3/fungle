import { LikedNovelDto } from "@/application/usecases/novel/dto/LikedNovel";
import { ToggleNovelLikeDto } from "@/application/usecases/novel/dto/ToggleNovelLike";

export interface NovelLikeRepository {
  toggleLike(novelId: number, userId: string): Promise<ToggleNovelLikeDto>;
  getLikeCountByNovelId(novelId: number): Promise<number>;
  getLikedNovelsByUserId(userId: string): Promise<LikedNovelDto[]>;
}
