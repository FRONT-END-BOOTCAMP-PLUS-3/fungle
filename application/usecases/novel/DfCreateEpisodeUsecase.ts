import { NovelEpisodeRepository } from "@/domain/repositories/NovelEpisodeRepository";
import { NovelRepository } from "@/domain/repositories/NovelRepository"; 
import { NovelEpisodeDto, mapEpisodeToDto } from "@/application/usecases/novel/dto/NovelEpisode";

export class DfCreateEpisodeUseCase {
  constructor(
    private novelEpisodeRepository: NovelEpisodeRepository,
    private novelRepository: NovelRepository
  ) {}

  async execute(novelId: number, userId: string, episode: number, title: string, content: string): Promise<NovelEpisodeDto> {
    const novel = await this.novelRepository.getNovelById(novelId);
    
    if (!novel) {
      throw new Error("NOT_FOUND: 존재하지 않는 소설입니다.");
    }

    if (novel.userId !== userId) {
      throw new Error("FORBIDDEN: 에피소드를 추가할 권한이 없습니다.");
    }

    const newEpisode = await this.novelEpisodeRepository.createEpisode(novelId, userId, episode, title, content);
    return mapEpisodeToDto(newEpisode);
  }
}
