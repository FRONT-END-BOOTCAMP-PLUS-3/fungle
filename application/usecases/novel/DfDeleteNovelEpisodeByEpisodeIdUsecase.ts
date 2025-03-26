import { NovelEpisodeRepository } from "@/domain/repositories/NovelEpisodeRepository";

export class DfDeleteNovelEpisodeByEpisodeIdUsecase {
  constructor(private novelEpisodeRepository: NovelEpisodeRepository) {}

  async execute(episodeId: number) {
    await this.novelEpisodeRepository.deleteEpisode(episodeId);
  }
}
