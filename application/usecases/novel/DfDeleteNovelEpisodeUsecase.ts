import { NovelEpisodeRepository } from "@/domain/repositories/NovelEpisodeRepository";

export class DfDeleteNovelEpisodeUsecase {
  constructor(private novelEpisodeRepository: NovelEpisodeRepository) {}

  async execute(episodeId: number) {
    await this.novelEpisodeRepository.deleteEpisode(episodeId);
  }
}
