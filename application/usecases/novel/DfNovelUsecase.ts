import { PrNovelRepository } from "@/infrastructure/repositories/PrNovelRepostiory";

export class DfNovelUseCase {
  constructor(private novelRepository: PrNovelRepository) {}

  async execute(novelId: number) {
    const novel = await this.novelRepository.getNovelById(novelId);
    if (!novel) return null;

    return {
      id: novel.id,
      title: novel.title,
      image: novel.image,
      serialDay: novel.serialDay,
      novelIntroduce: novel.novelIntroduce,
      serialStatus: novel.serialStatus,
      author: novel.user.nickname,
      userIntroduce: novel.user.introduce,
      likeCount: novel.likeCount, 
      episodes: novel.novelEpisode.map(ep => ({
        id: ep.id,
        title: ep.title,
        createdAt: ep.createdAt,
      })),
    };
  }
}
