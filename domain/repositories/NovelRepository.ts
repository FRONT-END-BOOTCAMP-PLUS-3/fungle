import { Prisma } from "@prisma/client";

export interface NovelRepository {
  getNovelById(novelId: number): Promise<
    Prisma.novelGetPayload<{
      include: {
        user: true;
        novelEpisode: true;
        _count: { select: { novelLike: true } }; 
      };
    }> | null
  >;
}

