import { NovelEpisode } from "@prisma/client";

export interface NovelEpisodeRepository {
  getEpisodeById(episodeId: number): Promise<NovelEpisode | null>;
  getEpisodesByNovelId(novelId: number): Promise<NovelEpisode[]>;
  getEpisodesByUserId(userId: string): Promise<NovelEpisode[] | null>;
  createEpisode(
    novelId: number,
    userId: string,
    episode: number,
    title: string,
    content: string,
    isFinalEpisode: boolean
  ): Promise<NovelEpisode>;
  increaseViewCount(episodeId: number): Promise<void>;
}
