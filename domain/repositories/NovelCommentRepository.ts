import { Prisma } from "@prisma/client";

export type CommentWithRelations = Prisma.NovelCommentGetPayload<{
  include: {
    replies: true;
    user: {
      select: {
        nickname: true;
        profileImage: true;
      };
    };
    _count: {
      select: {
        novelCommentLike: true;
      };
    };
    novelCommentLike: {
      select: { userId: true };
    };
  };
}>;

export interface NovelCommentRepository {
  findAll(episodeId: string, userId: string): Promise<CommentWithRelations[]>;
  commentCount(episodeId: string): Promise<number>;
  create(
    episodeId: string,
    userId: string,
    comment: string,
    parentId: string | null,
    novelId: number, // ✅ novelId 추가
  ): Promise<boolean>;
  commentUpdate(id: string, userId: string, content: string): Promise<boolean>;
  commentDelete(id: string, userId: string): Promise<boolean>;
}
