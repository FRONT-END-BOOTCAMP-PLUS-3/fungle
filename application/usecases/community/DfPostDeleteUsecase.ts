import { CommunityPostRepository } from "@/domain/repositories/CommunityPostRepository";
import { PostDeleteDto } from "./dto/PostDeleteDto";

export class DfPostDeleteUsecase {
  constructor(private communityPostRepository: CommunityPostRepository) {}

  async execute(id: string, userId: string): Promise<PostDeleteDto> {
    try {
      const isDelete = await this.communityPostRepository.deletePost(
        id,
        userId
      );

      return { isDelete };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("게시글 삭제에 실패했습니다.");
      }
      throw new Error("게시글 삭제에 실패했습니다.");
    }
  }
}
