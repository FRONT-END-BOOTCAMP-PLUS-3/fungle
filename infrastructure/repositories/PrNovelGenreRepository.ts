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
}

