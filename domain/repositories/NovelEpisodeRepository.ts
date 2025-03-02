import { NovelEpisode } from "@prisma/client";

export interface NovelEpisodeRepository {
  getEpisodeById(episodeId: number): Promise<NovelEpisode | null>;
  getEpisodesByNovelId(novelId: number): Promise<NovelEpisode[]>;
  createEpisode(novelId: number, userId: string, episode: number, title: string, content: string): Promise<NovelEpisode>;
}


