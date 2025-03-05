import { CommunityCommentRepository } from "@/domain/repositories/CommunityCommentRepository";

export class DfCommentCountUsecase {
  constructor(private commnetRepository: CommunityCommentRepository) {}

  async execute(id: string): Promise<number> {
    try {
      const count = await this.commnetRepository.commentCount(id);
      return count;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("댓글 데이터를 가져오는 데 실패했습니다.");
    }
  }
}
