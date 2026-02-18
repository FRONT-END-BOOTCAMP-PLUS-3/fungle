import { NovelCommentRepository } from "@/domain/repositories/NovelCommentRepository";
import { PostNovelDetailCommentsWithUserDto } from "./dto/PostNovelDetailCommentsWithUser";

export class DfgetNovelCommentUsecase {
  constructor(private novelCommentRepository: NovelCommentRepository) {}

  async execute(
    id: string,
    userId: string
  ): Promise< PostNovelDetailCommentsWithUserDto[]> {
    try {
      const comments = await this.novelCommentRepository.findAll(id, userId);

      const flatComments = comments.map((comment) => ({
        id: comment.id,
        userId: comment.userId,
        comment: comment.comment,
        createdAt: comment.createdAt,
        parentId: comment.parentId ?? null,
        novelId: comment.novelId,
        episodeId: comment.episodeId, 
        userNickname: comment.user.nickname,
        profileImage: comment.user.profileImage,
        likes: comment._count.novelCommentLike, 
        replies: comment.replies ? comment.replies.length : 0,
        isLiked: comment.novelCommentLike.length > 0, 
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