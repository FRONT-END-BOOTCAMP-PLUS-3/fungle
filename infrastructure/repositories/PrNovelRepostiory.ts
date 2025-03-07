import { prisma } from "@/infrastructure/config/prisma";
import { NovelRepository } from "@/domain/repositories/NovelRepository";
import { Novel, Prisma } from "@prisma/client";

export class PrNovelRepository implements NovelRepository {
  async getNovelById(novelId: number): Promise<Novel | null> {
    return await prisma.novel.findUnique({
      where: { id: novelId },
    });
  }

  async createNovel(data: {
    title: string;
    novelIntroduce: string;
    serialDay: string;
    image: string | null;
    userId: string;
    serialStatus: string;
  }): Promise<Novel> {
    return await prisma.novel.create({ data });
  }

  async addGenres(
    novelId: number,
    genres: number[]
  ): Promise<Prisma.BatchPayload> {
    return await prisma.novelGenre.createMany({
      data: genres.map((genreId) => ({
        novelId,
        genreId,
      })),
    });
  }

  async getNovelsByUserId(userId: string): Promise<Novel[] | null> {
    try {
      const novels = await prisma.novel.findMany({
        where: { userId: userId },
        orderBy: { createdAt: "desc" },
      });
      return novels;
    } catch (error) {
      return null;
    }
  }
  async getNovelsBySerialDay(serialDay: string): Promise<Novel[]> {
    return await prisma.novel.findMany({
      where: { serialDay: serialDay },
    });
  }

  async deleteNovelById(novelId: number): Promise<boolean> {
    try {
      const deletedNovel = await prisma.novel.delete({
        where: { id: novelId },
      });
      return !!deletedNovel;
    } catch (error) {
      if (error instanceof Error) {
        return false;
      }

      throw error;
    }
  }

  async getNovelsWithBanners(): Promise<
    { id: number; title: string; bannerImage: string }[]
  > {
    return (await prisma.novel.findMany({
      where: { bannerImage: { not: null } },
      select: {
        id: true,
        title: true,
        bannerImage: true,
      },
    })) as { id: number; title: string; bannerImage: string }[];
  }

  async updateNovelSerialStatus(
    novelId: number,
    status: string
  ): Promise<boolean> {
    try {
      const updatedNovel = await prisma.novel.update({
        where: { id: novelId },
        data: { serialStatus: status },
      });

      return !!updatedNovel;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return false;
      }

      throw error;
    }
  }

  async getAllNovels(): Promise<Novel[]> {
    return await prisma.novel.findMany();
  }
}
