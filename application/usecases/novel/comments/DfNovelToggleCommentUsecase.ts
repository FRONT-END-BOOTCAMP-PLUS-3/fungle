import { NovelCommentLikeRepository } from "@/domain/repositories/NovelCommentLikeRepository";

export class DfNovelToggleCommentUsecase {
  constructor(
    private novelCommentLikeRepository: NovelCommentLikeRepository
  ) {}

  async execute(id: string, userId: string): Promise<boolean> {
    try {
      const isLiked = await this.novelCommentLikeRepository.toggleLike(
        id,
        userId
      );

      return isLiked;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error("usecase : 댓글 좋아요 중에 문제가 생겼습니다.");
      }
      return false;
    }
  }
}
