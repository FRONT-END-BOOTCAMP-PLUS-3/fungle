import { NovelCommentRepository } from "@/domain/repositories/NovelCommentRepository";

export class DfNovelCommentCountUsecase {
  constructor(private novelCommentRepository: NovelCommentRepository) {}

  async execute(id: string): Promise<number> {
    try {
      const count = await this.novelCommentRepository.commentCount(id);
      return count;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("댓글 데이터를 가져오는 데 실패했습니다.");
    }
  }
}
