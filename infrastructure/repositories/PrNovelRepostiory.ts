import { prisma } from "@/infrastructure/config/prisma";
import { NovelRepository } from "@/domain/repositories/NovelRepository";
import { Novel, Prisma } from "@prisma/client";

export class PrNovelRepository implements NovelRepository {
  async getNovelById(novelId: number): Promise<Novel | null> {
    try {
      return await prisma.novel.findUnique({
        where: { id: novelId },
      });
    } catch (error: any) {
      // bannerImage 컬럼이 없을 경우를 대비해 raw query 사용
      if (
        error?.message?.includes("bannerImage") ||
        error?.code === "P2021" ||
        error?.message?.includes("does not exist")
      ) {
        try {
          // 컬럼이 없으면 bannerImage 없이 조회
          const result = await prisma.$queryRaw<
            Array<{
              id: number;
              createdAt: Date;
              image: string | null;
              title: string;
              serialDay: string;
              novelIntroduce: string;
              serialStatus: string;
              userId: string;
              bannerImage: string | null;
            }>
          >`
            SELECT id, "createdAt", image, title, "serialDay", "novelIntroduce", 
                   "serialStatus", "userId", NULL::text as "bannerImage"
            FROM novel
            WHERE id = ${novelId}
          `;

          if (!result || result.length === 0 || !result[0]) {
            return null;
          }

          const novel = result[0];
          return {
            id: novel.id,
            createdAt: novel.createdAt,
            image: novel.image,
            title: novel.title,
            serialDay: novel.serialDay,
            novelIntroduce: novel.novelIntroduce,
            serialStatus: novel.serialStatus,
            userId: novel.userId,
            bannerImage: novel.bannerImage,
          } as Novel;
        } catch (rawError) {
          console.error(
            `[PrNovelRepository] Raw query 오류 (소설 ID ${novelId}):`,
            rawError,
          );
          return null;
        }
      }
      console.error(
        `[PrNovelRepository] 소설 조회 오류 (ID ${novelId}):`,
        error,
      );
      return null;
    }
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
    genres: number[],
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
    try {
      return await prisma.novel.findMany({
        where: { serialDay: serialDay },
      });
    } catch (error) {
      console.error("요일별 소설 조회 오류:", error);
      return [];
    }
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
    status: string,
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
    try {
      console.log("[PrNovelRepository] getAllNovels 호출");
      const novels = await prisma.novel.findMany({
        orderBy: { createdAt: "desc" },
      });
      console.log(`[PrNovelRepository] 조회된 소설 수: ${novels.length}`);
      return novels;
    } catch (error) {
      console.error("[PrNovelRepository] 전체 소설 조회 오류:", error);
      if (error instanceof Error) {
        console.error(
          "[PrNovelRepository] 오류 상세:",
          error.message,
          error.stack,
        );
      }
      return [];
    }
  }

  async getNovelsBySearch(
    searchQuery: string,
    filter: string,
    novelIds: number[],
    userIds: string[],
  ): Promise<Novel[]> {
    return await prisma.novel.findMany({
      where: {
        OR: [
          filter === "title"
            ? { title: { contains: searchQuery, mode: "insensitive" } }
            : {},
          filter === "genre"
            ? { id: { in: novelIds.length > 0 ? novelIds : undefined } }
            : {},
          filter === "author"
            ? { userId: { in: userIds.length > 0 ? userIds : undefined } }
            : {},
        ],
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getNovelCountByUserId(userId: string): Promise<number> {
    return await prisma.novel.count({
      where: { userId: userId },
    });
  }
}
