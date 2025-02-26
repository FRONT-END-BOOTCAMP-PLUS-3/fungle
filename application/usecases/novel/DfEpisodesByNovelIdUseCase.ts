import { NovelEpisodeRepository } from "@/domain/repositories/NovelEpisodeRepository";
import { NovelEpisodeDto } from "@/application/usecases/novel/dto/NovelEpisodeDto";

export class DfEpisodesByNovelIdUseCase {
  constructor(private novelEpisodeRepository: NovelEpisodeRepository) {}

  async execute(novelId: number): Promise<NovelEpisodeDto[]> {
    const episodes = await this.novelEpisodeRepository.getEpisodesByNovelId(novelId);

    return episodes.map(ep => ({
      id: ep.id,
      title: ep.title,
      content: ep.content,
      episode: ep.episode,
      createdAt: ep.createdAt.toISOString(),
    }));
  }
}
