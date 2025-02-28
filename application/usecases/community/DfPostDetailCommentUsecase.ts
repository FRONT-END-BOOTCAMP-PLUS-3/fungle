import { PrCommunityCommentRepository } from "@/infrastructure/repositories/PrCommunityCommentRepository";

export class DfPostDetailCommentUsecase {
  constructor(private communityPostRepository: PrCommunityCommentRepository) {}

  async execute(id: number) {
    try {
      const comments = await this.communityPostRepository.findAll(id);

      const flatComments = comments.map((comment) => ({
        id: comment.id,
        userId: comment.userId,
        comment: comment.comment,
        createdAt: comment.createdAt,
        parentId: comment.parentId ?? 0,
        postId: comment.postId,
        userNickname: comment.user.nickname,
        profileImage: comment.user.profileImage,
        likes: comment._count.communityCommentLikes,
        // replies: comment._count?.replies ?? 0,
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
