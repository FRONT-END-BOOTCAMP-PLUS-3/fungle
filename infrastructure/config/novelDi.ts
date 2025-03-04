import { PrNovelRepository } from "@/infrastructure/repositories/PrNovelRepostiory";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { PrNovelGenreRepository } from "@/infrastructure/repositories/PrNovelGenreRepository";
import { PrNovelLikeRepository } from "@/infrastructure/repositories/PrNovelLikeRepository";
import { PrNovelEpisodeRepository } from "@/infrastructure/repositories/PrNovelEpisodeRepository";
import { PrGenreRepository } from "../repositories/PrGenreRepository";
import { DfNovelByIdUseCase } from "@/application/usecases/novel/DfNovelUsecase";
import { DfEpisodesByNovelIdUsecase } from "@/application/usecases/novel/DfEpisodesByNovelIdUsecase";
import { DfEpisodeByIdUseCase } from "@/application/usecases/novel/DfEpisodeByIdUsecase";
import { DfCreateNovelUseCase } from "@/application/usecases/novel/DfCreateNovelUsecase";
import { DfCreateEpisodeUseCase } from "@/application/usecases/novel/DfCreateEpisodeUsecase"; 
import { DfIncreaseViewCountUsecase } from "@/application/usecases/novel/DfIncreaseViewCountUsecase";
import { FileService } from "@/infrastructure/services/FileService";

export const novelDi = {
  novelRepository: new PrNovelRepository(),
  userRepository: new PrUserRepository(),
  novelGenreRepository: new PrNovelGenreRepository(),
  novelLikeRepository: new PrNovelLikeRepository(),
  novelEpisodeRepository: new PrNovelEpisodeRepository(),
  fileService: new FileService(),
  genreRepository: new PrGenreRepository(),

  getEpisodesByNovelIdUseCase: new DfEpisodesByNovelIdUsecase(new PrNovelEpisodeRepository()),
  getEpisodeByIdUseCase: new DfEpisodeByIdUseCase(new PrNovelEpisodeRepository()),

  getNovelByIdUseCase: new DfNovelByIdUseCase(
    new PrNovelRepository(),
    new PrNovelGenreRepository(),
    new PrUserRepository(),
    new PrNovelLikeRepository(),
    new DfEpisodesByNovelIdUsecase(new PrNovelEpisodeRepository())
  ),

  createNovelUseCase: new DfCreateNovelUseCase(
    new PrNovelRepository(),
    new PrGenreRepository(), 
    FileService 
  ),

  createEpisodeUseCase: new DfCreateEpisodeUseCase(
    new PrNovelEpisodeRepository(),
    new PrNovelRepository() 
  ),

  increaseViewCountUseCase: new DfIncreaseViewCountUsecase(new PrNovelEpisodeRepository()),
}
