import { NovelRepository } from "@/domain/repositories/NovelRepository";
import { GenreRepository } from "@/domain/repositories/GenreRepository";
import { NovelGenreRepository } from "@/domain/repositories/NovelGenreRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { SearchNovelDTO } from "./dto/SearchNovel";

export class DfSearchNovelsUsecase {
  constructor(
    private readonly novelRepository: NovelRepository,
    private readonly genreRepository: GenreRepository,
    private readonly novelGenreRepository: NovelGenreRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(searchQuery: string, filter: string): Promise<SearchNovelDTO[]> {
    let novelIds: number[] = [];
    let userIds: string[] = [];
    const userMap = new Map();
    const genreMap = new Map();

    if (filter === "genre") {
      const genres = await this.genreRepository.getGenreIdsByNames([searchQuery]);
      const genreIds = genres.map((g) => g.id);
      novelIds = await this.novelGenreRepository.getNovelIdsByGenreIds(genreIds);
    }

    if (filter === "author") {
      const users = await this.userRepository.findUserIdsByNickname(searchQuery);
      userIds = users.map((user) => user.id);
    }

    const novels = await this.novelRepository.getNovelsBySearch(searchQuery, filter, novelIds, userIds);

    await Promise.all(
      novels.map(async (novel) => {
        if (!userMap.has(novel.userId)) {
          const user = await this.userRepository.getUserById(novel.userId);
          userMap.set(novel.userId, user?.nickname ?? "Unknown");
        }

        if (!genreMap.has(novel.id)) {
          const genres = await this.novelGenreRepository.getGenresByNovelId(novel.id);
          genreMap.set(novel.id, genres ?? []);
        }
      })
    );


    return novels.map((novel) => new SearchNovelDTO(
      novel,
      userMap.get(novel.userId),
      genreMap.get(novel.id) ?? []
    ));
  }
}
