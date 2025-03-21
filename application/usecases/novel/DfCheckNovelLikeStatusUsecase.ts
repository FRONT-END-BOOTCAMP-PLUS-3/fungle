import { NovelLikeRepository } from "@/domain/repositories/NoveLikeRepository";

export class DfCheckNovelLikeStatusUsecase {
  constructor(private novelLikeRepo: NovelLikeRepository) {}

  async execute(novelId: number, userId: string): Promise<boolean> {
    return await this.novelLikeRepo.isNovelLikedByUser(novelId, userId);
  }
}
