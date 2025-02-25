import { NovelRepository } from "@/domain/repositories/NovelRepository";
import { NovelEntity } from "@/domain/entities/novel";

export class DfNovelByIdUseCase {
  constructor(private novelRepository: NovelRepository) {}

  async execute(novelId: number): Promise<NovelEntity | null> {
    const novel = await this.novelRepository.getNovelById(novelId);
    if (!novel) return null;

    return new NovelEntity(
      novel.id,
      novel.title,
      novel.image,
      novel.serialDay,
      novel.novelIntroduce,
      novel.serialStatus,
      novel.user.nickname, 
      novel.user?.introduce ?? null, 
      novel.likeCount,  
      novel.novelEpisode.map((ep) => ({
        id: ep.id,
        title: ep.title,
        createdAt: ep.createdAt,
      })),
      novel.novelGenre.map((ng) => ng.genre.genreName),
    );
  }
}
