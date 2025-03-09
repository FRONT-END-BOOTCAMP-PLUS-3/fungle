export interface NovelGenreRepository {
  getGenresByNovelId(novelId: number): Promise<string[]>;
  getNovelIdsByGenreIds(genreIds: number[]): Promise<number[]>;
}

