import { CommunityCommentRepository } from "@/domain/repositories/CommunityCommentRepository";
import { prisma } from "../config/prisma";

export class PrCommunityCommentRepository
  implements CommunityCommentRepository
{
  async findAll(id: number) {
    const postId = Number(id);
    try {
      const comments = await prisma.communityComment.findMany({
        where: { postId: postId },
        include: {
          user: {
            select: {
              nickname: true,
              profileImage: true,
            },
          },
          _count: {
            select: {
              communityCommentLikes: true,
              // replies: true,
            },
          },
        },
      });

      return comments;
    } catch {
      throw new Error("댓글 데이터를 가져오는 데 실패했습니다.");
    }
  }
}
