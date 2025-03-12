import { NovelEpisodeRepository } from "@/domain/repositories/NovelEpisodeRepository";

export class DfUpdateNovelEpisodeStatusUsecase {
  constructor(private novelEpisodeRepository: NovelEpisodeRepository) {}

  async execute(episodeId: number) {
    await this.novelEpisodeRepository.updateNovelEpisodeStatus(episodeId);
  }
}
