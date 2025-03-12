import { NovelCommentRepository } from "@/domain/repositories/NovelCommentRepository";

export class DfNovelCommentUpdateUsecase {
  constructor(private commentRepository: NovelCommentRepository) {}

  async execute(id: string, userId: string, content: string) {
    try {
      const result = await this.commentRepository.commentUpdate(
        id,
        userId,
        content
      );

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("[DfCommentUpdateUsecase] 알 수 없는 오류 발생");
      }
    }
  }
}
