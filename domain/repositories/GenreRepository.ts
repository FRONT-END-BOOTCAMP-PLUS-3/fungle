export interface GenreRepository {
  getGenreIdsByNames(genreNames: string[]): Promise<{ id: number }[]>;
}

