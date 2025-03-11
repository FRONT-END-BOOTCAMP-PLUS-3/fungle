import { NovelCommentRepository } from "@/domain/repositories/NovelCommentRepository";

export class DfNovelCommentDeleteUsecase {
  constructor(private novelCommentRepository: NovelCommentRepository) {}

  async execute(id: string, userId: string): Promise<boolean> {
    try {
      const isDeleted = await this.novelCommentRepository.commentDelete(id, userId);

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
