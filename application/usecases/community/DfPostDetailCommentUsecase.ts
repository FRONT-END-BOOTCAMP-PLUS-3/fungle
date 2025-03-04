import { CommunityCommentRepository } from "@/domain/repositories/CommunityCommentRepository";
import { PostDetailCommentsWithUserDto } from "./dto/PostDetailCommentsWithUserDto";

export class DfPostDetailCommentUsecase {
  constructor(private communityPostRepository: CommunityCommentRepository) {}

  async execute(id: string): Promise<PostDetailCommentsWithUserDto[]> {
    try {
      const comments = await this.communityPostRepository.findAll(id);

      const flatComments = comments.map((comment) => ({
        id: comment.id,
        userId: comment.userId,
        comment: comment.comment,
        createdAt: comment.createdAt,
        parentId: comment.parentId ?? null,
        postId: comment.postId,
        userNickname: comment.user.nickname,
        profileImage: comment.user.profileImage,
        likes: comment._count.communityCommentLikes,
        replies: comment.replies ? comment.replies.length : 0,
      }));

      return flatComments;
    } catch (error: unknown) {
      let message = "Unknown error";
      if (error instanceof Error) {
        message = error.message;
      }
      throw new Error(`댓글 데이터를 가져오는 데 실패했습니다: ${message}`);
    }
  }
}
