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
    try {
      console.log("[Top10] 전체 소설 조회 시작...");
      const novels = await this.novelRepository.getAllNovels();
      console.log(`[Top10] 조회된 소설 수: ${novels?.length ?? 0}`);
      
      if (!novels || novels.length === 0) {
        console.log("[Top10] 소설이 없어 빈 배열 반환");
        return [];
      }

      console.log(`[Top10] ${novels.length}개 소설의 점수 계산 시작...`);
      const novelData = await Promise.all(
        novels.map(async (novel) => {
          try {
            const [user, genres, likeCount, totalViews] = await Promise.all([
              this.userRepository.getUserById(novel.userId).catch(() => null),
              this.novelGenreRepository.getGenresByNovelId(novel.id).catch(() => []),
              this.novelLikeRepository.getLikeCountByNovelId(novel.id).catch(() => 0),
              this.novelEpisodeRepository.getTotalViewsByNovelId(novel.id).catch(() => 0),
            ]);

            console.log(`[Top10] 소설 ${novel.id} 장르:`, genres);

            return {
              id: novel.id,
              title: novel.title,
              author: user?.nickname ?? "Unknown",
              image: novel.image || "/image/book.svg",
              tags: genres && genres.length > 0 ? genres : [], 
              score: (totalViews ?? 0) + (likeCount ?? 0),
            } as TopListDTO;
          } catch (error) {
            console.error(`[Top10] 소설 ID ${novel.id} 점수 계산 오류:`, error);
            return null;
          }
        })
      );

      const validNovels = novelData.filter((novel) => novel !== null);
      console.log(`[Top10] 유효한 소설 수: ${validNovels.length}/${novels.length}`);
      
      const sorted = validNovels
        .sort((a, b) => b!.score - a!.score)
        .slice(0, limit) as TopListDTO[];
      
      console.log(`[Top10] 최종 반환 소설 수: ${sorted.length}`);
      return sorted;
    } catch (error) {
      console.error("[Top10] Top 10 소설 조회 오류:", error);
      return [];
    }
  }
}
