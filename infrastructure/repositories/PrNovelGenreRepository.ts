import { prisma } from "@/infrastructure/config/prisma";
import { NovelGenreRepository } from "@/domain/repositories/NovelGenreRepository";
import { Genre, NovelGenre } from "@prisma/client"; 

export class PrNovelGenreRepository implements NovelGenreRepository {
  async getGenresByNovelId(novelId: number): Promise<string[]> {
    const genres: (NovelGenre & { genre: Genre })[] = await prisma.novelGenre.findMany({
      where: { novelId: novelId },
      include: {
        genre: true, 
      },
    });

    return genres.map((g) => g.genre.genreName);
  }

  async getNovelIdsByGenreIds(genreIds: number[]): Promise<number[]> {
    const novelGenres = await prisma.novelGenre.findMany({
      where: { genreId: { in: genreIds } },
      select: { novelId: true },
    });

    return novelGenres.map((ng) => ng.novelId);
  }
}

