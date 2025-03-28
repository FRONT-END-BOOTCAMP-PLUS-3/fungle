import { NovelLikeRepository } from "@/domain/repositories/NoveLikeRepository";
import { LikedNovelDto } from "./dto/LikedNovel";

export class DfGetLikedNovelsByUserIdUsecase {
  constructor(private readonly novelLikeRepository: NovelLikeRepository) {}

  async execute(userId: string): Promise<LikedNovelDto[]> {
    return await this.novelLikeRepository.getLikedNovelsByUserId(userId);
  }
}
