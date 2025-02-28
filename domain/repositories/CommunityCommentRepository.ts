import { Prisma } from "@prisma/client";

export type CommentWithRelations = Prisma.CommunityCommentGetPayload<{
  include: {
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
  findAll(postId: number): Promise<CommentWithRelations[]>;
}
