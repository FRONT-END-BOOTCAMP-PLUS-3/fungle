import { NovelEpisodeRepository } from "@/domain/repositories/NovelEpisodeRepository";
import { NovelEpisodeDto, mapEpisodeToDto } from "@/application/usecases/novel/dto/NovelEpisode";

export class DfEpisodeByIdUsecase {
  constructor(private novelEpisodeRepository: NovelEpisodeRepository) {}

  async execute(episodeId: number): Promise<NovelEpisodeDto | null> {
    const episode = await this.novelEpisodeRepository.getEpisodeById(episodeId);
    if (!episode) return null;

    return mapEpisodeToDto(episode); 
  }
}
