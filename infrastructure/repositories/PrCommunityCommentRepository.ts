import {
  CommentWithRelations,
  CommunityCommentRepository,
} from "@/domain/repositories/CommunityCommentRepository";
import { prisma } from "../config/prisma";

export class PrCommunityCommentRepository
  implements CommunityCommentRepository
{
  async findAll(id: string): Promise<CommentWithRelations[]> {
    const postId = Number(id);
    try {
      const comments = await prisma.communityComment.findMany({
        where: { postId: postId },
        orderBy: { createdAt: "desc" },
        include: {
          replies: true,
          user: {
            select: {
              nickname: true,
              profileImage: true,
            },
          },
          _count: {
            select: {
              communityCommentLikes: true,
            },
          },
        },
      });

      return comments;
    } catch {
      throw new Error("댓글 데이터를 가져오는 데 실패했습니다.");
    }
  }

  async commentCount(id: string): Promise<number> {
    const postId = Number(id);
    try {
      const count = await prisma.communityComment.count({
        where: { postId: postId },
      });

      return count;
    } catch {
      throw new Error("댓글 개수를 가져오는 데 실패했습니다.");
    }
  }

  async create(id: string, userId: string, comment: string): Promise<boolean> {
    const postId = Number(id);

    try {
      const newData = await prisma.communityComment.create({
        data: {
          comment: comment,
          postId: postId,
          userId: userId,
        },
      });

      return !!newData;
    } catch {
      throw new Error("infra : 댓글을 작성하는 데 실패했습니다.");
    }
  }
}
