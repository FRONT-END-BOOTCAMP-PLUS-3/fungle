import { NovelRepository } from "@/domain/repositories/NovelRepository";
import { NovelsByUserIdDto } from "./dto/NovelsByUserId";
import { DfEpisodeByUserIdUsecase } from "./DfEpisodeByUserIdUsecase";

export class DfNovelByUserIdUsecase {
  constructor(
    private readonly novelRepository: NovelRepository,
    private dfEpisodesByUserId: DfEpisodeByUserIdUsecase
  ) {}

  async execute(userId: string): Promise<NovelsByUserIdDto[] | null> {
    try {
      const novels = await this.novelRepository.getNovelsByUserId(userId);
      if (!novels) return null;

      const episodes = await this.dfEpisodesByUserId.execute(userId);

      const mergedData = novels.map((novel) => ({
        id: novel.id,
        title: novel.title,
        image: novel.image,
        createdAt: novel.createdAt,
        serialStatus: novel.serialStatus,
        episodes: episodes
          ? episodes.filter((ep) => ep.novelId === novel.id)
          : [],
      }));

      return mergedData;
    } catch {
      throw new Error("소설 데이터를 가져오는 중 오류가 발생했습니다.");
    }
  }
}
