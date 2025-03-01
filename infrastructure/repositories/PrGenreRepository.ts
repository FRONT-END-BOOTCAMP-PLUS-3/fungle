import { prisma } from "@/infrastructure/config/prisma";
import { GenreRepository } from "@/domain/repositories/GenreRepository";

export class PrGenreRepository implements GenreRepository {
  async getGenreIdsByNames(genreNames: string[]) {
    return await prisma.genre.findMany({
      where: { genreName: { in: genreNames } },
      select: { id: true },
    });
  }
}

