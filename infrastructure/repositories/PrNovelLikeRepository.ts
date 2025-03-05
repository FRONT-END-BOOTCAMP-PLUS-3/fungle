import { prisma } from "@/infrastructure/config/prisma";
import { NovelLikeRepository } from "@/domain/repositories/NoveLikeRepository";
import { ToggleNovelLikeDto } from "@/application/usecases/novel/dto/ToggleNovelLike";

export class PrNovelLikeRepository implements NovelLikeRepository {
  async toggleLike(novelId: number, userId: string): Promise<ToggleNovelLikeDto> {
    try {
      const existingLike = await prisma.novelLike.findUnique({
        where: {
          userId_novelId: { userId, novelId },
        },
      });

      let isLiked: boolean;
      if (existingLike) {
        await prisma.novelLike.delete({
          where: {
            userId_novelId: { userId, novelId },
          },
        });
        isLiked = false;
      } else {
        await prisma.novelLike.create({
          data: {
            userId,
            novelId,
          },
        });
        isLiked = true;
      }

      const likeCount = await this.getLikeCountByNovelId(novelId);

      return { likeCount, isLiked };
    } catch {
      throw new Error("좋아요 처리 중 오류가 발생했습니다.");
    }
  }

  async getLikeCountByNovelId(novelId: number): Promise<number> {
    return await prisma.novelLike.count({
      where: { novelId },
    });
  }
}
