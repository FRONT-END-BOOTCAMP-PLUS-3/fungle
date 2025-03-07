import { NovelRepository } from "@/domain/repositories/NovelRepository";
import { NovelGenreRepository } from "@/domain/repositories/NovelGenreRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { NovelLikeRepository } from "@/domain/repositories/NoveLikeRepository";
import { NovelEpisodeRepository } from "@/domain/repositories/NovelEpisodeRepository";
import { TopListDTO } from "@/application/usecases/novel/dto/TopList";

export class DfTopNovelsUsecase {
  constructor(
    private novelRepository: NovelRepository,
    private novelGenreRepository: NovelGenreRepository,
    private userRepository: UserRepository,
    private novelLikeRepository: NovelLikeRepository,
    private novelEpisodeRepository: NovelEpisodeRepository
  ) {}

  async execute(limit: number = 10): Promise<TopListDTO[]> {
    const novels = await this.novelRepository.getAllNovels();

    const novelData = await Promise.all(
      novels.map(async (novel) => {
        try {
          // ✅ 개별적으로 데이터 가져오기 (병렬 처리 최적화)
          const [user, genres, likeCount, totalViews] = await Promise.all([
            this.userRepository.getUserById(novel.userId),
            this.novelGenreRepository.getGenresByNovelId(novel.id),
            this.novelLikeRepository.getLikeCountByNovelId(novel.id),
            this.novelEpisodeRepository.getTotalViewsByNovelId(novel.id),
          ]);

          return {
            id: novel.id,
            title: novel.title,
            author: user?.nickname ?? "Unknown",
            image: novel.image || "/image/book.svg",
            tags: genres ?? [], // ✅ 장르 추가
            score: totalViews + likeCount, // ✅ 조회수 + 좋아요 점수
          } as TopListDTO;
        } catch (error) {
          console.error(`소설 ID ${novel.id} 점수 계산 오류:`, error);
          return null;
        }
      })
    );

    return novelData
      .filter((novel) => novel !== null)
      .sort((a, b) => b!.score - a!.score)
      .slice(0, limit) as TopListDTO[];
  }
}
