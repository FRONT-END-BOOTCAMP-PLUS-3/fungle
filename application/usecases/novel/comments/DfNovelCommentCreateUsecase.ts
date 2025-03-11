import { NovelCommentRepository } from "@/domain/repositories/NovelCommentRepository";

export class DfNovelCommentCreateUsecase {
  constructor(private novelCommentRepository: NovelCommentRepository) {}

  async execute(
    episodeId: string,
    userId: string,
    comment: string,
    parentId: string,
    novelId: number 
  ): Promise<boolean> {
    try {
      const result = await this.novelCommentRepository.create(
        episodeId,
        userId,
        comment,
        parentId,
        novelId 
      );

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("usecase : 댓글을 생성하는 동안 오류가 발생했습니다.");
    }
  }
}
