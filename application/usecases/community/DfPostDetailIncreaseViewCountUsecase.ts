import { CommunityPostRepository } from "@/domain/repositories/CommunityPostRepository";

export class DfPostDetailIncreaseViewCountUsecase {
  constructor(private communityPostRepository: CommunityPostRepository) {}

  async execute(id: string): Promise<void> {
    try {
      await this.communityPostRepository.increaseViewCount(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("usecase 에러 : Id가 없습니다.");
    }
  }
}
