import { CommunityPostRepository } from "@/domain/repositories/CommunityPostRepository";
import { PostWithLikesAndUserNicknameDto } from "./dto/CommunityPostWithNicknameAndLikesDto";
import { UserRepository } from "@/domain/repositories/UserRepository";

export class DfPostDetailUsecase {
  constructor(
    private postRepository: CommunityPostRepository,
    private userRepository: UserRepository
  ) {}

  async execute(id: number): Promise<PostWithLikesAndUserNicknameDto> {
    try {
      const post = await this.postRepository.findPost(id);

      if (!post) {
        throw new Error("Post not found");
      }

      const user = await this.userRepository.getUserById(post?.userId);

      const postDetail = {
        id: post.id,
        content: post.content,
        createdAt: post.createdAt,
        status: post.status,
        title: post.title,
        userId: post.userId,
        view: post.view,
        userNickname: user?.nickname,
        likes: post._count?.communityPostLikes || 0,
      };

      return postDetail;
    } catch (error: unknown) {
      let message = "Unknown error";
      if (error instanceof Error) {
        message = error.message;
      }
      throw new Error(
        `게시글 상세 정보를 가져오는 데 실패했습니다: ${message}`
      );
    }
  }
}
