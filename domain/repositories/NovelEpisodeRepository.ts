import { NovelEpisode } from "@prisma/client";

export interface NovelEpisodeRepository {
  getEpisodeById(episodeId: number): Promise<NovelEpisode | null>;
  getEpisodesByNovelId(novelId: number): Promise<NovelEpisode[]>;
}

