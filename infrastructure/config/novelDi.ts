import { PrNovelRepository } from "@/infrastructure/repositories/PrNovelRepostiory";
import { DfNovelUseCase } from "@/application/usecases/novel/DfNovelUsecase";

export const novelDi = {
  novelRepository: new PrNovelRepository(),
  getNovelByIdUseCase: new DfNovelUseCase(new PrNovelRepository()),
};
