import { prisma } from "@/infrastructure/config/prisma";
import { NovelRepository, NovelWithRelations } from "@/domain/repositories/NovelRepository";

export class PrNovelRepository implements NovelRepository {
  async getNovelById(novelId: number): Promise<(NovelWithRelations & { likeCount: number }) | null> {
    const novel = await prisma.novel.findUnique({
      where: { id: novelId },
      include: {
        user: { select: { nickname: true, introduce: true } },
        novelEpisode: { select: { id: true, title: true, createdAt: true } },
        novelGenre: { include: { genre: { select: { genreName: true } } } },
      },
    });

    if (!novel) return null;

    const likeCount = await prisma.novelLike.count({
      where: { novelId: novelId },
    });

    return { ...novel, likeCount }; 
  }
}
