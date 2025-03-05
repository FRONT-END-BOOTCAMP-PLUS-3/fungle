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
}
