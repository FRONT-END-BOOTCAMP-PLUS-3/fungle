import { CommunityPostLikeRepository } from "@/domain/repositories/CommunityPostLikeRepository";
import { ToggleLikeDto } from "./dto/ToggleLikeDto";

export class DfTogglePostLikeUsecase {
  constructor(
    private communityPostLikeRepository: CommunityPostLikeRepository
  ) {}

  async execute(id: string, userId: string): Promise<ToggleLikeDto> {
    try {
      const likeCount = await this.communityPostLikeRepository.toggleLike(
        id,
        userId
      );

      return { likeCount };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`게시글 좋아요 에러(infrastructure) : {error.message}`);
      }

      return { likeCount: 0 };
    }
  }
}
