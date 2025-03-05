import { CommunityPostRepository } from "@/domain/repositories/CommunityPostRepository";

export class DfPostStatusUpdateUsecase {
  constructor(private communityPostRepository: CommunityPostRepository) {}

  async execute(userId: string, postId: number): Promise<void> {
    try {
      await this.communityPostRepository.updatePostStatus(userId, postId);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}
