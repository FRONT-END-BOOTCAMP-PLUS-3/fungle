import { CommunityCommentLikeRepository } from "@/domain/repositories/CommunityCommentLikeRepository";
import { prisma } from "../config/prisma";

export class PrCommunityCommentLikeRepository
  implements CommunityCommentLikeRepository
{
  async toggleLike(id: string, userId: string): Promise<boolean> {
    const communityCommentId = Number(id);

    try {
      const existingLike = await prisma.communityCommentLike.findUnique({
        where: {
          communityCommentId_userId: { communityCommentId, userId },
        },
      });

      let isLiked: boolean;
      if (existingLike) {
        await prisma.communityCommentLike.delete({
          where: {
            communityCommentId_userId: { communityCommentId, userId },
          },
        });

        isLiked = false;
      } else {
        await prisma.communityCommentLike.create({
          data: {
            communityCommentId,
            userId,
          },
        });

        isLiked = true;
      }

      return isLiked;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error("좋아요 상태를 변경하는 중 문제가 발생했습니다.");
      }
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  }
}
