import { PrNovelRepository } from "@/infrastructure/repositories/PrNovelRepostiory";
import { PrNovelEpisodeRepository } from "@/infrastructure/repositories/PrNovelEpisodeRepository";
import { DfNovelByIdUseCase } from "@/application/usecases/novel/DfNovelUsecase";
import { DfEpisodeByIdUseCase } from "@/application/usecases/novel/DfEpisodeByIdUseCase";
import { DfEpisodesByNovelIdUseCase } from "@/application/usecases/novel/DfEpisodesByNovelIdUseCase";

export const novelDi = {
  novelRepository: new PrNovelRepository(),
  novelEpisodeRepository: new PrNovelEpisodeRepository(),
  getNovelByIdUseCase: new DfNovelByIdUseCase(new PrNovelRepository()),
  getEpisodeByIdUseCase: new DfEpisodeByIdUseCase(new PrNovelEpisodeRepository()),
  getEpisodesByNovelIdUseCase: new DfEpisodesByNovelIdUseCase(new PrNovelEpisodeRepository()),
};
