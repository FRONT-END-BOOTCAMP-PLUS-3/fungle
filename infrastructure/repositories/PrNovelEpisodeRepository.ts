import { prisma } from "@/infrastructure/config/prisma";
import { NovelEpisode } from "@prisma/client";
import { NovelEpisodeRepository } from "@/domain/repositories/NovelEpisodeRepository";
import { NovelEpisodeWithUserInfo } from "@/application/usecases/novel/dto/NovelEpisodeWithUserInfo";

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
        isFinalEpisode,
      },
    });
  }
  async getTotalViewsByNovelId(novelId: number): Promise<number> {
    const result = await prisma.novelEpisode.aggregate({
      where: { novelId },
      _sum: { view: true },
    });
    return result._sum.view || 0;
  }

  async getNovelEpisodeWithUserInfo(): Promise<NovelEpisodeWithUserInfo[]> {
    return await prisma.novelEpisode
      .findMany({
        select: {
          id: true,
          title: true,
          status: true,
          content: true,
          createdAt: true,
          novel: {
            select: {
              id: true,
              title: true,
              user: {
                select: {
                  id: true,
                  nickname: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      })
      .then((episodes) =>
        episodes.map((episode) => ({
          episodeId: episode.id,
          userId: episode.novel.user.id,
          userNickname: episode.novel.user.nickname,
          novelTitle: episode.novel.title,
          episodeTitle: episode.title,
          episodeContent: episode.content,
          status: episode.status,
          createdAt: episode.createdAt,
        }))
      );
  }

  async deleteEpisode(episodeId: number): Promise<void> {
    await prisma.novelEpisode.delete({ where: { id: episodeId } });
  }
}
