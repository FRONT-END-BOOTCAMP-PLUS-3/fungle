import { CommunityPostLikeRepository } from "@/domain/repositories/CommunityPostLikeRepository";
import { prisma } from "../config/prisma";

export class PrCommunityPostLikeRepository
  implements CommunityPostLikeRepository
{
  async toggleLike(id: string, userId: string): Promise<number> {
    const postId = Number(id);
    try {
      const existingLike = await prisma.communityPostLike.findUnique({
        where: {
          userId_postId: { userId, postId },
        },
      });

      if (existingLike) {
        await prisma.communityPostLike.delete({
          where: {
            userId_postId: { userId, postId },
          },
        });
      } else {
        await prisma.communityPostLike.create({
          data: {
            userId,
            postId,
          },
        });
      }

      const likeCount = await prisma.communityPostLike.count({
        where: {
          postId,
        },
      });

      return likeCount;
    } catch {
      throw new Error("좋아요를 불러오는 중 오류가 발생했습니다.");
    }
  }
}
