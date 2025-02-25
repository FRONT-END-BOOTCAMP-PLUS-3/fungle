import { PrNovelRepository } from "@/infrastructure/repositories/PrNovelRepostiory";
import { DfNovelByIdUseCase } from "@/application/usecases/novel/DfNovelUsecase";

export const novelDi = {
  novelRepository: new PrNovelRepository(),
  getNovelByIdUseCase: new DfNovelByIdUseCase(new PrNovelRepository()),
};
