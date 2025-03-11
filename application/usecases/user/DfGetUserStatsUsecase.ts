import { CommunityPostRepository } from "@/domain/repositories/CommunityPostRepository";
import { NovelRepository } from "@/domain/repositories/NovelRepository";
import { UserStatsDto } from "./dto/UserStats";

export class DfGetUserStatsUsecase {
  constructor(
    private readonly novelRepository: NovelRepository,
    private readonly communityPostRepository: CommunityPostRepository
  ) {}

  async execute(userId: string): Promise<UserStatsDto> {
    const novelCount = await this.novelRepository.getNovelCountByUserId(userId);
    const postCount = await this.communityPostRepository.getPostCountByUserId(
      userId
    );

    return {
      novelCount,
      postCount,
    };
  }
}
