import { NovelLikeRepository } from "@/domain/repositories/NoveLikeRepository";
import { ToggleNovelLikeDto } from "@/application/usecases/novel/dto/ToggleNovelLike";

export class ToggleNovelLikeUsecase {
  constructor(private novelLikeRepository: NovelLikeRepository) {}

  async execute(novelId: number, userId: string): Promise<ToggleNovelLikeDto> {
    try {
      return await this.novelLikeRepository.toggleLike(novelId, userId);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`소설 좋아요 처리 오류: ${error.message}`);
      }
      throw new Error("소설 좋아요 처리 오류");
    }
  }
}

