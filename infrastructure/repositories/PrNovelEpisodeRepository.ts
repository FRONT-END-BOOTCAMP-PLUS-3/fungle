import { prisma } from "@/infrastructure/config/prisma";
import { NovelEpisode } from "@prisma/client";
import { NovelEpisodeRepository } from "@/domain/repositories/NovelEpisodeRepository";
import { NovelEpisodeWithUserInfo } from "@/application/usecases/novel/dto/NovelEpisodeWithUserInfo";

export class PrNovelEpisodeRepository implements NovelEpisodeRepository {
  async getEpisodeById(episodeId: number): Promise<NovelEpisode | null> {
    try {
      return await prisma.novelEpisode.findUnique({
        where: { id: episodeId },
      });
    } catch {
      return null;
    }
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
    try {
      return await prisma.novelEpisode.findMany({
        where: {
          novelId: novelId,
          status: "approved",
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    } catch (error: any) {
      // isFinalEpisode 컬럼이 없을 경우를 대비해 raw query 사용
      if (error?.message?.includes("isFinalEpisode") || error?.code === "P2021") {
        const result = await prisma.$queryRaw<any[]>`
          SELECT id, "novelId", "userId", episode, content, view, "createdAt", 
                 title, status, false as "isFinalEpisode"
          FROM "novelEpisode"
          WHERE "novelId" = ${novelId} AND status = 'approved'
          ORDER BY "createdAt" ASC
        `;
        return result || [];
      }
      throw error;
    }
  }

  async getEpisodesByUserId(userId: string): Promise<NovelEpisode[] | null> {
    try {
      return await prisma.novelEpisode.findMany({
        where: { userId: userId },
        orderBy: { createdAt: "asc" },
      });
    } catch {
      return [];
    }
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
    try {
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
    } catch {
      return [];
    }
  }

  async deleteEpisode(episodeId: number): Promise<void> {
    await prisma.novelEpisode.delete({ where: { id: episodeId } });
  }

  async updateNovelEpisodeStatus(episodeId: number): Promise<void> {
    try {
      const episode = await prisma.novelEpisode.findUnique({
        where: { id: episodeId },
        select: { isFinalEpisode: true, novelId: true },
      });

      if (!episode) {
        throw new Error("에피소드를 찾지 못했습니다.");
      }

      const isFinal = episode.isFinalEpisode === true;

      if (isFinal) {
        await prisma.novel.update({
          where: { id: episode.novelId },
          data: { serialStatus: "completed" },
        });
      }

      await prisma.novelEpisode.update({
        where: { id: episodeId },
        data: { status: "approved" },
      });
    } catch (e) {
      if (e instanceof Error) throw e;
      throw new Error("에피소드 상태 변경에 실패했습니다.");
    }
  }
}
