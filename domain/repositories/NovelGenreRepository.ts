export interface NovelGenreRepository {
  getGenresByNovelId(novelId: number): Promise<string[]>;
}

