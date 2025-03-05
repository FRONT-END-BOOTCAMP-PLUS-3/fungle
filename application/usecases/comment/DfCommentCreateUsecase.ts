import { CommunityCommentRepository } from "@/domain/repositories/CommunityCommentRepository";

export class DfCommentCreateUsecase {
  constructor(private commentRepository: CommunityCommentRepository) {}

  async execute(id: string, userId: string, comment: string): Promise<boolean> {
    try {
      const result = await this.commentRepository.create(id, userId, comment);

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("usecase : 댓글을 생성하는 동안 오류가 발생했습니다.");
    }
  }
}
