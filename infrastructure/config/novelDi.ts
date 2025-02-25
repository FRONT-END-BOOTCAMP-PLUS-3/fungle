import { PrNovelRepository } from "@/infrastructure/repositories/PrNovelRepostiory";
import { GetNovelByIdUseCase } from "@/application/usecases/novel/DfNovelUsecase";

export const novelDi = {
  novelRepository: new PrNovelRepository(),
  getNovelByIdUseCase: new GetNovelByIdUseCase(new PrNovelRepository()),
};
