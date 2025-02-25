import { Prisma } from "@prisma/client";

export type NovelWithRelations = Prisma.NovelGetPayload<{
  include: {
    user: { select: { nickname: true; introduce: true } };
    novelEpisode: { select: { id: true; title: true; createdAt: true } };
    novelGenre: { include: { genre: { select: { genreName: true } } } };
  };
}>;

export interface NovelRepository {
  getNovelById(novelId: number): Promise<(NovelWithRelations & { likeCount: number }) | null>;
}
