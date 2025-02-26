import { prisma } from "@/infrastructure/config/prisma";
import { NovelLikeRepository } from "@/domain/repositories/NoveLikeRepository";

export class PrNovelLikeRepository implements NovelLikeRepository {
  async getLikeCountByNovelId(novelId: number): Promise<number> {
    return await prisma.novelLike.count({
      where: { novelId: novelId },
    });
  }
}

