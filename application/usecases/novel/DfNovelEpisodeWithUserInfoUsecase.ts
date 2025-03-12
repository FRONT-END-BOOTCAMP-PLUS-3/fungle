import { NovelEpisodeRepository } from "@/domain/repositories/NovelEpisodeRepository";
import { NovelEpisodeWithUserInfo } from "./dto/NovelEpisodeWithUserInfo";

export class DfNovelEpisodeWithUserInfoUsecase {
  constructor(
    private readonly novelEpisodeRepository: NovelEpisodeRepository
  ) {}

  async execute(): Promise<NovelEpisodeWithUserInfo[]> {
    return await this.novelEpisodeRepository.getNovelEpisodeWithUserInfo();
  }
}
