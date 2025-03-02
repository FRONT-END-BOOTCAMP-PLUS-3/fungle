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
      orderBy: { createdAt: "asc" },
    });
  }

  async createEpisode(novelId: number, userId: string, episode: number, title: string, content: string): Promise<NovelEpisode> {
    return await prisma.novelEpisode.create({
      data: {
        novelId,
        userId,
        episode,
        title,
        content,
      },
    });
  }
}