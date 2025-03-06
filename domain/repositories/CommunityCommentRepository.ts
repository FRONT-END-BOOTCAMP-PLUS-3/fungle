import { Prisma } from "@prisma/client";

export type CommentWithRelations = Prisma.CommunityCommentGetPayload<{
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
        communityCommentLikes: true;
      };
    };
  };
}>;

export interface CommunityCommentRepository {
  findAll(postId: string): Promise<CommentWithRelations[]>;
  commentCount(postId: string): Promise<number>;
  create(id: string, userId: string, comment: string): Promise<boolean>;
  commentUpdate(id: string, userId: string, content: string): Promise<boolean>;
  commentDelete(id: string, userId: string): Promise<boolean>;
}
