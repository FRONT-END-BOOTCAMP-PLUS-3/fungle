import { CommunityPostRepository } from "@/domain/repositories/CommunityPostRepository";
import { PostUpdateDto } from "./dto/PostUpdateDto";

export class DfPostUpdateUsecase {
  constructor(private communityPostRepository: CommunityPostRepository) {}

  async execute(
    userId: string,
    id: string,
    title: string,
    content: string,
    selectedFields: string[]
  ): Promise<PostUpdateDto> {
    try {
      const postId = await this.communityPostRepository.updatePost(
        userId,
        id,
        title,
        content,
        selectedFields
      );

      return { postId };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`게시글 수정에 실패했습니다. 원인: ${error.message}`);
      }
      throw new Error("게시글 수정에 실패했습니다.");
    }
  }
}
