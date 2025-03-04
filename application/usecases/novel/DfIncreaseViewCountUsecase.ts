import { NovelEpisodeRepository } from "@/domain/repositories/NovelEpisodeRepository";

export class DfIncreaseViewCountUsecase {
  constructor(private novelEpisodeRepository: NovelEpisodeRepository) {}

  async execute(episodeId: number): Promise<void> {
    if (!episodeId || isNaN(episodeId)) {
      throw new Error("유효하지 않은 에피소드 ID입니다.");
    }

    await this.novelEpisodeRepository.increaseViewCount(episodeId);
  }
}
