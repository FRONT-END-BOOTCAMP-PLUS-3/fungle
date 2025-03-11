import { CommunityCommentLikeRepository } from "@/domain/repositories/CommunityCommentLikeRepository";

export class DfToggleCommentUsecase {
  constructor(
    private communityCommentLikeRepository: CommunityCommentLikeRepository
  ) {}

  async execute(id: string, userId: string): Promise<boolean> {
    try {
      const isLiked = await this.communityCommentLikeRepository.toggleLike(
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
