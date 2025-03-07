import { prisma } from "@/infrastructure/config/prisma";
import { NovelLikeRepository } from "@/domain/repositories/NoveLikeRepository";
import { ToggleNovelLikeDto } from "@/application/usecases/novel/dto/ToggleNovelLike";
import { LikedNovelDto } from "@/application/usecases/novel/dto/LikedNovel";

export class PrNovelLikeRepository implements NovelLikeRepository {
  async toggleLike(
    novelId: number,
    userId: string
  ): Promise<ToggleNovelLikeDto> {
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

  async getLikedNovelsByUserId(userId: string): Promise<LikedNovelDto[]> {
    const likedNovels = await prisma.novelLike.findMany({
      where: { userId },
      select: {
        novel: {
          select: {
            id: true,
            title: true,
            serialStatus: true,
            image: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        novel: {
          createdAt: "desc",
        },
      },
    });

    return likedNovels.map((like) => ({
      id: like.novel.id,
      title: like.novel.title,
      serialStatus: like.novel.serialStatus,
      image: like.novel.image,
    }));
  }
}
