import { PrNovelRepository } from "@/infrastructure/repositories/PrNovelRepostiory";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { PrNovelGenreRepository } from "@/infrastructure/repositories/PrNovelGenreRepository";
import { PrNovelLikeRepository } from "@/infrastructure/repositories/PrNovelLikeRepository";
import { PrNovelEpisodeRepository } from "@/infrastructure/repositories/PrNovelEpisodeRepository";
import { DfNovelByIdUseCase } from "@/application/usecases/novel/DfNovelUsecase";
import { DfEpisodesByNovelIdUseCase } from "@/application/usecases/novel/DfEpisodesByNovelIdUseCase";
import { DfEpisodeByIdUseCase } from "@/application/usecases/novel/DfEpisodeByIdUseCase"; // ✅ 추가

export const novelDi = {
  novelRepository: new PrNovelRepository(),
  userRepository: new PrUserRepository(),
  novelGenreRepository: new PrNovelGenreRepository(),
  novelLikeRepository: new PrNovelLikeRepository(),
  novelEpisodeRepository: new PrNovelEpisodeRepository(),

  getEpisodesByNovelIdUseCase: new DfEpisodesByNovelIdUseCase(new PrNovelEpisodeRepository()),

  getEpisodeByIdUseCase: new DfEpisodeByIdUseCase(new PrNovelEpisodeRepository()), // ✅ 추가

  getNovelByIdUseCase: new DfNovelByIdUseCase(
    new PrNovelRepository(),
    new PrNovelGenreRepository(),
    new PrUserRepository(),
    new PrNovelLikeRepository(),
    new DfEpisodesByNovelIdUseCase(new PrNovelEpisodeRepository())
  ),
};
