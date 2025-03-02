import { NovelEpisodeRepository } from "@/domain/repositories/NovelEpisodeRepository";
import { NovelEpisodeDto, mapEpisodeToDto } from "@/application/usecases/novel/dto/NovelEpisode";

export class DfCreateEpisodeUseCase {
  constructor(private novelEpisodeRepository: NovelEpisodeRepository) {}

  async execute(novelId: number, userId: string, episode: number, title: string, content: string): Promise<NovelEpisodeDto> {
    const newEpisode = await this.novelEpisodeRepository.createEpisode(novelId, userId, episode, title, content);
    return mapEpisodeToDto(newEpisode);
  }
}
