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
      const novels = await prisma.novel.findMany({ where: { userId: userId } });
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
}
