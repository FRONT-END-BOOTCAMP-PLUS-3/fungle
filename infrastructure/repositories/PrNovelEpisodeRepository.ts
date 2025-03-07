import { prisma } from "@/infrastructure/config/prisma";
import { NovelEpisode } from "@prisma/client";
import { NovelEpisodeRepository } from "@/domain/repositories/NovelEpisodeRepository";

export class PrNovelEpisodeRepository implements NovelEpisodeRepository {
  async getEpisodeById(episodeId: number): Promise<NovelEpisode | null> {
    return await prisma.novelEpisode.findUnique({
      where: { id: episodeId },
    });
  }

  async increaseViewCount(episodeId: number): Promise<void> {
    await prisma.novelEpisode.update({
      where: { id: episodeId },
      data: {
        view: {
          increment: 1,
        },
      },
    });
  }

  async getEpisodesByNovelId(novelId: number): Promise<NovelEpisode[]> {
    return await prisma.novelEpisode.findMany({
      where: {
        novelId: novelId,
        status: "approved",
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  async getEpisodesByUserId(userId: string): Promise<NovelEpisode[] | null> {
    return await prisma.novelEpisode.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "asc" },
    });
  }

  async createEpisode(
    novelId: number,
    userId: string,
    episode: number,
    title: string,
    content: string,
    isFinalEpisode: boolean
  ): Promise<NovelEpisode> {
    return await prisma.novelEpisode.create({
      data: {
        novelId,
        userId,
        episode,
        title,
        content,
        isFinalEpisode
      },
    });
  }
}
