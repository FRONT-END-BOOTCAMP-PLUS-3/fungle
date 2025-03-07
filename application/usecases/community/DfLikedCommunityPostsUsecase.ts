import { CommunityPostLikeRepository } from "@/domain/repositories/CommunityPostLikeRepository";
import { PostWithCountAndRecruitmentDto } from "./dto/PostWithCountAndRecruitmentDto";

export class DfLikedCommunityPostsUsecase {
  constructor(
    private readonly communityPostLikeRepository: CommunityPostLikeRepository
  ) {}

  async execute(userId: string): Promise<PostWithCountAndRecruitmentDto[]> {
    return await this.communityPostLikeRepository.getLikedCommunityPostsByUserId(
      userId
    );
  }
}
