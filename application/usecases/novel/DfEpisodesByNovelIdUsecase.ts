import { NovelEpisodeRepository } from "@/domain/repositories/NovelEpisodeRepository";
import { NovelEpisodeDto, mapEpisodeToDto } from "@/application/usecases/novel/dto/NovelEpisode";

export class DfEpisodesByNovelIdUsecase {
  constructor(private novelEpisodeRepository: NovelEpisodeRepository) {}

  async execute(novelId: number): Promise<NovelEpisodeDto[]> {
    const episodes = await this.novelEpisodeRepository.getEpisodesByNovelId(novelId);

    return episodes.map(mapEpisodeToDto); 
  }
}
