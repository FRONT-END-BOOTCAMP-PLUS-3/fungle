import { CommunityCommentRepository } from "@/domain/repositories/CommunityCommentRepository";

export class DfCommentDeleteUseccase {
  constructor(private communityComment: CommunityCommentRepository) {}

  async execute(id: string, userId: string): Promise<boolean> {
    try {
      const isDeleted = await this.communityComment.commentDelete(id, userId);

      return isDeleted;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("usecase : Id가 없습니다.");
      }
    }
  }
}
