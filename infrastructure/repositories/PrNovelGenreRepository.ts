import { prisma } from "@/infrastructure/config/prisma";
import { NovelGenreRepository } from "@/domain/repositories/NovelGenreRepository";
import { Genre, NovelGenre } from "@prisma/client"; 

export class PrNovelGenreRepository implements NovelGenreRepository {
  async getGenresByNovelId(novelId: number): Promise<string[]> {
    try {
      const genres: (NovelGenre & { genre: Genre })[] = await prisma.novelGenre.findMany({
        where: { novelId: novelId },
        include: {
          genre: true, 
        },
      });

      const genreNames = genres
        .filter((g) => g.genre && g.genre.genreName)
        .map((g) => g.genre.genreName);
      
      console.log(`[PrNovelGenreRepository] 소설 ${novelId} 장르 조회:`, genreNames);
      return genreNames;
    } catch (error) {
      console.error(`[PrNovelGenreRepository] 소설 ${novelId} 장르 조회 오류:`, error);
      return [];
    }
  }

  async getNovelIdsByGenreIds(genreIds: number[]): Promise<number[]> {
    const novelGenres = await prisma.novelGenre.findMany({
      where: { genreId: { in: genreIds } },
      select: { novelId: true },
    });

    return novelGenres.map((ng) => ng.novelId);
  }
}

