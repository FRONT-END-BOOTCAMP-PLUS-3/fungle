import { prisma } from "@/infrastructure/config/prisma"; 

export class PrNovelRepository {
  async getNovelById(novelId: number) {
    const novel = await prisma.novel.findUnique({
      where: { id: novelId },
      include: {
        user: { select: { nickname: true, introduce: true } },
        novelEpisode: { select: { id: true, title: true, createdAt: true } },
      },
    });

    if (!novel) return null;

    const likeCount = await prisma.novelLike.count({
      where: { novelId: novelId },
    });

    return { ...novel, likeCount }; 
  }
}
