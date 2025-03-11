import { NovelCommentLikeRepository } from "@/domain/repositories/NovelCommentLikeRepository";
import { prisma } from "../config/prisma";

export class PrNovelCommentLikeRepository
  implements NovelCommentLikeRepository
{
  async toggleLike(id: string, userId: string): Promise<boolean> {
    const novelCommentId = Number(id);

    try {
      const existingLike = await prisma.novelCommentLike.findUnique({
        where: {
          novelCommentId_userId: { novelCommentId, userId }, 
        },
      });

      let isLiked: boolean;
      if (existingLike) {
        await prisma.novelCommentLike.delete({
          where: {
            novelCommentId_userId: { novelCommentId, userId }, 
          },
        });

        isLiked = false;
      } else {
        await prisma.novelCommentLike.create({
          data: {
            novelCommentId, 
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
