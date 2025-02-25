import { prisma } from "@/infrastructure/config/prisma";
import { NovelEpisode } from "@prisma/client";
import { NovelEpisodeRepository } from "@/domain/repositories/NovelEpisodeRepository";

export class PrNovelEpisodeRepository implements NovelEpisodeRepository {
  async getEpisodeById(episodeId: number): Promise<NovelEpisode | null> {
    return await prisma.novelEpisode.findUnique({
      where: { id: episodeId },
    });
  }

  async getEpisodesByNovelId(novelId: number): Promise<NovelEpisode[]> {
    return await prisma.novelEpisode.findMany({
      where: { novelId: novelId },
      select: {
        id: true,
        novelId: true,  
        userId: true,   
        episode: true,  
        content: true,
        view: true,     
        createdAt: true,
        title: true,
      },
      orderBy: { createdAt: "asc" },
    });
  }
}
