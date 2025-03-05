import { NovelEpisodeRepository } from "@/domain/repositories/NovelEpisodeRepository";
import {
  mapEpisodeByUserIdToDto,
  NovelEpisodesByUserIdDto,
} from "./dto/NovelEpisodesByUserId";

export class DfEpisodeByUserIdUsecase {
  constructor(
    private readonly novelEpisodeRepository: NovelEpisodeRepository
  ) {}

  async execute(userId: string): Promise<NovelEpisodesByUserIdDto[] | null> {
    try {
      const episodes = await this.novelEpisodeRepository.getEpisodesByUserId(
        userId
      );
      if (!episodes) return null;

      return episodes.map(mapEpisodeByUserIdToDto);
    } catch {
      throw new Error("에피소드 데이터를 가져오는 중 오류가 발생했습니다.");
    }
  }
}
