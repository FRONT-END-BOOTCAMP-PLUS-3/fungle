import { CommunityPostRepository } from "@/domain/repositories/CommunityPostRepository";
import { PostCreateDto } from "./dto/PostCreateDto";

export class DfPostCreateUsecase {
  constructor(private communityPostRepository: CommunityPostRepository) {}

  async execute(
    userId: string,
    title: string,
    content: string,
    selectedFields: string[]
  ): Promise<PostCreateDto> {
    try {
      const postId = await this.communityPostRepository.createPost(
        userId,
        title,
        content,
        selectedFields
      );

      return { postId };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`게시글 생성에 실패했습니다. 원인: ${error.message}`);
      }
      throw new Error("게시글 생성에 실패했습니다.");
    }
  }
}
