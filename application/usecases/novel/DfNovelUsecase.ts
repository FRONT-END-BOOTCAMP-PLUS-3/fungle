import { NovelRepository } from "@/domain/repositories/NovelRepository";
import { NovelGenreRepository } from "@/domain/repositories/NovelGenreRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { NovelLikeRepository } from "@/domain/repositories/NoveLikeRepository";
import { NovelDto } from "@/application/usecases/novel/dto/Novel";
import { DfEpisodesByNovelIdUsecase } from "@/application/usecases/novel/DfEpisodesByNovelIdUsecase";

export class DfNovelByIdUseCase {
  constructor(
    private novelRepository: NovelRepository,
    private novelGenreRepository: NovelGenreRepository,
    private userRepository: UserRepository,
    private novelLikeRepository: NovelLikeRepository,
    private dfEpisodesByNovelIdUseCase: DfEpisodesByNovelIdUsecase,
  ) {}

  async execute(novelId: number): Promise<NovelDto | null> {
    const novel = await this.novelRepository.getNovelById(novelId);
    if (!novel) return null;

    const user = await this.userRepository.getUserById(novel.userId);
    if (!user) {
      throw new Error(`사용자를 찾을 수 없음`);
    }

    const genres = await this.novelGenreRepository.getGenresByNovelId(novelId);
    const likeCount =
      await this.novelLikeRepository.getLikeCountByNovelId(novelId);
    const episodes = await this.dfEpisodesByNovelIdUseCase.execute(novelId);
    return {
      id: novel.id,
      title: novel.title,
      image: novel.image,
      serialDay: novel.serialDay,
      novelIntroduce: novel.novelIntroduce,
      serialStatus: novel.serialStatus,
      author: user.nickname,
      profile: user?.profileImage ?? "/image/profile.svg",
      userIntroduce: user?.introduce ?? null,
      likeCount,
      episodes,
      genres,
    };
  }
}
